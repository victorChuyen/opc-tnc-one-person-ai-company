import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawYbaiText = `
1	567890	MONEY AI	ct1.dhgroup@gmail.com	09815266130
2	bzeu9k	Phương Xuân	Xuanphuong21manulife@gmail.com	0984355305
3	968968	Huỳnh Nguyệt	hainguyet9168@gmail.com	0935509168
4	ph8kod	Từ Chí Nguyện	tuchinguyen.ctv@gmail.com	0918694886
5	xw16ou	 Huỳnh Thị Hoài Thương	hoaithuong2112004@gmail.com	0329778392
6	tf28q2	 Phan Lê Thanh Phương	thanhphuong22062006@gmail.com	0916061175
7	e61gcb	 Trần Phương Xa	xa250403@gmail.com	0964089122
8	ufkp9q	 Nguyễn Anh	anhtruc1711dn@gmail.com	0905538111
9	a6lpon	 Trần Thị Mỹ Tiền	smilemb56789@gmail.com	0368327963
10	gjbeq8	 Trần Thị Dương Thanh	hoctap.duongthanh@gmail.com	0986645406
11	fh2dez	 Đỗ Thùy Dương	thuyduongdo328@gmail.com	0387101493
12	smdqxc	 Han Phan	tule406@gmail.com	0973424212
13	dtfqrj	 Vũ Khanh	khanhkhanh1337@gmail.com	0329381305
14	rlqawr	 Đạt  Phan	phandatblue1@gmail.com	0796222952
15	beorfc	 da	Datmarketinng@gmail.com	0822813699
16	tn6l4s	 Anh dat	Thelastear123@gmail.com	04961677176
17	qaxofu	 hoang le	hoangtalu@gmail.com	0968141993
18	wxbkr3	 Nguyễn Thị Quỳnh Hương	s.potato.17.04.03@gmail.com	0379921703
19	hfcpbw	 BUOI	tothibuoi2003@gmail.com	0973428305
20	r7qphv	 Cao Hải Đăng	caohaidang2004@gmail.com	0838319019
21	o3rxwm	 taiedupro	taiedupro@gmail.com	0983904114
22	nw2vaq	 Nguyễn Viết Cường	cuongg99999@gmail.com	0583663456
23	tkwqh4	 HIẾU	0901985886@gmail.com	0901985886
24	xji1hf	 HIỆP	0796017318@gmail.com	0796017318
25	yuzsry	 VĂN HIỆP	0986600007@gmail.com	0986600007
26	pawgkw	 THÀNH CÔNG	0983444680@gmail.com	0983444680
27	sci69m	 nguyễn hạnh	lenhungpnt@gmail.com	0855718475
28	whccbv	 Nguyễn Thị Oanh	nguyenthioanh1998ha@gmail.com	0989195838
29	ujecpn	 đỗ ngọc đại	gauvoi20122016@gmail.com	0375883990
30	8hw48j	 Nguyễn Thị Thảo	nguyenthithao1983ha@gmail.com	0375450783
31	itw1qs	 Nguyễn Thị Luyện	nguyenthiluyen1986ha@gmail.com	0962891137
32	dwtvn8	 Nguyễn Ngọc Anh	nguyenthianh1985ha@gmail.com	0986882039
33	rm77kl	 MAI VĂN HOÀI	maihoai1953nd@gmail.com	0983428558
34	zqkar0	 HOÀNG THỊ DUNG	hoangdung123123a@gmail.com	0914365588
35	0azugr	 Đỗ Quang Dương	ths.nhungle@gmail.com	0888675773
36	lvmhmf	 Đỗ Lê Ngọc Khanh	ledai.sbr@gmail.com	0965527037
37	uvqvkw	 LÊ THỊ NHUNG	Lenhung.sbr@gmail.com	0987811365
`;

function parseYbaiLeads(text) {
    const lines = text.trim().split('\n');
    const leads = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        const parts = trimmed.split('\t');
        if (parts.length >= 5) {
            const stt = parts[0].trim();
            const code = parts[1].trim();
            const name = parts[2].trim();
            const email = parts[3].trim().toLowerCase();
            const phone = parts[4].trim();

            leads.push({
                id: `LEAD-YBAI-${code}`,
                stt: parseInt(stt, 10),
                name: name,
                email: email,
                phone: phone,
                business: 'Đại Sứ YBAI / Solopreneur',
                source: 'OLD_DATABASE_YBAI',
                ambassador_code: code,
                timestamp: new Date().toISOString(),
                status: 'WARM',
                step: 'NOT_SENT',
                open_count: 0,
                last_opened_at: null
            });
        }
    });

    return leads;
}

const parsedLeads = parseYbaiLeads(rawYbaiText);
console.log(`✅ Parsed ${parsedLeads.length} YBAI Leads.`);

// Load existing leads_db.json
const dbPath = path.join(__dirname, '..', 'data', 'leads_db.json');
let existingDb = [];
if (fs.existsSync(dbPath)) {
    try {
        existingDb = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {
        existingDb = [];
    }
}

// Map existing emails for deduplication
const existingEmails = new Set(existingDb.map(item => item.email ? item.email.toLowerCase() : ''));

let addedCount = 0;
parsedLeads.forEach(lead => {
    if (!existingEmails.has(lead.email)) {
        existingDb.push(lead);
        existingEmails.add(lead.email);
        addedCount++;
    }
});

// Save updated leads_db.json
fs.writeFileSync(dbPath, JSON.stringify(existingDb, null, 2), 'utf8');

// Also save standalone backup file data/ybai_leads_37.json
const backupPath = path.join(__dirname, '..', 'data', 'ybai_leads_37.json');
fs.writeFileSync(backupPath, JSON.stringify(parsedLeads, null, 2), 'utf8');

console.log(`🎉 SUCCESS: Added ${addedCount} new YBAI leads to leads_db.json (Total DB size: ${existingDb.length}). Backup saved to data/ybai_leads_37.json.`);
