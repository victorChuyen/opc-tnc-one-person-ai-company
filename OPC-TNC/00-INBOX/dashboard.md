# 📊 OPC TNC Dashboard

## Dự Án Đang Hoạt Động
```dataview
TABLE status, started, tags
FROM "01-PROJECTS"
WHERE status = "active"
SORT started DESC
```

## TODO Chưa Hoàn Thành
```dataview
TASK
WHERE !completed
GROUP BY file.link
LIMIT 20
```

## Notes Cập Nhật Gần Nhất
```dataview
TABLE file.mtime AS "Cập nhật", tags
FROM ""
WHERE file.name != "README"
SORT file.mtime DESC
LIMIT 15
```

## Quick Links
- [[01-PROJECTS/paperclip|🧠 Paperclip Control Plane]]
- [[01-PROJECTS/msmile-affiliate|📦 MSmile Affiliate]]
- [[01-PROJECTS/9router-gateway|🔀 9Router Gateway]]
- [[03-RESOURCES/agent-roster|🤖 Agent Roster]]
- [[03-RESOURCES/skills-catalog|📚 Skills Catalog]]
- [[03-RESOURCES/tech-stack|⚙️ Tech Stack]]
