import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 RUNNING DEEP QA SYSTEM LINK AUDIT ON OPC-TNC...\n');

const htmlFiles = [
  'index.html',
  'index_mobile.html',
  'landing.html',
  'landing_vi.html',
  'landing_en.html',
  'checkout.html',
  'OPC-TNC/admin/index.html'
];

const errors = [];
const checkedAssets = new Set();

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    errors.push(`🔴 Missing file: ${file}`);
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const baseDir = path.dirname(filePath);

  // 1. Check local static assets (src="..." or href="...")
  const matches = html.matchAll(/(?:src|href)=["'](.*?)["']/g);
  for (const match of matches) {
    const link = match[1];
    const cleanLink = link.split('?')[0].split('#')[0];

    if (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#') ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('data:') ||
      ['/vi', '/en', '/checkout', '/app', '/3d', '/'].includes(cleanLink)
    ) {
      continue;
    }

    if (!cleanLink) continue;

    const resolvedAsset = path.resolve(baseDir, cleanLink);
    if (!fs.existsSync(resolvedAsset)) {
      errors.push(`🔴 Broken asset link in ${file}: "${link}" (Resolved path: ${resolvedAsset})`);
    } else {
      checkedAssets.add(`${file} -> ${cleanLink}`);
    }
  }
});

console.log(`✅ Checked HTML Files: ${htmlFiles.length}`);
console.log(`✅ Verified Local Static Assets & Internal Links: ${checkedAssets.size}`);

if (errors.length === 0) {
  console.log('\n🎉 ALL LOCAL ASSETS & INTERNAL LINKS ARE 100% VALID & INTACT!');
} else {
  console.log('\n⚠️ BROKEN LINKS DETECTED:');
  errors.forEach(e => console.log(e));
}
