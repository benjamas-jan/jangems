'use client';

import { useMemo } from 'react';
import { THAI_MONTHS_FULL, daysInMonth, toBE } from '../lib/birthday';

type Props = {
  /** ISO date string YYYY-MM-DD (Gregorian). Empty string when unset. */
  value: string;
  onChange: (value: string) => void;
};

const CURRENT_YEAR = new Date().getUTCFullYear();
const MIN_YEAR = 1900;

/**
 * Thai-style three-dropdown date picker (วัน / เดือน / ปี พ.ศ.).
 * Stores the value as a Gregorian ISO string (YYYY-MM-DD) so the
 * existing date helpers and DB column stay unchanged.
 */
export function ThaiDatePicker({ value, onChange }: Props) {
  const [yStr, mStr, dStr] = value ? value.split('-') : ['', '', ''];
  const y = yStr ? parseInt(yStr, 10) : 0;
  const m = mStr ? parseInt(mStr, 10) : 0;
  const d = dStr ? parseInt(dStr, 10) : 0;

  const yearOptions = useMemo(() => {
    const out: number[] = [];
    for (let yr = CURRENT_YEAR; yr >= MIN_YEAR; yr--) out.push(yr);
    return out;
  }, []);

  const dayCount = m && y ? daysInMonth(y, m) : 31;

  const update = (newY: number, newM: number, newD: number) => {
    if (!newY || !newM || !newD) {
      onChange('');
      return;
    }
    // clamp day to month length
    const max = daysInMonth(newY, newM);
    const safeD = Math.min(newD, max);
    const iso = `${newY}-${String(newM).padStart(2, '0')}-${String(safeD).padStart(2, '0')}`;
    onChange(iso);
  };

  return (
    <div className="jg-thai-date">
      <select
        aria-label="วัน"
        value={d || ''}
        onChange={(e) => update(y, m, parseInt(e.target.value, 10) || 0)}
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
        value={m || ''}
        onChange={(e) => update(y, parseInt(e.target.value, 10) || 0, d)}
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
        value={y || ''}
        onChange={(e) => update(parseInt(e.target.value, 10) || 0, m, d)}
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
