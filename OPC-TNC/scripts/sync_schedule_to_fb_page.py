#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OPC-TNC Facebook Page Scheduler Sync
Syncs real video posts from 30_day_posting_schedule.json directly to Facebook Page 'AI Profit Lab'
as SCHEDULED POSTS so they appear in Facebook Professional Dashboard -> Content Library -> "Đã lên lịch".
"""

import os
import sys
import json
import time
import requests
import datetime
import argparse
from pathlib import Path
import composio

sys.stdout.reconfigure(encoding="utf-8")

API_KEY = "ak__DDMN5lVtq2gkNYRzQeB"
USER_ID = "pg-test-007ec7c9-6fd2-4115-97d5-899231d5aa17"
FB_ACCOUNT_ID = "ca_aQ1qcQE2V7ya"
PAGE_ID = "816587371533949"  # AI Profit Lab

def get_page_access_token():
    
    # 1. Get Page access token via Composio SDK v3
    c = composio.Composio(api_key=API_KEY)
    res = c.tools.execute(
        slug="FACEBOOK_LIST_MANAGED_PAGES",
        connected_account_id=FB_ACCOUNT_ID,
        user_id=USER_ID,
        arguments={},
        dangerously_skip_version_check=True
    )
    pages = {str(p["id"]): p for p in res.get("data", {}).get("data", [])}
    if PAGE_ID not in pages:
        print(f"[!] Error: Page {PAGE_ID} not found!")
        sys.exit(1)
    return pages[PAGE_ID].get("access_token")

def sync_scheduled_posts(days_to_sync=3, start_day=1):
    """
    Reads 30_day_posting_schedule.json and schedules video posts to Facebook Page
    starting from start_day (1-indexed) for days_to_sync days.
    """
    print("==========================================================================")
    print(f"🚀 SYNCING SCHEDULED VIDEO POSTS TO FACEBOOK PAGE (ID: {PAGE_ID})")
    print(f"   Day Range: Day {start_day} to Day {start_day + days_to_sync - 1} ({days_to_sync * 3} posts)")
    print("==========================================================================")
    
    # 1. Get access token
    token = get_page_access_token()
    
    # 2. Load schedule JSON
    schedule_file = "d:/OPC-TNC/OPC-TNC/11_Media/Video/30_day_posting_schedule.json"
    if not os.path.exists(schedule_file):
        print(f"[-] Schedule file not found: {schedule_file}")
        return []
        
    with open(schedule_file, "r", encoding="utf-8") as f:
        schedule_data = json.load(f)
    
    items = schedule_data.get("schedule", []) if isinstance(schedule_data, dict) else schedule_data
    
    # Load all unique mp4 video files
    import glob
    video_dir = "d:/OPC-TNC/OPC-TNC/11_Media/Video"
    mp4_files = sorted([f for f in glob.glob(f"{video_dir}/*.mp4") if "MERGED" not in f])
    print(f"[+] Loaded {len(mp4_files)} unique MP4 video files from {video_dir}")
    
    # 3. Schedule posts for future days
    url = f"https://graph-video.facebook.com/v20.0/{PAGE_ID}/videos"
    now_ts = int(time.time())
    
    # Start tomorrow at 08:30 UTC+7 (or future slots)
    base_date = datetime.date.today() + datetime.timedelta(days=1)
    slot_hours = [(8, 30), (11, 30), (20, 0)]  # 3 slots per day
    
    scheduled_ids = []
    start_idx = (start_day - 1) * 3
    end_idx = min(len(items), (start_day - 1 + days_to_sync) * 3)
    total_posts = end_idx - start_idx
    
    print(f"[*] Starting sync for {total_posts} video posts (Indices {start_idx} -> {end_idx-1})...")
    
    for idx in range(start_idx, end_idx):
        item = items[idx]
        day_idx = idx // 3
        slot_idx = idx % 3
        
        post_date = base_date + datetime.timedelta(days=day_idx)
        hour, min_val = slot_hours[slot_idx]
        
        # Construct timezone-aware datetime (UTC+7) -> Unix timestamp
        dt = datetime.datetime(post_date.year, post_date.month, post_date.day, hour, min_val, 0)
        schedule_ts = int(dt.timestamp())
        
        # Ensure timestamp is at least 15 minutes in the future
        if schedule_ts <= now_ts + 900:
            schedule_ts = now_ts + 1800 + ((idx - start_idx) * 3600)
        
        # Select unique video file for this post
        video_path = mp4_files[idx % len(mp4_files)]
        video_name = os.path.basename(video_path)
            
        title = item.get("title", f"48 GIỜ ĐỂ AI VẬN HÀNH DOANH NGHIỆP - Ngày {day_idx+1}")
        caption = item.get("caption", "") + f"\n\n👉 Booking tư vấn 30': https://cal.com/victorchuyen/coachai\n#OPCTNC #AIProfitLab #Day{day_idx+1}"
        
        data = {
            "access_token": token,
            "title": title,
            "description": caption,
            "published": "false",
            "scheduled_publish_time": str(schedule_ts)
        }
        
        print(f"   [{idx-start_idx+1}/{total_posts}] Uploading scheduled post for {dt.strftime('%Y-%m-%d %H:%M')} | Video: {video_name} -> {title[:40]}...")
        with open(video_path, "rb") as vf:
            r = requests.post(url, data=data, files={"source": vf}, timeout=120)
            
        if r.status_code == 200:
            vid_id = r.json().get("id")
            print(f"       ✅ Scheduled successfully! Facebook Video/Post ID: {vid_id} (File: {video_name})")
            scheduled_ids.append({"id": vid_id, "time": dt.strftime('%Y-%m-%d %H:%M'), "title": title, "video_file": video_name})
        else:
            print(f"       ❌ Failed ({r.status_code}): {r.text}")
            
    print("\n==========================================================================")
    print(f"🎉 COMPLETED SYNCING {len(scheduled_ids)} SCHEDULED POSTS TO FACEBOOK PAGE!")
    print("==========================================================================")
    return scheduled_ids

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync Scheduled Video Posts to Facebook Page")
    parser.add_argument("--start-day", type=int, default=1, help="Start day (1-30)")
    parser.add_argument("--days", type=int, default=3, help="Number of days to sync")
    args = parser.parse_args()
    sync_scheduled_posts(days_to_sync=args.days, start_day=args.start_day)
