import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getCookieName } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  cookies().delete(getCookieName());
  return NextResponse.json({ ok: true });
}