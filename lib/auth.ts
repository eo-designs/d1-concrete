import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'd1-admin-session';

function getSecret() {
  return process.env.AUTH_SECRET || 'local-dev-auth-secret-change-me';
}

export function getCookieName() {
  return COOKIE_NAME;
}

export function isValidPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || 'change-me';
  return password.length > 0 && password === expected;
}

export function createSessionValue() {
  const payload = JSON.stringify({ role: 'admin', ts: Date.now() });
  const signature = createHmac('sha256', getSecret()).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifySessionValue(value?: string | null) {
  if (!value) {
    return false;
  }

  const [encodedPayload, providedSignature] = value.split('.');

  if (!encodedPayload || !providedSignature) {
    return false;
  }

  const expectedSignature = createHmac('sha256', getSecret()).update(Buffer.from(encodedPayload, 'base64url').toString('utf8')).digest('hex');

  const provided = Buffer.from(providedSignature, 'utf8');
  const expected = Buffer.from(expectedSignature, 'utf8');

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}