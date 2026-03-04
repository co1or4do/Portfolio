import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const images = [
  // Fotos/
  { src: 'Fotos/FotodePerfil.jpeg',    maxW: 800,  fmt: 'jpg' },
  { src: 'Fotos/fotofacha.jpeg',       maxW: 1200, fmt: 'jpg' },
  { src: 'Fotos/CC.jpeg',              maxW: 1920, fmt: 'jpg' },

  // Savia/
  { src: 'Savia/a ver que ondi.png',   maxW: 1920, fmt: 'png' },
  { src: 'Savia/fondo.jpg',            maxW: 1920, fmt: 'jpg' },
  { src: 'Savia/titulo.png',           maxW: 600,  fmt: 'png' },
  // Savia piezas
  { src: 'Savia/piezas/ISQUIO 1.png',  maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/image 5.png',   maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/BANCO3 1.png',  maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/BANCO2 1.png',  maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/BANCO 1.png',   maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/BARRA 1.png',   maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/MESAXS 1.png',  maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/MESAXL 1.png',  maxW: 400,  fmt: 'png' },
  { src: 'Savia/piezas/CENICERO 1.png', maxW: 400, fmt: 'png' },
  // Savia slideshow vectors
  { src: 'Savia/png/Vector.png',       maxW: 600,  fmt: 'png' },
  { src: 'Savia/png/Vector-1.png',     maxW: 600,  fmt: 'png' },
  { src: 'Savia/png/Vector-2.png',     maxW: 600,  fmt: 'png' },
  { src: 'Savia/png/Vector-3.png',     maxW: 600,  fmt: 'png' },

  // Plexa/
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#15.jpg', maxW: 1920, fmt: 'jpg' },
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#2.jpg',  maxW: 1920, fmt: 'jpg' },
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#3.jpg',  maxW: 1200, fmt: 'jpg' },
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#7.jpg',  maxW: 1200, fmt: 'jpg' },
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#8.jpg',  maxW: 1920, fmt: 'jpg' },
  { src: 'Plexa/LED_Mobiliario_2025_1erSem_Ausqui_Cabrera_Diaz Herrera_Leiss_#9.jpg',  maxW: 1920, fmt: 'jpg' },

  // Patagon/
  { src: 'Patagón/Tapa.jpg',           maxW: 1920, fmt: 'jpg' },
  { src: 'Patagón/Tapa Patagon.png',   maxW: 800,  fmt: 'png' },
  { src: 'Patagón/Lab6_JuegosAnalógicos_2025_Diaz Herrera_Gallo__2.jpg', maxW: 1200, fmt: 'jpg' },
  { src: 'Patagón/Lab6_JuegosAnalógicos_2025_Diaz Herrera_Gallo__3.jpg', maxW: 1200, fmt: 'jpg' },
  { src: 'Patagón/Lab6_JuegosAnalógicos_2025_Diaz Herrera_Gallo__5.jpg', maxW: 1920, fmt: 'jpg' },

  // Herbario/
  { src: 'Herbario/Mockup.jpg',        maxW: 1920, fmt: 'jpg' },
  { src: 'Herbario/Fotos-01.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-02.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-03.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-04.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-05.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-06.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-07.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Fotos-08.jpg',      maxW: 960,  fmt: 'jpg' },
  { src: 'Herbario/Reverso.jpg',       maxW: 1920, fmt: 'jpg' },

  // CCR/
  { src: 'CCR/PORTADA.jpg',            maxW: 1920, fmt: 'jpg' },
  { src: 'CCR/Frame 15.jpg',           maxW: 1440, fmt: 'jpg' },
];

let totalBefore = 0;
let totalAfter = 0;
let totalWebp = 0;
const dimensions = {};

async function optimize(entry) {
  const inputPath = path.join(ROOT, entry.src);
  const parsed = path.parse(inputPath);
  const webpPath = path.join(parsed.dir, parsed.name + '.webp');
  const tmpPath = inputPath + '.tmp';

  if (!fs.existsSync(inputPath)) {
    console.error(`SKIP (not found): ${entry.src}`);
    return;
  }

  const beforeSize = fs.statSync(inputPath).size;
  totalBefore += beforeSize;

  const metadata = await sharp(inputPath).metadata();
  const needsResize = metadata.width > entry.maxW;

  const resizeOpts = needsResize ? { width: entry.maxW, withoutEnlargement: true } : undefined;

  // Output optimized original format
  let pipeline = sharp(inputPath);
  if (resizeOpts) pipeline = pipeline.resize(resizeOpts);

  if (entry.fmt === 'jpg') {
    await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(tmpPath);
  } else {
    await pipeline.png({ compressionLevel: 9 }).toFile(tmpPath);
  }
  fs.renameSync(tmpPath, inputPath);

  // Output WebP
  let webpPipeline = sharp(inputPath);
  await webpPipeline.webp({ quality: 80, alphaQuality: 90 }).toFile(webpPath);

  const afterSize = fs.statSync(inputPath).size;
  const webpSize = fs.statSync(webpPath).size;
  totalAfter += afterSize;
  totalWebp += webpSize;

  // Get final dimensions
  const finalMeta = await sharp(inputPath).metadata();
  dimensions[entry.src] = { width: finalMeta.width, height: finalMeta.height };

  const pct = ((1 - afterSize / beforeSize) * 100).toFixed(0);
  console.log(
    `${entry.src}: ${(beforeSize/1024).toFixed(0)}KB -> ${(afterSize/1024).toFixed(0)}KB (${entry.fmt}) / ${(webpSize/1024).toFixed(0)}KB (webp) [${finalMeta.width}x${finalMeta.height}] -${pct}%`
  );
}

console.log('Optimizing images...\n');

for (const entry of images) {
  await optimize(entry);
}

console.log(`\n--- TOTAL ---`);
console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`);
console.log(`After (original fmt): ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
console.log(`After (webp): ${(totalWebp / 1024 / 1024).toFixed(1)}MB`);
console.log(`Reduction: ${((1 - totalWebp / totalBefore) * 100).toFixed(0)}%`);

// Write dimensions to JSON for HTML update step
const dimPath = path.join(ROOT, 'scripts', 'dimensions.json');
fs.writeFileSync(dimPath, JSON.stringify(dimensions, null, 2));
console.log(`\nDimensions saved to scripts/dimensions.json`);
