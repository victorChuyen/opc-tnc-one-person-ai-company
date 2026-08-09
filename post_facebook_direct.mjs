// Facebook Direct Meta Graph API Publisher
// Posts or schedules posts directly on Facebook Fanpage ID: 100092384758201 (@OPCTNC)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
try {
  const envPath = path.join(__dirname, '.env');
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

const PAGE_ID = process.env.FB_PAGE_ID || '100092384758201';
const PAGE_TOKEN = process.env.FB_PAGE_TOKEN || '';

export async function publishPostToFacebookPage(postItem, isScheduled = false, scheduledUnixTime = 0) {
  if (!PAGE_TOKEN) {
    console.log(`\n⚠️ [FACEBOOK GRAPH API REQUIRES TOKEN]`);
    console.log(`📌 Page ID: ${PAGE_ID} (https://www.facebook.com/OPCTNC)`);
    console.log(`🔑 FB_PAGE_TOKEN đang rỗng trong file .env.`);
    console.log(`👉 Vui lòng dán Page Access Token vào .env: FB_PAGE_TOKEN=EAAxxxx...`);
    return { success: false, reason: 'MISSING_PAGE_TOKEN' };
  }

  const message = `${postItem.title}\n\n${postItem.hook}\n\n${postItem.body}\n\n👉 Trang Checkout Setup 1M: https://ai.breaths.live/checkout\n${postItem.hashtags}`;

  const payload = {
    message: message,
    link: 'https://ai.breaths.live/checkout',
    access_token: PAGE_TOKEN
  };

  if (isScheduled && scheduledUnixTime > 0) {
    payload.published = false;
    payload.scheduled_publish_time = scheduledUnixTime;
  }

  try {
    console.log(`🚀 [META GRAPH API] Publishing Post "${postItem.title}" to Page ID ${PAGE_ID}...`);
    const res = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.id) {
      console.log(`✅ [FACEBOOK POST SUCCESS] Live Post ID: ${data.id}`);
      return { success: true, postId: data.id };
    } else {
      console.error(`❌ [FACEBOOK API ERROR]`, data);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error(`❌ [FACEBOOK EXCEPTION]`, err.message);
    return { success: false, error: err.message };
  }
}

// Test publish POST-001
const matrixPath = path.join(__dirname, 'data', 'content_matrix.json');
if (fs.existsSync(matrixPath)) {
  const matrixData = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const post1 = matrixData.sprint_posts[0];
  publishPostToFacebookPage(post1);
}
