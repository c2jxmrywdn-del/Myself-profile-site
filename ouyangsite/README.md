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
## 新版简历首页

首页已改造成参考 21st.dev Hero 交互语言的原创中英双语简历页：包括柔和渐变光晕、低对比度网格、四角框标记、状态脉冲、打字机关键词和光泽按钮。实现不依赖 21st.dev 的 API Key，也不复制其品牌文案或源码。详细逆向设计记录见 `plan.md`。 首页还加入了轻量 Canvas 粒子层：背景粒子缓慢漂浮，鼠标移动会生成带速度、颜色和衰减的光点拖影，并遵循 `prefers-reduced-motion`。 标题框区域还会周期性出现左右穿行的长尾彗星粒子。 当前 Ribbon 版本在标题框内部使用 8 股二次曲线丝带，按鼠标速度插值，采用粉紫霓虹、lighter 叠加、模糊光晕与约 1.5 秒尾部衰减。 性能方面已限制 Canvas 像素比最高 1.25、绘制频率约 32 FPS、Ribbon 轨迹 78 点、6 股路径、鼠标粒子最多 180 个。
