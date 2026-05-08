'use client';

import { useState } from 'react';
import { THAI_MONTHS_FULL, daysInMonth, toBE } from '../lib/birthday';

type Props = {
  /** ISO date string YYYY-MM-DD (Gregorian). Empty string when unset. */
  value: string;
  onChange: (value: string) => void;
};

const CURRENT_YEAR = new Date().getUTCFullYear();
const MIN_YEAR = 1900;

function parseISO(s: string): { y: number; m: number; d: number } {
  if (s && /^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, d] = s.split('-').map(Number);
    return { y, m, d };
  }
  return { y: 0, m: 0, d: 0 };
}

/**
 * Thai-style three-dropdown date picker (วัน / เดือน / ปี พ.ศ.).
 * Holds partial picks in local state so the dropdowns don't reset
 * before all three are chosen. Emits the parent only with a full
 * Gregorian ISO string (or '' when incomplete).
 */
export function ThaiDatePicker({ value, onChange }: Props) {
  const [picks, setPicks] = useState(() => parseISO(value));

  const dayCount = picks.y && picks.m ? daysInMonth(picks.y, picks.m) : 31;

  const update = (next: Partial<typeof picks>) => {
    const merged = { ...picks, ...next };
    // clamp day if it exceeds new month's length
    if (merged.y && merged.m) {
      const max = daysInMonth(merged.y, merged.m);
      if (merged.d > max) merged.d = max;
    }
    setPicks(merged);
    if (merged.y && merged.m && merged.d) {
      const iso = `${merged.y}-${String(merged.m).padStart(2, '0')}-${String(merged.d).padStart(2, '0')}`;
      onChange(iso);
    } else {
      onChange('');
    }
  };

  const yearOptions: number[] = [];
  for (let yr = CURRENT_YEAR; yr >= MIN_YEAR; yr--) yearOptions.push(yr);

  return (
    <div className="jg-thai-date">
      <select
        aria-label="วัน"
        value={picks.d || ''}
        onChange={(e) => update({ d: parseInt(e.target.value, 10) || 0 })}
      >
        <option value="">วัน</option>
        {Array.from({ length: dayCount }, (_, i) => i + 1).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <select
        aria-label="เดือน"
        value={picks.m || ''}
        onChange={(e) => update({ m: parseInt(e.target.value, 10) || 0 })}
      >
        <option value="">เดือน</option>
        {THAI_MONTHS_FULL.map((name, i) => (
          <option key={name} value={i + 1}>
            {name}
          </option>
        ))}
      </select>

      <select
        aria-label="ปี พ.ศ."
        value={picks.y || ''}
        onChange={(e) => update({ y: parseInt(e.target.value, 10) || 0 })}
      >
        <option value="">ปี พ.ศ.</option>
        {yearOptions.map((yr) => (
          <option key={yr} value={yr}>
            {toBE(yr)}
          </option>
        ))}
      </select>
    </div>
  );
}
