#!/usr/bin/env python3
# ==============================================================================
# OPC-TNC COMPOSIO SOCIAL & EMAIL PUBLISHER ENGINE (V3 SDK)
# Author: LUCKY (AI Co-Founder) & AI Squad
# Purpose: 100% Automated Multi-Channel Publisher (Facebook, Gmail, Telegram) via Composio SDK V3
# Configured Credentials:
#   - FB Connected Account ID: ca_aQ1qcQE2V7ya
#   - Gmail Connected Account ID: ca_iavALyujy9P0
#   - Composio User ID: pg-test-007ec7c9-6fd2-4115-97d5-899231d5aa17
#   - Telegram Bot Token & Chat ID for Real-time Notification & Verification
# ==============================================================================

import os
import sys
import json
import argparse
import requests
from pathlib import Path
import composio

# Prevent Windows console charmap UnicodeEncodeError
if sys.stdout.encoding != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Load environment variables from .env
ENV_FILE = Path(__file__).resolve().parent.parent / ".env"
if ENV_FILE.exists():
    with open(ENV_FILE, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip().strip('"').strip("'")

COMPOSIO_API_KEY = os.environ.get("COMPOSIO_API_KEY", "ak__DDMN5lVtq2gkNYRzQeB")
COMPOSIO_FB_ACCOUNT_ID = os.environ.get("COMPOSIO_FB_CONNECTED_ACCOUNT_ID", "ca_aQ1qcQE2V7ya")
COMPOSIO_GMAIL_ACCOUNT_ID = os.environ.get("COMPOSIO_GMAIL_CONNECTED_ACCOUNT_ID", "ca_iavALyujy9P0")
COMPOSIO_USER_ID = os.environ.get("COMPOSIO_USER_ID", "pg-test-007ec7c9-6fd2-4115-97d5-899231d5aa17")
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "8257466148:AAGjwgPgoGWMknWizOvAmQ_78RaJX60owz8")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_GROUP_ID", "-1001812138135")

DEFAULT_FB_PAGE_ID = os.environ.get("FACEBOOK_PAGE_ID", "816587371533949")  # AI Profit Lab

def get_composio_client():
    return composio.Composio(api_key=COMPOSIO_API_KEY)

def send_telegram_report(caption_html, video_path=None):
    """
    Sends real-time verification report to OPC-TNC Telegram group.
    If video_path is provided and exists, sends real MP4 video attachment along with caption.
    """
    print(f"[*] Sending verified report to Telegram Chat ID: {TELEGRAM_CHAT_ID}...")
    try:
        if video_path and os.path.exists(video_path):
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendVideo"
            with open(video_path, "rb") as vf:
                res = requests.post(
                    url,
                    data={"chat_id": TELEGRAM_CHAT_ID, "caption": caption_html, "parse_mode": "HTML"},
                    files={"video": vf},
                    timeout=30
                )
        else:
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            res = requests.post(
                url,
                json={"chat_id": TELEGRAM_CHAT_ID, "text": caption_html, "parse_mode": "HTML"},
                timeout=15
            )
        if res.status_code == 200:
            print("   [+] Telegram notification sent successfully!")
            return True
        else:
            print(f"   [!] Failed to send Telegram notification: {res.status_code} - {res.text}")
            return False
    except Exception as e:
        print(f"   [!] Telegram report error: {e}")
        return False

def list_managed_pages():
    print(f"[*] Fetching Facebook Managed Pages from Account ID: {COMPOSIO_FB_ACCOUNT_ID}...")
    c = get_composio_client()
    res = c.tools.execute(
        slug="FACEBOOK_LIST_MANAGED_PAGES",
        connected_account_id=COMPOSIO_FB_ACCOUNT_ID,
        user_id=COMPOSIO_USER_ID,
        arguments={},
        dangerously_skip_version_check=True
    )
    pages = res.get("data", {}).get("data", [])
    print(f"\n[+] Managed Pages Found ({len(pages)}):")
    for p in pages:
        print(f"   - ID: {p.get('id')} | Name: {p.get('name')}")
    return pages

def post_to_facebook(content, link=None, page_id=DEFAULT_FB_PAGE_ID, video_path=None):
    print(f"\n=======================================================")
    print(f"🚀 PUBLISHING TO FACEBOOK via COMPOSIO SDK V3")
    print(f"=======================================================")
    print(f"Page ID: {page_id}\nContent:\n{content}\n")
    
    c = get_composio_client()
    args = {"page_id": str(page_id), "message": content}
    if link:
        args["link"] = link

    res = c.tools.execute(
        slug="FACEBOOK_CREATE_POST",
        connected_account_id=COMPOSIO_FB_ACCOUNT_ID,
        user_id=COMPOSIO_USER_ID,
        arguments=args,
        dangerously_skip_version_check=True
    )
    
    if res.get("successful"):
        post_id = res.get("data", {}).get("id", "UNKNOWN")
        post_url = f"https://www.facebook.com/{page_id}/posts/{post_id.split('_')[-1]}"
        print(f"   [+] Published Live! Facebook Post ID: {post_id}")
        print(f"   [+] URL: {post_url}")
        
        # Build live Telegram report
        caption = f"""<b>🎉 [AI SQUAD - COMPOSIO V3] XUẤT BẢN THÀNH CÔNG BÀI VIẾT LÊN FACEBOOK</b>

<b>📌 Thông tin xuất bản xác thực:</b>
• <b>Page ID:</b> <code>{page_id}</code>
• <b>Post ID:</b> <code>{post_id}</code>
• <b>Link ID bài viết:</b> {post_url}
• <b>Trạng thái:</b> ✅ Published Live

<b>👉 VSL & Cal Booking:</b> https://cal.com/victorchuyen/coachai"""

        send_telegram_report(caption, video_path=video_path)
    else:
        print(f"   [!] Publishing failed: {res.get('error')}")
    return res

def post_to_facebook_video(video_path, title, description, page_id=DEFAULT_FB_PAGE_ID):
    """
    Uploads a real MP4 video file as a Video/Reel Post to Facebook Page and sends live verified link to Telegram.
    """
    print(f"\n=======================================================")
    print(f"🎬 PUBLISHING VIDEO REEL TO FACEBOOK via COMPOSIO SDK V3")
    print(f"=======================================================")
    print(f"Page ID: {page_id} | Video File: {video_path}\nTitle: {title}\n")
    
    c = get_composio_client()
    pages_res = c.tools.execute(
        slug="FACEBOOK_LIST_MANAGED_PAGES",
        connected_account_id=COMPOSIO_FB_ACCOUNT_ID,
        user_id=COMPOSIO_USER_ID,
        arguments={},
        dangerously_skip_version_check=True
    )
    pages = {str(p["id"]): p for p in pages_res.get("data", {}).get("data", [])}
    if str(page_id) not in pages:
        print(f"   [!] Error: Page ID {page_id} not found in managed pages list.")
        return {"error": "Page not found", "successful": False}
    
    token = pages[str(page_id)].get("access_token")
    url = f"https://graph-video.facebook.com/v20.0/{page_id}/videos"
    data = {
        "access_token": token,
        "title": title,
        "description": description
    }
    with open(video_path, "rb") as vf:
        r = requests.post(url, data=data, files={"source": vf}, timeout=120)
    
    if r.status_code == 200:
        video_id = r.json().get("id")
        reel_url = f"https://www.facebook.com/reel/{video_id}"
        watch_url = f"https://www.facebook.com/watch/?v={video_id}"
        print(f"   [+] Published Video Reel Live! Video ID: {video_id}")
        print(f"   [+] Reel URL: {reel_url}")
        
        caption = f"""<b>🎬 [AI SQUAD - COMPOSIO V3] PUBLISH THÀNH CÔNG VIDEO REEL LÊN FACEBOOK PAGE</b>

<b>📌 Link Video ID thực tế (Live Verified):</b>
• <b>Page Name:</b> {pages[str(page_id)].get('name')} (ID: <code>{page_id}</code>)
• <b>Video / Reel ID:</b> <code>{video_id}</code>
• <b>🔗 Link Video Reel (Facebook Live):</b>
{reel_url}
• <b>🔗 Link Watch (Alternative):</b>
{watch_url}

<b>🎬 Tệp Video gốc thực tế:</b> <i>{Path(video_path).name} (đã kiểm định)</i>
<b>👉 VSL & Cal Booking:</b> https://cal.com/victorchuyen/coachai"""

        send_telegram_report(caption, video_path=video_path)
        return {"data": {"id": video_id, "reel_url": reel_url, "watch_url": watch_url}, "successful": True}
    else:
        print(f"   [!] Video publishing failed: {r.status_code} - {r.text}")
        return {"error": r.text, "status_code": r.status_code, "successful": False}

def send_gmail(recipient, subject, body_text):
    print(f"\n=======================================================")
    print(f"📧 SENDING EMAIL via GMAIL COMPOSIO SDK V3")
    print(f"=======================================================")
    print(f"To: {recipient} | Subject: {subject}\n")
    c = get_composio_client()
    res = c.tools.execute(
        slug="GMAIL_SEND_EMAIL",
        connected_account_id=COMPOSIO_GMAIL_ACCOUNT_ID,
        user_id=COMPOSIO_USER_ID,
        arguments={
            "recipient_email": recipient,
            "subject": subject,
            "body": body_text
        },
        dangerously_skip_version_check=True
    )
    return res

def test_all_connections():
    print(f"=======================================================")
    print(f"⚡ COMPOSIO SDK V3 LIVE DIAGNOSTIC REPORT")
    print(f"=======================================================")
    print(f"API Key: {COMPOSIO_API_KEY[:6]}...{COMPOSIO_API_KEY[-4:]}")
    print(f"User ID: {COMPOSIO_USER_ID}\n")
    
    c = get_composio_client()
    user_res = c.tools.execute(
        slug="FACEBOOK_GET_CURRENT_USER",
        connected_account_id=COMPOSIO_FB_ACCOUNT_ID,
        user_id=COMPOSIO_USER_ID,
        arguments={},
        dangerously_skip_version_check=True
    )
    
    status = {
        "facebook_account_id": COMPOSIO_FB_ACCOUNT_ID,
        "facebook_user": user_res.get("data", {}).get("name"),
        "composio_user_id": COMPOSIO_USER_ID,
        "sdk_version": "v3"
    }
    print(f"\n[✓] Diagnostic completed: {json.dumps(status, indent=2, ensure_ascii=False)}")
    return status

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OPC-TNC Composio Automated Multi-Channel Publisher")
    parser.add_argument("--action", choices=["test", "list_pages", "post_fb", "post_fb_video", "send_mail"], default="test", help="Action to perform")
    parser.add_argument("--content", type=str, help="Content/description to post on Facebook")
    parser.add_argument("--title", type=str, default="48 GIỜ ĐỂ AI VẬN HÀNH DOANH NGHIỆP THAY ANH", help="Title of Video Reel")
    parser.add_argument("--link", type=str, default="https://cal.com/victorchuyen/coachai", help="URL link to include in post")
    parser.add_argument("--page-id", type=str, default=DEFAULT_FB_PAGE_ID, help="Facebook Page ID")
    parser.add_argument("--video-path", type=str, help="Path to local MP4 video file to upload")
    parser.add_argument("--to", type=str, help="Recipient email address")
    parser.add_argument("--subject", type=str, default="[OPC-TNC AI Squad Notification]", help="Email subject")
    parser.add_argument("--body", type=str, help="Email body text")

    args = parser.parse_args()

    if args.action == "test":
        test_all_connections()
    elif args.action == "list_pages":
        list_managed_pages()
    elif args.action == "post_fb":
        if not args.content:
            print("[!] Error: --content required for post_fb action")
            sys.exit(1)
        post_to_facebook(args.content, link=args.link, page_id=args.page_id, video_path=args.video_path)
    elif args.action == "post_fb_video":
        if not args.video_path or not args.content:
            print("[!] Error: --video-path and --content required for post_fb_video action")
            sys.exit(1)
        post_to_facebook_video(args.video_path, title=args.title, description=args.content, page_id=args.page_id)
    elif args.action == "send_mail":
        if not args.to or not args.body:
            print("[!] Error: --to and --body required for send_mail action")
            sys.exit(1)
        send_gmail(args.to, args.subject, args.body)
