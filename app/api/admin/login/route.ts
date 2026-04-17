import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSessionValue, getCookieName, isValidPassword } from '@/lib/auth';

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!isValidPassword(body.password || '')) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  cookies().set(getCookieName(), createSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  return NextResponse.json({ ok: true });
}