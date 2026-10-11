interface TechChipsProps {
  items: readonly string[];
  label?: string;
}

export function TechChips({ items, label = 'Built with' }: TechChipsProps) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
