import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 CONFIGURING DUAL-DOMAIN ENTERPRISE ARCHITECTURE...\n');
console.log('📌 MEDIA & LADIPAGE HUB: https://ai.breaths.live (/vi, /en, /checkout)');
console.log('📌 3D VIRTUAL OFFICE ENGINE: https://opc.breaths.live (index.html, /api/*)\n');

// 1. Update landing_vi.html & landing.html
['landing_vi.html', 'landing.html'].forEach(f => {
  const filePath = path.join(rootDir, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Set canonical to ai.breaths.live/vi
    content = content.replace(/<link rel="canonical" href=".*?">/, '<link rel="canonical" href="https://ai.breaths.live/vi">');
    content = content.replace(/<meta property="og:url" content=".*?">/, '<meta property="og:url" content="https://ai.breaths.live/vi">');
    // Ensure 3D Office CTA links to opc.breaths.live
    content = content.replace(/href="index\.html"/g, 'href="https://opc.breaths.live"');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Configured ${f} -> Canonical: https://ai.breaths.live/vi`);
  }
});

// 2. Update landing_en.html
const landingEnPath = path.join(rootDir, 'landing_en.html');
if (fs.existsSync(landingEnPath)) {
  let content = fs.readFileSync(landingEnPath, 'utf8');
  content = content.replace(/<link rel="canonical" href=".*?">/, '<link rel="canonical" href="https://ai.breaths.live/en">');
  content = content.replace(/<meta property="og:url" content=".*?">/, '<meta property="og:url" content="https://ai.breaths.live/en">');
  content = content.replace(/href="index\.html"/g, 'href="https://opc.breaths.live"');
  fs.writeFileSync(landingEnPath, content, 'utf8');
  console.log(`✅ Configured landing_en.html -> Canonical: https://ai.breaths.live/en`);
}

// 3. Update index.html (3D Simulator)
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  content = content.replace(/<link rel="canonical" href=".*?">/, '<link rel="canonical" href="https://opc.breaths.live">');
  content = content.replace(/<meta property="og:url" content=".*?">/, '<meta property="og:url" content="https://opc.breaths.live">');
  // Link language buttons back to ai.breaths.live/vi and /en
  content = content.replace(/href="landing_vi\.html"/g, 'href="https://ai.breaths.live/vi"');
  content = content.replace(/href="landing_en\.html"/g, 'href="https://ai.breaths.live/en"');
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`✅ Configured index.html -> Canonical: https://opc.breaths.live`);
}

// 4. Update sitemap.xml
const sitemapPath = path.join(rootDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://opc.breaths.live/</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="vi" href="https://ai.breaths.live/vi" />
    <xhtml:link rel="alternate" hreflang="en" href="https://ai.breaths.live/en" />
  </url>
  <url>
    <loc>https://ai.breaths.live/vi</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ai.breaths.live/en</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ai.breaths.live/checkout</loc>
    <lastmod>2026-08-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log(`✅ Updated sitemap.xml with Dual-Domain Mapping`);
}

console.log('\n🎉 DUAL-DOMAIN ARCHITECTURE SUCCESSFULLY CONFIGURED!');
