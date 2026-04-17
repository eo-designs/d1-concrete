import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getCookieName, verifySessionValue } from '@/lib/auth';

export async function GET() {
  const value = cookies().get(getCookieName())?.value;
  return NextResponse.json({ authenticated: verifySessionValue(value) });
}