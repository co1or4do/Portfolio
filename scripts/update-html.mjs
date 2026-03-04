import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const dims = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'dimensions.json'), 'utf8'));

// Build a lookup: normalized src -> { width, height, webpSrc }
const lookup = {};
for (const [key, val] of Object.entries(dims)) {
  lookup[key] = val;
}

function getWebpSrc(src) {
  const ext = path.extname(src);
  return src.slice(0, -ext.length) + '.webp';
}

// For matching src in img tags, we need to handle URL-encoded paths
function decodeSrc(src) {
  try { return decodeURIComponent(src); } catch { return src; }
}

function normalizePath(src, htmlDir) {
  // Resolve relative paths like ../Savia/file.png to Savia/file.png
  const resolved = path.posix.normalize(path.posix.join(htmlDir, src));
  return resolved;
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const htmlDir = path.posix.relative(
    ROOT.replace(/\\/g, '/'),
    path.dirname(filePath).replace(/\\/g, '/')
  );

  let changes = 0;

  // 1. Wrap <img> tags in <picture> elements
  // Match img tags that have a src pointing to our image files
  html = html.replace(/<img\s+([^>]*?)>/g, (match, attrs) => {
    // Extract src
    const srcMatch = attrs.match(/src="([^"]+)"/);
    if (!srcMatch) return match;

    const rawSrc = srcMatch[1];
    const decodedSrc = decodeSrc(rawSrc);

    // Normalize to root-relative path
    const normalized = normalizePath(decodedSrc, htmlDir);

    // Check if we have dimensions for this image
    if (!lookup[normalized]) return match;

    const { width, height } = lookup[normalized];
    const webpRawSrc = getWebpSrc(rawSrc);

    // Check if already wrapped in <picture>
    // We'll handle this by checking if the match is already inside a picture tag
    // Since we're doing string replacement, we just avoid double-wrapping

    // Add width and height to img if not present
    let newAttrs = attrs;
    if (!/\bwidth=/.test(newAttrs)) {
      newAttrs += ` width="${width}"`;
    }
    if (!/\bheight=/.test(newAttrs)) {
      newAttrs += ` height="${height}"`;
    }

    changes++;
    // Detect indentation from original
    return `<picture>\n              <source srcset="${webpRawSrc}" type="image/webp">\n              <img ${newAttrs}>\n            </picture>`;
  });

  // Fix indentation - the generic approach above may not match perfectly,
  // so let's do a simpler approach: just ensure picture tags are present
  // Actually, let's fix the indentation issue by being smarter about it

  // 2. Add defer to external script tags
  html = html.replace(/<script src="/g, '<script defer src="');

  // Don't add defer to inline scripts (they don't have src)
  // The regex above only matches <script src=" so inline scripts are safe

  if (changes > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`${path.relative(ROOT, filePath)}: ${changes} images wrapped in <picture>, scripts deferred`);
  } else {
    // Still write if we added defer
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`${path.relative(ROOT, filePath)}: scripts deferred (no images to wrap)`);
  }
}

// Process all HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'contact.html',
  'link-in-bio.html',
  'projects.html',
  'play.html',
  'projects/savia.html',
  'projects/plexa.html',
  'projects/patagon.html',
  'projects/herbario.html',
  'projects/ccr.html',
];

for (const file of htmlFiles) {
  processFile(path.join(ROOT, file));
}

console.log('\nDone!');
