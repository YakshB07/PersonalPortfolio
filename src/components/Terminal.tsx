import { useEffect, useRef, useState, type FormEvent } from 'react';
import { RESUME_PDF } from '../data/resume';
import { runCommand } from '../lib/terminal';

interface Line {
  id: number;
  text: string;
  isInput: boolean;
}

const PROMPT = 'yaksh@portfolio:~$';
const GREETING = ['type "help" for commands. ` or Esc to close.'];

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

function downloadResume() {
  const a = document.createElement('a');
  a.href = RESUME_PDF;
  a.download = 'Yaksh_Butani_Resume.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Backtick-toggled fake terminal. An easter egg, so it never blocks normal use. */
export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(() => GREETING.map((text, id) => ({ id, text, isInput: false })));
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(GREETING.length);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (!isOpen && isTypingTarget(e.target)) return;
      e.preventDefault();
      setIsOpen((open) => !open);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      if (returnFocus.current?.isConnected) returnFocus.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const result = runCommand(value);
    const toLine = (text: string, isInput: boolean): Line => ({ id: nextId.current++, text, isInput });
    setValue('');

    if (result.action === 'clear') {
      setLines([]);
      return;
    }
    if (result.action === 'close') {
      setIsOpen(false);
      return;
    }
    if (result.action === 'download-resume') downloadResume();
    setLines((prev) => [...prev, toLine(value, true), ...result.lines.map((t) => toLine(t, false))]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Terminal"
      className="fixed inset-x-0 bottom-0 z-[110] border-t-2 border-accent bg-ink font-mono text-sm text-paper shadow-2xl"
      onKeyDown={(e) => {
        if (e.key !== 'Escape') return;
        // Keep Escape from also closing a project modal underneath.
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <div className="sheet">
        <div className="flex items-center justify-between border-b border-paper/15 py-1.5 text-xs text-paper/70">
          <span>tty0: portfolio shell</span>
          <button type="button" onClick={() => setIsOpen(false)} className="min-h-[36px] px-2 hover:text-accent">
            close
          </button>
        </div>
        <div ref={scrollRef} className="h-[40vh] overflow-y-auto py-3" aria-live="polite">
          {lines.map((line) => (
            <p key={line.id} className="whitespace-pre-wrap break-words leading-relaxed">
              {line.isInput ? (
                <>
                  <span className="text-accent">{PROMPT}</span> {line.text}
                </>
              ) : (
                line.text
              )}
            </p>
          ))}
          <form onSubmit={submit} className="flex items-center gap-2">
            <label htmlFor="terminal-input" className="shrink-0 text-accent">
              {PROMPT}
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/`/g, ''))}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-paper caret-accent outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
