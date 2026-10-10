# 后端第一版

- Server + Managed MySQL 已获用户确认并启用。
- 现有四个前端页面继续由同一 Vite 应用提供，API 统一位于 `/api/*`。
- `contact_messages` 保存联系表单；`guestbook_messages` 使用 pending/approved/rejected 审核状态；`profile_content` 保存可由管理员修改的中英资料 JSON。
- 管理员使用 Manus OAuth；后端只接受带有项目所有者身份声明的会话，不能仅凭公开访客登录获得管理权限。
- 开发和发布使用同一数据库，所有测试写入都是真实项目数据；不执行破坏性 SQL。
- 本阶段不提交检查点、不推送 GitHub、不发布网站。
