# Ouyang Jason 个人网站

这是一个独立于 `Myself-profile-site` 的 Manus 托管网站副本，包含：首页、工作经历、个人生活、联系我，并支持顶部按钮切换中文 / English。

## 本地运行

```bash
npm install
npm run dev
```

打开终端显示的本地地址即可预览。

## 自己修改网站

- **修改颜色**：编辑 `src/styles.css` 顶部的 `:root`，例如 `--coral` 是主珊瑚色，`--yellow` 是黄色，`--mint` 是绿色。
- **修改文字**：编辑 `src/main.jsx` 顶部的 `profile`，以及 `Home`、`Work`、`Life`、`Contact` 组件中的文字。
- **替换照片**：在 `Home` 组件中找到 `.portrait-image`，将它替换成 `<img src="/your-photo.jpg" alt="我的照片" />`，并把图片放入 `public/` 文件夹。
- **修改社交链接**：编辑 `src/main.jsx` 中的 `socials` 数组。
- **修改语言文案**：编辑 `src/main.jsx` 顶部的 `copy.zh` 和 `copy.en` 对象。
- **修改兴趣内容**：个人生活页目前突出展示旅行，也可以在 `Life` 组件和对应文案对象中替换。
- **联系表单**：当前已接入 Formspree 表单 `xyezvnag`，收件邮箱与自动回复设置请在 Formspree 控制台管理。

## 当前个人信息

- Ouyang Jason
- 2006 年 10 月出生
- 在读大学生
