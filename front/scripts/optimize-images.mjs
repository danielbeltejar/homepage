import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicImages = path.resolve('public/assets/images');
const outputRoot = path.resolve('public/assets/optimized');
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const widths = [320, 640];

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(entryPath));
    } else if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files;
}

const images = await findImages(publicImages);

await Promise.all(images.flatMap((source) => {
  const relative = path.relative(publicImages, source);
  const parsed = path.parse(relative);
  return widths.map(async (width) => {
    const destination = path.join(outputRoot, parsed.dir, `${parsed.name}-${width}.webp`);
    await mkdir(path.dirname(destination), { recursive: true });
    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 78 })
      .toFile(destination);
  });
}));

console.log(`Optimized ${images.length} image${images.length === 1 ? '' : 's'} for responsive delivery.`);
