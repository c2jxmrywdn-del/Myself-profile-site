# Myself-profile-site

一个活泼、友好的多页个人介绍网站，包含：首页、工作经历、个人生活、联系我。

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
- **新增社交链接**：在 `Contact` 或 `Layout` 组件里修改对应的 `href`。

## 注意

目前联系表单是展示用表单，不会真正发送邮件。接入真实邮箱服务后即可使用。
