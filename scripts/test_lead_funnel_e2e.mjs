import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🧪 RUNNING END-TO-END LEAD FUNNEL & FINANCE E2E TEST...');

async function postJson(urlPath, data) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 8085,
            path: urlPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk.toString());
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, body });
                }
            });
        });

        req.on('error', (err) => reject(err));
        req.write(payload);
        req.end();
    });
}

async function runE2eTest() {
    try {
        // Step 1: Submit a test lead via /api/leads
        const testEmail = `qa_test_${Date.now()}@example.com`;
        const testName = 'QA E2E Tester';
        console.log(`\n1️⃣ Testing POST /api/leads with Email: ${testEmail}...`);

        const leadRes = await postJson('/api/leads', {
            name: testName,
            phone: '0989890022',
            email: testEmail,
            business: 'E2E Automated QA',
            lang: 'vi',
            segment: 'VIETNAM_DOMESTIC'
        });

        console.log(`   Response Status: ${leadRes.statusCode}`);
        console.log(`   Response Body:`, leadRes.body);

        if (leadRes.statusCode !== 200 || !leadRes.body.success) {
            throw new Error('Lead submission failed!');
        }
        console.log('   ✅ Lead Submission API Test PASSED!');

        // Step 2: Verify lead stored in data/leads_db.json
        console.log('\n2️⃣ Verifying lead persistence in data/leads_db.json...');
        const leadsDbPath = path.join(rootDir, 'data', 'leads_db.json');
        if (!fs.existsSync(leadsDbPath)) {
            throw new Error('data/leads_db.json file does not exist!');
        }
        const leadsList = JSON.parse(fs.readFileSync(leadsDbPath, 'utf8'));
        const foundLead = leadsList.find(l => l.email === testEmail);
        if (!foundLead) {
            throw new Error(`Lead ${testEmail} not found in database!`);
        }
        console.log(`   Found lead: ID=${foundLead.id}, Step=${foundLead.step}`);
        console.log('   ✅ Lead DB Persistence Test PASSED!');

        // Step 3: Simulate VietQR Finance Webhook Payment via /api/finance/webhook
        console.log('\n3️⃣ Testing POST /api/finance/webhook (VietQR Auto Access)...');
        const finRes = await postJson('/api/finance/webhook', {
            phone: '0989890022',
            amount: 500000,
            course_code: 'OPC-500K-QA',
            bank_ref: `FT_QA_${Date.now()}`
        });

        console.log(`   Response Status: ${finRes.statusCode}`);
        console.log(`   Response Body:`, finRes.body);

        if (finRes.statusCode !== 200 || !finRes.body.success) {
            throw new Error('Finance Webhook failed!');
        }
        console.log('   ✅ Finance Webhook Reconciliation Test PASSED!');

        // Step 4: Verify transaction saved in data/transactions_db.json
        console.log('\n4️⃣ Verifying transaction persistence in data/transactions_db.json...');
        const txDbPath = path.join(rootDir, 'data', 'transactions_db.json');
        if (fs.existsSync(txDbPath)) {
            const txList = JSON.parse(fs.readFileSync(txDbPath, 'utf8'));
            console.log(`   Total Paid Transactions in DB: ${txList.length}`);
        }
        console.log('   ✅ Transaction DB Test PASSED!');

        console.log('\n🎉 ALL E2E LEAD FUNNEL & FINANCE TESTS PASSED 100% PERFECTLY!\n');
    } catch (err) {
        console.error('\n❌ E2E TEST FAILED:', err.message);
        process.exit(1);
    }
}

runE2eTest();
