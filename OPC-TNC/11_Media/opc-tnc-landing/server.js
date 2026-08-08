const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5678;

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, 'public'), {
    extensions: ['html']
  })
);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', function (req, res) {
  res.json({
    success: true,
    app: 'OPC Landing',
    status: 'running',
    port: PORT,
    time: new Date().toISOString()
  });
});

app.post('/start-n8n', function (req, res) {
  const batPath = path.join(__dirname, 'start-n8n.bat');

  if (process.platform !== 'win32') {
    return res.status(400).json({
      success: false,
      message: 'Tính năng này chỉ hỗ trợ Windows.'
    });
  }

  if (!fs.existsSync(batPath)) {
    return res.status(404).json({
      success: false,
      message: 'Chưa có file start-n8n.bat trong thư mục dự án.'
    });
  }

  try {
    const child = spawn(
      'cmd.exe',
      ['/c', 'start', '', '/min', batPath],
      {
        detached: true,
        stdio: 'ignore',
        windowsHide: true
      }
    );

    child.unref();

    return res.json({
      success: true,
      message: 'Đã gửi lệnh khởi động hệ thống.'
    });
  } catch (error) {
    console.error('Start n8n error:', error);

    return res.status(500).json({
      success: false,
      message: 'Không thể khởi động hệ thống.',
      error: error.message
    });
  }
});

app.use(function (req, res) {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>404 - OPC</title>
    </head>
    <body style="font-family:Arial;padding:40px">
      <h1>404</h1>
      <p>Không tìm thấy trang này.</p>
      <a href="/">Quay lại trang chủ</a>
    </body>
    </html>
  `);
});

app.use(function (error, req, res, next) {
  console.error('Server error:', error);

  res.status(500).json({
    success: false,
    message: 'Lỗi server nội bộ.'
  });
});

app.listen(PORT, function () {
  console.log('======================================');
  console.log('🟢 OPC Landing đang chạy');
  console.log(`👉 Trang chủ: http://localhost:${PORT}`);
  console.log(`👉 Kiểm tra: http://localhost:${PORT}/health`);
  console.log('======================================');
});