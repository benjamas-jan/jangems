import 'server-only';

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'jg_session';
const PHONE_COOKIE = 'jg_login_phone';
const SESSION_TTL = 60 * 60 * 24 * 30; // 30 days
const PHONE_TTL = 60 * 5;              // 5 min

let secretKey: Uint8Array | null = null;
function key(): Uint8Array {
  if (secretKey) return secretKey;
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('Missing AUTH_SECRET');
  secretKey = new TextEncoder().encode(s);
  return secretKey;
}

// ── PIN hashing ──────────────────────────────────────────

const PIN_RE = /^\d{6}$/;

export function isValidPin(pin: string): boolean {
  return PIN_RE.test(pin);
}

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

export async function verifyPinHash(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

// ── Session cookie (long-lived) ─────────────────────────

export type Session = { phone: string; name: string };

export async function signSession(payload: Session): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL}s`)
    .sign(key());
}

export async function verifySessionToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, key());
    if (typeof payload.phone !== 'string' || typeof payload.name !== 'string') return null;
    return { phone: payload.phone, name: payload.name };
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: Session): Promise<void> {
  const token = await signSession(payload);
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const c = await cookies();
  const tok = c.get(SESSION_COOKIE)?.value;
  if (!tok) return null;
  return verifySessionToken(tok);
}

// ── Login phone cookie (short-lived, for the /login → PIN flow) ──

export async function setLoginPhoneCookie(phone: string): Promise<void> {
  const token = await new SignJWT({ phone })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${PHONE_TTL}s`)
    .sign(key());
  const c = await cookies();
  c.set(PHONE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: PHONE_TTL,
  });
}

export async function clearLoginPhoneCookie(): Promise<void> {
  const c = await cookies();
  c.delete(PHONE_COOKIE);
}

export async function getLoginPhone(): Promise<string | null> {
  const c = await cookies();
  const tok = c.get(PHONE_COOKIE)?.value;
  if (!tok) return null;
  try {
    const { payload } = await jwtVerify(tok, key());
    if (typeof payload.phone !== 'string') return null;
    return payload.phone;
  } catch {
    return null;
  }
}
