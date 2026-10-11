import { contact, education, experience, profile, skills } from '../data/resume';

export type TerminalAction = 'none' | 'clear' | 'close' | 'download-resume';

export interface CommandResult {
  lines: string[];
  action: TerminalAction;
}

const HELP = [
  'available commands:',
  '  whoami    who is this',
  '  skills    what I work with',
  '  resume    download my resume (PDF)',
  '  contact   how to reach me',
  '  clear     clear the screen',
  '  exit      close the terminal',
];

export function runCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case '':
      return { lines: [], action: 'none' };
    case 'help':
      return { lines: HELP, action: 'none' };
    case 'whoami':
      return {
        lines: [
          profile.name,
          `${education.degree}, ${education.school} (grad ${education.graduation})`,
          profile.headline,
          `latest: ${experience[0].title} @ ${experience[0].company}, ${experience[0].dates}`,
          profile.availability,
        ],
        action: 'none',
      };
    case 'skills':
      return {
        lines: skills.map((g) => `${g.label.padEnd(20)} ${g.items.join(', ')}`),
        action: 'none',
      };
    case 'resume':
      return { lines: ['downloading Yaksh_Butani_Resume.pdf ...'], action: 'download-resume' };
    case 'contact':
      return {
        lines: [
          `email     ${contact.email}`,
          `phone     ${contact.phone}`,
          `github    github.com/${contact.github}`,
          `linkedin  ${contact.linkedin}`,
        ],
        action: 'none',
      };
    case 'clear':
      return { lines: [], action: 'clear' };
    case 'exit':
      return { lines: [], action: 'close' };
    default:
      return { lines: [`command not found: ${cmd}. try "help"`], action: 'none' };
  }
}
