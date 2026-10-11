export interface TextSegment {
  text: string;
  emphasized: boolean;
}

/** Splits `text` into segments, flagging each occurrence of any phrase in `phrases`. */
export function splitByPhrases(text: string, phrases: readonly string[]): TextSegment[] {
  const present = phrases.filter((p) => p && text.includes(p));
  if (present.length === 0) return [{ text, emphasized: false }];

  const escaped = present
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');

  return text
    .split(pattern)
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, emphasized: present.includes(part) }));
}
