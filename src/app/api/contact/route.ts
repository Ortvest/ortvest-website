import { NextRequest, NextResponse } from 'next/server';

import { getCollection } from '@lib/mongodb';

const COLLECTION = 'contact_submissions';
const EXTERNAL_BACKEND = process.env.BACKEND_APP || process.env.NEXT_PUBLIC_BACKEND_APP;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export interface ContactBody {
  clientName: string;
  clientEmail: string;
  productDescription: string;
  selectedServices: string[];
}

interface ContactDoc {
  clientName: string;
  clientEmail: string;
  productDescription: string;
  selectedServices: string[];
  createdAt: string;
}

interface OrderNotificationPayload extends ContactBody {
  createdAt: string;
  source: string;
  orderId?: string;
}

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.clientName === 'string' &&
    b.clientName.trim().length > 0 &&
    typeof b.clientEmail === 'string' &&
    b.clientEmail.trim().length > 0 &&
    typeof b.productDescription === 'string' &&
    b.productDescription.trim().length > 0 &&
    Array.isArray(b.selectedServices)
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!validate(body)) {
      return NextResponse.json(
        { error: 'Invalid body: clientName, clientEmail, productDescription required' },
        { status: 400 }
      );
    }

    const payload = {
      clientName: body.clientName.trim(),
      clientEmail: body.clientEmail.trim(),
      productDescription: body.productDescription.trim(),
      selectedServices: Array.isArray(body.selectedServices) ? body.selectedServices : [],
    };
    const createdAt = new Date().toISOString();

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

      await publishOrderToWebSocket({
        ...payload,
        createdAt,
        source: 'ortvest-website/api/contact',
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

    await publishOrderToWebSocket({
      ...payload,
      createdAt,
      source: 'ortvest-website/api/contact',
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
