import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom';
import { ValidationError, useForm } from '@formspree/react';
import { ArrowUpRight, BriefcaseBusiness, Camera, Check, Coffee, Heart, MapPin, Menu, Sparkles, X } from "lucide-react";
import './styles.css';

const profile = {
  name: 'Ouyang Jason',
  role: '在读大学生 · 生活观察者',
  location: '上海 / 远程',
  intro: '2006 年 10 月出生，目前在读大学，也在认真认识这个世界。',
  bio: '我叫 Ouyang Jason，2006 年 10 月出生，目前还是一名大学生。喜欢和聪明、善良、有好奇心的人一起聊天，也在学习把平凡的日子过得有趣。',
};

function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  return <div className="site-shell">
    <header className="topbar">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">O</span><span>Ouyang's space</span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="打开导航">{open ? <X size={20}/> : <Menu size={20}/>}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <NavLink to="/" end onClick={() => setOpen(false)}>首页</NavLink>
        <NavLink to="/work" onClick={() => setOpen(false)}>工作经历</NavLink>
        <NavLink to="/life" onClick={() => setOpen(false)}>个人生活</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>联系我</NavLink>
      </nav>
      <Link className="nav-cta" to="/contact">认识一下 <ArrowUpRight size={16}/></Link>
    </header>
    <main>{children}</main>
    <footer className="footer"><span>© 2025 Ouyang Jason</span><span>做一个有趣且靠谱的人。</span><span className="footer-social"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="GitHub">GH</a><a href="#" aria-label="LinkedIn">in</a></span></footer>
  </div>
}

function Tag({ children, color = 'yellow' }) { return <span className={`tag ${color}`}>{children}</span> }
function PageIntro({ eyebrow, title, text }) { return <section className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section> }

function Home() {
  return <>
    <section className="hero page-wrap">
      <div className="hero-copy"><Tag color="coral">OPEN TO GOOD CONVERSATIONS</Tag><h1>你好，我是<br/><span>Ouyang <i>👋</i></span></h1><p className="hero-lede">{profile.intro}</p><div className="hero-actions"><Link className="button primary" to="/contact">和我聊聊 <ArrowUpRight size={18}/></Link><Link className="text-link" to="/work">看看我的工作 <span>→</span></Link></div><div className="mini-note"><span className="avatar-dot">O</span><span>2006 年 10 月出生 · 目前在读大学<br/><strong>也欢迎你来打个招呼</strong></span></div></div>
      <div className="hero-visual"><div className="sticker sticker-one">DESIGN<br/>WITH<br/>HEART</div><div className="portrait-card"><div className="portrait-image"><span>放一张<br/>你的照片</span></div><div className="portrait-caption"><span>today's mood</span><strong>curious & sunny</strong><span className="sun">☀</span></div></div><div className="scribble">✦</div><div className="circle-text">GOOD<br/>VIBES<br/>ONLY</div></div>
    </section>
    <section className="home-strip page-wrap"><div><span className="eyebrow">A LITTLE ABOUT ME</span><h2>认真工作，<br/><span>好好生活。</span></h2></div><div className="about-copy"><p>{profile.bio}</p><div className="stat-row"><div><strong>8+</strong><span>年设计经验</span></div><div><strong>24</strong><span>完成的项目</span></div><div><strong>∞</strong><span>好奇心</span></div></div><Link className="text-link" to="/life">更多关于我的生活 <span>→</span></Link></div></section>
    <section className="quote-band"><div className="page-wrap quote-inner"><Sparkles size={28}/><p>“Stay soft. Stay curious.<br/><em>Keep making things.</em>”</p><span>— 我写给自己的小提醒</span></div></section>
  </>
}

function Work() {
  const timeline = [{ year: '2022 — 现在', title: '资深产品设计师', company: '某科技公司 · 上海', desc: '负责从 0 到 1 的产品体验，带领跨职能团队把想法变成真正被使用的产品。', tags: ['产品策略', '体验设计', '团队协作'] }, { year: '2019 — 2022', title: '用户体验设计师', company: '独立设计工作室 · 杭州', desc: '和不同规模的品牌合作，做过电商、内容、教育和生活方式类项目。', tags: ['UX / UI', '品牌体验', '研究'] }, { year: '2015 — 2019', title: '视觉设计师', company: '创意公司 · 广州', desc: '从平面与视觉出发，逐渐发现自己最喜欢的是解决问题。', tags: ['视觉识别', '创意方向'] }];
  return <div className="page-wrap inner-page"><PageIntro eyebrow="THE WORK FILES" title={<>把想法，<span>变成体验。</span></>} text="我相信好的设计不只是好看，更应该让人感到被理解。下面是我一路走来的工作足迹。"/><div className="work-layout"><div className="timeline">{timeline.map((item, i) => <article className="timeline-item" key={item.year}><div className="timeline-dot">{i === 0 ? <BriefcaseBusiness size={15}/> : <span>{i + 1}</span>}</div><div className="timeline-content"><span className="date">{item.year}</span><h2>{item.title}</h2><h3>{item.company}</h3><p>{item.desc}</p><div className="tag-row">{item.tags.map(t => <Tag key={t}>{t}</Tag>)}</div></div></article>)}</div><aside className="side-card yellow-card"><span className="eyebrow">MY WORK STYLE</span><h3>清晰、共情、<br/>持续迭代。</h3><p>我喜欢先问对问题，再一起找答案。比起“完美”，我更在意事情有没有真正变好。</p><div className="check-list"><span><Check size={15}/>善于倾听</span><span><Check size={15}/>保持好奇</span><span><Check size={15}/>靠谱交付</span></div></aside></div></div>
}

function Life() { return <div className="page-wrap inner-page"><PageIntro eyebrow="LIFE OUTSIDE WORK" title={<>工作之外，<span>我在这里。</span></>} text="生活是灵感的来源。这里记录一些让我开心、着迷，或者愿意反复去做的小事。"/><div className="life-grid"><article className="life-card large coral-card"><div className="card-visual camera-visual"><Camera size={42}/><span>周末去拍照</span></div><div className="life-card-copy"><span className="eyebrow">01 / PHOTO WALK</span><h2>用镜头收集<br/>城市的片刻。</h2><p>街角的光、陌生人的笑、下雨之后的空气。</p></div></article><article className="life-card green-card"><div className="card-icon"><Coffee size={34}/></div><span className="eyebrow">02 / COFFEE</span><h2>好咖啡，<br/>慢慢喝。</h2><p>目前正在寻找上海最好喝的手冲。</p><span className="card-number">07</span></article><article className="life-card blue-card"><div className="card-icon"><Heart size={34}/></div><span className="eyebrow">03 / LITTLE JOYS</span><h2>那些让我<br/>开心的小事。</h2><div className="joy-tags"><Tag color="white">逛展</Tag><Tag color="white">看电影</Tag><Tag color="white">学做饭</Tag><Tag color="white">散步</Tag></div></article></div></div> }

function Contact() {
  const [state, handleSubmit] = useForm('xyezvnag');
  return <div className="page-wrap inner-page contact-page"><PageIntro eyebrow="SAY HELLO" title={<>认识一下，<br/><span>从一句你好开始。</span></>} text="无论是一个工作机会、一个有趣的想法，还是单纯想交个朋友，都欢迎来找我。"/><div className="contact-grid"><div className="contact-card coral-card"><span className="eyebrow">DROP ME A LINE</span><a className="email" href="mailto:hello@example.com">hello@example.com <ArrowUpRight size={24}/></a><p>我通常会在 1–2 个工作日内回复你。</p><div className="social-links"><a href="#">IG · Instagram</a><a href="#">in · LinkedIn</a><a href="#">Dr · Dribbble</a></div></div><form className="contact-form" onSubmit={handleSubmit} noValidate>{state.succeeded ? <div className="contact-success"><strong>消息已发送，谢谢你！</strong><span>我会尽快回复你。</span></div> : <><label htmlFor="name">你的名字<input id="name" name="name" required placeholder="怎么称呼你？" /><ValidationError prefix="姓名" field="name" errors={state.errors} /></label><label htmlFor="email">你的邮箱<input id="email" name="email" type="email" required placeholder="hello@yourmail.com" /><ValidationError prefix="邮箱" field="email" errors={state.errors} /></label><label htmlFor="message">想和我说点什么<textarea id="message" name="message" rows="4" required placeholder="写下你的消息吧……" /><ValidationError prefix="消息" field="message" errors={state.errors} /></label><ValidationError prefix="提交" errors={state.errors} /><button className="button primary" type="submit" disabled={state.submitting}>{state.submitting ? '正在发送…' : <>发送消息 <ArrowUpRight size={18}/></>}</button><span className="form-note">你的消息会通过 Formspree 安全发送到我的邮箱。</span></>}</form></div><div className="location-line"><MapPin size={18}/><span>上海，中国</span><span className="line"></span><span>GMT+8 · 欢迎远程合作</span></div></div>
}

function App() { return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/work" element={<Work/>}/><Route path="/life" element={<Life/>}/><Route path="/contact" element={<Contact/>}/></Routes></Layout> }
createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
