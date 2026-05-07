'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PinInput } from '../../components/PinInput';
import { loginWithPin } from '../../actions/auth';

export function LoginPinForm() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || pin.length !== 6) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await loginWithPin(pin);
      if (!res.ok) {
        setError(res.error + (res.remaining !== undefined ? ` (เหลือ ${res.remaining} ครั้ง)` : ''));
        setPin('');
        return;
      }
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาด ลองใหม่');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <PinInput value={pin} onChange={setPin} autoFocus />
      {error && <p className="jg-modal-error" style={{ marginTop: 16 }}>{error}</p>}
      <button
        type="submit"
        className="jg-btn jg-btn-primary"
        disabled={submitting || pin.length !== 6}
        style={{ width: '100%', marginTop: 20 }}
      >
        {submitting ? 'กำลังตรวจสอบ…' : 'เข้าสู่ระบบ'}
      </button>
      <p className="jg-modal-fineprint">
        ลืม PIN? <a href="#" style={{ color: 'var(--jg-gold)' }}>ปรึกษาแจนผ่าน LINE</a> เพื่อรีเซ็ต
      </p>
    </form>
  );
}
