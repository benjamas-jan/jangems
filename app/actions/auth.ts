'use server';

import { redirect } from 'next/navigation';
import { supabaseAdmin } from '../lib/supabase';
import {
  hashPin,
  verifyPinHash,
  isValidPin,
  setSessionCookie,
  clearSessionCookie,
  setLoginPhoneCookie,
  clearLoginPhoneCookie,
  getLoginPhone,
} from '../lib/auth';

const FAIL_THRESHOLD = 5;
const LOCK_MINUTES = 15;

export type Result<T extends object = Record<string, never>> =
  | (T extends Record<string, never> ? { ok: true } : { ok: true } & T)
  | { ok: false; error: string };

export type LoginResult =
  | { ok: true }
  | { ok: false; error: string; remaining?: number };

// ── checkPhone ────────────────────────────────────────────
// Used by /login: returns whether the phone exists, and whether a PIN is set.
// On success also sets a short-lived phone cookie so the next page can read it.

export async function checkPhone(
  phone: string,
): Promise<Result<{ status: 'no-pin' | 'has-pin' }>> {
  if (!/^0\d{9}$/.test(phone)) return { ok: false, error: 'เบอร์โทรไม่ถูกต้อง' };

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from('profiles')
    .select('phone, pin_hash')
    .eq('phone', phone)
    .maybeSingle();

  if (error) {
    console.error('[checkPhone]', error);
    return { ok: false, error: 'เกิดข้อผิดพลาด ลองใหม่' };
  }
  if (!data) return { ok: false, error: 'ไม่พบเบอร์นี้ในระบบ — ทำ quiz ก่อนเพื่อสมัคร' };

  await setLoginPhoneCookie(phone);
  return { ok: true, status: data.pin_hash ? 'has-pin' : 'no-pin' };
}

// ── setPin ────────────────────────────────────────────────
// Sets the PIN for the phone in the login-phone cookie. Only allowed when
// no PIN is currently set (prevents takeover; reset is admin-only via LINE).

export async function setPin(pin: string, confirmPin: string): Promise<Result> {
  const phone = await getLoginPhone();
  if (!phone) return { ok: false, error: 'session หมดอายุ กรุณาเริ่มใหม่' };
  if (!isValidPin(pin)) return { ok: false, error: 'PIN ต้องเป็นตัวเลข 6 หลัก' };
  if (pin !== confirmPin) return { ok: false, error: 'PIN ไม่ตรงกัน' };

  const supabase = supabaseAdmin();

  const { data: profile, error: readErr } = await supabase
    .from('profiles')
    .select('phone, name, pin_hash')
    .eq('phone', phone)
    .maybeSingle();

  if (readErr) {
    console.error('[setPin] read', readErr);
    return { ok: false, error: 'เกิดข้อผิดพลาด' };
  }
  if (!profile) return { ok: false, error: 'ไม่พบ profile' };
  if (profile.pin_hash) {
    return { ok: false, error: 'PIN ถูกตั้งไว้แล้ว — ปรึกษาแจนเพื่อรีเซ็ต' };
  }

  const hash = await hashPin(pin);
  const { error: updErr } = await supabase
    .from('profiles')
    .update({ pin_hash: hash, failed_attempts: 0, locked_until: null })
    .eq('phone', phone);

  if (updErr) {
    console.error('[setPin] update', updErr);
    return { ok: false, error: 'บันทึก PIN ไม่สำเร็จ' };
  }

  await setSessionCookie({ phone: profile.phone, name: profile.name });
  await clearLoginPhoneCookie();
  return { ok: true };
}

// ── loginWithPin ──────────────────────────────────────────
// Verifies the PIN. Tracks failed attempts; locks after 5 fails for 15 min.

export async function loginWithPin(pin: string): Promise<LoginResult> {
  const phone = await getLoginPhone();
  if (!phone) return { ok: false, error: 'session หมดอายุ กรุณาเริ่มใหม่' };
  if (!isValidPin(pin)) return { ok: false, error: 'PIN ต้องเป็นตัวเลข 6 หลัก' };

  const supabase = supabaseAdmin();
  const { data: profile, error: readErr } = await supabase
    .from('profiles')
    .select('phone, name, pin_hash, failed_attempts, locked_until')
    .eq('phone', phone)
    .maybeSingle();

  if (readErr) {
    console.error('[loginWithPin] read', readErr);
    return { ok: false, error: 'เกิดข้อผิดพลาด' };
  }
  if (!profile || !profile.pin_hash) {
    return { ok: false, error: 'ไม่พบ profile หรือยังไม่ได้ตั้ง PIN' };
  }

  // Lock check
  if (profile.locked_until && new Date(profile.locked_until) > new Date()) {
    return { ok: false, error: `PIN ผิดเกินกำหนด ลองใหม่หลัง ${LOCK_MINUTES} นาที` };
  }

  const ok = await verifyPinHash(pin, profile.pin_hash);
  if (!ok) {
    const fails = (profile.failed_attempts ?? 0) + 1;
    const locked = fails >= FAIL_THRESHOLD;
    await supabase
      .from('profiles')
      .update({
        failed_attempts: locked ? 0 : fails,
        locked_until: locked ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString() : null,
      })
      .eq('phone', phone);

    if (locked) {
      return { ok: false, error: `PIN ผิด ${FAIL_THRESHOLD} ครั้ง — ระงับชั่วคราว ${LOCK_MINUTES} นาที` };
    }
    return { ok: false, error: 'PIN ไม่ถูกต้อง', remaining: FAIL_THRESHOLD - fails };
  }

  // success
  await supabase
    .from('profiles')
    .update({ failed_attempts: 0, locked_until: null })
    .eq('phone', phone);

  await setSessionCookie({ phone: profile.phone, name: profile.name });
  await clearLoginPhoneCookie();
  return { ok: true };
}

// ── logout ────────────────────────────────────────────────

export async function logout(): Promise<never> {
  await clearSessionCookie();
  redirect('/');
}
