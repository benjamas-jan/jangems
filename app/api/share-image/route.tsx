import { readFile } from 'fs/promises';
import path from 'path';
import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { days, desires, type DayId, type DesireId } from '@/app/quiz/data';

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
            'linear-gradient(160deg, #0E0A1A 0%, #1A1230 50%, #251A3E 100%)',
          color: '#F2EAD6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '120px 80px',
          fontFamily: 'Trirong',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -300,
            left: -300,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(212,162,76,0.15), transparent)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            right: -300,
            width: 900,
            height: 900,
            borderRadius: 9999,
            background:
              'radial-gradient(closest-side, rgba(184,134,156,0.16), transparent)',
            display: 'flex',
          }}
        />

        {/* TOP — brand */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 100,
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
              width: 160,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, #D4A24C, transparent)',
              marginTop: 22,
              marginBottom: 22,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              color: '#F2EAD6',
            }}
          >
            ผลทำนายของคุณ
          </div>
        </div>

        {/* CENTRE — gem + day reading */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 460,
              height: 460,
              borderRadius: 9999,
              background: `radial-gradient(circle at 32% 32%, ${light}, ${day.hex} 50%, ${dark} 100%)`,
              boxShadow: `0 0 120px ${day.hex}88`,
              border: `2px solid ${dark}`,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 90,
                height: 50,
                borderRadius: 9999,
                background: 'rgba(255,255,255,0.4)',
                filter: 'blur(8px)',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 56,
              fontSize: 90,
              color: '#D4A24C',
              lineHeight: 1,
            }}
          >
            {day.gems[0]}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 34,
              color: '#F2EAD6',
            }}
          >
            ผู้เกิดวัน{day.th} · {day.porn}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 12,
              fontSize: 26,
              color: '#A89B7E',
            }}
          >
            สี{day.color}
          </div>
        </div>

        {/* BOTTOM — desire gem + url */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#A89B7E',
            }}
          >
            พลอยเสริม{desire.th.split(' ')[0]} · {desire.gem}
          </div>
          <div
            style={{
              display: 'flex',
              width: 100,
              height: 1,
              background: '#8B6B2E',
              marginTop: 24,
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#D4A24C',
              letterSpacing: 12,
              textTransform: 'uppercase',
            }}
          >
            jangems.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
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
