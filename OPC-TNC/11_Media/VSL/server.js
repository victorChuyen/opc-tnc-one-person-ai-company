const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5678;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PHỤC VỤ FILE TĨNH
// Nếu index.html nằm cùng thư mục với server.js thì dùng express.static(__dirname)
// Nếu anh để index.html trong thư mục public thì đổi lại thành path.join(__dirname, 'public')
app.use(express.static(__dirname));

// ROUTE TRANG CHỦ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API KIỂM TRA SERVER
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server OPC-TNC đang chạy',
    port: PORT
  });
});

// API KHỞI ĐỘNG N8N
app.post('/start-n8n', (req, res) => {
  const batPath = path.join(__dirname, 'start-n8n.bat');

  if (!fs.existsSync(batPath)) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy file start-n8n.bat trong cùng thư mục với server.js'
    });
  }

  try {
    const bat = spawn('cmd.exe', ['/c', 'start', '', '/min', batPath], {
      detached: true,
      stdio: 'ignore'
    });

    bat.unref();

    return res.json({
      success: true,
      message: 'Đã gửi lệnh khởi động n8n ở chế độ nền'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Có lỗi khi khởi động n8n',
      error: error.message
    });
  }
});

// FALLBACK 404
app.use((req, res) => {
  res.status(404).send('404 - Không tìm thấy đường dẫn.');
});

// CHẠY SERVER
app.listen(PORT, () => {
  console.log('==============================');
  console.log(`🟢 OPC-TNC server đang chạy`);
  console.log(`👉 Landing page: http://localhost:${PORT}`);
  console.log(`👉 Health check : http://localhost:${PORT}/health`);
  console.log('==============================');
});