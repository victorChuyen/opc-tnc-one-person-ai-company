// OPC-TNC Simple JSON-File Database Helper
// Provides atomic read/write for data/*.json files

import fs from 'fs';
import path from 'path';
import { PROJECT_ROOT } from './env-loader.mjs';

const DATA_DIR = path.join(PROJECT_ROOT, 'data');

/**
 * Read a JSON database file. Returns [] if missing or corrupt.
 */
export function readJsonDb(filename) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {
        console.error(`[JSON-DB] Error reading ${filename}:`, e.message);
    }
    return [];
}

/**
 * Write data to a JSON database file (pretty-printed).
 */
export function writeJsonDb(filename, data) {
    const filePath = path.join(DATA_DIR, filename);
    try {
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`[JSON-DB] Error writing ${filename}:`, e.message);
    }
}

/**
 * Prepend an item to a JSON array database file (most recent first).
 * Returns the updated array.
 */
export function prependToJsonDb(filename, item) {
    const list = readJsonDb(filename);
    list.unshift(item);
    writeJsonDb(filename, list);
    return list;
}
