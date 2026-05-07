'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PinInput } from '../../components/PinInput';
import { setPin } from '../../actions/auth';

export function SetPinForm() {
  const router = useRouter();
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = pin1.length === 6 && pin2.length === 6;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !ready) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await setPin(pin1, pin2);
      if (!res.ok) {
        setError(res.error);
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
      <div className="jg-field">
        <label>PIN 6 หลัก</label>
        <PinInput value={pin1} onChange={setPin1} autoFocus />
      </div>
      <div className="jg-field">
        <label>ยืนยัน PIN อีกครั้ง</label>
        <PinInput value={pin2} onChange={setPin2} />
      </div>
      {error && <p className="jg-modal-error">{error}</p>}
      <button
        type="submit"
        className="jg-btn jg-btn-primary"
        disabled={submitting || !ready}
        style={{ width: '100%', marginTop: 8 }}
      >
        {submitting ? 'กำลังบันทึก…' : 'บันทึก PIN + เข้าสู่ระบบ'}
      </button>
      <p className="jg-modal-fineprint">
        ระวัง: PIN ตั้งได้ครั้งเดียว — ลืมต้องปรึกษาแจนเพื่อรีเซ็ต
      </p>
    </form>
  );
}
