import { splitByPhrases } from '../../lib/emphasize';

interface EmphasizedProps {
  text: string;
  phrases: readonly string[];
}

/** Renders text with the given metric phrases pulled out in bold accent. */
export function Emphasized({ text, phrases }: EmphasizedProps) {
  return (
    <>
      {splitByPhrases(text, phrases).map((seg, i) =>
        seg.emphasized ? (
          <strong key={i} className="font-semibold text-accent-ink">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}
