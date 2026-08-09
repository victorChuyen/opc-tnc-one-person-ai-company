import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env
try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const parts = trimmed.split('=');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const val = parts.slice(1).join('=').trim();
                    if (key && !process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        });
    }
} catch (e) {}

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbx6GZGt0P_iUzD0HX3qWbuCBrtjxxjZ7nBLlQn_ZVHB6sORYCA4DD4neytkj9zCvld4/exec';

const dbPath = path.join(__dirname, '..', 'data', 'leads_db.json');
if (!fs.existsSync(dbPath)) {
    console.error(`❌ DB file not found: ${dbPath}`);
    process.exit(1);
}

const leads = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log(`==================================================`);
console.log(`📊 SYNCHRONIZING ${leads.length} LEADS TO GOOGLE SHEETS`);
console.log(`Target Webhook: ${APPS_SCRIPT_URL}`);
console.log(`==================================================\n`);

async function syncLeads() {
    let syncCount = 0;
    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i];
        try {
            console.log(`[${i + 1}/${leads.length}] Syncing: ${lead.name} <${lead.email}>...`);
            const res = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'lead',
                    name: lead.name,
                    phone: lead.phone,
                    email: lead.email,
                    business: lead.business || 'Solopreneur',
                    source: lead.source || 'OLD_DATABASE',
                    ambassador_code: lead.ambassador_code || '',
                    status: lead.status || 'WARM',
                    step: lead.step || 'NOT_SENT',
                    timestamp: lead.timestamp || new Date().toISOString()
                })
            });
            const text = await res.text();
            console.log(`  └─ Status: ${res.status} | Response: ${text.slice(0, 80)}`);
            syncCount++;
        } catch (err) {
            console.error(`  └─ ❌ Sync failed for ${lead.email}: ${err.message}`);
        }
        // Small delay to prevent flooding Google Apps Script rate limit
        await new Promise(r => setTimeout(r, 400));
    }

    console.log(`\n==================================================`);
    console.log(`🎉 GOOGLE SHEETS SYNC COMPLETE! Synchronized ${syncCount}/${leads.length} leads.`);
    console.log(`==================================================`);
}

syncLeads().catch(console.error);
