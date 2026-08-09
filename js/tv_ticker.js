/**
 * OPC-TNC — TV-Station Style Realtime Breaking News Ticker Component
 * Author: Co-Founder LUCKY & Chairman Victor Chuyen
 * Creates a high-impact, 60fps VTV/CNN style live news ticker bar at the top of pages.
 */

(function (window, document) {
    'use strict';

    // Inject CSS for TV Ticker
    const style = document.createElement('style');
    style.innerHTML = `
        .opc-tv-ticker-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 36px;
            background: linear-gradient(90deg, #0f172a 0%, #1e293b 100%);
            border-bottom: 2px solid #ef4444;
            display: flex;
            align-items: center;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .opc-tv-badge {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: #ffffff;
            font-size: 11px;
            font-weight: 900;
            padding: 0 14px;
            height: 100%;
            display: flex;
            align-items: center;
            gap: 6px;
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
            box-shadow: 4px 0 10px rgba(0, 0, 0, 0.4);
            z-index: 2;
        }

        .opc-tv-badge-dot {
            width: 8px;
            height: 8px;
            background-color: #ffffff;
            border-radius: 50%;
            animation: opcPulse 1.2s infinite ease-in-out;
        }

        @keyframes opcPulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(0.7); }
            100% { opacity: 1; transform: scale(1); }
        }

        .opc-tv-marquee-wrapper {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            display: flex;
            align-items: center;
        }

        .opc-tv-marquee-content {
            display: inline-block;
            white-space: nowrap;
            animation: opcMarquee 90s linear infinite;
            padding-left: 100%;
            font-size: 12px;
            font-weight: 700;
            color: #f8fafc;
        }

        .opc-tv-marquee-content:hover {
            animation-play-state: paused;
        }

        .opc-tv-news-item {
            display: inline-flex;
            align-items: center;
            margin-right: 40px;
        }

        .opc-tv-news-tag {
            background: rgba(37, 99, 235, 0.25);
            color: #60a5fa;
            border: 1px solid rgba(96, 165, 250, 0.4);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            margin-right: 8px;
            font-weight: 800;
        }

        .opc-tv-news-hot {
            color: #fbbf24;
            font-weight: 800;
        }

        @keyframes opcMarquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-100%, 0, 0); }
        }

        /* Adjust body padding so top menu doesn't overlap */
        body {
            margin-top: 36px !important;
        }
    `;
    document.head.appendChild(style);

    // Default News Stream (VI & EN)
    const DEFAULT_NEWS_VI = [
        { tag: '🔴 LIVE 24/7', text: 'Hệ thống AI Squad vừa gửi thành công 37 Email Outreach cá nhân hóa đến Danh sách Đại sứ YBAI!' },
        { tag: '⚡ KẾ HOẠCH HOT', text: 'AI CFO đã tích hợp tự động đối soát VietQR MB Bank gạch nợ tự động 24/7 trong 3 giây!' },
        { tag: '🚀 BÁO CÁO REALTIME', text: '44 Leads đã được đồng bộ trực tiếp lên hệ thống Google Sheets & Cơ sở dữ liệu OPC-TNC!' },
        { tag: '🎓 AI CHRO', text: 'AI CHRO đang tự động hóa tính lương KPI, thuế TNCN/BHXH và đào tạo SOP nhân sự mới trong 24h!' },
        { tag: '🔥 ƯU ĐÃI KHAN HIẾM', text: 'Chỉ còn 01 Slot Coach 1:1 trực tiếp cùng Founder Victor Chuyen tuần này! Đặt lịch tại cal.com/victorchuyen/coachai' }
    ];

    const DEFAULT_NEWS_EN = [
        { tag: '🔴 LIVE 24/7', text: 'AI Squad has successfully dispatched 37 personalized outreach emails to YBAI Ambassadors!' },
        { tag: '⚡ HOT FEATURE', text: 'AI CFO automated bank reconciliation matches VietQR payments 24/7 in 3 seconds!' },
        { tag: '🚀 REALTIME METRICS', text: '44 Leads fully synchronized to Google Sheets & OPC-TNC core database!' },
        { tag: '🎓 AI CHRO', text: 'AI CHRO automating KPI payroll, personal income tax & 24-hour SOP onboarding!' },
        { tag: '🔥 LIMITED SLOT', text: 'Only 1 slot left for 1-on-1 direct coaching with Founder Victor Chuyen this week!' }
    ];

    // Build Ticker HTML
    function initTicker() {
        if (document.getElementById('opc-tv-ticker')) return;

        const isEnglish = window.location.pathname.includes('/en') || document.documentElement.lang === 'en';
        const newsItems = isEnglish ? DEFAULT_NEWS_EN : DEFAULT_NEWS_VI;

        const container = document.createElement('div');
        container.id = 'opc-tv-ticker';
        container.className = 'opc-tv-ticker-container';

        const badgeText = 'NEWS';
        const newsContentHtml = newsItems.map(item => `
            <span class="opc-tv-news-item">
                <span class="opc-tv-news-tag">${item.tag}</span>
                <span>${item.text}</span>
            </span>
        `).join('');

        container.innerHTML = `
            <div class="opc-tv-badge">
                <div class="opc-tv-badge-dot"></div>
                <span>${badgeText}</span>
            </div>
            <div class="opc-tv-marquee-wrapper">
                <div class="opc-tv-marquee-content" id="opc-tv-marquee-text">
                    ${newsContentHtml} ${newsContentHtml}
                </div>
            </div>
        `;

        document.body.insertBefore(container, document.body.firstChild);
        fetchLiveNews();
    }

    // Optionally fetch dynamic news items from server API
    async function fetchLiveNews() {
        try {
            const res = await fetch('/api/ticker/news');
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.news && data.news.length > 0) {
                    const marqueeText = document.getElementById('opc-tv-marquee-text');
                    if (marqueeText) {
                        const dynamicHtml = data.news.map(item => `
                            <span class="opc-tv-news-item">
                                <span class="opc-tv-news-tag">${item.tag}</span>
                                <span>${item.text}</span>
                            </span>
                        `).join('');
                        marqueeText.innerHTML = dynamicHtml + dynamicHtml;
                    }
                }
            }
        } catch (e) {
            // Silently fall back to default news items
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTicker);
    } else {
        initTicker();
    }

})(window, document);
