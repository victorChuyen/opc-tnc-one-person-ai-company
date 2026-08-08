const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
    }).on('error', reject);
  });
}

async function main() {
  const base = path.join(__dirname, '..', '.obsidian');
  const pluginsDir = path.join(base, 'plugins');
  fs.mkdirSync(path.join(pluginsDir, 'dataview'), { recursive: true });
  fs.mkdirSync(path.join(pluginsDir, 'templater-obsidian'), { recursive: true });

  console.log('Downloading Dataview...');
  await download('https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/main.js', path.join(pluginsDir, 'dataview', 'main.js'));
  await download('https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/manifest.json', path.join(pluginsDir, 'dataview', 'manifest.json'));
  await download('https://github.com/blacksmithgu/obsidian-dataview/releases/latest/download/styles.css', path.join(pluginsDir, 'dataview', 'styles.css'));

  console.log('Downloading Templater...');
  await download('https://github.com/SilentVoid13/Templater/releases/latest/download/main.js', path.join(pluginsDir, 'templater-obsidian', 'main.js'));
  await download('https://github.com/SilentVoid13/Templater/releases/latest/download/manifest.json', path.join(pluginsDir, 'templater-obsidian', 'manifest.json'));

  fs.writeFileSync(path.join(base, 'community-plugins.json'), JSON.stringify(['dataview', 'templater-obsidian'], null, 2));

  // Configure Templater to use 07-TEMPLATES directory
  const templaterConfig = {
    templates_folder: '07-TEMPLATES',
    templates_pairs: [],
    trigger_on_file_creation: false
  };
  fs.writeFileSync(path.join(pluginsDir, 'templater-obsidian', 'data.json'), JSON.stringify(templaterConfig, null, 2));

  console.log('SUCCESS: Plugins installed and enabled!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
