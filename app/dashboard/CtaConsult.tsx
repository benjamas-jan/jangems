import { LINE_OA_URL } from '../lib/config';

type Props = { label: string };

export function CtaConsult({ label }: Props) {
  return (
    <a href={LINE_OA_URL} target="_blank" rel="noopener noreferrer" className="jg-cta-consult">
      <span className="jg-cta-consult-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.5 3 2 6.5 2 10.9c0 3.9 3.6 7.2 8.5 7.8.3.1.8.2.9.5.1.3.1.7.1.9 0 .2-.2 1-.2 1.2-.1.4-.3 1.4 1.2.8 1.5-.6 8-4.7 10.9-8 2-2.3 2.6-4.6 2.6-7.2C26 6.5 17.5 3 12 3z" />
        </svg>
      </span>
      <span className="jg-cta-consult-main">
        <span className="jg-cta-consult-eyebrow">Made-to-order</span>
        <span className="jg-cta-consult-label">{label}</span>
      </span>
      <span className="jg-cta-consult-arrow" aria-hidden="true">→</span>
    </a>
  );
}
