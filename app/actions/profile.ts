'use server';

import { supabaseAdmin } from '../lib/supabase';
import { isValidBirthday } from '../lib/birthday';
import type { DayId, AnimalId, DesireId } from '../quiz/data';

export type CreateProfileInput = {
  name: string;
  phone: string;
  line_id?: string;
  birthday: string;     // YYYY-MM-DD
  day: DayId;
  animal: AnimalId;
  desire: DesireId;
};

export type CreateProfileResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createProfile(input: CreateProfileInput): Promise<CreateProfileResult> {
  const name = input.name?.trim();
  if (!name) return { ok: false, error: 'กรุณากรอกชื่อ' };
  if (!/^0\d{9}$/.test(input.phone)) return { ok: false, error: 'เบอร์โทรต้อง 10 หลัก ขึ้นต้นด้วย 0' };
  if (!isValidBirthday(input.birthday)) return { ok: false, error: 'วันเกิดไม่ถูกต้อง' };

  const lineId = input.line_id?.trim() || null;

  const supabase = supabaseAdmin();
  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        phone: input.phone,
        name,
        line_id: lineId,
        birthday: input.birthday,
        day: input.day,
        animal: input.animal,
        desire: input.desire,
      },
      { onConflict: 'phone' },
    );

  if (error) {
    console.error('[createProfile] supabase error:', error);
    return { ok: false, error: 'บันทึกไม่สำเร็จ ลองอีกครั้ง' };
  }

  return { ok: true };
}
