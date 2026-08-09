// OPC-TNC Shared Environment Loader (Zero-Dependency)
// Used by all engine modules to avoid duplicating .env parsing logic

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

let _loaded = false;

/**
 * Load .env file from project root into process.env
 * Safe to call multiple times — only parses once
 */
export function loadEnv(dir = PROJECT_ROOT) {
    if (_loaded) return;
    try {
        const envPath = path.join(dir, '.env');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            envContent.split(/\r?\n/).forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const eqIndex = trimmed.indexOf('=');
                    if (eqIndex > 0) {
                        const key = trimmed.slice(0, eqIndex).trim();
                        const val = trimmed.slice(eqIndex + 1).trim();
                        if (key && !process.env[key]) {
                            process.env[key] = val;
                        }
                    }
                }
            });
        }
        _loaded = true;
    } catch (e) {
        console.error('[ENV LOAD ERROR]', e.message);
    }
}

export { PROJECT_ROOT };
