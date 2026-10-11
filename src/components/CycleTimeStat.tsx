import { useLayoutEffect, useRef } from 'react';
import { heroStat } from '../data/resume';
import { gsap, MOTION_OK } from '../lib/gsap';

/** 35s → 2s counter. Renders the final value; counts down from the start value when scrolled into view (motion OK only). */
export default function CycleTimeStat() {
  const figureRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const ratio = heroStat.to / heroStat.from;

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const counter = { value: heroStat.from };
      const render = () => {
        if (numberRef.current) numberRef.current.textContent = String(Math.round(counter.value));
      };
      render();
      gsap
        .timeline({ scrollTrigger: { trigger: figureRef.current, start: 'top 80%', once: true } })
        .to(counter, { value: heroStat.to, duration: 2, ease: 'power3.inOut', onUpdate: render }, 0)
        .fromTo(barRef.current, { scaleX: 1 }, { scaleX: ratio, duration: 2, ease: 'power3.inOut' }, 0);
      return () => {
        counter.value = heroStat.to;
        render();
      };
    });
    return () => mm.revert();
  }, [ratio]);

  return (
    <figure ref={figureRef} className="border border-ink bg-paper p-5 sm:p-6">
      <figcaption className="label">Fig. 1: Cycle time, inspection cell</figcaption>

      <p className="sr-only">
        Cycle time cut from {heroStat.from} seconds to {heroStat.to} seconds, {heroStat.sub}.
      </p>
      <div aria-hidden="true" className="mt-2 flex items-end gap-3 font-mono leading-none">
        <span className="text-7xl font-semibold tracking-tighter text-accent sm:text-8xl">
          <span ref={numberRef} className="inline-block min-w-[2ch] text-right tabular-nums">
            {heroStat.to}
          </span>
          {heroStat.unit}
        </span>
        <span className="mb-2 text-lg text-ink-faint line-through decoration-1 sm:mb-3">
          {heroStat.from}
          {heroStat.unit}
        </span>
      </div>

      {/* Before/after bars on the same scale, so the after bar shows the actual ratio. */}
      <div aria-hidden="true" className="mt-4 space-y-1.5 font-mono text-[0.7rem] text-ink-soft">
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0">before</span>
          <div className="h-2 flex-1 bg-ink/80" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 shrink-0">after</span>
          <div className="h-2 flex-1">
            <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: `scaleX(${ratio})` }} />
          </div>
        </div>
      </div>

      <p aria-hidden="true" className="mt-4 font-mono text-sm font-semibold text-accent-ink">
        {heroStat.sub}
      </p>
    </figure>
  );
}
