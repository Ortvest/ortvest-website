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
      return NextResponse.json(data);
    }

    const collection = await getCollection(COLLECTION);
    const doc: ContactDoc = {
      ...payload,
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(doc as unknown as import('mongodb').Document);

    return NextResponse.json({
      ok: true,
      id: result.insertedId.toString(),
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }
}
