import { readFile } from 'fs/promises';
import path from 'path';
import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { days, desires, type DayId, type DesireId } from '@/app/quiz/data';

// 1200×630 horizontal Open Graph image, personalised by day + desire.
// Used as og:image when a /quiz?d=&a=&w= URL is shared.

function lightenHex(hex: string, amt: number): string {
  const c = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((c >> 16) & 255) + amt);
  const g = Math.min(255, ((c >> 8) & 255) + amt);
  const b = Math.min(255, (c & 255) + amt);
  return `rgb(${r},${g},${b})`;
}
function darkenHex(hex: string, amt: number): string {
  const c = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((c >> 16) & 255) - amt);
  const g = Math.max(0, ((c >> 8) & 255) - amt);
  const b = Math.max(0, (c & 255) - amt);
  return `rgb(${r},${g},${b})`;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const dayId = (params.get('day') ?? 'sun') as DayId;
  const desireId = (params.get('desire') ?? 'work') as DesireId;

  const day = days.find((d) => d.id === dayId);
  const desire = desires.find((x) => x.id === desireId);
  if (!day || !desire) {
    return new Response('Invalid params', { status: 400 });
  }

  const trirongData = await readFile(
    path.join(process.cwd(), 'app/fonts/Trirong-Medium.ttf'),
  );

  const light = lightenHex(day.hex, 80);
  const dark = darkenHex(day.hex, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #0E0A1A 0%, #1A1230 50%, #251A3E 100%)',
          color: '#F2EAD6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 60,
          fontFamily: 'Trirong',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(212,162,76,0.18), transparent)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(184,134,156,0.16), transparent)',
            display: 'flex',
          }}
        />

        {/* LEFT — gem visual */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 460,
            height: 460,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 380,
              height: 380,
              borderRadius: 9999,
              background: `radial-gradient(circle at 32% 32%, ${light}, ${day.hex} 50%, ${dark} 100%)`,
              boxShadow: `0 0 100px ${day.hex}88`,
              border: `2px solid ${dark}`,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 80,
                height: 40,
                borderRadius: 9999,
                background: 'rgba(255,255,255,0.4)',
                filter: 'blur(8px)',
              }}
            />
          </div>
        </div>

        {/* RIGHT — text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginLeft: 40,
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 50,
              fontStyle: 'italic',
              color: '#D4A24C',
              lineHeight: 1,
            }}
          >
            JanGems
          </div>
          <div
            style={{
              display: 'flex',
              width: 60,
              height: 1,
              background: '#D4A24C',
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              color: '#D4A24C',
              lineHeight: 1.05,
            }}
          >
            {day.gems[0]}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 18,
              fontSize: 30,
              color: '#F2EAD6',
            }}
          >
            ผู้เกิดวัน{day.th} · {day.porn}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 14,
              fontSize: 24,
              color: '#A89B7E',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 32,
                height: 32,
                borderRadius: 9999,
                background: `radial-gradient(circle at 32% 32%, ${lightenHex(desire.hex, 80)}, ${desire.hex} 50%, ${darkenHex(desire.hex, 60)})`,
                border: `1px solid ${darkenHex(desire.hex, 60)}`,
                boxShadow: `0 0 16px ${desire.hex}66`,
              }}
            />
            พลอยเสริม{desire.th.split(' ')[0]} · {desire.gem}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 18,
              color: '#D4A24C',
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            jangems.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Trirong',
          data: trirongData,
          style: 'normal',
          weight: 500,
        },
      ],
    },
  );
}
