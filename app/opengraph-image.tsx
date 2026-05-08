import { ImageResponse } from 'next/og';

// Routed automatically by Next.js to /opengraph-image at runtime.
// Uses Satori under the hood; only English text + simple layout
// since Thai requires bundling a Thai font.

export const alt = 'JanGems — Mystic gems from Chanthaburi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #0E0A1A 0%, #1A1230 50%, #251A3E 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F2EAD6',
          padding: 80,
        }}
      >
        {/* radial mist accents */}
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

        {/* gold horizontal accent line */}
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #D4A24C, transparent)',
            marginBottom: 40,
          }}
        />


        <div
          style={{
            display: 'flex',
            fontSize: 200,
            fontStyle: 'italic',
            color: '#D4A24C',
            lineHeight: 1,
            marginBottom: 28,
          }}
        >
          JanGems
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 42,
            color: '#F2EAD6',
            marginBottom: 50,
          }}
        >
          Mystic gems · Chanthaburi craft
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#A89B7E',
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          jangems.com
        </div>
      </div>
    ),
    { ...size },
  );
}
