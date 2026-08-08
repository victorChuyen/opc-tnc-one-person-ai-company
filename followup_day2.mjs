// Follow-up Day 2 Email for all existing leads
// Run: node followup_day2.mjs

import { dispatchSequenceStep } from './opc_resend_email_engine.mjs';
import fs from 'fs';

const leads = JSON.parse(fs.readFileSync('./data/leads_db.json', 'utf8'));

console.log(`📧 [AI CSO] Starting Day 2 Follow-up for ${leads.length} leads...\n`);

let sent = 0;
let failed = 0;

for (const lead of leads) {
    if (!lead.email || lead.email.includes('example')) {
        console.log(`⏭️ Skipping ${lead.name} (no valid email)`);
        continue;
    }

    try {
        const result = await dispatchSequenceStep(
            { name: lead.name, email: lead.email, lang: 'vi' },
            2 // Day 2
        );
        if (result.success) {
            sent++;
            console.log(`✅ Sent Day 2 to: ${lead.email} (${lead.name})`);
        } else {
            failed++;
            console.log(`❌ Failed: ${lead.email} — ${JSON.stringify(result)}`);
        }
    } catch (err) {
        failed++;
        console.log(`❌ Error: ${lead.email} — ${err.message}`);
    }

    // Rate limit: 1 email per 2 seconds
    await new Promise(r => setTimeout(r, 2000));
}

console.log(`\n📊 [AI CSO] Follow-up Complete: ${sent} sent, ${failed} failed out of ${leads.length} leads`);
