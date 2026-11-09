import { NextRequest, NextResponse } from 'next/server';

import {
  type ContactBudgetOption,
  type ContactConsultationOption,
  type ContactProjectType,
  isContactBudgetOption,
  isContactConsultationOption,
  isContactProjectType,
} from '@lib/contact-options';
import { getCollection } from '@lib/mongodb';
import type { ContactFormField } from '@shared/interfaces/Order.interfaces';

const COLLECTION = 'contact_submissions';
const EXTERNAL_BACKEND = process.env.BACKEND_APP || process.env.NEXT_PUBLIC_BACKEND_APP;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
function getCmsConnection() {
  return {
    CMS_API_URL: process.env.ORTVEST_CMS_API_URL?.trim()
      || (process.env.NODE_ENV === 'development' ? 'http://localhost:3200' : undefined),
    CMS_API_KEY: process.env.ORTVEST_CMS_API_KEY?.trim(),
  };
}

function missingCmsKeyResponse() {
  return NextResponse.json({
    code: 'CMS_API_KEY_MISSING',
    error: 'ORTVEST_CMS_API_KEY is missing from the website server environment. Configure the organization API key to connect the form to CMS.',
  }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}

export interface ContactBody {
  clientName: string;
  clientEmail: string;
  productDescription?: string;
  selectedServices: ContactProjectType[];
  budget?: ContactBudgetOption | '';
  consultationType?: ContactConsultationOption | '';
  source?: string;
  partnerStage?: string;
  partnerFunding?: string;
  partnerModel?: string;
  businessIndustry?: string;
  businessNeed?: string;
}

type NormalizedContactBody = Omit<ContactBody, 'productDescription' | 'selectedServices' | 'budget' | 'consultationType'> & {
  productDescription: string;
  selectedServices: string[];
  budget: string;
  consultationType: string;
};

interface ContactDoc {
  clientName: string;
  clientEmail: string;
  productDescription: string;
  selectedServices: string[];
  budget: string;
  consultationType: string;
  source?: string;
  partnerStage?: string;
  partnerFunding?: string;
  partnerModel?: string;
  businessIndustry?: string;
  businessNeed?: string;
  createdAt: string;
}

interface OrderNotificationPayload extends NormalizedContactBody {
  createdAt: string;
  source: string;
  orderId?: string;
  fields?: Record<string, unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isContactFormField(value: unknown): value is ContactFormField {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string'
    && typeof value.value === 'string'
    && typeof value.key === 'string'
    && typeof value.label === 'string'
    && ['text', 'email', 'number', 'date', 'textarea'].includes(String(value.type))
    && typeof value.required === 'boolean';
}

function getFieldText(fields: Record<string, unknown>, key: string): string {
  const value = fields[key];
  if (Array.isArray(value)) return value.map((item) => String(item)).join(', ').trim();
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
}

function normalizeDynamicFields(fields: Record<string, unknown>): NormalizedContactBody {
  const selectedServicesValue = fields.selected_services ?? fields.selectedServices;
  const selectedServices = Array.isArray(selectedServicesValue)
    ? selectedServicesValue.map(String)
    : typeof selectedServicesValue === 'string' && selectedServicesValue.trim()
      ? [selectedServicesValue.trim()]
      : [];

  return {
    clientName: getFieldText(fields, 'name') || getFieldText(fields, 'clientName'),
    clientEmail: getFieldText(fields, 'email') || getFieldText(fields, 'clientEmail'),
    productDescription: getFieldText(fields, 'message') || getFieldText(fields, 'productDescription'),
    selectedServices,
    budget: getFieldText(fields, 'budget'),
    consultationType: getFieldText(fields, 'consultation_type') || getFieldText(fields, 'consultationType'),
    source: getFieldText(fields, 'source') || 'website',
    partnerStage: getFieldText(fields, 'partner_stage') || getFieldText(fields, 'partnerStage'),
    partnerFunding: getFieldText(fields, 'partner_funding') || getFieldText(fields, 'partnerFunding'),
    partnerModel: getFieldText(fields, 'partner_model') || getFieldText(fields, 'partnerModel'),
    businessIndustry: getFieldText(fields, 'business_industry') || getFieldText(fields, 'businessIndustry'),
    businessNeed: getFieldText(fields, 'business_need') || getFieldText(fields, 'businessNeed'),
  };
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.clientName === 'string' &&
    b.clientName.trim().length > 0 &&
    typeof b.clientEmail === 'string' &&
    b.clientEmail.trim().length > 0 &&
    Array.isArray(b.selectedServices) &&
    b.selectedServices.every(isContactProjectType) &&
    (b.budget === undefined || b.budget === '' || isContactBudgetOption(b.budget)) &&
    (b.consultationType === undefined || b.consultationType === '' || isContactConsultationOption(b.consultationType))
  );
}

async function publishOrderToWebSocket(payload: OrderNotificationPayload) {
  // Read WS settings at request time so .env changes are picked up in dev.
  const ordersWsUrl = process.env.ORDERS_WS_URL;
  const ordersWsAuthToken = process.env.ORDERS_WS_AUTH_TOKEN;
  if (!ordersWsUrl) return;

  const event = {
    type: 'new_order',
    authToken: ordersWsAuthToken,
    payload,
  };

  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const ws = new WebSocket(ordersWsUrl);
    const timeoutId = setTimeout(() => {
      finish(new Error('Orders websocket timeout'));
    }, 5000);

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
      if (error) reject(error);
      else resolve();
    };

    ws.addEventListener('open', () => {
      try {
        ws.send(JSON.stringify(event));
      } catch (error) {
        finish(error instanceof Error ? error : new Error('Orders websocket send failed'));
      }
    });

    ws.addEventListener('message', (messageEvent) => {
      const raw = typeof messageEvent.data === 'string' ? messageEvent.data : String(messageEvent.data ?? '');

      try {
        const parsed = JSON.parse(raw) as { ok?: boolean; message?: string; error?: string };

        // Ignore initial handshake payload from bot and wait for order ack.
        if (parsed.ok && parsed.message) return;
        if (parsed.ok === true) {
          finish();
          return;
        }
        if (parsed.ok === false) {
          finish(new Error(`Orders websocket rejected: ${parsed.error || 'unknown error'}`));
        }
      } catch {
        finish(new Error(`Orders websocket invalid ack: ${raw}`));
      }
    });

    ws.addEventListener('error', () => {
      finish(new Error(`Orders websocket connection failed (${ordersWsUrl})`));
    });

    ws.addEventListener('close', () => {
      finish(new Error('Orders websocket closed before acknowledgement'));
    });
  });
}

export async function GET() {
  const { CMS_API_URL, CMS_API_KEY } = getCmsConnection();
  if (!CMS_API_KEY) return missingCmsKeyResponse();
  if (!CMS_API_URL) {
    console.error('ORTVEST_CMS_API_URL is required when ORTVEST_CMS_API_KEY is set');
    return NextResponse.json({ error: 'Contact service not configured' }, { status: 503 });
  }

  try {
    const response = await fetch(new URL('/api/contacts', CMS_API_URL), {
      headers: { Authorization: `Bearer ${CMS_API_KEY}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Ortvest CMS contact fields API returned ${response.status}`);
      return NextResponse.json({ error: 'Could not load contact form configuration' }, { status: 502 });
    }

    const result = await response.json() as { fields?: unknown };
    const fields = Array.isArray(result.fields) && result.fields.every(isContactFormField) ? result.fields : null;
    if (!fields) {
      console.error('Ortvest CMS contact fields API returned an invalid schema');
      return NextResponse.json({ error: 'Invalid contact form configuration' }, { status: 502 });
    }

    return NextResponse.json({ fields }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('Ortvest CMS contact fields request failed:', error);
    return NextResponse.json({ error: 'Could not load contact form configuration' }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const { CMS_API_URL, CMS_API_KEY } = getCmsConnection();
  try {
    const body: unknown = await request.json();
    const dynamicFields = isRecord(body) && isRecord(body.fields) ? body.fields : null;
    if (dynamicFields && !CMS_API_KEY) {
      return missingCmsKeyResponse();
    }

    let payload: NormalizedContactBody;
    if (dynamicFields) {
      payload = normalizeDynamicFields(dynamicFields);
      if (isRecord(body) && typeof body.source === 'string') payload.source = body.source.trim().slice(0, 100) || 'website';
    } else {
      if (!validate(body)) {
        return NextResponse.json(
          { error: 'Invalid body: required fields or contact option keys are invalid' },
          { status: 400 }
        );
      }
      payload = {
        clientName: body.clientName.trim(),
        clientEmail: body.clientEmail.trim(),
        productDescription: typeof body.productDescription === 'string' ? body.productDescription.trim() : '',
        selectedServices: body.selectedServices,
        budget: body.budget || '',
        consultationType: body.consultationType || '',
        source: typeof body.source === 'string' ? body.source : undefined,
        partnerStage: typeof body.partnerStage === 'string' ? body.partnerStage : undefined,
        partnerFunding: typeof body.partnerFunding === 'string' ? body.partnerFunding : undefined,
        partnerModel: typeof body.partnerModel === 'string' ? body.partnerModel : undefined,
        businessIndustry: typeof body.businessIndustry === 'string' ? body.businessIndustry : undefined,
        businessNeed: typeof body.businessNeed === 'string' ? body.businessNeed : undefined,
      };
    }
    const createdAt = new Date().toISOString();

    // The organization API key stays on the website server. Never expose it to
    // the browser; the public form only calls this route.
    if (CMS_API_KEY) {
      if (!CMS_API_URL) {
        console.error('ORTVEST_CMS_API_URL is required when ORTVEST_CMS_API_KEY is set');
        return NextResponse.json({ error: 'Contact service not configured' }, { status: 503 });
      }

      let res: Response;
      try {
        res = await fetch(new URL('/api/contacts', CMS_API_URL), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CMS_API_KEY}`,
          },
          body: JSON.stringify(dynamicFields
            ? { fields: dynamicFields, source: payload.source || 'website' }
            : {
                name: payload.clientName,
                email: payload.clientEmail,
                message: payload.productDescription,
                selectedServices: payload.selectedServices,
                budget: payload.budget,
                consultationType: payload.consultationType,
                source: payload.source,
                partnerStage: payload.partnerStage,
                partnerFunding: payload.partnerFunding,
                partnerModel: payload.partnerModel,
                businessIndustry: payload.businessIndustry,
                businessNeed: payload.businessNeed,
              }),
          cache: 'no-store',
          signal: AbortSignal.timeout(10_000),
        });
      } catch (error) {
        console.error('Ortvest CMS contact API request failed:', error);
        return NextResponse.json({ error: 'Could not submit contact request' }, { status: 502 });
      }

      if (!res.ok) {
        console.error(`Ortvest CMS contact API returned ${res.status}`);
        return NextResponse.json({ error: 'Could not submit contact request' }, { status: 502 });
      }

      const data = await res.json();
      const wsSource = payload.source ? `ortvest-website/${payload.source}` : 'ortvest-website/api/contact';
      await publishOrderToWebSocket({
        ...payload,
        createdAt,
        source: wsSource,
        ...(dynamicFields ? { fields: dynamicFields } : {}),
        orderId: typeof data?.id === 'string' ? data.id : undefined,
      }).catch((error) => {
        console.error('Failed to publish order to websocket:', error);
      });

      return NextResponse.json(data, { status: 201 });
    }

    if (EXTERNAL_BACKEND && ACCESS_TOKEN) {
      const res = await fetch(`${EXTERNAL_BACKEND.replace(/\/$/, '')}/orders/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('External backend error');
      const data = await res.json();

      const wsSource = payload.source ? `ortvest-website/${payload.source}` : 'ortvest-website/api/contact';
      await publishOrderToWebSocket({
        ...payload,
        createdAt,
        source: wsSource,
        orderId: typeof data?.id === 'string' ? data.id : undefined,
      }).catch((error) => {
        console.error('Failed to publish order to websocket:', error);
      });

      return NextResponse.json(data);
    }

    const collection = await getCollection(COLLECTION);
    const doc: ContactDoc = {
      ...payload,
      createdAt,
    };

    const result = await collection.insertOne(doc as unknown as import('mongodb').Document);

    const wsSource = payload.source ? `ortvest-website/${payload.source}` : 'ortvest-website/api/contact';
    await publishOrderToWebSocket({
      ...payload,
      createdAt,
      source: wsSource,
      orderId: result.insertedId.toString(),
    }).catch((error) => {
      console.error('Failed to publish order to websocket:', error);
    });

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (err) {
    console.error('Contact API error:', err);
    const message = err instanceof Error ? err.message : 'Failed to save submission';
    const isConfigError = !process.env.MONGODB_URI && !EXTERNAL_BACKEND;
    return NextResponse.json(
      { error: isConfigError ? 'Contact service not configured' : message },
      { status: isConfigError ? 503 : 500 }
    );
  }
}
