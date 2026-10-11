// Renders public/og-image.png (1200x630) and public/apple-touch-icon.png from SVG.
// Run with: npm run make:og
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const PAPER = '#F4F1EA';
const INK = '#17150F';
const ACCENT = '#E8590C';

const grid = Array.from({ length: 50 }, (_, i) => {
  const p = i * 24;
  return `<path d="M${p} 0V630M0 ${p}H1200" stroke="${INK}" stroke-opacity="0.06"/>`;
}).join('');

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${grid}
  <rect x="24" y="24" width="1152" height="582" fill="none" stroke="${INK}" stroke-width="3"/>
  <text x="72" y="110" font-family="Courier New, monospace" font-size="24" letter-spacing="3" fill="${INK}" fill-opacity="0.7">ENGINEERING SCIENCE · WESTERN UNIVERSITY</text>
  <text x="72" y="210" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="92" fill="${INK}">Yaksh Butani</text>
  <text x="72" y="270" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="${INK}">Building robots end to end: controls, PLC logic, vision.</text>
  <text x="72" y="470" font-family="Courier New, monospace" font-weight="700" font-size="150" fill="${ACCENT}">35s → 2s</text>
  <text x="72" y="530" font-family="Courier New, monospace" font-size="26" fill="${INK}">cycle time on the robot cell I built at Spirol</text>
  <line x1="24" y1="560" x2="1176" y2="560" stroke="${INK}" stroke-width="2"/>
  <text x="72" y="590" font-family="Courier New, monospace" font-size="20" fill="${INK}" fill-opacity="0.7">SEEKING SUMMER 2027 INTERNSHIPS · ROBOTICS · CONTROLS · EMBEDDED</text>
</svg>`;

async function main() {
  await sharp(Buffer.from(og)).png().toFile('public/og-image.png');
  const icon = await readFile('public/favicon.svg');
  await sharp(icon, { density: 600 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('wrote public/og-image.png and public/apple-touch-icon.png');
}

main().catch((err) => {
  console.error('OG image generation failed:', err);
  process.exit(1);
});
