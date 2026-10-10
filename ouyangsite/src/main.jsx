import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { ValidationError, useForm } from '@formspree/react';
import { ArrowUpRight, BriefcaseBusiness, Camera, Check, Coffee, Heart, MapPin, Menu, Sparkles, X } from 'lucide-react';
import './styles.css';

const profile = {
  name: 'Ouyang Jason',
  role: { zh: '在读大学生 · 生活观察者', en: 'College student · Life observer' },
  intro: { zh: '2006 年 10 月出生，目前在读大学，也在认真认识这个世界。', en: 'Born in October 2006, currently in college and taking time to understand the world.' },
  bio: { zh: '我叫 Ouyang Jason，目前还是一名大学生。喜欢旅行，也喜欢和聪明、善良、有好奇心的人聊天。', en: 'I’m Ouyang Jason, currently a college student. I love traveling and talking with thoughtful, kind, curious people.' },
};

const copy = {
  zh: {
    nav: ['首页', '工作经历', '个人生活', '联系我'],
    meet: '认识一下',
    greeting: '你好，我是',
    chat: '和我聊聊',
    lifeLink: '看看我的生活',
    open: 'OPEN TO GOOD CONVERSATIONS',
    photo: '放一张\n你的照片',
    mood: 'curious & sunny',
    note: '2006 年 10 月出生 · 目前在读大学',
    hello: '也欢迎你来打个招呼',
    aboutEyebrow: 'A LITTLE ABOUT ME',
    aboutTitle: <>认真学习，<br /><span>好好生活。</span></>,
    more: '来和我认识一下',
    born: '出生年份', month: '出生月份', curiosity: '好奇心',
    quote: <>“Stay soft. Stay curious.<br /><em>Keep making things.</em>”</>,
    quoteNote: '— 我写给自己的小提醒',
    workEyebrow: 'THE WORK FILES',
    workTitle: <>把想法，<span>变成行动。</span></>,
    workIntro: '目前我还在大学阶段，正在一点点积累知识、项目和真实体验。下面的内容可以继续替换成你的具体经历。',
    workStyle: 'MY WORK STYLE', workStyleTitle: <>保持好奇，<br />持续积累。</>, workStyleText: '现在最重要的事情，是把感兴趣的事认真学好，把每一次尝试都变成经验。',
    checks: ['愿意学习', '保持真诚', '认真交付'],
    lifeEyebrow: 'LIFE OUTSIDE WORK', lifeTitle: <>日常里面，<span>有很多小事。</span></>, lifeIntro: '生活是灵感的来源。这里记录一些让我开心、着迷，或者愿意反复去做的小事。',
    travel: '去旅行', travelTitle: <>去看看，<br />更大的世界。</>, travelText: '旅行让我离开熟悉的日常，也让我更认真地观察不同的地方和人。',
    coffee: '好咖啡，<br />慢慢喝。', coffeeText: '目前正在寻找上海最好喝的手冲。', joys: '那些让我<br />开心的小事。', joyTags: ['逛展', '看电影', '学做饭', '散步'],
    contactEyebrow: 'SAY HELLO', contactTitle: <>认识一下，<br /><span>从一句你好开始。</span></>, contactIntro: '无论是一个有趣的想法、一个学习机会，还是单纯想交个朋友，都欢迎来找我。',
    drop: 'DROP ME A LINE', emailNote: '也可以通过下面的社交平台找到我。', location: '欢迎线上联系', locationNote: '目前在读大学 · 持续认识新朋友',
    name: '你的名字', namePlaceholder: '怎么称呼你？', email: '你的邮箱', emailPlaceholder: 'hello@yourmail.com', message: '想和我说点什么', messagePlaceholder: '写下你的消息吧……', send: '发送消息', sending: '正在发送…', formNote: '你的消息会通过 Formspree 安全发送到邮箱。', success: '消息已发送，谢谢你！', successNote: '我会尽快回复你。',
    footer: '做一个有趣且靠谱的人。', language: 'English', workNav: '工作经历', lifeNav: '个人生活', contactNav: '联系我', homeNav: '首页',
  },
  en: {
    nav: ['Home', 'Work', 'Life', 'Contact'],
    meet: 'Say hello', greeting: 'Hi, I’m', chat: 'Let’s talk', lifeLink: 'See my life', open: 'OPEN TO GOOD CONVERSATIONS', photo: 'Add your\nphoto here', mood: 'curious & sunny',
    note: 'Born Oct 2006 · In college', hello: 'Always happy to hear from you', aboutEyebrow: 'A LITTLE ABOUT ME', aboutTitle: <>Study seriously,<br /><span>live fully.</span></>, more: 'Come say hello', born: 'birth year', month: 'birth month', curiosity: 'curiosity', quote: <>“Stay soft. Stay curious.<br /><em>Keep making things.</em>”</>, quoteNote: '— a small reminder to myself',
    workEyebrow: 'THE WORK FILES', workTitle: <>Turning ideas<br /><span>into action.</span></>, workIntro: 'I’m currently in college, building knowledge, projects and real-world experience one step at a time. Replace the notes below with your own story.', workStyle: 'MY WORK STYLE', workStyleTitle: <>Stay curious,<br />keep building.</>, workStyleText: 'Right now, I’m focused on learning what interests me and turning every attempt into experience.', checks: ['Ready to learn', 'Stay sincere', 'Follow through'],
    lifeEyebrow: 'LIFE OUTSIDE WORK', lifeTitle: <>There are many<br /><span>small joys.</span></>, lifeIntro: 'Life is where inspiration comes from. Here are a few things that make me happy and keep me curious.', travel: 'TRAVEL', travelTitle: <>Go see<br />the wider world.</>, travelText: 'Travel takes me away from the familiar and helps me notice places, people and everyday details more carefully.', coffee: 'Good coffee,<br />slowly.', coffeeText: 'Still looking for the best pour-over in Shanghai.', joys: 'Little things<br />that make me happy.', joyTags: ['Exhibitions', 'Movies', 'Cooking', 'Walks'],
    contactEyebrow: 'SAY HELLO', contactTitle: <>Start with a<br /><span>simple hello.</span></>, contactIntro: 'Whether it’s an interesting idea, a learning opportunity or simply a wish to make a new friend, I’d love to hear from you.', drop: 'DROP ME A LINE', emailNote: 'You can also find me on these platforms.', location: 'Open to online conversations', locationNote: 'In college · Always meeting new people', name: 'Your name', namePlaceholder: 'What should I call you?', email: 'Your email', emailPlaceholder: 'hello@yourmail.com', message: 'Your message', messagePlaceholder: 'Write something here…', send: 'Send message', sending: 'Sending…', formNote: 'Your message will be sent securely through Formspree.', success: 'Message sent — thank you!', successNote: 'I’ll get back to you soon.', footer: 'Stay curious. Stay kind.', language: '中文', workNav: 'Work', lifeNav: 'Life', contactNav: 'Contact', homeNav: 'Home',
  },
};


const heroContent = {
  zh: {
    promo: '个人简历 · 认识 Ouyang Jason', kicker: 'PERSONAL RESUME / 2026', titleA: '把好奇心，变成', titleB: '更大的', titleAccent: '世界。', status: '开放交流中', introLead: '你好，我是', introTail: '一名正在成长中的大学生。', body: '我在学习、旅行，也在把每一次经历整理成自己的方向。我的关键词是', primary: '查看我的经历', secondary: '联系我', metaOne: '2006.10 / 在读大学生', metaTwo: '旅行 / 好奇 / 真诚', scroll: '向下探索', snapshotEyebrow: 'A QUICK RESUME SNAPSHOT', snapshotTitle: '不只是一个标题，\n也是一个正在发生的人。', snapshotText: '我叫 Ouyang Jason，2006 年 10 月出生，目前在读大学。喜欢旅行，也喜欢和聪明、善良、有好奇心的人聊天。', currentLabel: '现在', currentValue: '大学在读', currentNote: '持续学习与积累', interestLabel: '兴趣', interestValue: '旅行观察', interestNote: '去看看更大的世界', nextLabel: '下一步', nextValue: '保持开放', nextNote: '认识新的朋友与机会', keywords: ['认真学习', '观察生活', '慢慢出发', '持续成长']
  },
  en: {
    promo: 'Personal resume · Meet Ouyang Jason', kicker: 'PERSONAL RESUME / 2026', titleA: 'Turn curiosity into', titleB: 'a wider', titleAccent: 'world.', status: 'Open to good conversations', introLead: 'Hi, I’m', introTail: 'a college student in progress.', body: 'I’m learning, traveling and turning each experience into a direction. My keywords are', primary: 'View my experience', secondary: 'Contact me', metaOne: '2006.10 / COLLEGE STUDENT', metaTwo: 'TRAVEL / CURIOUS / SINCERE', scroll: 'SCROLL TO EXPLORE', snapshotEyebrow: 'A QUICK RESUME SNAPSHOT', snapshotTitle: 'More than a headline,\nI’m a person in progress.', snapshotText: 'I’m Ouyang Jason, born in October 2006 and currently in college. I love traveling and talking with thoughtful, kind, curious people.', currentLabel: 'NOW', currentValue: 'In college', currentNote: 'Learning and building', interestLabel: 'INTEREST', interestValue: 'Travel & observe', interestNote: 'Go see the wider world', nextLabel: 'NEXT', nextValue: 'Stay open', nextNote: 'Meet new people and possibilities', keywords: ['learning seriously', 'observing life', 'going further', 'growing slowly']
  }
};

const socials = [
  { label: '𝕏 · X', href: 'https://x.com/Orion_Yves_Jude' },
  { label: 'f · Facebook', href: 'https://www.facebook.com/profile.php?id=61590596057471' },
  { label: 'IG · Instagram', href: 'https://www.instagram.com/yr54976/' },
];

function Layout({ children, lang, setLang }) {
  const [open, setOpen] = React.useState(false);
  const t = copy[lang];
  return <div className="site-shell">
    <header className="topbar">
      <Link className="brand" to="/" onClick={() => setOpen(false)}><span className="brand-mark">O</span><span>Ouyang's space</span></Link>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={open ? 'nav open' : 'nav'}>
        <NavLink to="/" end onClick={() => setOpen(false)}>{t.homeNav}</NavLink>
        <NavLink to="/work" onClick={() => setOpen(false)}>{t.workNav}</NavLink>
        <NavLink to="/life" onClick={() => setOpen(false)}>{t.lifeNav}</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>{t.contactNav}</NavLink>
      </nav>
      <div className="top-actions"><button className="language-toggle" onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} aria-label="Switch language">{lang === 'zh' ? 'EN' : '中'}</button><Link className="nav-cta" to="/contact">{t.meet} <ArrowUpRight size={16} /></Link></div>
    </header>
    <main>{children}</main>
    <footer className="footer"><span>© 2026 Ouyang Jason</span><span>{t.footer}</span><span className="footer-social">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label.split('·')[0].trim()}</a>)}</span></footer>
  </div>;
}

function Tag({ children, color = 'yellow' }) { return <span className={`tag ${color}`}>{children}</span>; }
function PageIntro({ eyebrow, title, text }) { return <section className="page-intro"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>; }

function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = React.useState(0);
  const [text, setText] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  React.useEffect(() => {
    const word = words[wordIndex % words.length];
    const delay = deleting ? 48 : text === word ? 1350 : 88;
    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setDeleting(true);
      } else {
        const next = word.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === '') {
          setDeleting(false);
          setWordIndex((current) => (current + 1) % words.length);
        }
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [deleting, text, wordIndex, words]);
  return <span className="typewriter">{text}<span className="typewriter-caret" aria-hidden="true">|</span></span>;
}

function ParticleField() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const ribbon = [];
    const ambient = 26;
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = null;
    let lastComet = 0;
    let lastDraw = 0;
    const frameInterval = 1000 / 32;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < ambient; i += 1) {
        particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .1, vy: (Math.random() - .5) * .1, life: 1, decay: .0015, size: 1 + Math.random() * 1.8, hue: 195 + Math.random() * 90, ambient: true });
      }
    };
    const frameRect = () => {
      const frame = document.querySelector('.hero-frame');
      if (!frame) return null;
      const canvasRect = canvas.getBoundingClientRect();
      const rect = frame.getBoundingClientRect();
      return { left: rect.left - canvasRect.left, top: rect.top - canvasRect.top, right: rect.right - canvasRect.left, bottom: rect.bottom - canvasRect.top };
    };
    const insideFrame = (point, rect) => rect && point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
    const addSpark = (x, y, dx, dy, trailLength = 18) => {
      particles.push({ x: x + (Math.random() - .5) * 5, y: y + (Math.random() - .5) * 5, vx: dx * .035 + (Math.random() - .5) * .45, vy: dy * .035 + (Math.random() - .5) * .45, life: 1, decay: .022 + Math.random() * .012, size: 1.1 + Math.random() * 2.2, hue: Math.random() > .42 ? 330 + Math.random() * 35 : 195 + Math.random() * 70, trailLength, ambient: false });
      if (particles.length > 180) particles.splice(0, particles.length - 180);
    };
    const addRibbonPoint = (point, dx, dy) => {
      const last = ribbon[ribbon.length - 1];
      const distance = last ? Math.hypot(point.x - last.x, point.y - last.y) : 0;
      const steps = Math.min(8, Math.max(1, Math.ceil(distance / 8)));
      for (let i = 1; i <= steps; i += 1) {
        const ratio = i / steps;
        ribbon.push({ x: (last ? last.x : point.x) + (point.x - (last ? last.x : point.x)) * ratio, y: (last ? last.y : point.y) + (point.y - (last ? last.y : point.y)) * ratio, vx: dx, vy: dy, time: performance.now() });
      }
      if (ribbon.length > 78) ribbon.splice(0, ribbon.length - 78);
    };
    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (point.x < 0 || point.y < 0 || point.x > rect.width || point.y > rect.height) { previous = null; return; }
      const dx = previous ? point.x - previous.x : 0;
      const dy = previous ? point.y - previous.y : 0;
      if (previous) {
        const distance = Math.hypot(dx, dy);
        const count = Math.min(4, Math.max(1, Math.ceil(distance / 18)));
        for (let i = 0; i < count; i += 1) addSpark(point.x, point.y, dx, dy, 20 + Math.min(distance, 100) * .5);
      }
      if (insideFrame(point, frameRect())) addRibbonPoint(point, dx, dy);
      previous = point;
    };
    const emitFrameComet = (now) => {
      if (now - lastComet < 560) return;
      const rect = frameRect();
      if (!rect) return;
      const side = Math.random() > .5 ? 'left' : 'right';
      const x = side === 'left' ? rect.left + 5 : rect.right - 5;
      const y = rect.top + 30 + Math.random() * Math.max(20, rect.bottom - rect.top - 60);
      const direction = side === 'left' ? 1 : -1;
      particles.push({ x, y, vx: direction * (.4 + Math.random() * .3), vy: (Math.random() - .5) * .16, life: 1, decay: .007, size: 1.2 + Math.random() * 1.4, hue: Math.random() > .5 ? 340 : 205, trailLength: 52 + Math.random() * 28, ambient: false, comet: true });
      lastComet = now;
    };
    const drawRibbon = (now) => {
      while (ribbon.length && now - ribbon[0].time > 1250) ribbon.shift();
      if (ribbon.length < 2) return;
      const strands = 6;
      let speedTotal = 0;
      for (const point of ribbon) speedTotal += Math.hypot(point.vx, point.vy);
      const averageSpeed = speedTotal / ribbon.length;
      ctx.globalCompositeOperation = 'lighter';
      for (let pass = 0; pass < 2; pass += 1) {
        ctx.filter = pass === 0 ? 'blur(3px)' : 'none';
        for (let strand = 0; strand < strands; strand += 1) {
          const center = (strands - 1) / 2;
          ctx.beginPath();
          for (let i = 0; i < ribbon.length; i += 1) {
            const point = ribbon[i];
            const speed = Math.max(1, Math.hypot(point.vx, point.vy));
            const normalX = -point.vy / speed;
            const normalY = point.vx / speed;
            const spread = (strand - center) * (1.7 + Math.min(speed * .035, 2));
            const x = point.x + normalX * spread;
            const y = point.y + normalY * spread;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          const hue = 316 + strand * 8;
          ctx.strokeStyle = `hsla(${hue}, 100%, ${pass === 0 ? 64 : 58}%, ${pass === 0 ? .16 : .72})`;
          ctx.lineWidth = (pass === 0 ? 4.5 : 1.1) + Math.min(averageSpeed * .06, 2.2);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }
      ctx.filter = 'none';
    };
    const draw = (now = 0) => {
      if (now - lastDraw < frameInterval) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      ctx.clearRect(0, 0, width, height);
      emitFrameComet(now);
      drawRibbon(now);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= particle.decay;
        if (particle.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = particle.ambient ? particle.life * .2 : particle.life * .65;
        if (particle.trailLength) {
          const speed = Math.max(.25, Math.hypot(particle.vx, particle.vy));
          const tailX = particle.x - (particle.vx / speed) * particle.trailLength;
          const tailY = particle.y - (particle.vy / speed) * particle.trailLength;
          const trail = ctx.createLinearGradient(tailX, tailY, particle.x, particle.y);
          trail.addColorStop(0, `hsla(${particle.hue}, 100%, 65%, 0)`);
          trail.addColorStop(.75, `hsla(${particle.hue}, 100%, 65%, ${alpha * .3})`);
          trail.addColorStop(1, `hsla(${particle.hue}, 100%, 65%, ${alpha})`);
          ctx.beginPath();
          ctx.strokeStyle = trail;
          ctx.lineWidth = particle.comet ? particle.size * 1.4 : particle.size;
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${alpha})`;
        ctx.shadowBlur = particle.ambient ? 8 : 15;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 65%, ${alpha})`;
        ctx.arc(particle.x, particle.y, particle.size * (particle.ambient ? 1 : particle.life), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      frame = window.requestAnimationFrame(draw);
    };
    resize();
    seed();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

function Home({ lang }) {
  const h = heroContent[lang];
  return <div className="resume-home">
    <section className="resume-hero page-wrap">
      <ParticleField />
      <div className="hero-wash" aria-hidden="true"><span className="wash-blue" /><span className="wash-coral" /><span className="wash-yellow" /></div>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-promo"><Sparkles size={14} /><span>{h.promo}</span><ArrowUpRight size={14} /></div>
      <div className="hero-frame">
        <span className="frame-mark frame-tl">+</span><span className="frame-mark frame-tr">+</span><span className="frame-mark frame-bl">+</span><span className="frame-mark frame-br">+</span>
        <div className="hero-frame-content"><span className="hero-kicker">{h.kicker}</span><h1 className="resume-title">{h.titleA}<br />{h.titleB} <span>{h.titleAccent}</span></h1><div className="hero-status"><span className="status-pulse" aria-hidden="true" />{h.status}</div></div>
      </div>
      <div className="resume-intro"><h2>{h.introLead} <span>{profile.name}</span>{lang === 'zh' ? '，' : ', '}{h.introTail}</h2><p>{h.body} <strong><Typewriter key={lang} words={h.keywords} /></strong>{lang === 'zh' ? '。' : '.'}</p></div>
      <div className="resume-actions"><Link className="hero-button hero-button-dark" to="/work">{h.primary}<ArrowUpRight size={17} /></Link><Link className="hero-button hero-button-light" to="/contact">{h.secondary}</Link></div>
      <div className="hero-meta"><span>{h.metaOne}</span><span>{h.metaTwo}</span><a href="#resume-snapshot">{h.scroll} ↓</a></div>
    </section>
    <section className="resume-snapshot page-wrap" id="resume-snapshot"><div className="snapshot-heading"><span className="eyebrow">{h.snapshotEyebrow}</span><h2>{h.snapshotTitle.split('\n').map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{line}</React.Fragment>)}</h2><p>{h.snapshotText}</p><Link className="snapshot-link" to="/work">{h.primary} <ArrowUpRight size={15} /></Link></div><div className="snapshot-cards"><article><span>01 / {h.currentLabel}</span><strong>{h.currentValue}</strong><small>{h.currentNote}</small></article><article><span>02 / {h.interestLabel}</span><strong>{h.interestValue}</strong><small>{h.interestNote}</small></article><article><span>03 / {h.nextLabel}</span><strong>{h.nextValue}</strong><small>{h.nextNote}</small></article></div></section>
    <section className="quote-band"><div className="page-wrap quote-inner"><Sparkles size={28} /><p>{copy[lang].quote}</p><span>{copy[lang].quoteNote}</span></div></section>
  </div>;
}

function Work({ lang }) {
  const t = copy[lang];
  const timeline = lang === 'zh' ? [{ year: '现在', title: '大学在读', company: '学习与成长 · 持续进行中', desc: '这里可以补充你的学校、专业、正在学习的方向，以及最感兴趣的课程或技能。', tags: ['学习', '探索', '成长'] }, { year: '经历 02', title: '项目 / 社团经历', company: '可替换为你的真实经历', desc: '如果你参与过项目、社团、比赛或志愿活动，可以在这里写下负责的事情和得到的收获。', tags: ['项目', '协作', '实践'] }, { year: '经历 03', title: '下一步想做什么', company: '可替换为你的目标方向', desc: '可以介绍你正在寻找的实习、工作机会，或者希望认识的同行与合作伙伴。', tags: ['目标', '机会'] }] : [{ year: 'NOW', title: 'College student', company: 'Learning and growing · In progress', desc: 'Add your school, major, current focus and the subjects or skills you enjoy most.', tags: ['Learning', 'Exploring', 'Growing'] }, { year: 'EXPERIENCE 02', title: 'Projects / communities', company: 'Replace with your real experience', desc: 'Add projects, clubs, competitions or volunteer work, along with what you learned.', tags: ['Projects', 'Teamwork', 'Practice'] }, { year: 'EXPERIENCE 03', title: 'What comes next', company: 'Replace with your next direction', desc: 'Share the internship, work opportunity or community you hope to discover next.', tags: ['Goals', 'Opportunities'] }];
  return <div className="page-wrap inner-page"><PageIntro eyebrow={t.workEyebrow} title={t.workTitle} text={t.workIntro} /><div className="work-layout"><div className="timeline">{timeline.map((item, i) => <article className="timeline-item" key={item.year}><div className="timeline-dot">{i === 0 ? <BriefcaseBusiness size={15} /> : <span>{i + 1}</span>}</div><div className="timeline-content"><span className="date">{item.year}</span><h2>{item.title}</h2><h3>{item.company}</h3><p>{item.desc}</p><div className="tag-row">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div></article>)}</div><aside className="side-card yellow-card"><span className="eyebrow">{t.workStyle}</span><h3>{t.workStyleTitle}</h3><p>{t.workStyleText}</p><div className="check-list">{t.checks.map((item) => <span key={item}><Check size={15} />{item}</span>)}</div></aside></div></div>;
}

function Life({ lang }) {
  const t = copy[lang];
  return <div className="page-wrap inner-page"><PageIntro eyebrow={t.lifeEyebrow} title={t.lifeTitle} text={t.lifeIntro} /><div className="life-grid"><article className="life-card large coral-card"><div className="card-visual camera-visual"><Camera size={42} /><span>{t.travel}</span></div><div className="life-card-copy"><span className="eyebrow">01 / TRAVEL</span><h2>{t.travelTitle}</h2><p>{t.travelText}</p></div></article><article className="life-card green-card"><div className="card-icon"><Coffee size={34} /></div><span className="eyebrow">02 / COFFEE</span><h2>{t.coffee}</h2><p>{t.coffeeText}</p><span className="card-number">07</span></article><article className="life-card blue-card"><div className="card-icon"><Heart size={34} /></div><span className="eyebrow">03 / LITTLE JOYS</span><h2>{t.joys}</h2><div className="joy-tags">{t.joyTags.map((tag) => <Tag color="white" key={tag}>{tag}</Tag>)}</div></article></div></div>;
}

function Contact({ lang }) {
  const t = copy[lang];
  const [state, handleSubmit] = useForm('xyezvnag');
  return <div className="page-wrap inner-page contact-page"><PageIntro eyebrow={t.contactEyebrow} title={t.contactTitle} text={t.contactIntro} /><div className="contact-grid"><div className="contact-card coral-card"><span className="eyebrow">{t.drop}</span><a className="email" href="mailto:hello@example.com">hello@example.com <ArrowUpRight size={24} /></a><p>{t.emailNote}</p><div className="social-links">{socials.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}<a href="weixin://dl/chat?136473333993">微信 · 136473333993</a><a href="https://wpa.qq.com/msgrd?v=3&uin=3514485358&site=qq&menu=yes" target="_blank" rel="noreferrer">QQ · 3514485358</a></div></div><form className="contact-form" onSubmit={handleSubmit} noValidate>{state.succeeded ? <div className="contact-success"><strong>{t.success}</strong><span>{t.successNote}</span></div> : <><label htmlFor="name">{t.name}<input id="name" name="name" required placeholder={t.namePlaceholder} /><ValidationError prefix={t.name} field="name" errors={state.errors} /></label><label htmlFor="email">{t.email}<input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} /><ValidationError prefix={t.email} field="email" errors={state.errors} /></label><label htmlFor="message">{t.message}<textarea id="message" name="message" rows="4" required placeholder={t.messagePlaceholder} /><ValidationError prefix={t.message} field="message" errors={state.errors} /></label><ValidationError prefix={t.send} errors={state.errors} /><button className="button primary" type="submit" disabled={state.submitting}>{state.submitting ? t.sending : <>{t.send} <ArrowUpRight size={18} /></>}</button><span className="form-note">{t.formNote}</span></>}</form></div><div className="location-line"><MapPin size={18} /><span>{t.location}</span><span className="line"></span><span>{t.locationNote}</span></div></div>;
}

function App() {
  const [lang, setLang] = React.useState('zh');
  return <Layout lang={lang} setLang={setLang}><Routes><Route path="/" element={<Home lang={lang} />} /><Route path="/work" element={<Work lang={lang} />} /><Route path="/life" element={<Life lang={lang} />} /><Route path="/contact" element={<Contact lang={lang} />} /></Routes></Layout>;
}

createRoot(document.getElementById('root')).render(<BrowserRouter><App /></BrowserRouter>);
