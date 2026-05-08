import { Gem } from '../quiz/Gem';
import { navaratna } from '../data/navaratna';

type Props = {
  /** Optional: highlight gem matching this hex (e.g. user's day color). */
  highlightHex?: string;
};

export function NavaratnaGrid({ highlightHex }: Props) {
  return (
    <div className="jg-navaratna-grid">
      {navaratna.map((g) => {
        const highlighted = highlightHex && g.hex.toLowerCase() === highlightHex.toLowerCase();
        return (
          <div key={g.id} className={`jg-navaratna-card ${highlighted ? 'highlight' : ''}`}>
            <div className="jg-navaratna-gem">
              <Gem color={g.hex} cut={g.cut} size={64} />
            </div>
            <div className="jg-navaratna-name">{g.th}</div>
            <div className="jg-navaratna-meta">{g.planet}</div>
            <div className="jg-navaratna-domain">{g.domain}</div>
          </div>
        );
      })}
    </div>
  );
}
