import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { days, desires, type DayId, type DesireId } from '@/app/quiz/data';

export const runtime = 'edge';

const DAY_PLANET_EN: Record<DayId, string> = {
  sun: 'Sun',
  mon: 'Moon',
  tue: 'Mars',
  wed: 'Mercury',
  thu: 'Jupiter',
  fri: 'Venus',
  sat: 'Saturn',
};

const DAY_GEM_EN: Record<DayId, string> = {
  sun: 'Ruby',
  mon: 'Yellow Sapphire',
  tue: 'Pink Spinel',
  wed: 'Emerald',
  thu: 'Fire Opal',
  fri: 'Blue Sapphire',
  sat: 'Amethyst',
};

const DESIRE_GEM_EN: Record<DesireId, string> = {
  work: 'Ruby',
  love: 'Yellow Sapphire',
  wealth: 'Blue Sapphire',
  protect: 'Emerald',
};

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

  const planetEn = DAY_PLANET_EN[day.id];
  const dayGemEn = DAY_GEM_EN[day.id];
  const desireGemEn = DESIRE_GEM_EN[desire.id];
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
          position: 'relative',
        }}
      >
        {/* radial mist accents */}
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
              fontSize: 90,
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
              marginTop: 24,
            }}
          />
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 26,
              color: '#A89B7E',
              letterSpacing: 14,
              textTransform: 'uppercase',
            }}
          >
            Your reading
          </div>
        </div>

        {/* CENTRE — gem + main label */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* gem (radial-gradient circle styled as faceted) */}
          <div
            style={{
              display: 'flex',
              width: 500,
              height: 500,
              borderRadius: 9999,
              background: `radial-gradient(circle at 32% 32%, ${light}, ${day.hex} 50%, ${dark} 100%)`,
              boxShadow: `0 0 120px ${day.hex}88, 0 0 60px ${day.hex}aa`,
              border: `2px solid ${dark}`,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* highlight blob */}
            <div
              style={{
                display: 'flex',
                width: 120,
                height: 60,
                borderRadius: 9999,
                background: 'rgba(255,255,255,0.45)',
                marginTop: -180,
                marginLeft: -120,
                filter: 'blur(8px)',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 70,
              fontSize: 110,
              fontStyle: 'italic',
              color: '#D4A24C',
              lineHeight: 1,
            }}
          >
            {dayGemEn}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 36,
              color: '#F2EAD6',
              letterSpacing: 4,
            }}
          >
            Born of {planetEn}
          </div>
        </div>

        {/* BOTTOM — secondary gem + url */}
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
              fontSize: 26,
              color: '#A89B7E',
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            Power gem · {desireGemEn}
          </div>
          <div
            style={{
              display: 'flex',
              width: 100,
              height: 1,
              background: '#8B6B2E',
              marginTop: 28,
              marginBottom: 28,
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
    { width: 1080, height: 1920 },
  );
}
