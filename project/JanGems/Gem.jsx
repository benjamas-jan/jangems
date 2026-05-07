// Gem SVG renderer — stylized faceted gems by cut + color
const { useMemo } = React;

// Cuts: cushion, oval, marquise, round (selected by gem hex / day)
function gemCutForDay(dayId) {
  return {
    sun: 'cushion',  mon: 'round',   tue: 'oval',
    wed: 'marquise', thu: 'cushion', fri: 'oval',
    sat: 'round'
  }[dayId] || 'cushion';
}

function lighten(hex, amt) {
  const c = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((c >> 16) & 255) + amt);
  const g = Math.min(255, ((c >> 8) & 255) + amt);
  const b = Math.min(255, (c & 255) + amt);
  return `rgb(${r},${g},${b})`;
}
function darken(hex, amt) {
  const c = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((c >> 16) & 255) - amt);
  const g = Math.max(0, ((c >> 8) & 255) - amt);
  const b = Math.max(0, (c & 255) - amt);
  return `rgb(${r},${g},${b})`;
}

function Gem({ color = '#E8A1B8', cut = 'cushion', size = 220 }) {
  const id = useMemo(() => 'g' + Math.random().toString(36).slice(2, 8), []);
  const light = lighten(color, 80);
  const mid = color;
  const dark = darken(color, 40);
  const deeper = darken(color, 80);

  // Build paths per cut
  let body = null;
  if (cut === 'cushion') {
    body = (
      <g>
        {/* Outer cushion shape */}
        <path d="M30 80 Q30 30 80 30 L140 30 Q190 30 190 80 L190 140 Q190 190 140 190 L80 190 Q30 190 30 140 Z"
              fill={`url(#${id}-bg)`} stroke={dark} strokeWidth="1" />
        {/* Table (top facet) */}
        <path d="M70 70 L150 70 L150 150 L70 150 Z" fill={`url(#${id}-table)`} opacity="0.9" />
        {/* Crown facets */}
        <path d="M30 80 L70 70 L70 150 L30 140 Z" fill={mid} opacity="0.6" />
        <path d="M190 80 L150 70 L150 150 L190 140 Z" fill={deeper} opacity="0.7" />
        <path d="M30 80 Q30 30 80 30 L140 30 Q190 30 190 80 L150 70 L70 70 Z" fill={light} opacity="0.5" />
        <path d="M30 140 Q30 190 80 190 L140 190 Q190 190 190 140 L150 150 L70 150 Z" fill={deeper} opacity="0.55" />
        {/* Highlight */}
        <ellipse cx="90" cy="85" rx="20" ry="8" fill="white" opacity="0.45" />
        <path d="M75 78 L100 70 L80 75 Z" fill="white" opacity="0.6" />
      </g>
    );
  } else if (cut === 'oval') {
    body = (
      <g>
        <ellipse cx="110" cy="110" rx="80" ry="95" fill={`url(#${id}-bg)`} stroke={dark} strokeWidth="1" />
        <ellipse cx="110" cy="110" rx="50" ry="65" fill={`url(#${id}-table)`} opacity="0.85" />
        <path d="M30 110 L60 60 L60 160 Z" fill={mid} opacity="0.55" />
        <path d="M190 110 L160 60 L160 160 Z" fill={deeper} opacity="0.65" />
        <path d="M110 15 L60 60 L160 60 Z" fill={light} opacity="0.6" />
        <path d="M110 205 L60 160 L160 160 Z" fill={deeper} opacity="0.6" />
        <ellipse cx="95" cy="80" rx="15" ry="22" fill="white" opacity="0.35" transform="rotate(-15 95 80)" />
      </g>
    );
  } else if (cut === 'marquise') {
    body = (
      <g>
        <path d="M110 15 Q190 110 110 205 Q30 110 110 15 Z"
              fill={`url(#${id}-bg)`} stroke={dark} strokeWidth="1" />
        <path d="M110 50 Q160 110 110 170 Q60 110 110 50 Z" fill={`url(#${id}-table)`} opacity="0.9" />
        <path d="M110 15 L110 50 Q60 110 30 110 Z" fill={mid} opacity="0.55" />
        <path d="M110 15 L110 50 Q160 110 190 110 Z" fill={light} opacity="0.55" />
        <path d="M110 205 L110 170 Q60 110 30 110 Z" fill={deeper} opacity="0.65" />
        <path d="M110 205 L110 170 Q160 110 190 110 Z" fill={deeper} opacity="0.55" />
        <ellipse cx="95" cy="85" rx="10" ry="20" fill="white" opacity="0.4" transform="rotate(-20 95 85)" />
      </g>
    );
  } else if (cut === 'round') {
    body = (
      <g>
        <circle cx="110" cy="110" r="90" fill={`url(#${id}-bg)`} stroke={dark} strokeWidth="1" />
        <circle cx="110" cy="110" r="55" fill={`url(#${id}-table)`} opacity="0.85" />
        {/* Brilliant cut facets — 8 segments */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <path
            key={i}
            d="M110 110 L110 20 L160 35 Z"
            fill={i % 2 ? deeper : mid}
            opacity={0.4 + (i % 3) * 0.15}
            transform={`rotate(${deg} 110 110)`}
          />
        ))}
        <ellipse cx="95" cy="85" rx="14" ry="18" fill="white" opacity="0.45" transform="rotate(-25 95 85)" />
        <circle cx="80" cy="75" r="4" fill="white" opacity="0.7" />
      </g>
    );
  }

  return (
    <div className="jg-gem-wrap" style={{ width: size, height: size, '--gem-glow': `${color}88` }}>
      <div className="jg-gem-glow"></div>
      <svg className="jg-gem-svg" viewBox="0 0 220 220" width={size} height={size}>
        <defs>
          <radialGradient id={`${id}-bg`} cx="40%" cy="35%">
            <stop offset="0%" stopColor={light} />
            <stop offset="50%" stopColor={mid} />
            <stop offset="100%" stopColor={deeper} />
          </radialGradient>
          <linearGradient id={`${id}-table`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={light} stopOpacity="0.9" />
            <stop offset="100%" stopColor={mid} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {body}
        {/* Sparkle dots */}
        <circle cx="155" cy="65" r="1.5" fill="white" opacity="0.9" />
        <circle cx="170" cy="120" r="1" fill="white" opacity="0.7" />
        <circle cx="65" cy="160" r="1.2" fill="white" opacity="0.8" />
      </svg>
    </div>
  );
}

window.JG_Gem = Gem;
window.JG_gemCutForDay = gemCutForDay;
