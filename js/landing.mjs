// OPC-TNC Unified Landing Page Engine (ES Module)
// Handles Countdown, Lead Opt-in, OTO Payment Modal, AI Director Modal, & Safe FOMO Toasts

let otoTimeLeft = 600;
let otoTimerInterval = null;

/* ── Safe Text Sanitizer (XSS Protection) ── */
export function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* ── Persistent Countdown Timer ── */
export function initCountdown(countdownElementId = 'countdown', durationMinutes = 10) {
    const countdownEl = document.getElementById(countdownElementId);
    if (!countdownEl) return;

    const STORAGE_KEY = 'opc_countdown_target';
    let targetTime = localStorage.getItem(STORAGE_KEY);

    if (!targetTime || Date.now() > parseInt(targetTime, 10)) {
        targetTime = Date.now() + durationMinutes * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
    } else {
        targetTime = parseInt(targetTime, 10);
    }

    function update() {
        const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
        const m = String(Math.floor(remaining / 60)).padStart(2, '0');
        const s = String(remaining % 60).padStart(2, '0');
        countdownEl.innerText = `${m}:${s}`;
        
        if (remaining <= 0) {
            // Reset for next window if expired
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    update();
    setInterval(update, 1000);
}

/* ── UX Toast Feedback Copy Helper ── */
export function copyText(str, btnElement) {
    if (!str) return;
    navigator.clipboard.writeText(str).then(() => {
        showCopyToast(btnElement ? '✓ Copied' : '✓ Copied to clipboard');
        if (btnElement) {
            const originalText = btnElement.innerText;
            btnElement.innerText = '✓ Copied';
            btnElement.style.background = '#16a34a';
            setTimeout(() => {
                btnElement.innerText = originalText;
                btnElement.style.background = '';
            }, 1800);
        }
    }).catch(() => {
        alert('Copy failed: ' + str);
    });
}

function showCopyToast(msg) {
    let copyToast = document.getElementById('copy-feedback-toast');
    if (!copyToast) {
        copyToast = document.createElement('div');
        copyToast.id = 'copy-feedback-toast';
        copyToast.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 100000;
            background: #16a34a; color: #ffffff; padding: 10px 18px;
            border-radius: 30px; font-size: 13px; font-weight: 800;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 0; transform: translateY(-20px); pointer-events: none;
        `;
        document.body.appendChild(copyToast);
    }
    copyToast.innerText = msg;
    copyToast.style.opacity = '1';
    copyToast.style.transform = 'translateY(0)';
    setTimeout(() => {
        copyToast.style.opacity = '0';
        copyToast.style.transform = 'translateY(-20px)';
    }, 2000);
}

/* ── AI Director 1-Click Interactive Modal ── */
export function initAiDirectorModal(directorData) {
    window.openAiDirectorModal = function(key) {
        const data = directorData[key];
        if (!data) return;
        
        const titleEl = document.getElementById('dir-modal-title');
        const tagEl = document.getElementById('dir-modal-tag');
        const descEl = document.getElementById('dir-modal-desc');
        const modal = document.getElementById('ai-director-modal');

        if (titleEl) titleEl.innerText = data.title;
        if (tagEl) tagEl.innerText = data.tag;
        if (descEl) descEl.innerText = data.desc;
        if (modal) modal.classList.add('active');
    };

    window.closeAiDirectorModal = function() {
        const modal = document.getElementById('ai-director-modal');
        if (modal) modal.classList.remove('active');
    };

    window.closeAiDirectorModalOnBackdrop = function(e) {
        if (e.target.id === 'ai-director-modal') window.closeAiDirectorModal();
    };
}

/* ── OTO Payment Modal & VietQR Integration ── */
export function initOtoModal(defaultAmount = 500000) {
    window.closeOtoModal = function() {
        const modal = document.getElementById('oto-modal');
        if (modal) modal.classList.remove('active');
    };

    window.closeOtoModalOnBackdrop = function(e) {
        if (e.target.id === 'oto-modal') window.closeOtoModal();
    };

    window.openOtoWithPackage = function(pkgName) {
        const modal = document.getElementById('oto-modal');
        if (modal) modal.classList.add('active');
        startOtoTimer();
    };

    window.showOtoModal = function(phone, amount = defaultAmount) {
        const modal = document.getElementById('oto-modal');
        const memoTxt = document.getElementById('copy-memo-txt');
        const amountTxt = document.getElementById('copy-amount-txt');
        const img = document.getElementById('vietqr-img-src');
        const memoStr = `OPC VIP ${phone || ''}`.trim();
        
        if (memoTxt) memoTxt.innerText = memoStr;
        if (amountTxt) amountTxt.innerText = `${amount.toLocaleString('vi-VN')}đ`;
        if (img) {
            img.src = `https://img.vietqr.io/image/MB-0989890022-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(memoStr)}&accountName=TRAN%20NGOC%20CHUYEN`;
        }
        if (modal) modal.classList.add('active');
        startOtoTimer();

        // Fire Meta Pixel InitiateCheckout Event
        if (window.OPCMetaTracker) {
            window.OPCMetaTracker.trackInitiateCheckout('OPC_VIP_500K', amount);
        }
    };

    window.skipOtoToZalo = function() {
        window.location.href = 'https://zalo.me/g/tdhmtu261';
    };

    window.skipOtoToDiscord = function() {
        window.location.href = 'https://discord.com/channels/1098935967873765457/1098935968582598707';
    };

    window.finishOtoFlow = function() {
        setTimeout(() => {
            window.location.href = 'https://cal.com/victorchuyen/coachai';
        }, 300);
    };

    function startOtoTimer() {
        const timerEl = document.getElementById('oto-timer');
        if (otoTimerInterval) clearInterval(otoTimerInterval);
        otoTimerInterval = setInterval(() => {
            if (otoTimeLeft > 0) otoTimeLeft--;
            const m = String(Math.floor(otoTimeLeft / 60)).padStart(2, '0');
            const s = String(otoTimeLeft % 60).padStart(2, '0');
            if (timerEl) timerEl.innerText = `${m}:${s}`;
        }, 1000);
    }
}

/* ── Form Lead Submit Handler ── */
export function initLeadForm(config = { lang: 'vi', segment: 'VIETNAM_DOMESTIC' }) {
    window.submitLeadForm = async function() {
        const nameInput = document.getElementById('lead-name');
        const phoneInput = document.getElementById('lead-phone');
        const emailInput = document.getElementById('lead-email');
        const businessSelect = document.getElementById('lead-business');
        const btn = document.getElementById('btn-submit-lead');

        if (!nameInput || !phoneInput || !emailInput) return;

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const business = businessSelect ? businessSelect.value : '';

        if (!name || !phone || !email) {
            alert(config.lang === 'vi' 
                ? 'Vui lòng điền đầy đủ Họ tên, SĐT và Email!' 
                : 'Please enter your Full Name, Phone, and Email address!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(config.lang === 'vi' ? 'Email không đúng định dạng!' : 'Please enter a valid email address!');
            return;
        }

        btn.disabled = true;
        const originalText = btn.innerText;
        btn.innerText = config.lang === 'vi' ? '⏳ ĐANG KÍCH HOẠT MÃ NGUỒN VIP...' : '⏳ ACTIVATING VIP ACCESS...';

        try {
            await fetch('/api/leads/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: escapeHTML(name), 
                    phone: escapeHTML(phone), 
                    email: escapeHTML(email), 
                    business: escapeHTML(business), 
                    segment: config.segment, 
                    lang: config.lang 
                })
            });

            // Fire Meta Pixel & CAPI Lead Event
            if (window.OPCMetaTracker) {
                window.OPCMetaTracker.trackLead({ name, phone, email });
            }
        } catch (err) {
            console.error('[LEAD SUBMIT ERROR]', err);
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
            window.showOtoModal(phone, config.lang === 'vi' ? 500000 : 25);
        }
    };
}

/* ── FOMO Toast Notification System ── */
export function startFomoToast(fomoList = []) {
    if (!fomoList || fomoList.length === 0) return;

    const toast = document.getElementById('fomo-toast');
    const nameEl = document.getElementById('fomo-name');
    const descEl = document.getElementById('fomo-desc');
    if (!toast || !nameEl || !descEl) return;

    let idx = 0;
    setInterval(() => {
        // Do not display FOMO Toast if any modal is currently open
        const anyModalActive = document.querySelector('.oto-modal-overlay.active');
        if (anyModalActive) return;

        const item = fomoList[idx % fomoList.length];
        nameEl.innerText = item.name;
        descEl.innerText = item.desc;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);

        idx++;
    }, 14000);
}

/* ── Dynamic Ticker (XSS Safe) ── */
export async function fetchLiveLeadsTicker(tickerId = 'live-ticker', lang = 'vi') {
    const ticker = document.getElementById(tickerId);
    if (!ticker) return;

    try {
        const res = await fetch('/api/leads/recent');
        const data = await res.json();
        if (data.success && data.leads && data.leads.length > 0) {
            let index = 0;
            setInterval(() => {
                const lead = data.leads[index % data.leads.length];
                const safeName = escapeHTML(lead.name);
                const safePhone = escapeHTML(lead.phone);
                const safeTime = escapeHTML(lead.timeAgo || (lang === 'vi' ? '1 phút trước' : '1 min ago'));

                if (lang === 'vi') {
                    ticker.innerHTML = `🔥 <strong>${safeName}</strong> (${safePhone}) vừa nhận Bản Sao OPC ${safeTime}!`;
                } else {
                    ticker.innerHTML = `🔥 <strong>${safeName}</strong> (${safePhone}) claimed OPC Toolkit ${safeTime}!`;
                }
                index++;
            }, 6000);
        }
    } catch (e) {
        console.error('[TICKER FETCH ERROR]', e);
    }
}

/* ── FAQ Interactive Accordion & Category Filter Handler ── */
export function initFaqAccordion() {
    window.toggleFaq = function(element) {
        const item = element.parentElement;
        const isActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
        });

        // Toggle clicked item
        if (!isActive) {
            item.classList.add('active');
        }
    };

    window.filterFaq = function(category, btn) {
        document.querySelectorAll('.faq-tab-btn').forEach(b => {
            b.style.background = '#f1f5f9';
            b.style.color = '#334155';
            b.style.border = '1px solid #cbd5e1';
        });
        if (btn) {
            btn.style.background = '#2563eb';
            btn.style.color = '#ffffff';
            btn.style.border = 'none';
        }

        document.querySelectorAll('.faq-item').forEach(el => {
            const cat = el.getAttribute('data-faq-cat') || 'tech';
            if (category === 'all' || cat === category || cat.includes(category)) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });
    };
}

/* ── Master Collapsible Footer Handler ("KẾT NỐI VÀ HỢP TÁC CÙNG OPC-TNC") ── */
export function initMasterFooterToggle() {
    window.toggleMasterFooter = function() {
        const wrapper = document.getElementById('footer-master-block');
        if (wrapper) {
            wrapper.classList.toggle('active');
        }
    };
}

/* ── VSL Video Unmute Handler ── */
export function unmuteVslVideo(iframeId, btnEl) {
    const iframe = document.getElementById(iframeId);
    if (!iframe) return;

    try {
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }), '*');
        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');

        if (btnEl) {
            btnEl.style.display = 'none';
        }
    } catch (e) {
        console.error('[VSL UNMUTE ERROR]', e);
    }
}
window.unmuteVslVideo = unmuteVslVideo;



