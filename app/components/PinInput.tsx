'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
};

const LEN = 6;

/**
 * 6-digit PIN input rendered as 6 individual single-digit boxes.
 * Auto-focuses next box on input, supports paste, supports backspace nav.
 */
export function PinInput({ value, onChange, autoFocus = false }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [focused, setFocused] = useState<number | null>(autoFocus ? 0 : null);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const digits = (value + '      ').slice(0, LEN).split('').map((c) => (/\d/.test(c) ? c : ''));

  const setAt = (i: number, ch: string) => {
    if (ch && !/^\d$/.test(ch)) return;
    const arr = digits.slice();
    arr[i] = ch;
    onChange(arr.join('').replace(/\s/g, ''));
  };

  const handleInput = (i: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, '');
    if (cleaned.length > 1) {
      // paste / autofill
      const arr = digits.slice();
      for (let k = 0; k < cleaned.length && i + k < LEN; k++) arr[i + k] = cleaned[k];
      onChange(arr.join('').replace(/\s/g, ''));
      const target = Math.min(i + cleaned.length, LEN - 1);
      refs.current[target]?.focus();
      return;
    }
    setAt(i, cleaned);
    if (cleaned && i < LEN - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < LEN - 1) {
      refs.current[i + 1]?.focus();
    }
  };

  return (
    <div className="jg-pin">
      {Array.from({ length: LEN }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digits[i]}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onFocus={() => setFocused(i)}
          onBlur={() => setFocused(null)}
          className={`jg-pin-cell ${focused === i ? 'focused' : ''} ${digits[i] ? 'filled' : ''}`}
          aria-label={`PIN หลักที่ ${i + 1}`}
        />
      ))}
    </div>
  );
}
