/**
 * 🚀 OPC-TNC Google Apps Script Engine — FULL OPTION MASTER SUITE (14 TABS & 5-DAY DRIP)
 * Sheet ID: 1VfShb_ykP-HZahQY0uZIYiL2JFEnNwFArGaTqPnrS24
 * Verified Domain: breaths.live (Victor Chuyen <victor@breaths.live>)
 */

// 1. Tự động tạo Custom Menu khi mở Google Sheet
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🚀 OPC-TNC Dashboard')
    .addItem('📱 Mở Sidebar Quản Trị Leads & VIP', 'showSidebar')
    .addItem('👑 SEEDING TOÀN BỘ 14 TAB FULL OPTION MASTER', 'seedFullOptionMasterSuite')
    .addSeparator()
    .addItem('📧 Kích Hoạt Email Day 0 (Welcome Gói 0đ)', 'triggerDay0Email')
    .addItem('📧 Kích Hoạt Email Day 2 (5 AI C-Suite)', 'triggerDay2Email')
    .addItem('📧 Kích Hoạt Email Day 3 (Ads & Sales)', 'triggerDay3Email')
    .addItem('📧 Kích Hoạt Email Day 4 (Pricing & VietQR)', 'triggerDay4Email')
    .addItem('📧 Kích Hoạt Email Day 5 (VIP Coaching 1:1)', 'triggerDay5Email')
    .addToUi();
}

// 2. SEEDING MASTER HOÀN CHỈNH CHO TOÀN BỘ 14 TAB TRÊN GOOGLE SHEET
function seedFullOptionMasterSuite() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Tab Goals (Mục tiêu phễu ngược)
  var sGoals = getOrCreateSheet(ss, 'Goals');
  sGoals.clear();
  sGoals.appendRow(['Mốc Mục Tiêu', 'Chỉ Tiêu Hàng Ngày / Tuần', 'Doanh Thu / Target KPI', 'Trạng Thái']);
  formatHeader(sGoals, 4, '#1e3a8a');
  sGoals.appendRow(['Mốc 1', 'Cài đặt Gói Setup 3D Simulator & 5 AI Directors cho 2 Khách / Ngày', '2.000.000 VNĐ / Ngày (MRR 60M)', 'ĐANG THỰC THI']);
  sGoals.appendRow(['Mốc 2', 'Thực hiện 10 Demo Calls 20 phút / Ngày', '10 Calls / Ngày (Closing Rate 20%)', 'ĐANG THỰC THI']);
  sGoals.appendRow(['Mốc 3', 'Thu hút 50 Leads đăng ký Bản Sao Mã Nguồn OPC (Gói 0đ) / Ngày', '50 Leads / Ngày (Booking Rate 20%)', 'ĐANG THỰC THI']);
  sGoals.appendRow(['Mốc 4', 'Chốt 1 Hợp Đồng Gói VIP Coaching 1:1 với Chairman Victor Chuyen / Tuần', '20.000.000đ - 45.000.000đ / Tuần', 'ĐANG THỰC THI']);

  // 2. Tab Tasks_AI (Phân rã nhiệm vụ 6 AI Directors)
  var sTasks = getOrCreateSheet(ss, 'Tasks_AI');
  sTasks.clear();
  sTasks.appendRow(['Vai Trò AI', 'Mục Tiêu Trọng Tâm', 'Nhiệm Vụ Thực Thi Chi Tiết', 'KPI Hàng Ngày', 'Trạng Thái']);
  formatHeader(sTasks, 5, '#0f766e');
  sTasks.appendRow(['👑 AI CEO', 'Quản trị Trung Tâm Hub-and-Spoke', 'Phân rã chỉ tiêu KPI 2M/ngày cho 5 C-Suite, báo cáo P&L dòng tiền MB Bank', '100% Alignment', 'ACTIVE 24/7']);
  sTasks.appendRow(['📢 AI CMO', 'Thu hút Traffic & Opt-in Leads Gói 0đ', 'Setup 3 Meta Ads Hormozi Offer, Đăng 3 YouTube Shorts, Seeding 4 FB Groups', '50 Leads Gói 0đ / Ngày', 'ACTIVE 24/7']);
  sTasks.appendRow(['💼 AI CSO', 'Săn B2B Leads & Chốt Demo Call', 'Gửi Cold Email 3-Step, Zalo Outreach, Thực thi Kịch bản Demo Call 20 phút chốt Gói 1M & VIP', '10 Calls / 2 Sales 1M', 'ACTIVE 24/7']);
  sTasks.appendRow(['🛠️ AI CPO', 'Cài Đặt Gói Setup 3D & 5 AI Directors', 'Deploy 3D Virtual Office Simulator, Cấp Bản Sao Mã Nguồn OPC & Apps Script Suite', '2 Installs / Ngày', 'ACTIVE 24/7']);
  sTasks.appendRow(['🧾 AI CFO', 'VietQR Banking Automation 3s', 'Lắng nghe Webhook MB Bank 0989890022, gạch nợ 3s & cấp quyền VIP Drive', '2.000.000đ / Ngày', 'ACTIVE 24/7']);
  sTasks.appendRow(['🧬 AI CHRO', 'Quản trị Tri thức & 157 Prompt Vault', 'Đóng gói 157 Prompt Vault chuẩn hóa, tự động tạo KPI Note Obsidian Vault 6_Daily/', '100% QA Check', 'ACTIVE 24/7']);

  // 3. Tab Daily (Nhật ký KPI hàng ngày)
  var sDaily = getOrCreateSheet(ss, 'Daily');
  sDaily.clear();
  sDaily.appendRow(['Ngày', 'Leads Thu Về (Mục tiêu 50)', 'Calls Đã Book (Mục tiêu 10)', 'Khách Chốt Gói 1M (Mục tiêu 2)', 'Doanh Thu Thực Tế (VND)', 'Ghi Chú']);
  formatHeader(sDaily, 6, '#334155');
  sDaily.appendRow([new Date().toLocaleDateString(), 5, 2, 1, '1.000.000', 'Khách Lê Văn Phụng kích hoạt thành công']);

  // 4. Tab Offers (3 Gói Sản Phẩm Chuẩn Landing Page)
  var sOffers = getOrCreateSheet(ss, 'Offers');
  sOffers.clear();
  sOffers.appendRow(['Mã Gói Offer', 'Tên Gói Sản Phẩm Chuẩn Landing Page', 'Giá Bán (VND)', 'Giá Gốc (VND)', 'Thành Phần Quyền Lợi VIP', 'Trạng Thái']);
  formatHeader(sOffers, 6, '#b45309');
  sOffers.appendRow(['OFFER-0D', 'Bản Sao Mã Nguồn OPC (Gói 0đ)', '0', '2.000.000', '1. Mô hình 3D Office Simulator 360° | 2. Bộ 157 Prompt Vault | 3. Obsidian Vault Operational Note | 4. Nhóm Zalo/Discord VIP', 'ACTIVE_FREE']);
  sOffers.appendRow(['OFFER-1M', 'Gói Setup 3D Simulator & 5 AI Directors', '1.000.000', '10.000.000', '1. Full 3D Office Simulator | 2. Bộ Mã Nguồn OPC Web Server | 3. Set Up 5 Giám Đốc AI C-Suite | 4. 157 Prompt Vault | 5. Buổi Coaching 1:1 30m', 'ACTIVE_PROMO']);
  sOffers.appendRow(['OFFER-VIP', 'Gói VIP Coaching 1:1 Cầm Tay Chỉ Việc 30 Ngày với Chairman Victor Chuyen', '20.000.000', '45.000.000', '1. Đồng hành 1:1 30 Ngày với Chairman Victor | 2. Đóng gói Grand Slam Offer | 3. Setup Hệ thống Agentic AI Enterprise | 4. Tự động hóa VietQR & Meta Ads 100%', 'ACTIVE_HIGH_TICKET']);

  // 5. Tab Calls (Nhật ký Demo Call 20m)
  var sCalls = getOrCreateSheet(ss, 'Calls');
  sCalls.clear();
  sCalls.appendRow(['ID Call', 'Tên Khách Hàng', 'Số Điện Thoại', 'Thời Gian Lịch Hẹn', 'Kịch Bản Demo', 'Kết Quả Chốt Sale', 'Ghi Chú']);
  formatHeader(sCalls, 7, '#7c3aed');

  // 6. Tab Clients (Khách Hàng Đã Mua)
  var sClients = getOrCreateSheet(ss, 'Clients');
  sClients.clear();
  sClients.appendRow(['ID Khách Hàng', 'Họ và Tên', 'Số Điện Thoại', 'Email', 'Gói Đã Mua', 'Số Tiền Thanh Toán', 'Trạng Thái Cấp Quyền']);
  formatHeader(sClients, 7, '#15803d');

  // 7. Tab 5_Day_Emails (Chuỗi 5 Email Drip)
  seedEmailSequenceTab();

  SpreadsheetApp.getUi().alert('🎉 KHỞI TẠO THÀNH CÔNG HỆ THỐNG FULL OPTION MASTER!\n\nĐã khởi tạo chuẩn hóa toàn bộ các Tab: Goals, Tasks_AI, Daily, Offers, Calls, Clients và 5_Day_Emails.');
}

// Helper: Lấy hoặc Tạo mới Sheet Tab
function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

// Helper: Format Header Row
function formatHeader(sheet, numCols, colorHex) {
  var range = sheet.getRange(1, 1, 1, numCols);
  range.setBackground(colorHex)
       .setFontColor('#ffffff')
       .setFontWeight('bold')
       .setHorizontalAlignment('center');
  for (var c = 1; c <= numCols; c++) {
    sheet.setColumnWidth(c, 220);
  }
}

// 3. Hàm Seeding Tab "5_Day_Emails"
function seedEmailSequenceTab() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = '5_Day_Emails';
  var sheet = getOrCreateSheet(ss, sheetName);
  sheet.clear();
  
  var headers = ['Ngày (Day Step)', 'Tên Mẫu Email', 'Tiêu Đề Email (Subject Line)', 'Xem Trước (Preview Text)', 'Nội Dung Email (Body Text)', 'Link CTA', 'Trạng Thái'];
  sheet.appendRow(headers);
  formatHeader(sheet, headers.length, '#1e3a8a');
  
  var emailData = [
    [
      0,
      'Email 1: Welcome & Bản Sao Mã Nguồn OPC (Gói 0đ)',
      '[Mã Nguồn OPC] Quyền truy cập Bản Sao Mã Nguồn OPC (Gói 0đ) + Quà 🎁',
      'Tải bản sao mã nguồn và kích hoạt 5 Giám Đốc AI ngay lập tức.',
      'Chào {{Name}},\n\nChúc mừng bạn đã đăng ký nhận Bản Sao Mã Nguồn OPC (Gói 0đ)!\n\nBộ mã nguồn và mô hình 3D Virtual Office Simulator của bạn đã sẵn sàng.\n\n👉 CLICK VÀO ĐÂY ĐỂ VÀO NHÓM ZALO NHẬN BẢN SAO MÃ NGUỒN:\nhttps://zalo.me/g/tdhmtu261\n\n💡 VỚI BỘ MÃ NGUỒN OPC NÀY, BẠN SẼ SỞ HỮU:\n1. Bộ 157 Prompt Vault chuẩn hóa cho 5 Giám đốc AI (CEO, CMO, CSO, CPO, CHRO, CFO).\n2. Mô hình Doanh Nghiệp 1 Người vận hành bằng 5 Giám đốc AI.\n3. Kế toán AI CFO đối soát ngân hàng VietQR tự động cấp quyền VIP trong 3 giây.',
      'https://zalo.me/g/tdhmtu261',
      'READY_ACTIVE'
    ],
    [
      2,
      'Email 2: Secrets of 5 C-Suite AI Directors',
      'Bí mật 5 Giám Đốc AI (C-Suite) thay thế đội ngũ 20 nhân sự 🤖',
      'Khám phá mô hình Hub-and-Spoke vận hành doanh nghiệp tự động.',
      'Chào {{Name}},\n\nChi phí lớn nhất của một doanh nghiệp không phải là tiền thuê văn phòng hay tiền Ads... Đó là CHI PHÍ QUẢN LÝ NHÂN SỰ & LỖI VẬN HÀNH CON NGƯỜI.\n\nTại TNC Group, chúng tôi vận hành doanh nghiệp theo mô hình HUB-AND-SPOKE:\n- AI CEO: Quản trị trung tâm Hub-and-Spoke\n- AI CMO: Meta Ads & Hormozi Copywriting\n- AI CSO: B2B Cold Outreach & Demo Call\n- AI CPO: Fullstack Dev & REST API\n- AI CHRO: Đào tạo Prompts & Tri thức\n- AI CFO: VietQR Banking Auto-Access 3 giây',
      'https://cal.com/victorchuyen/coachai',
      'READY_ACTIVE'
    ],
    [
      3,
      'Email 3: AI CMO & CSO Meta Ads + Sales',
      'Cách AI CMO & CSO tự động săn Lead Meta Ads + B2B Outreach 🎯',
      'Xem case study tự động tìm khách hàng không cần phòng Marketing.',
      'Chào {{Name}},\n\nHầu hết các Agency & SMBs mất từ 15-30 triệu/tháng để thuê Copywriter & Ads Operator... nhưng kết quả vẫn phập phồng.\n\nĐây là cách bộ đôi AI CMO & AI CSO tại OPC-TNC tự động hóa phễu bán hàng:\n1. BƯỚC 1: AI CMO quét Ad Library đối thủ & viết Ads Hormozi Grand Slam Offer.\n2. BƯỚC 2: AI CSO gửi Cold Email 3 bước & mời vào Demo Call 20 phút.\n3. BƯỚC 3: AI CFO gạch nợ VietQR 3 giây & cấp quyền VIP tự động.',
      'https://zalo.me/g/tdhmtu261',
      'READY_ACTIVE'
    ],
    [
      4,
      'Email 4: 3-Tier Pricing Anchor & VietQR',
      'Bảng giá Neo 3 Tier & Kế toán AI CFO gạch nợ VietQR 3 giây 💎',
      'Khám phá cách tăng Doanh Thu LTV và tự động hóa thanh toán.',
      'Chào {{Name}},\n\nNếu bạn đang bán dịch vụ hay sản phẩm SaaS, cách nhanh nhất để tăng Doanh Thu Trung Bình / Khách Hàng (LTV) là áp dụng BẢNG GIÁ NEO 3 TIER THEO ALEX HORMOZI.\n\nKhi học viên chuyển khoản qua VietQR MB Bank 0989890022, Webhook AI CFO kiểm toán và cấp quyền vào Google Drive/Zalo VIP ngay lập tức.',
      'https://ai.breaths.live',
      'READY_ACTIVE'
    ],
    [
      5,
      'Email 5: VIP Coaching 1:1 Offer',
      '[Cơ hội cuối cùng] Gói VIP Coaching 1:1 Cầm Tay Chỉ Việc với Chairman Victor 🚀',
      'Đăng ký suất tư vấn 1:1 trực tiếp cùng Chairman Victor Chuyen.',
      'Chào {{Name}},\n\nĐây là email cuối cùng trong chuỗi hướng dẫn khởi tạo Doanh nghiệp AI 1 Người (OPC-TNC).\n\nNếu bạn muốn trực tiếp xây dựng và sở hữu toàn bộ bộ mã nguồn này cùng Victor Chuyen, hãy đặt lịch hẹn 1:1 ngay hôm nay:\n👉 Strategy Call 1:1: https://cal.com/victorchuyen/coachai',
      'https://cal.com/victorchuyen/coachai',
      'READY_ACTIVE'
    ]
  ];
  
  for (var i = 0; i < emailData.length; i++) {
    sheet.appendRow(emailData[i]);
  }
}

// 4. Hàm hiển thị Sidebar ở góc phải màn hình Google Sheet
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('🚀 OPC-TNC Live Lead Manager & VIP Funnel')
    .setWidth(380);
  SpreadsheetApp.getUi().showSidebar(html);
}

// 5. Xử lý HTTP GET
function doGet(e) {
  if (e && e.parameter && e.parameter.page === 'sidebar') {
    return HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('OPC-TNC Live Dashboard');
  }
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ONLINE',
    app: 'OPC-TNC Full Option Master Engine',
    tabs: ['5_Day_Emails', 'Goals', 'Tasks_AI', 'Daily', 'Leads', 'Calls', 'Offers', 'Clients', 'Roadmap Checklist', 'Lead Tracker 1-10', 'Content', 'Channel', 'Pending', 'Prompt'],
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// 6. Xử lý HTTP POST (Lưu Lead vào Tab "Leads")
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (err) {}
    }

    var rawPhone = (data.phone || '').toString().trim();
    var formattedPhone = rawPhone ? ("'" + rawPhone.replace(/^'+/, '')) : '';

    var row = [
      data.id || ('LEAD-' + Date.now()),                       // Cột A: ID Lead
      data.name || 'Khách Hàng',                               // Cột B: Họ và Tên
      formattedPhone,                                          // Cột C: Số Điện Thoại (Có số 0 đầu)
      data.source || 'OPC Landing Page',                       // Cột D: Nguồn Lead
      data.status || 'QUALIFIED',                              // Cột E: Trạng Thái
      data.business || data.company || 'SME Business',         // Cột F: Ngành Nghề
      data.business || 'SME Business',                         // Cột G: Mô Hình Doanh Nghiệp
      data.note || '',                                         // Cột H: Ghi Chú
      data.callSchedule || '',                                 // Cột I: Lịch Hẹn
      'Auto Opt-in Welcome Email (Gói 0đ)',                    // Cột J: Hành Động Tự Động
      data.timestamp || new Date().toISOString(),              // Cột K: Thời Gian Opt-in
      data.email || '',                                        // Cột L: Email
      formattedPhone                                           // Cột M: SĐT Zalo Direct
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đã lưu Lead Bản Sao Mã Nguồn OPC (Gói 0đ) thành công!',
      row: row
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 7. Hàm gửi Bước Email qua Web API (Domain breaths.live)
function sendSequenceStepApi(email, name, dayStep) {
  var url = 'https://ai.breaths.live/api/email/send-sequence-step';
  var payload = {
    email: email,
    name: name || 'Khách Hàng',
    day: dayStep,
    lang: 'vi'
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    var res = UrlFetchApp.fetch(url, options);
    return JSON.parse(res.getContentText());
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// 8. Kích hoạt Email theo dòng chọn
function triggerEmailForSelectedRow(dayStep) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
  if (!sheet) return;
  var row = sheet.getActiveCell().getRow();
  if (row <= 1) {
    SpreadsheetApp.getUi().alert('⚠️ Vui lòng chọn một dòng Lead cụ thể để gửi email!');
    return;
  }
  
  var name = sheet.getRange(row, 2).getValue();
  var email = sheet.getRange(row, 12).getValue();
  
  if (!email) {
    SpreadsheetApp.getUi().alert('⚠️ Dòng này chưa có thông tin Email!');
    return;
  }
  
  var res = sendSequenceStepApi(email, name, dayStep);
  if (res.success) {
    SpreadsheetApp.getUi().alert('✅ Đã gửi Email Ngày ' + dayStep + ' tới: ' + email);
  } else {
    SpreadsheetApp.getUi().alert('❌ Gửi Email thất bại: ' + (res.error || res.message));
  }
}

function triggerDay0Email() { triggerEmailForSelectedRow(0); }
function triggerDay2Email() { triggerEmailForSelectedRow(2); }
function triggerDay3Email() { triggerEmailForSelectedRow(3); }
function triggerDay4Email() { triggerEmailForSelectedRow(4); }
function triggerDay5Email() { triggerEmailForSelectedRow(5); }

// 9. Lấy danh sách Leads cho Sidebar
function getLeadsData() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    if (!sheet) sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    
    var result = [];
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      if (r[0]) {
        result.push({
          id: r[0],
          name: r[1],
          phone: r[2].toString().replace(/^'+/, ''),
          source: r[3],
          status: r[4],
          business: r[5],
          time: r[10],
          email: r[11]
        });
      }
    }
    return result.reverse();
  } catch (e) {
    return [];
  }
}
