// Helpers to derive astrological data from a birthday (YYYY-MM-DD)
// and to display dates in Thai Buddhist Era format.

import { zodiacSigns, type ZodiacSign } from '../data/zodiac';
import type { DayId } from '../quiz/data';

const DAY_IDS: DayId[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

// ── Thai Buddhist Era display ────────────────────────────

export const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
];

export const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
];

/** Convert Gregorian year to Buddhist Era year. */
export const toBE = (gregorianYear: number): number => gregorianYear + 543;

/** Convert Buddhist Era year to Gregorian year. */
export const fromBE = (buddhistYear: number): number => buddhistYear - 543;

/** Number of days in a given Gregorian month (1-12). */
export function daysInMonth(year: number, month: number): number {
  // new Date(Y, M, 0) → last day of month M (1-12 here, but JS Date uses 0-11
  // so passing month=5 gives May's day 0 = end of April. We want end of given
  // month, so pass month directly: new Date(Y, monthIndex+1, 0) → end of monthIndex.
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** "2026-05-07" → "7 พฤษภาคม 2569" */
export function displayThaiDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${THAI_MONTHS_FULL[m - 1]} ${toBE(y)}`;
}

/** "2026-05-07" → "7 พ.ค. 2569" */
export function displayThaiDateShort(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${THAI_MONTHS_SHORT[m - 1]} ${toBE(y)}`;
}

/** Day-of-week from a YYYY-MM-DD string. */
export function dayOfWeek(birthday: string): DayId {
  // Construct in UTC to avoid timezone shifts changing the date
  const d = new Date(birthday + 'T00:00:00Z');
  return DAY_IDS[d.getUTCDay()];
}

/** Tropical zodiac sign from a YYYY-MM-DD string. */
export function zodiacFor(birthday: string): ZodiacSign {
  const d = new Date(birthday + 'T00:00:00Z');
  const month = d.getUTCMonth() + 1; // 1-12
  const day = d.getUTCDate();         // 1-31

  for (const sign of zodiacSigns) {
    if (sign.startMonth === sign.endMonth) {
      // single-month sign (none in current data, but defensive)
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
    } else if (sign.startMonth < sign.endMonth) {
      // signs that don't cross year boundary (most)
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay) ||
        (month > sign.startMonth && month < sign.endMonth)
      ) {
        return sign;
      }
    } else {
      // wraps over year boundary (Capricorn: Dec 22 - Jan 19)
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }
  // Fallback (shouldn't hit if data covers all 365/366 days)
  return zodiacSigns[0];
}

/** Validate YYYY-MM-DD: real date, between 1900-01-01 and today. */
export function isValidBirthday(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) return false;
  // round-trip check (rejects e.g. 2024-02-31)
  if (d.toISOString().slice(0, 10) !== value) return false;
  const min = new Date('1900-01-01T00:00:00Z');
  const max = new Date(Date.now());
  return d >= min && d <= max;
}
