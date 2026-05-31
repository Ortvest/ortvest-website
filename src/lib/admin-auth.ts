import { NextRequest } from 'next/server';

export function isAdminAuthorized(request: NextRequest | Request): boolean {
  const token = process.env.ACCESS_TOKEN;
  if (!token) return false;

  const auth = request.headers.get('authorization');
  return auth === `Bearer ${token}`;
}
