import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually without external dependencies
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

const RESEND_API_KEY = process.env.RESEND_API_KEY || 'your_resend_api_key_here';
const DOMAIN_SENDER = process.env.RESEND_FROM_EMAIL || '🚀 OPC TNC | One Person Company <victor@breaths.live>';
const PAYPAL_ME = process.env.PAYPAL_ME_LINK || 'https://PayPal.Me/victorchuyen';
const GITHUB_REPO = 'https://github.com/victorChuyen/opc-tnc-one-person-ai-company';
const GITHUB_STAR = 'https://github.com/victorChuyen/opc-tnc-one-person-ai-company/stargazers';

// 10 Subdomain Pool Configuration (opc1.breaths.live -> opc10.breaths.live)
export const SUBDOMAIN_POOL = Array.from({ length: 10 }, (_, i) => {
  const index = i + 1;
  const subdomain = `opc${index}.breaths.live`;
  return {
    id: `opc${index}`,
    subdomain: subdomain,
    sender: `🚀 OPC TNC | One Person Company <victor@${subdomain}>`,
    apiKey: process.env[`RESEND_API_KEY_OPC${index}`] || ''
  };
});

let poolIndex = 0;

/**
 * Get Next Active Subdomain Node from Pool (Round-Robin)
 */
export function getNextPoolNode() {
  const activeNodes = SUBDOMAIN_POOL.filter(n => n.apiKey && n.apiKey !== 'your_resend_api_key_here');
  if (activeNodes.length === 0) {
    return {
      id: 'default',
      subdomain: 'breaths.live',
      sender: DOMAIN_SENDER,
      apiKey: RESEND_API_KEY
    };
  }
  const node = activeNodes[poolIndex % activeNodes.length];
  poolIndex++;
  return node;
}

/**
 * Send Email via Resend REST API (Native Fetch - Zero Dependency)
 * Supports Multi-Subdomain Rotation (opc1..opc10.breaths.live)
 */
export async function sendResendEmail({ to, cc, subject, html, poolNode = null }) {
  try {
    const node = poolNode || getNextPoolNode();
    const payload = {
      from: node.sender,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: html
    };

    if (cc) {
      payload.cc = Array.isArray(cc) ? cc : [cc];
    }

    console.log(`[EMAIL DISPATCH] Using Pool Subdomain [${node.subdomain}] for target ${to}`);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${node.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('[RESEND API ERROR]', data);
      return { success: false, error: data };
    }

    console.log(`[RESEND SUCCESS] Email sent to ${to} | ID: ${data.id}`);
    return { success: true, id: data.id };
  } catch (err) {
    console.error('[RESEND EXCEPTION]', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Build Welcome Email Content (HTML) - Supports EN & VI
 */
function buildWelcomeHtml({ name = 'Khách Hàng', lang = 'vi' }) {
  const isEn = lang === 'en';
  
  const title = isEn 
    ? `🚀 Welcome to OPC TNC | One Person Company` 
    : `🚀 Chào mừng bạn đến với OPC TNC | Doanh Nghiệp 1 Người AI`;

  const welcomeText = isEn ? `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Hello ${name},</h2>
    <p>Congratulations on registering for the <b>OPC Source Code Copy (0$ Lead Magnet)</b>!</p>
    <p>Your 3D Virtual Office Simulator and 157 Prompt Vault are ready for direct download on GitHub.</p>
    
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #00f2ff;padding:15px;margin:20px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#00f2ff;">🎁 YOUR FREE LEAD MAGNET INCLUDES:</h3>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li><b>157 Prompt Vault:</b> Standardized prompts for 5 C-Suite AI Directors (CEO, CMO, CSO, CPO, CHRO).</li>
            <li><b>3D Virtual Office Simulator:</b> 360° interactive AI office environment.</li>
            <li><b>Obsidian Vault Note:</b> Operational knowledge base & daily KPI tracking templates.</li>
            <li><b>Direct GitHub Source Download:</b> Full V1.0 codebase & Apps Script master suite.</li>
        </ul>
    </div>

    <!-- Direct GitHub Download & Star Request CTA -->
    <div style="background:linear-gradient(135deg, #0f172a, #1e293b);border:1.5px solid #ffaa00;padding:18px;margin:20px 0;border-radius:12px;text-align:center;">
        <h3 style="margin:0 0 6px 0;font-size:15px;color:#ffaa00;">⭐ DIRECT GITHUB SOURCE DOWNLOAD & STAR REVIEW</h3>
        <p style="margin:0 0 12px 0;font-size:12px;color:#cbd5e1;">Click below to download source code & give us a 🌟 Star on GitHub to support open-source development!</p>
        <a href="${GITHUB_REPO}" target="_blank" style="background:#ffaa00;color:#000;font-weight:900;font-size:12px;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;margin-right:6px;">
            💻 DOWNLOAD ON GITHUB
        </a>
        <a href="${GITHUB_STAR}" target="_blank" style="background:#22c55e;color:#fff;font-weight:900;font-size:12px;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;">
            ⭐ GIVE A STAR (5-STAR REVIEW)
        </a>
    </div>

    <!-- Global PayPal Upgrade Option -->
    <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb);border:1.5px solid #60a5fa;padding:20px;margin:25px 0;border-radius:12px;text-align:center;color:#ffffff;">
        <span style="background:#ffaa00;color:#000;font-size:10px;font-weight:900;padding:4px 12px;border-radius:12px;text-transform:uppercase;">🚀 PRO SETUP & 5 AI C-SUITE DIRECTORS</span>
        <h3 style="margin:10px 0 6px 0;font-size:15px;color:#ffffff;">Core Setup Package (3D Simulator + Web Server)</h3>
        <p style="margin:0 0 14px 0;font-size:12.5px;color:#dbeafe;">Special Global Launch Price: <b>$49 USD (1.000.000đ)</b> <s style="color:#93c5fd;">$450 USD</s></p>
        <a href="${PAYPAL_ME}" target="_blank" style="background:#facc15;color:#000000;font-weight:900;font-size:12.5px;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block;box-shadow:0 4px 15px rgba(250,204,21,0.4);">
            💳 PAY VIA PAYPAL.ME / VICTORCHUYEN ($49)
        </a>
    </div>

    <div style="text-align:center;margin:25px 0;">
        <a href="https://discord.com/channels/1098935967873765457/1098935968582598707" target="_blank" style="background:linear-gradient(135deg, #ffaa00, #ff8800);color:#000000;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 JOIN OUR DISCORD VIP COMMUNITY
        </a>
    </div>
  ` : `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Chào ${name},</h2>
    <p>Chúc mừng bạn đã đăng ký thành công <b>Bản Sao Mã Nguồn OPC (Gói 0đ)</b>!</p>
    <p>Bộ mã nguồn và mô hình 3D Virtual Office Simulator của bạn đã sẵn sàng để tải trực tiếp từ GitHub.</p>
    
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #00f2ff;padding:15px;margin:20px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#00f2ff;">🎁 QUYỀN LỢI GÓI 0Đ CỦA BẠN BAO GỒM:</h3>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li><b>Bộ 157 Prompt Vault:</b> Chuẩn hóa cho 5 Giám đốc AI (CEO, CMO, CSO, CPO, CHRO).</li>
            <li><b>Mô hình 3D Virtual Office Simulator:</b> Trải nghiệm không gian làm việc AI 360°.</li>
            <li><b>Obsidian Vault Note:</b> Mẫu ghi chép KPI hàng ngày & quản trị tri thức.</li>
            <li><b>Tải Mã Nguồn Trực Tiếp Từ GitHub:</b> Toàn bộ source code V1.0 & Apps Script Suite.</li>
        </ul>
    </div>

    <!-- Direct GitHub Download & Star Request CTA -->
    <div style="background:linear-gradient(135deg, #0f172a, #1e293b);border:1.5px solid #ffaa00;padding:18px;margin:20px 0;border-radius:12px;text-align:center;">
        <h3 style="margin:0 0 6px 0;font-size:15px;color:#ffaa00;">⭐ TẢI MÃ NGUỒN TRỰC TIẾP & ĐÁNH GIÁ 5 SAO GITHUB</h3>
        <p style="margin:0 0 12px 0;font-size:12px;color:#cbd5e1;">Bấm vào đây để tải bộ Mã nguồn V1.0 & Bấm 🌟 Star trên GitHub để ủng hộ mã nguồn mở!</p>
        <a href="${GITHUB_REPO}" target="_blank" style="background:#ffaa00;color:#000;font-weight:900;font-size:12px;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;margin-right:6px;">
            💻 TẢI MÃ NGUỒN GITHUB
        </a>
        <a href="${GITHUB_STAR}" target="_blank" style="background:#22c55e;color:#fff;font-weight:900;font-size:12px;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;">
            ⭐ ĐÁNH GIÁ 5 SAO (STAR GITHUB)
        </a>
    </div>

    <!-- Official Paid Offer Upgrade Box -->
    <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb);border:1.5px solid #60a5fa;padding:20px;margin:25px 0;border-radius:12px;text-align:center;color:#ffffff;">
        <span style="background:#ffaa00;color:#000;font-size:10px;font-weight:900;padding:4px 12px;border-radius:12px;text-transform:uppercase;">🚀 GÓI CÀI ĐẶT TRỰC TIẾP PRO</span>
        <h3 style="margin:10px 0 6px 0;font-size:15px;color:#ffffff;">Gói Setup 3D Simulator & 5 AI Directors C-Suite</h3>
        <p style="margin:0 0 14px 0;font-size:12.5px;color:#dbeafe;">Giá ưu đãi khởi tạo: <b>1.000.000đ</b> <s style="color:#93c5fd;">10.000.000đ</s></p>
        <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#facc15;color:#000000;font-weight:900;font-size:12.5px;padding:12px 22px;border-radius:8px;text-decoration:none;display:inline-block;box-shadow:0 4px 15px rgba(250,204,21,0.4);">
            👉 ĐẶT LỊCH SETUP GÓI 1M & TƯ VẤN 1:1
        </a>
    </div>

    <div style="text-align:center;margin:25px 0;">
        <a href="https://zalo.me/g/tdhmtu261" target="_blank" style="background:linear-gradient(135deg, #ffaa00, #ff8800);color:#000000;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 VÀO NHÓM ZALO VIP NHẬN MÃ NGUỒN NGAY
        </a>
    </div>
  `;

  return buildEmailWrapper({ title, bodyHtml: welcomeText });
}

/**
 * Helper to build standard email wrapper
 */
function buildEmailWrapper({ title, bodyHtml }) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Be Vietnam Pro',Segoe UI,Helvetica,Arial,sans-serif;color:#f8fafc;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a;padding:30px 10px;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#1e293b;border-radius:16px;border:1px solid rgba(0,242,255,0.25);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                    <!-- Header Banner -->
                    <tr>
                        <td style="background:linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);padding:25px;text-align:center;">
                            <h1 style="margin:0;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:0.5px;">🚀 OPC TNC | ONE-PERSON AI COMPANY</h1>
                            <p style="margin:6px 0 0 0;font-size:12px;color:#cbd5e1;">3D Virtual Office Simulator & Autonomous AI C-Suite</p>
                        </td>
                    </tr>
                    <!-- Body Content -->
                    <tr>
                        <td style="padding:25px;line-height:1.6;font-size:14px;color:#e2e8f0;">
                            ${bodyHtml}
                            <p style="font-size:12px;color:#94a3b8;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;margin-top:25px;">
                                💻 GitHub Open Source Repo: <a href="${GITHUB_REPO}" style="color:#00f2ff;text-decoration:none;">${GITHUB_REPO}</a><br/>
                                ⭐ Rate 5 Stars on GitHub: <a href="${GITHUB_STAR}" style="color:#ffaa00;text-decoration:none;">Give a Star ⭐</a><br/>
                                🌐 Web App 3D Simulator: <a href="https://opc.breaths.live" style="color:#00f2ff;text-decoration:none;">https://opc.breaths.live</a><br/>
                                💳 Global PayPal Payment: <a href="${PAYPAL_ME}" style="color:#00f2ff;text-decoration:none;">https://PayPal.Me/victorchuyen</a><br/>
                                📅 Book 1:1 Strategy Call: <a href="https://cal.com/victorchuyen/coachai" style="color:#ffaa00;text-decoration:none;">https://cal.com/victorchuyen/coachai</a>
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background:#0f172a;padding:16px;text-align:center;font-size:11px;color:#64748b;border-top:1px solid rgba(255,255,255,0.08);">
                            © 2026 OPC TNC — One Person Company.<br/>
                            Chairman Victor Chuyen | Verified Domain: opc.breaths.live
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

/**
 * Dispatch Welcome Email (Day 0) automatically on Opt-in
 */
export async function triggerLeadWelcomeEmail(lead) {
  const isEn = lead.lang === 'en' || lead.business === 'GLOBAL_ENGLISH';
  const subject = isEn
    ? `🎁 [OPC Source Code] Your 3D AI Company Simulator & Toolkit Access`
    : `🎁 [Mã Nguồn OPC] Quyền truy cập 3D AI Company Simulator + Quà tặng của bạn`;

  const html = buildWelcomeHtml({ name: lead.name, lang: isEn ? 'en' : 'vi' });

  return sendResendEmail({
    to: lead.email,
    subject: subject,
    html: html
  });
}

/**
 * Day 2 Email: Secrets of 5 AI C-Suite Directors
 */
export async function triggerDay2Email(lead) {
  const isEn = lead.lang === 'en' || lead.business === 'GLOBAL_ENGLISH';
  const subject = isEn 
    ? `🤖 Secrets of 5 AI C-Suite Directors: Replace a 20-Person Team 👑`
    : `🤖 Bí mật 5 Giám Đốc AI (C-Suite) thay thế đội ngũ 20 nhân sự 👑`;

  const bodyHtml = isEn ? `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Hello ${lead.name || 'there'},</h2>
    <p>The largest expense for any growing agency or business is NOT office rent or ad spend... It's <b>HUMAN MANAGEMENT OVERHEAD & OPERATIONAL ERRORS</b>.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #00f2ff;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#00f2ff;">👑 THE HUB-AND-SPOKE 6 AI DIRECTORS MODEL:</h3>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li>👑 <b>AI CEO:</b> Orchestrates strategy ➔ Decomposes goals ➔ Delegates to 5 C-Suite directors.</li>
            <li>📢 <b>AI CMO:</b> Runs Meta Ads, analyzes competitor ads, writes Alex Hormozi offers.</li>
            <li>💼 <b>AI CSO:</b> Hunts B2B leads, sends 3-step cold emails, executes 20m demo scripts.</li>
            <li>🛠️ <b>AI CPO:</b> Fullstack React/Node.js developer, manages REST APIs & deployment.</li>
            <li>🧬 <b>AI CHRO:</b> Manages 157 Prompt Vault, trains skills & operational knowledge.</li>
            <li>🧾 <b>AI CFO:</b> Automates banking webhooks, PayPal & VietQR payment reconciliation in 3s.</li>
        </ul>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#facc15;color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 BOOK A 1:1 AI STRATEGY CALL WITH VICTOR CHUYEN
        </a>
    </div>
  ` : `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Chào ${lead.name || 'bạn'},</h2>
    <p>Chi phí lớn nhất của một doanh nghiệp không phải là tiền thuê văn phòng hay tiền Ads... Đó là <b>CHI PHÍ QUẢN LÝ NHÂN SỰ & LỖI VẬN HÀNH CON NGƯỜI</b>.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #00f2ff;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#00f2ff;">👑 MÔ HÌNH HUB-AND-SPOKE 6 GIÁM ĐỐC AI:</h3>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li>👑 <b>AI CEO:</b> Nhận chỉ thị từ Chủ doanh nghiệp ➔ Phân rã mục tiêu ➔ Uỷ quyền cho 5 C-Suite.</li>
            <li>📢 <b>AI CMO:</b> Chạy Meta Ads, phân tích đối thủ, viết Copywriting theo chuẩn Alex Hormozi.</li>
            <li>💼 <b>AI CSO:</b> Săn Leads B2B, gửi Cold Email, thực thi Demo Script 20 phút & Neo giá 3 Tier.</li>
            <li>🛠️ <b>AI CPO:</b> Lập trình SaaS, viết React Frontend, REST API & Deploy tự động.</li>
            <li>🧬 <b>AI CHRO:</b> Đào tạo Skills, kiểm tra Prompt & quản trị tri thức doanh nghiệp.</li>
            <li>🧾 <b>AI CFO:</b> Kiểm toán dòng tiền & gạch nợ ngân hàng VietQR tự động.</li>
        </ul>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#facc15;color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 ĐẶT LỊCH TƯ VẤN 1:1 VỚI VICTOR CHUYEN
        </a>
    </div>
  `;

  return sendResendEmail({ to: lead.email, subject, html: buildEmailWrapper({ title: subject, bodyHtml }) });
}

/**
 * Day 3 Email: How AI CMO & CSO Automate Meta Ads & Sales
 */
export async function triggerDay3Email(lead) {
  const isEn = lead.lang === 'en' || lead.business === 'GLOBAL_ENGLISH';
  const subject = isEn 
    ? `🎯 How AI CMO & CSO Automate Meta Ads & B2B Sales Outreach 💼`
    : `🎯 Cách AI CMO & CSO tự động săn Lead Meta Ads + B2B Outreach 💼`;

  const bodyHtml = isEn ? `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Hello ${lead.name || 'there'},</h2>
    <p>Most agencies waste thousands of dollars hiring copywriters and ads operators with inconsistent lead results.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #ffaa00;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#ffaa00;">🎯 THE 3-STEP AUTONOMOUS SALES FUNNEL:</h3>
        <ol style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li><b>STEP 1:</b> AI CMO scans competitor Ad Libraries, extracts pain points, and drafts 5 Hormozi Grand Slam ad copies.</li>
            <li><b>STEP 2:</b> AI CSO ingests opt-in leads, sends a 3-step cold outreach email drip, and books 20-minute demo calls.</li>
            <li><b>STEP 3:</b> AI CFO generates PayPal/VietQR checkout links and instantly grants VIP Drive access upon payment.</li>
        </ol>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="${PAYPAL_ME}" target="_blank" style="background:linear-gradient(135deg,#ffaa00,#ff8800);color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 GET THE DEMO SCRIPT & SAAS PRICING BLUEPRINT ($49)
        </a>
    </div>
  ` : `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Chào ${lead.name || 'bạn'},</h2>
    <p>Hầu hết các Agency & SMBs mất từ 15-30 triệu/tháng để thuê Copywriter & Ads Operator... nhưng kết quả vẫn phập phồng.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #ffaa00;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#ffaa00;">🎯 3 BƯỚC VẬN HÀNH PHỄU BÁN HÀNG TỰ ĐỘNG:</h3>
        <ol style="margin:0;padding-left:20px;font-size:13px;color:#cbd5e1;line-height:1.7;">
            <li><b>BƯỚC 1:</b> AI CMO quét Ad Library của đối thủ, trích xuất điểm xoáy và viết 5 mẫu quảng cáo chuẩn Hormozi Offer.</li>
            <li><b>BƯỚC 2:</b> AI CSO tiếp quản danh sách Leads Opt-in, tự động gửi chuỗi Cold Outreach 3 bước và mời vào Demo Call 20 phút.</li>
            <li><b>BƯỚC 3:</b> Kế toán AI CFO tự động xuất hóa đơn VietQR và kích hoạt quyền truy cập ngay khi tiền về tài khoản.</li>
        </ol>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="https://zalo.me/g/tdhmtu261" target="_blank" style="background:linear-gradient(135deg,#ffaa00,#ff8800);color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 NHẬN BẢN MẪU SCRIPT DEMO CALL & BẢNG NEO GIÁ SAAS
        </a>
    </div>
  `;

  return sendResendEmail({ to: lead.email, subject, html: buildEmailWrapper({ title: subject, bodyHtml }) });
}

/**
 * Day 4 Email: 3-Tier Pricing Anchor & Global PayPal Automation
 */
export async function triggerDay4Email(lead) {
  const isEn = lead.lang === 'en' || lead.business === 'GLOBAL_ENGLISH';
  const subject = isEn 
    ? `💎 3-Tier Pricing Anchor & Global PayPal Checkout Automation 💳`
    : `💎 Bảng giá Neo 3 Tier & Kế toán AI CFO gạch nợ VietQR 3 giây 💳`;

  const bodyHtml = isEn ? `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Hello ${lead.name || 'there'},</h2>
    <p>If you sell SaaS or high-ticket services, the fastest way to maximize Customer Lifetime Value (LTV) is Alex Hormozi's <b>3-TIER PRICING ANCHOR SYSTEM</b>.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #22c55e;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#22c55e;">💎 INSTANT PAYPAL CHECKOUT AUTOMATION:</h3>
        <p style="margin:0;font-size:13px;color:#cbd5e1;line-height:1.6;">
            Global clients can complete payment instantly via PayPal Me link: <code>https://PayPal.Me/victorchuyen</code>. Our AI CFO automatically grants Google Drive & VIP Discord access within 3 seconds.
        </p>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="${PAYPAL_ME}" target="_blank" style="background:#00f2ff;color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 PAY VIA PAYPAL.ME / VICTORCHUYEN
        </a>
    </div>
  ` : `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Chào ${lead.name || 'bạn'},</h2>
    <p>Nếu bạn đang bán dịch vụ hay sản phẩm SaaS, cách nhanh nhất để tăng Doanh Thu Trung Bình / Khách Hàng (LTV) là áp dụng <b>BẢNG GIÁ NEO 3 TIER THEO ALEX HORMOZI</b>.</p>
    <div style="background:rgba(15,23,42,0.8);border-left:4px solid #22c55e;padding:15px;margin:18px 0;border-radius:8px;">
        <h3 style="margin:0 0 8px 0;font-size:14px;color:#22c55e;">💎 CƠ CHẾ VIETQR AUTOMATION 3 GIÂY:</h3>
        <p style="margin:0;font-size:13px;color:#cbd5e1;line-height:1.6;">
            Khi học viên chuyển khoản qua VietQR MB Bank <code>0989890022</code>, Webhook AI CFO kiểm toán và cấp quyền vào Google Drive/Zalo VIP ngay lập tức mà không cần nhân sự kiểm tra thủ công.
        </p>
    </div>
    <div style="text-align:center;margin:25px 0;">
        <a href="https://opc.breaths.live" target="_blank" style="background:#00f2ff;color:#000;font-weight:900;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 KHÁM PHÁ MÔ HÌNH VẬN HÀNH TẠI 3D OFFICE SIMULATOR
        </a>
    </div>
  `;

  return sendResendEmail({ to: lead.email, subject, html: buildEmailWrapper({ title: subject, bodyHtml }) });
}

/**
 * Day 5 Email: Final Call — Build Your One-Person AI Company
 */
export async function triggerDay5Email(lead) {
  const isEn = lead.lang === 'en' || lead.business === 'GLOBAL_ENGLISH';
  const subject = isEn 
    ? `🔥 [Final Call] Build Your One-Person AI Company with Chairman Victor 🚀`
    : `🔥 [Cơ hội cuối cùng] Sở hữu Bản sao Mã nguồn OPC & Lịch hẹn 1:1 🚀`;

  const bodyHtml = isEn ? `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Hello ${lead.name || 'there'},</h2>
    <p>This is the final message in our 5-Day One-Person AI Company onboarding sequence.</p>
    <p>If you want to directly partner with and build your autonomous AI agency with Chairman Victor Chuyen, book your 1:1 strategy call today:</p>
    <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb);border:1.5px solid #60a5fa;padding:20px;margin:20px 0;border-radius:12px;text-align:center;color:#ffffff;">
        <h3 style="margin:0 0 8px 0;font-size:16px;color:#ffffff;">🎯 1:1 HIGH-TICKET VIP COACHING WITH VICTOR CHUYEN</h3>
        <p style="margin:0 0 14px 0;font-size:13px;color:#dbeafe;">Grand Slam Offer packaging, Full AI C-Suite setup & automated PayPal/VietQR integration ($900 - $1,800 USD)</p>
        <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#facc15;color:#000;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 BOOK YOUR 1:1 VIP STRATEGY CALL NOW
        </a>
    </div>
  ` : `
    <h2 style="color:#ffaa00;font-size:16px;margin-top:0;">Chào ${lead.name || 'bạn'},</h2>
    <p>Đây là email cuối cùng trong chuỗi hướng dẫn khởi tạo Doanh nghiệp AI 1 Người (OPC-TNC).</p>
    <p>Nếu bạn muốn trực tiếp xây dựng và sở hữu toàn bộ bộ mã nguồn này cùng Victor Chuyen, hãy đặt lịch hẹn 1:1 ngay hôm nay:</p>
    <div style="background:linear-gradient(135deg, #1e3a8a, #2563eb);border:1.5px solid #60a5fa;padding:20px;margin:20px 0;border-radius:12px;text-align:center;color:#ffffff;">
        <h3 style="margin:0 0 8px 0;font-size:16px;color:#ffffff;">🎯 GÓI STRATEGY COACHING 1:1 VỚI CHAIRMAN VICTOR CHUYEN</h3>
        <p style="margin:0 0 14px 0;font-size:13px;color:#dbeafe;">Đánh giá mô hình kinh doanh, đóng gói Offer Grand Slam & Cài đặt AI C-Suite</p>
        <a href="https://cal.com/victorchuyen/coachai" target="_blank" style="background:#facc15;color:#000;font-weight:900;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">
            👉 ĐẶT LỊCH HẸN STRATEGY CALL 1:1 NGAY
        </a>
    </div>
  `;

  return sendResendEmail({ to: lead.email, subject, html: buildEmailWrapper({ title: subject, bodyHtml }) });
}

/**
 * Dispatch specific day step email sequence
 */
export async function dispatchSequenceStep(lead, dayStep) {
  switch (parseInt(dayStep)) {
    case 0: return triggerLeadWelcomeEmail(lead);
    case 1:
    case 2: return triggerDay2Email(lead);
    case 3: return triggerDay3Email(lead);
    case 4: return triggerDay4Email(lead);
    case 5: return triggerDay5Email(lead);
    default: return triggerLeadWelcomeEmail(lead);
  }
}
