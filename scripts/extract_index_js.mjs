import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'index.html');
const jsOutputDir = path.join(rootDir, 'js');
const targetJsPath = path.join(jsOutputDir, 'office3d-app.mjs');

const htmlContent = fs.readFileSync(indexPath, 'utf8');
const lines = htmlContent.split('\n');

let scriptStart = -1;
let scriptEnd = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<script type="module">') && scriptStart === -1) {
        // Check if it's the giant block starting around line 683
        if (i > 500) {
            scriptStart = i;
        }
    }
    if (lines[i].includes('</script>') && scriptStart !== -1 && scriptEnd === -1) {
        scriptEnd = i;
    }
}

if (scriptStart !== -1 && scriptEnd !== -1) {
    console.log(`Extracting script lines ${scriptStart + 1} to ${scriptEnd + 1}...`);
    const jsLines = lines.slice(scriptStart + 1, scriptEnd);
    const jsCode = jsLines.join('\n');

    fs.writeFileSync(targetJsPath, jsCode, 'utf8');
    console.log(`Saved JS code to ${targetJsPath} (${Buffer.byteLength(jsCode)} bytes)`);

    const newHtmlLines = [
        ...lines.slice(0, scriptStart),
        '    <script type="module" src="js/office3d-app.mjs"></script>',
        ...lines.slice(scriptEnd + 1)
    ];

    fs.writeFileSync(indexPath, newHtmlLines.join('\n'), 'utf8');
    console.log(`Updated index.html (${Buffer.byteLength(newHtmlLines.join('\n'))} bytes)`);
} else {
    console.error('Could not find giant script block in index.html');
}
