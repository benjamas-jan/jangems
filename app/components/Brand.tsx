import Link from 'next/link';

export function Brand({ asLink = false }: { asLink?: boolean }) {
  const inner = (
    <span className="jg-brand">
      <svg className="jg-brand-mark" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.4">
        <path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5z" fill="#D4A24C" fillOpacity="0.15" />
      </svg>
      <span className="jg-brand-name">
        <b>Jan</b>Gems
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label="JanGems home" style={{ textDecoration: 'none' }}>
      {inner}
    </Link>
  );
}
