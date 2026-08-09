import fs from 'fs';
import path from 'path';

console.log(`==================================================`);
console.log(`🌐 OPC-TNC 10 SUBDOMAIN POOL DNS CONFIGURATION MATRIX`);
console.log(`Subdomains: opc1.breaths.live -> opc10.breaths.live`);
console.log(`==================================================\n`);

const dnsMatrix = [];

for (let i = 1; i <= 10; i++) {
  const subdomain = `opc${i}.breaths.live`;
  dnsMatrix.push({
    subdomain_id: `OPC-${i}`,
    subdomain_name: subdomain,
    sender_identity: `🚀 OPC TNC | One Person Company <victor@${subdomain}>`,
    env_key: `RESEND_API_KEY_OPC${i}`,
    dns_records: {
      spf_txt: {
        name: subdomain,
        type: 'TXT',
        value: 'v=spf1 include:resend.com ~all'
      },
      dmarc_txt: {
        name: `_dmarc.${subdomain}`,
        type: 'TXT',
        value: 'v=DMARC1; p=none; rua=mailto:dmarc@breaths.live'
      },
      dkim_cname_note: 'Bản ghi DKIM CNAME sẽ được tạo tự động khi anh Add Domain opc' + i + '.breaths.live trên Resend Dashboard.'
    }
  });
}

console.log(JSON.stringify(dnsMatrix, null, 2));

const outputPath = path.join(process.cwd(), 'data', 'dns_matrix_opc1_10.json');
fs.writeFileSync(outputPath, JSON.stringify(dnsMatrix, null, 2), 'utf8');

console.log(`\n🎉 DNS Matrix exported to data/dns_matrix_opc1_10.json!`);
