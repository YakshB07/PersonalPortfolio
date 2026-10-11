interface LogoProps {
  className?: string;
}

/** "YB" monogram. Same drawing as public/favicon.svg; keep the two in sync. */
export function Logo({ className = '' }: LogoProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="1.5" y="1.5" width="29" height="29" className="fill-paper stroke-ink" strokeWidth="2" />
      <path
        d="M6 8.5l4.5 7.5 4.5-7.5M10.5 16v7.5"
        fill="none"
        className="stroke-ink"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <path
        d="M18.5 8.5v15h4.25a3.75 3.75 0 0 0 0-7.5H18.5h3.25a3.75 3.75 0 0 0 0-7.5z"
        fill="none"
        className="stroke-accent transition-colors group-hover:stroke-accent-ink"
        strokeWidth="2.4"
      />
    </svg>
  );
}
