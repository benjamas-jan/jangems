'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkPhone } from '../actions/auth';

export function LoginPhoneForm() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!/^0\d{9}$/.test(phone)) {
      setError('เบอร์โทรต้อง 10 หลัก ขึ้นต้นด้วย 0');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await checkPhone(phone);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push(res.status === 'has-pin' ? '/login/pin' : '/login/set-pin');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด ลองใหม่');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="jg-field">
        <label>เบอร์โทร</label>
        <input
          type="tel"
          maxLength={10}
          placeholder="08x xxx xxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          autoFocus
        />
      </div>
      {error && <p className="jg-modal-error">{error}</p>}
      <button type="submit" className="jg-btn jg-btn-primary" disabled={submitting} style={{ width: '100%' }}>
        {submitting ? 'กำลังตรวจสอบ…' : 'ถัดไป'}
      </button>
      <p className="jg-modal-fineprint">
        ยังไม่ได้สมัคร? <a href="/quiz" style={{ color: 'var(--jg-gold)' }}>ทำ quiz เพื่อสมัครฟรี</a>
      </p>
    </form>
  );
}
