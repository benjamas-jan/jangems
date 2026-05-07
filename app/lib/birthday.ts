// Helpers to derive astrological data from a birthday (YYYY-MM-DD).

import { zodiacSigns, type ZodiacSign } from '../data/zodiac';
import type { DayId } from '../quiz/data';

const DAY_IDS: DayId[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

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
