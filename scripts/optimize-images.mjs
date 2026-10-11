// Generates web-sized WebP copies of every PNG/JPG in src/assets.
// Originals are left untouched. Output: src/assets/optimized/<name>.webp (1600px)
// and <name>-thumb.webp (800px). Run with: npm run optimize:images
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIR = path.resolve('src/assets');
const OUT_DIR = path.join(SRC_DIR, 'optimized');
const SIZES = [
  { suffix: '', width: 1600, quality: 78 },
  { suffix: '-thumb', width: 800, quality: 72 },
];

async function isUpToDate(src, out) {
  try {
    const [s, o] = await Promise.all([stat(src), stat(out)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));

  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const base = path.parse(file).name;
    for (const { suffix, width, quality } of SIZES) {
      const out = path.join(OUT_DIR, `${base}${suffix}.webp`);
      if (await isUpToDate(src, out)) continue;
      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality })
        .toFile(out);
      console.log(`wrote ${path.relative(process.cwd(), out)}`);
    }
  }
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
