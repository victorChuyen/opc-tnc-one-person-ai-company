@echo off
title OPC TNC — Online Cloudflare Tunnel (opc.breaths.live)
color 0A

echo ========================================================
echo   OPC TNC GROUP — VĂN PHÒNG ẢO 3D REALTIME ONLINE
echo   Domain: https://opc.breaths.live
echo ========================================================
echo.

echo [1/2] khoi dong Local Web Server port 8085...
start "OPC Web Server 8085" /min node d:\OPC-TNC\serve_local.mjs

timeout /t 2 >nul

echo [2/2] Ket noi Cloudflare Tunnel sang domain opc.breaths.live...
cloudflared tunnel run opc-tnc-tunnel

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HUONG DAN DUYET TUNNEL CLOUDFLARE BAN DAU]:
    echo Neu ban chua dang nhap cloudflared hoac chua gan DNS, chay 3 lenh sau:
    echo   1. cloudflared tunnel login
    echo   2. cloudflared tunnel create opc-tnc-tunnel
    echo   3. cloudflared tunnel route dns opc-tnc-tunnel opc.breaths.live
    echo.
    echo [CHAY QUICK TUNNEL MANG TINH DEMO TAP THOI]:
    cloudflared tunnel --url http://localhost:8085
)

pause
