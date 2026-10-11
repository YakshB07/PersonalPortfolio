import { describe, expect, it } from 'vitest';
import { runCommand } from './terminal';
import { splitByPhrases } from './emphasize';
import { experience, findProject, projects } from '../data/resume';

describe('runCommand', () => {
  it('prints identity for whoami', () => {
    const r = runCommand('whoami');
    expect(r.lines[0]).toBe('Yaksh Butani');
    expect(r.lines.join(' ')).toContain('Western University');
  });

  it('asks the UI to download the resume', () => {
    expect(runCommand('resume').action).toBe('download-resume');
  });

  it('is case and whitespace insensitive', () => {
    expect(runCommand('  CONTACT ').lines.join(' ')).toContain('yakshbutani07@gmail.com');
  });

  it('prints one line per skill group', () => {
    expect(runCommand('skills').lines).toHaveLength(4);
  });

  it('handles clear, exit, empty, and unknown input', () => {
    expect(runCommand('clear').action).toBe('clear');
    expect(runCommand('exit').action).toBe('close');
    expect(runCommand('').lines).toEqual([]);
    expect(runCommand('sudo rm -rf').lines[0]).toContain('command not found');
  });
});

describe('splitByPhrases', () => {
  it('flags every phrase occurrence and preserves the full text', () => {
    const text = 'Cut cycle time from 35s to 2s (2,000 to 4,000 parts/shift) by programming';
    const parts = splitByPhrases(text, ['35s to 2s', '2,000 to 4,000 parts/shift']);
    expect(parts.map((p) => p.text).join('')).toBe(text);
    expect(parts.filter((p) => p.emphasized).map((p) => p.text)).toEqual([
      '35s to 2s',
      '2,000 to 4,000 parts/shift',
    ]);
  });

  it('returns the text untouched when nothing matches', () => {
    expect(splitByPhrases('plain', ['zzz'])).toEqual([{ text: 'plain', emphasized: false }]);
  });

  it('escapes regex characters in phrases', () => {
    const parts = splitByPhrases('Built 10+ autonomous routines', ['10+ autonomous routines']);
    expect(parts.some((p) => p.emphasized && p.text === '10+ autonomous routines')).toBe(true);
  });
});

describe('resume data', () => {
  it('every metric phrase actually appears in its role bullets', () => {
    for (const role of experience) {
      const all = role.bullets.join(' ');
      for (const m of role.metrics) expect(all, `${role.id}: ${m}`).toContain(m);
    }
  });

  it('has no standalone Spirol project (it lives in Experience)', () => {
    expect(findProject('spirol-cell')).toBeUndefined();
  });

  it('every related project id resolves', () => {
    for (const role of experience) {
      if (role.relatedProjectId) expect(findProject(role.relatedProjectId)).toBeDefined();
    }
  });

  it('lists robotics and controls projects before the rest', () => {
    const firstNonFeatured = projects.findIndex((p) => !p.featured);
    expect(projects.slice(firstNonFeatured).every((p) => !p.featured)).toBe(true);
    expect(projects.slice(0, 2).map((p) => p.id)).toEqual(['drone', 'plastic']);
  });
});
