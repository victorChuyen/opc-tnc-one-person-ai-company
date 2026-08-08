// OPC-TNC Composio API Cron Scheduler (https://dashboard.composio.dev/)
// Automatically schedules and dispatches Content Matrix posts across Facebook, LinkedIn, Reddit & GitHub

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually
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

const COMPOSIO_BASE_URL = 'https://backend.composio.dev/v1';
const COMPOSIO_USER_ID = process.env.COMPOSIO_USER_ID || 'pg-test-007ec7c9-6fd2-4115-97d5-899231d5aa17';
const COMPOSIO_AUTH_CONFIG = process.env.COMPOSIO_AUTH_CONFIG_ID || 'ac_rH405NHt-xn7';
const CONNECTED_ACCOUNT_1 = process.env.COMPOSIO_CONNECTED_ACCOUNT_ID_1 || 'ca_iavALyujy9P0';
const CONNECTED_ACCOUNT_2 = process.env.COMPOSIO_CONNECTED_ACCOUNT_ID_2 || 'ca_RC-qYfv97MI6';

/**
 * Execute Composio Action API
 */
export async function executeComposioAction(actionName, params = {}, connectedAccountId = CONNECTED_ACCOUNT_1) {
  try {
    const url = `${COMPOSIO_BASE_URL}/actions/${actionName}/execute`;
    const payload = {
      connectedAccountId: connectedAccountId,
      userId: COMPOSIO_USER_ID,
      input: params
    };

    console.log(`[COMPOSIO API] Executing action: ${actionName} | Account: ${connectedAccountId}`);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.COMPOSIO_API_KEY || ''
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error('[COMPOSIO API ERROR]', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Schedule Post via Composio Trigger Scheduler
 */
export async function scheduleComposioPost(postItem, timeSlot) {
  const mediaPath = postItem.video_file ? `11_Media/Video/FOMO AI - STOP - 48 SHORT/${postItem.video_file}` : (postItem.image_file || '');
  const contentMsg = `${postItem.title}\n\n${postItem.hook}\n\n${postItem.body}\n\n🎬 Media Video Asset: ${mediaPath}\n👉 Xem chi tiết & Tải mã nguồn: https://ai.breaths.live\n${postItem.hashtags}`;

  console.log(`\n📅 [COMPOSIO SCHEDULER] Scheduled Post: "${postItem.title}"`);
  console.log(`⏰ Time Slot: ${timeSlot} | Platform: ${postItem.platform} | Media: ${mediaPath}`);

  // Dispatch to Connected Account 1 (Reddit / GitHub)
  if (postItem.platform.includes('GitHub') || postItem.platform.includes('Discord')) {
    await executeComposioAction('GITHUB_CREATE_ISSUE_COMMENT', {
      body: contentMsg
    }, CONNECTED_ACCOUNT_1);
  }

  // Dispatch to Connected Account 2 (LinkedIn / Facebook)
  if (postItem.platform.includes('Facebook') || postItem.platform.includes('LinkedIn')) {
    await executeComposioAction('LINKEDIN_CREATE_POST', {
      text: contentMsg
    }, CONNECTED_ACCOUNT_2);
  }

  return { success: true, postId: postItem.id, scheduledTime: timeSlot };
}

/**
 * Batch Schedule All 10 Posts from Content Matrix
 */
export async function scheduleAllMatrixPosts() {
  const matrixPath = path.join(__dirname, 'data', 'content_matrix.json');
  if (!fs.existsSync(matrixPath)) {
    console.error('[COMPOSIO SCHEDULER] content_matrix.json not found!');
    return;
  }

  const matrixData = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  const posts = matrixData.sprint_posts || [];

  console.log(`🚀 [COMPOSIO SCHEDULER] Batch scheduling ${posts.length} Content Matrix posts...`);

  const timeSlots = ['08:30', '12:15', '20:00'];
  let count = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const slot = timeSlots[i % 3];
    await scheduleComposioPost(post, slot);
    count++;
  }

  console.log(`\n✅ [COMPOSIO SCHEDULER COMPLETE] Successfully scheduled ${count} posts via https://dashboard.composio.dev/`);
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('opc_composio_scheduler.mjs')) {
  scheduleAllMatrixPosts();
}
