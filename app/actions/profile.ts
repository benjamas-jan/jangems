'use server';

import { supabaseAdmin } from '../lib/supabase';
import type { DayId, AnimalId, DesireId } from '../quiz/data';

export type CreateProfileInput = {
  name: string;
  phone: string;
  line_id?: string;
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
  if (!/^0\d{9}$/.test(input.phone)) return { ok: false, error: 'เบอร์โทรไม่ถูกต้อง (ต้อง 10 หลัก ขึ้นต้นด้วย 0)' };

  const lineId = input.line_id?.trim() || null;

  const supabase = supabaseAdmin();
  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        phone: input.phone,
        name,
        line_id: lineId,
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
