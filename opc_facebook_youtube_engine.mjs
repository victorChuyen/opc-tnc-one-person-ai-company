// OPC-TNC Multi-Platform Social Automation & 2-Way Telegram Sync Engine
// Handles credentials, API tokens, cookies, and 2-way sync across Facebook, YouTube, Telegram & Zalo

import fs from 'fs';
import path from 'path';
import https from 'https';

export class SocialAutomationEngine {
    constructor() {
        this.status = {
            facebook: {
                c_user: '',
                xs: '',
                pageToken: '',
                active: false,
                targetGroups: [
                    'Hội Solopreneur & AI Việt Nam',
                    'Cộng Đồng Meta Ads Thực Chiến',
                    'Khởi Nghiệp 0 Đồng & Automation',
                    'B2B Growth & Lead Gen Systems'
                ]
            },
            youtube: {
                channelId: '',
                apiKey: '',
                active: true
            },
            telegram: {
                botToken: '',
                chatId: '-1004377676408',
                threadId: '7',
                active: true,
                syncStatus: 'CONNECTED (Topic #7)'
            },
            zalo: {
                oaToken: '',
                active: false
            },
            shifts: [
                { time: '07:45 AM', action: 'Lướt 4 Hội Nhóm FB, xem video >5s, thả tim & comment tương tác ấm' },
                { time: '12:15 PM', action: 'Đăng 3 bài viết Alex Hormozi Offer 500k + YouTube Shorts distribution' },
                { time: '19:45 PM', action: 'Gửi Messenger Day 1 chào mừng rủ tương tác chéo & chốt hẹn Cal.com' }
            ]
        };
        this.loadEnvCredentials();
    }

    loadEnvCredentials() {
        try {
            const envPath = path.join(process.cwd(), '.env');
            if (fs.existsSync(envPath)) {
                const envText = fs.readFileSync(envPath, 'utf8');

                const getValue = (key) => {
                    const match = envText.match(new RegExp(`${key}=(.*)`));
                    return match ? match[1].trim() : '';
                };

                this.status.facebook.c_user = getValue('FB_C_USER');
                this.status.facebook.xs = getValue('FB_XS');
                this.status.facebook.pageToken = getValue('FB_PAGE_TOKEN');
                this.status.facebook.active = !!(this.status.facebook.c_user && this.status.facebook.xs);

                this.status.youtube.channelId = getValue('YOUTUBE_CHANNEL_ID');
                this.status.youtube.apiKey = getValue('YOUTUBE_API_KEY');

                this.status.telegram.botToken = getValue('TELEGRAM_BOT_TOKEN') || '789123456:AAFx...';
                this.status.telegram.chatId = getValue('TELEGRAM_CHAT_ID') || '-1004377676408';
                this.status.telegram.threadId = getValue('TELEGRAM_THREAD_ID') || '7';

                this.status.zalo.oaToken = getValue('ZALO_OA_TOKEN');
            }
        } catch (e) {
            console.error('[SOCIAL ENGINE] Error reading .env:', e);
        }
    }

    saveAllCredentials(payload) {
        try {
            const envPath = path.join(process.cwd(), '.env');
            let envText = fs.readFileSync(envPath, 'utf8');

            const setEnvValue = (key, val) => {
                const regex = new RegExp(`${key}=.*`);
                if (regex.test(envText)) {
                    envText = envText.replace(regex, `${key}=${val || ''}`);
                } else {
                    envText += `\n${key}=${val || ''}`;
                }
            };

            if (payload.c_user !== undefined) setEnvValue('FB_C_USER', payload.c_user);
            if (payload.xs !== undefined) setEnvValue('FB_XS', payload.xs);
            if (payload.fb_token !== undefined) setEnvValue('FB_PAGE_TOKEN', payload.fb_token);
            if (payload.yt_channel !== undefined) setEnvValue('YOUTUBE_CHANNEL_ID', payload.yt_channel);
            if (payload.yt_api_key !== undefined) setEnvValue('YOUTUBE_API_KEY', payload.yt_api_key);
            if (payload.tele_token !== undefined) setEnvValue('TELEGRAM_BOT_TOKEN', payload.tele_token);
            if (payload.tele_chat_id !== undefined) setEnvValue('TELEGRAM_CHAT_ID', payload.tele_chat_id);
            if (payload.zalo_token !== undefined) setEnvValue('ZALO_OA_TOKEN', payload.zalo_token);

            fs.writeFileSync(envPath, envText, 'utf8');
            this.loadEnvCredentials();

            // Trigger real 2-way telegram notification
            this.sendTelegramSyncNotice(`🔔 [WEB DASHBOARD SYNC] Chairman Victor đã cập nhật cấu hình API/Token kênh Social!`);

            return { success: true, message: 'Đã lưu cấu hình Credentials & Token thành công vào .env!' };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    sendTelegramSyncNotice(messageText) {
        console.log(`[TELEGRAM SYNC -> Topic #${this.status.telegram.threadId || '7'}] ${messageText}`);
        const token = this.status.telegram.botToken;
        const chatId = this.status.telegram.chatId;
        const threadId = this.status.telegram.threadId;

        if (token && !token.includes('AAFx...') && chatId) {
            try {
                const payload = JSON.stringify({
                    chat_id: chatId,
                    message_thread_id: threadId ? parseInt(threadId) : undefined,
                    text: messageText.replace(/\*(.*?)\*/g, '<b>$1</b>').replace(/`(.*?)`/g, '<code>$1</code>'),
                    parse_mode: 'HTML'
                });

                const req = https.request(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(payload)
                    }
                }, (res) => {
                    let resBody = '';
                    res.on('data', chunk => resBody += chunk);
                    res.on('end', () => {
                        console.log(`[TELEGRAM API RESPONSE] Status: ${res.statusCode}`);
                    });
                });

                req.on('error', (err) => {
                    console.error('[TELEGRAM API ERROR]', err.message);
                });

                req.write(payload);
                req.end();
            } catch (err) {
                console.error('[TELEGRAM SYNC FAILED]', err.message);
            }
        }
    }

    getEngineStatus() {
        return this.status;
    }
}

export const socialEngine = new SocialAutomationEngine();
