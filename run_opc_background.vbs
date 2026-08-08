' OPC-TNC Silent Background Runner (No CMD Window)
' Starts Node.js Web Server (Port 8085), Telegram Bot Engine (@OPCTNC_bot), Python Autonomous Worker, and Cloudflare Tunnel silently on Windows boot

Set WshShell = CreateObject("WScript.Shell")
strWorkDir = "D:\OPC-TNC"

' [1/3] Start Node.js serve_local.mjs silently (WindowStyle 0 = Hidden)
WshShell.Run "node """ & strWorkDir & "\serve_local.mjs""", 0, False

' Wait 2 seconds for local server & Telegram bot to initialize
WScript.Sleep 2000

' [2/3] Run Python Autonomous AI Squad Worker for Obsidian Vault Daily Note & KPI scan
WshShell.Run "python """ & strWorkDir & "\OPC-TNC\scripts\opc_autonomous_worker.py""", 0, False

' [3/3] Start Cloudflare Tunnel opc-tnc-tunnel silently (WindowStyle 0 = Hidden)
WshShell.Run "cloudflared tunnel run --url http://localhost:8085 opc-tnc-tunnel", 0, False
