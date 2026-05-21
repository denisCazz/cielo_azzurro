#!/usr/bin/env node
/**
 * Cielo Azzurro – Astro project scaffolder
 * Run: node setup.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

function write(relPath, content) {
  const abs = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf8');
  console.log('  ✔ ' + relPath);
}

console.log('\n🍱  Scaffolding Cielo Azzurro website…\n');

// ─── astro.config.mjs ────────────────────────────────────────────────────────
write('astro.config.mjs', `import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://cieloazzurrocuneo.it',
});
`);

// ─── tsconfig.json ───────────────────────────────────────────────────────────
write('tsconfig.json', `{ "extends": "astro/tsconfigs/base" }
`);

// ─── public/favicon.svg ──────────────────────────────────────────────────────
write('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#09090F"/>
  <text x="32" y="44" text-anchor="middle" font-size="32" font-family="serif" fill="#C9962A">天</text>
</svg>
`);

// ─── src/layouts/Layout.astro ────────────────────────────────────────────────
write('src/layouts/Layout.astro', `---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Cielo Azzurro – Ristorante Cinese & Sushi | Cuneo',
  description = 'Ristorante Cielo Azzurro a Cuneo. Cucina cinese e giapponese, sushi, all you can eat. Da oltre 25 anni in Corso Nizza 92.',
} = Astro.props;
---
<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <slot />
    <script>
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

      const nav = document.getElementById('main-nav');
      window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 60);
      }, { passive: true });

      const burger = document.getElementById('burger');
      const mobileMenu = document.getElementById('mobile-menu');
      burger?.addEventListener('click', () => {
        const open = mobileMenu?.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(open));
      });
      mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          burger?.setAttribute('aria-expanded', 'false');
        });
      });
    </script>
  </body>
</html>

<style is:global>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #09090F;
    --bg-up:     #111119;
    --bg-card:   #16161F;
    --gold:      #C9962A;
    --gold-lt:   #E8BC56;
    --gold-dim:  rgba(201,150,42,.12);
    --red:       #B52525;
    --red-lt:    #D63031;
    --cream:     #F4EFE6;
    --muted:     #6A6A78;
    --border:    rgba(201,150,42,.22);
    --radius:    12px;
    --radius-lg: 22px;
    --trans:     .35s cubic-bezier(.4,0,.2,1);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--cream);
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    line-height: 1.75;
    overflow-x: hidden;
  }

  h1,h2,h3,h4 { font-family: 'Cinzel', serif; line-height: 1.2; }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  section { padding: 100px 24px; }

  .container { max-width: 1160px; margin: 0 auto; width: 100%; }

  .section-label {
    font-family: 'Lato', sans-serif;
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
  }

  .section-title {
    font-size: clamp(1.9rem, 4vw, 2.9rem);
    font-weight: 700;
    color: var(--cream);
    margin-bottom: 16px;
  }
  .section-title span { color: var(--gold); }

  .section-desc {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 540px;
    line-height: 1.85;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 6px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: .93rem;
    letter-spacing: .06em;
    cursor: pointer;
    transition: var(--trans);
    border: none;
  }
  .btn-primary { background: var(--gold); color: #08080E; }
  .btn-primary:hover {
    background: var(--gold-lt);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(201,150,42,.38);
  }
  .btn-outline {
    background: transparent;
    color: var(--cream);
    border: 1.5px solid rgba(244,239,230,.28);
  }
  .btn-outline:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .reveal.visible { opacity: 1; transform: none; }
  .reveal-left  { opacity: 0; transform: translateX(-44px); transition: opacity .7s ease, transform .7s ease; }
  .reveal-right { opacity: 0; transform: translateX( 44px); transition: opacity .7s ease, transform .7s ease; }
  .reveal-left.visible, .reveal-right.visible { opacity: 1; transform: none; }
  .d1 { transition-delay: .1s; }
  .d2 { transition-delay: .2s; }
  .d3 { transition-delay: .3s; }
  .d4 { transition-delay: .4s; }
  .d5 { transition-delay: .5s; }

  .gold-line {
    width: 52px; height: 3px;
    background: linear-gradient(90deg, var(--gold), transparent);
    border-radius: 2px;
    margin: 14px 0 28px;
  }

  @media (max-width: 768px) {
    section { padding: 72px 20px; }
  }
</style>
`);

// ─── src/components/Nav.astro ────────────────────────────────────────────────
write('src/components/Nav.astro', `---
const links = [
  { href: '#chi-siamo', label: 'Chi siamo' },
  { href: '#cucina',    label: 'Cucina' },
  { href: '#ayce',      label: 'All You Can Eat' },
  { href: '#orari',     label: 'Orari' },
  { href: '#dove',      label: 'Dove siamo' },
];
---
<nav id="main-nav" aria-label="Navigazione principale">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="Cielo Azzurro – Home">
      <span class="logo-zh">天藍</span>
      <span class="logo-text">Cielo Azzurro</span>
    </a>

    <ul class="nav-links" role="list">
      {links.map(l => (
        <li><a href={l.href}>{l.label}</a></li>
      ))}
    </ul>

    <a href="tel:+393394195587" class="btn btn-primary nav-cta" aria-label="Chiama il ristorante">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
      Prenota
    </a>

    <button id="burger" class="burger" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div id="mobile-menu" role="dialog" aria-label="Menu mobile">
    <ul role="list">
      {links.map(l => (
        <li><a href={l.href}>{l.label}</a></li>
      ))}
      <li>
        <a href="tel:+393394195587" class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px;">
          📞 Prenota un Tavolo
        </a>
      </li>
    </ul>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 20px 24px;
    transition: background .4s ease, padding .4s ease, box-shadow .4s ease;
  }
  nav.scrolled {
    background: rgba(9,9,15,.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 12px 24px;
    box-shadow: 0 1px 0 rgba(201,150,42,.15);
  }

  .nav-inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .logo-zh {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: var(--gold);
    border: 1.5px solid var(--border);
    padding: 3px 7px;
    border-radius: 4px;
    letter-spacing: .05em;
  }
  .logo-text {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--cream);
    letter-spacing: .06em;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 4px;
    margin-left: auto;
  }
  .nav-links a {
    font-size: .88rem;
    font-weight: 700;
    letter-spacing: .06em;
    color: rgba(244,239,230,.72);
    padding: 8px 14px;
    border-radius: 6px;
    transition: color .25s, background .25s;
  }
  .nav-links a:hover {
    color: var(--gold);
    background: var(--gold-dim);
  }

  .nav-cta { font-size: .82rem; padding: 10px 22px; }

  /* Burger */
  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;
  }
  .burger span {
    display: block;
    width: 24px; height: 2px;
    background: var(--cream);
    border-radius: 2px;
    transition: var(--trans);
  }
  .burger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .burger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile menu */
  #mobile-menu {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(9,9,15,.97);
    backdrop-filter: blur(20px);
    padding: 100px 32px 40px;
    flex-direction: column;
  }
  #mobile-menu.open { display: flex; }
  #mobile-menu ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  #mobile-menu a {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--cream);
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    display: block;
    transition: color .2s;
  }
  #mobile-menu a:hover { color: var(--gold); }

  @media (max-width: 900px) {
    .nav-links, .nav-cta { display: none; }
    .burger { display: flex; }
  }
</style>
`);

// ─── src/components/Hero.astro ───────────────────────────────────────────────
write('src/components/Hero.astro', `---
---
<section class="hero" id="hero" aria-label="Hero">
  <!-- Decorative background -->
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-glow glow-1"></div>
    <div class="hero-glow glow-2"></div>
    <div class="grid-overlay"></div>
    <div class="pattern-overlay"></div>
  </div>

  <!-- Floating badges -->
  <div class="badge-tl" aria-hidden="true">
    <span class="kanji">寿</span>
  </div>
  <div class="badge-br" aria-hidden="true">
    <span class="kanji">喜</span>
  </div>

  <div class="hero-content">
    <p class="hero-pre animate-fade-up d1">— Cuneo, Corso Nizza 92 —</p>

    <h1 class="hero-title animate-fade-up d2">
      <span class="hero-zh">天藍餐廳</span>
      <span class="hero-name">Cielo<br/><em>Azzurro</em></span>
    </h1>

    <p class="hero-sub animate-fade-up d3">
      Cucina cinese &amp; giapponese autentica.<br/>
      <span>Da oltre 25 anni il gusto dell'Asia nel cuore del Piemonte.</span>
    </p>

    <div class="hero-rating animate-fade-up d4" aria-label="Valutazione 4.3 su 5 basata su oltre 1000 recensioni">
      <span class="stars" aria-hidden="true">★★★★½</span>
      <strong>4.3</strong>
      <span class="rating-sep">·</span>
      <span>1.000+ recensioni Google</span>
    </div>

    <div class="hero-ctas animate-fade-up d5">
      <a href="tel:+393394195587" class="btn btn-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
        </svg>
        Prenota un Tavolo
      </a>
      <a href="#cucina" class="btn btn-outline">Scopri il Menu</a>
    </div>

    <div class="hero-chips animate-fade-up d5">
      <span class="chip">🍱 All You Can Eat</span>
      <span class="chip">🍣 Sushi bar</span>
      <span class="chip">🚚 Consegna a domicilio</span>
      <span class="chip">🌿 Opzioni vegetariane</span>
    </div>
  </div>

  <a href="#chi-siamo" class="scroll-down" aria-label="Scorri verso il basso">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </a>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    padding: 120px 24px 80px;
  }

  /* Background layers */
  .hero-bg { position: absolute; inset: 0; z-index: 0; }

  .hero-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    pointer-events: none;
  }
  .glow-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(201,150,42,.18) 0%, transparent 70%);
    top: -100px; left: 50%;
    transform: translateX(-50%);
    animation: pulse-glow 6s ease-in-out infinite;
  }
  .glow-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(181,37,37,.12) 0%, transparent 70%);
    bottom: 60px; right: -80px;
    animation: pulse-glow 8s ease-in-out infinite reverse;
  }

  .grid-overlay {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,150,42,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,150,42,.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .pattern-overlay {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(9,9,15,0) 0%, rgba(9,9,15,.6) 100%),
      radial-gradient(ellipse at 50% 100%, rgba(9,9,15,.8) 0%, transparent 70%);
  }

  /* Kanji badges */
  .badge-tl, .badge-br {
    position: absolute;
    z-index: 1;
    animation: float 6s ease-in-out infinite;
  }
  .badge-tl { top: 80px; left: 5%; animation-delay: 0s; }
  .badge-br { bottom: 100px; right: 5%; animation-delay: -3s; }
  .kanji {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px; height: 64px;
    border: 1px solid var(--border);
    border-radius: 50%;
    font-family: 'Cinzel', serif;
    font-size: 1.8rem;
    color: rgba(201,150,42,.35);
    backdrop-filter: blur(8px);
    background: rgba(22,22,31,.4);
  }

  /* Content */
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .hero-pre {
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .hero-zh {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2vw, 1.25rem);
    letter-spacing: .5em;
    color: rgba(201,150,42,.55);
    margin-bottom: 10px;
  }
  .hero-name {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: clamp(3.5rem, 9vw, 7rem);
    font-weight: 900;
    line-height: 1.0;
    color: var(--cream);
    letter-spacing: -.01em;
    margin-bottom: 28px;
  }
  .hero-name em {
    font-style: italic;
    color: var(--gold);
  }

  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(244,239,230,.6);
    line-height: 1.7;
    margin-bottom: 28px;
  }
  .hero-sub span { color: rgba(244,239,230,.4); font-size: .95em; }

  .hero-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .9rem;
    color: rgba(244,239,230,.5);
    margin-bottom: 36px;
  }
  .stars { color: var(--gold); font-size: 1rem; letter-spacing: 2px; }
  .hero-rating strong { color: var(--cream); font-size: 1.05rem; }
  .rating-sep { color: var(--border); }

  .hero-ctas {
    display: flex;
    gap: 14px;
    margin-bottom: 28px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-chips {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .chip {
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .04em;
    color: rgba(244,239,230,.55);
    background: rgba(22,22,31,.8);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 6px 14px;
    backdrop-filter: blur(8px);
    transition: color .25s, border-color .25s;
  }
  .chip:hover { color: var(--gold); border-color: rgba(201,150,42,.5); }

  /* Scroll caret */
  .scroll-down {
    position: absolute;
    bottom: 32px; left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--gold);
    animation: bounce 2.4s ease-in-out infinite;
    transition: background .25s;
  }
  .scroll-down:hover { background: var(--gold-dim); }

  /* Animations */
  @keyframes pulse-glow {
    0%,100% { opacity: 1; transform: translateX(-50%) scale(1); }
    50%      { opacity: .6; transform: translateX(-50%) scale(1.1); }
  }
  .glow-2 { animation-name: pulse-glow2; }
  @keyframes pulse-glow2 {
    0%,100% { opacity: 1; }
    50%      { opacity: .5; }
  }

  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }

  @keyframes bounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(8px); }
  }

  .animate-fade-up {
    opacity: 0;
    transform: translateY(28px);
    animation: fade-up .8s ease forwards;
  }
  @keyframes fade-up {
    to { opacity: 1; transform: none; }
  }
  .d1 { animation-delay: .1s; }
  .d2 { animation-delay: .25s; }
  .d3 { animation-delay: .45s; }
  .d4 { animation-delay: .6s; }
  .d5 { animation-delay: .75s; }

  @media (max-width: 600px) {
    .badge-tl, .badge-br { display: none; }
    .hero-ctas { flex-direction: column; align-items: center; }
    .hero-ctas .btn { width: 100%; max-width: 280px; justify-content: center; }
  }
</style>
`);

// ─── src/components/About.astro ──────────────────────────────────────────────
write('src/components/About.astro', `---
const stats = [
  { n: '25+', label: 'Anni di esperienza' },
  { n: '4.3★', label: 'Rating Google' },
  { n: '1.000+', label: 'Recensioni positive' },
  { n: '100+', label: 'Piatti in menu' },
];
---
<section id="chi-siamo" aria-labelledby="about-title">
  <div class="container">
    <div class="about-grid">
      <!-- Visual side -->
      <div class="about-visual reveal reveal-left">
        <div class="visual-card main-card">
          <div class="card-kanji" aria-hidden="true">美食</div>
          <div class="card-content">
            <p class="card-tag">Cucina Autentica</p>
            <p class="card-text">Piatti preparati con ingredienti freschi selezionati ogni giorno, nel rispetto delle tradizioni culinarie cinesi e giapponesi.</p>
          </div>
        </div>
        <div class="visual-card accent-card">
          <span class="accent-emoji" aria-hidden="true">🍣</span>
          <span>Sushi fresco ogni giorno</span>
        </div>
        <div class="visual-decor" aria-hidden="true"></div>
      </div>

      <!-- Text side -->
      <div class="about-text">
        <p class="section-label reveal">La nostra storia</p>
        <h2 class="section-title reveal d1" id="about-title">
          Da oltre <span>25 anni</span><br/>a Cuneo
        </h2>
        <div class="gold-line reveal d2"></div>
        <p class="section-desc reveal d2">
          Il Ristorante Cielo Azzurro è un punto di riferimento della ristorazione asiatica a Cuneo
          dal 1999. Un viaggio di sapori che unisce la tradizione culinaria cinese alla raffinatezza
          della cucina giapponese, in un'atmosfera accogliente e familiare.
        </p>
        <p class="section-desc reveal d3" style="margin-top:16px;">
          Il nostro team — guidato da uno staff gentile e competente — vi accompagna con passione
          in ogni pasto, consigliandovi i piatti migliori e garantendo un servizio impeccabile.
        </p>

        <div class="about-stats reveal d4">
          {stats.map(s => (
            <div class="stat">
              <span class="stat-n">{s.n}</span>
              <span class="stat-l">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #chi-siamo { background: var(--bg-up); }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }

  /* Visual side */
  .about-visual {
    position: relative;
    height: 480px;
  }

  .visual-card {
    position: absolute;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
  }

  .main-card {
    width: 85%; height: 85%;
    top: 0; right: 0;
    background: linear-gradient(135deg, #1A1A28 0%, #12121C 100%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 32px;
    overflow: hidden;
  }
  .card-kanji {
    position: absolute;
    top: 24px; right: 24px;
    font-family: 'Cinzel', serif;
    font-size: 4rem;
    color: rgba(201,150,42,.12);
    line-height: 1;
    pointer-events: none;
    letter-spacing: .1em;
  }
  .card-tag {
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }
  .card-text {
    font-size: .95rem;
    color: rgba(244,239,230,.6);
    line-height: 1.7;
    max-width: 260px;
  }

  .accent-card {
    bottom: 0; left: 0;
    width: 52%; 
    background: var(--bg-card);
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: .9rem;
    font-weight: 700;
    color: var(--cream);
    box-shadow: 0 20px 60px rgba(0,0,0,.5);
  }
  .accent-emoji { font-size: 1.6rem; }

  .visual-decor {
    position: absolute;
    top: -20px; left: -20px;
    width: 80px; height: 80px;
    border: 1px solid var(--border);
    border-radius: 50%;
  }

  /* Text side */
  .about-text { display: flex; flex-direction: column; }

  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }
  .stat { display: flex; flex-direction: column; gap: 4px; }
  .stat-n {
    font-family: 'Cinzel', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--gold);
  }
  .stat-l { font-size: .82rem; color: var(--muted); letter-spacing: .04em; }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .about-visual { height: 320px; order: -1; }
    .about-stats { grid-template-columns: repeat(4,1fr); }
  }
  @media (max-width: 600px) {
    .about-stats { grid-template-columns: 1fr 1fr; }
  }
</style>
`);

// ─── src/components/Menu.astro ───────────────────────────────────────────────
write('src/components/Menu.astro', `---
const categories = [
  {
    icon: '🥟',
    name: 'Antipasti',
    desc: 'Stuzzichini caldi e freddi per iniziare al meglio',
    items: [
      { name: 'Involtino Primavera',              price: '3,00€', tag: 'Veg' },
      { name: 'Nuvolette di Drago',               price: '2,00€', tag: 'Veg' },
      { name: 'Involtini Speciali Carne e Verdure',price: '4,00€', tag: '' },
      { name: 'Ravioli al Vapore (Dim Sum)',       price: '4,50€', tag: '' },
      { name: 'Gamberi Fritti Croccanti',          price: '5,00€', tag: '' },
    ],
  },
  {
    icon: '🍣',
    name: 'Sushi & Sashimi',
    desc: 'Pesce fresco selezionato e preparato con cura artigianale',
    items: [
      { name: 'Salmon Nigiri (2 pz)',  price: '4,50€', tag: 'Top' },
      { name: 'Tuna Nigiri (2 pz)',    price: '5,00€', tag: '' },
      { name: 'California Roll (8 pz)',price: '7,00€', tag: '' },
      { name: 'Spicy Salmon Roll',     price: '7,50€', tag: 'Spicy' },
      { name: 'Sashimi Misto (12 pz)', price: '14,00€',tag: 'Top' },
    ],
  },
  {
    icon: '🍜',
    name: 'Piatti Principali',
    desc: 'Ricette tradizionali cinesi con ingredienti di prima scelta',
    items: [
      { name: 'Riso alla Cantonese',       price: '8,00€',  tag: 'Veg' },
      { name: 'Pollo alle Mandorle',       price: '10,00€', tag: '' },
      { name: 'Maiale in Agrodolce',       price: '11,00€', tag: '' },
      { name: 'Gamberi con Verdure',       price: '13,00€', tag: '' },
      { name: 'Anatra alla Pechino',       price: '16,00€', tag: 'Chef' },
    ],
  },
  {
    icon: '🍲',
    name: 'Zuppe & Noodles',
    desc: 'Brodi aromatici e noodles freschi per riscaldare l\'anima',
    items: [
      { name: 'Zuppa di Wonton',       price: '6,00€', tag: '' },
      { name: 'Ramen Tonkotsu',        price: '11,00€',tag: 'Top' },
      { name: 'Soba al Miso',          price: '10,00€',tag: 'Veg' },
      { name: 'Udon con Gamberi',      price: '12,00€',tag: '' },
      { name: 'Zuppa Piccante Tofu',   price: '8,50€', tag: 'Spicy' },
    ],
  },
];

const tagColors = {
  'Veg':   { bg: 'rgba(39,174,96,.15)',  color: '#27ae60' },
  'Top':   { bg: 'rgba(201,150,42,.18)', color: '#C9962A' },
  'Spicy': { bg: 'rgba(181,37,37,.18)',  color: '#D63031' },
  'Chef':  { bg: 'rgba(155,89,182,.18)', color: '#9b59b6' },
};
---
<section id="cucina" aria-labelledby="menu-title">
  <div class="container">
    <div class="menu-header">
      <p class="section-label reveal">Il nostro menu</p>
      <h2 class="section-title reveal d1" id="menu-title">
        Sapori <span>autentici</span>
      </h2>
      <div class="gold-line reveal d2"></div>
      <p class="section-desc reveal d2">
        Un viaggio culinario tra Cina e Giappone: dai classici involtini alle creazioni sushi,
        dai brodi aromatici ai piatti della tradizione. Ogni piatto è una storia.
      </p>
    </div>

    <div class="categories-grid">
      {categories.map((cat, i) => (
        <div class={\`cat-card reveal d\${(i%4)+1}\`}>
          <div class="cat-header">
            <span class="cat-icon" aria-hidden="true">{cat.icon}</span>
            <div>
              <h3 class="cat-name">{cat.name}</h3>
              <p class="cat-desc">{cat.desc}</p>
            </div>
          </div>
          <ul class="items-list" role="list">
            {cat.items.map(item => (
              <li class="menu-item">
                <div class="item-left">
                  <span class="item-name">{item.name}</span>
                  {item.tag && (
                    <span
                      class="item-tag"
                      style={\`background:\${tagColors[item.tag]?.bg};color:\${tagColors[item.tag]?.color}\`}
                    >{item.tag}</span>
                  )}
                </div>
                <span class="item-price">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div class="menu-footer reveal">
      <p>Menu completo disponibile in ristorante · Prezzi indicativi, possono variare</p>
      <a href="tel:+393394195587" class="btn btn-outline">
        Chiama per info
      </a>
    </div>
  </div>
</section>

<style>
  #cucina { background: var(--bg); }

  .menu-header {
    max-width: 620px;
    margin-bottom: 64px;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .cat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 32px;
    transition: border-color var(--trans), transform var(--trans);
  }
  .cat-card:hover {
    border-color: rgba(201,150,42,.45);
    transform: translateY(-4px);
  }

  .cat-header {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }
  .cat-icon { font-size: 2rem; flex-shrink: 0; line-height: 1; }
  .cat-name {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--cream);
    margin-bottom: 4px;
  }
  .cat-desc { font-size: .83rem; color: var(--muted); line-height: 1.5; }

  .items-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .item-left { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
  .item-name {
    font-size: .92rem;
    color: rgba(244,239,230,.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-tag {
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .08em;
    padding: 2px 7px;
    border-radius: 100px;
    flex-shrink: 0;
  }
  .item-price {
    font-family: 'Cinzel', serif;
    font-size: .88rem;
    font-weight: 600;
    color: var(--gold);
    flex-shrink: 0;
  }

  .menu-footer {
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .menu-footer p { font-size: .85rem; color: var(--muted); }

  @media (max-width: 900px) {
    .categories-grid { grid-template-columns: 1fr; }
  }
</style>
`);

// ─── src/components/AllYouCanEat.astro ───────────────────────────────────────
write('src/components/AllYouCanEat.astro', `---
const features = [
  { icon: '♾️', title: 'Illimitato', desc: 'Ordina quanto vuoi scegliendo liberamente dal menu.' },
  { icon: '🍣', title: 'Sushi incluso', desc: 'Salmone, tonno, California roll e molto altro, tutti i giorni.' },
  { icon: '🥢', title: 'Piatti caldi', desc: 'Wok, fritture, zuppe: la cucina cinese a portata di bacchette.' },
  { icon: '🌿', title: 'Opzioni Veg', desc: 'Ampia scelta di piatti vegetariani e vegani.' },
];
---
<section id="ayce" class="ayce-section" aria-labelledby="ayce-title">
  <div class="ayce-bg" aria-hidden="true">
    <div class="ayce-glow"></div>
    <div class="ayce-grid"></div>
  </div>

  <div class="container">
    <div class="ayce-inner">
      <div class="ayce-text">
        <p class="section-label reveal">Formula speciale</p>
        <h2 class="section-title reveal d1" id="ayce-title">
          All You Can <span>Eat</span>
        </h2>
        <div class="gold-line reveal d2"></div>
        <p class="section-desc reveal d2">
          Vivi l'esperienza culinaria più libera che esista: scegli dal menu completo e ordina
          senza limiti. Perfetto per famiglie, gruppi di amici o semplicemente per chi ama
          mangiare bene senza pensieri.
        </p>

        <div class="price-boxes reveal d3">
          <div class="price-box">
            <span class="price-label">Pranzo</span>
            <span class="price-val">da <strong>12€</strong></span>
            <span class="price-sub">Mar–Dom · 12:15–15:00</span>
          </div>
          <div class="price-box featured">
            <span class="price-label">Cena</span>
            <span class="price-val">da <strong>18€</strong></span>
            <span class="price-sub">Mar–Dom · 18:30–23:30</span>
          </div>
        </div>

        <a href="tel:+393394195587" class="btn btn-primary reveal d4" style="margin-top:32px;width:fit-content;">
          Prenota per l'All You Can Eat
        </a>
      </div>

      <div class="ayce-features reveal reveal-right d2">
        {features.map(f => (
          <div class="feature-item">
            <span class="feature-icon" aria-hidden="true">{f.icon}</span>
            <div>
              <h3 class="feature-title">{f.title}</h3>
              <p class="feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}

        <div class="ayce-badge">
          <span class="badge-icon" aria-hidden="true">⭐</span>
          <div>
            <p class="badge-strong">Consigliato dai clienti</p>
            <p class="badge-sub">"Ottimo rapporto qualità-prezzo"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .ayce-section {
    position: relative;
    background: var(--bg-up);
    overflow: hidden;
  }
  .ayce-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .ayce-glow {
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(181,37,37,.12) 0%, transparent 70%);
    filter: blur(80px);
    right: -100px; top: 50%;
    transform: translateY(-50%);
  }
  .ayce-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,150,42,.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,150,42,.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  .ayce-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  /* Price boxes */
  .price-boxes {
    display: flex;
    gap: 16px;
    margin-top: 36px;
    flex-wrap: wrap;
  }
  .price-box {
    flex: 1;
    min-width: 140px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: border-color var(--trans);
  }
  .price-box.featured {
    border-color: rgba(201,150,42,.5);
    background: linear-gradient(135deg, rgba(201,150,42,.08), rgba(22,22,31,1));
  }
  .price-label {
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .price-val {
    font-size: 1.3rem;
    color: var(--cream);
  }
  .price-val strong { color: var(--gold); font-family: 'Cinzel', serif; font-size: 1.6rem; }
  .price-sub { font-size: .78rem; color: var(--muted); }

  /* Feature list */
  .ayce-features {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .feature-item {
    display: flex;
    gap: 18px;
    align-items: flex-start;
  }
  .feature-icon {
    font-size: 1.8rem;
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    flex-shrink: 0;
  }
  .feature-title {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--cream);
    margin-bottom: 4px;
  }
  .feature-desc { font-size: .88rem; color: var(--muted); line-height: 1.6; }

  .ayce-badge {
    margin-top: 8px;
    padding: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    display: flex;
    gap: 14px;
    align-items: center;
  }
  .badge-icon { font-size: 1.4rem; }
  .badge-strong { font-weight: 700; font-size: .92rem; color: var(--gold); }
  .badge-sub { font-size: .82rem; color: var(--muted); font-style: italic; }

  @media (max-width: 900px) {
    .ayce-inner { grid-template-columns: 1fr; gap: 48px; }
  }
</style>
`);

// ─── src/components/Reviews.astro ────────────────────────────────────────────
write('src/components/Reviews.astro', `---
const reviews = [
  {
    name: 'Romina C.',
    stars: 5,
    date: '2 mesi fa',
    text: 'Sono da almeno 15 anni che vado lì a mangiare, i proprietari sono gentilissimi, il servizio ottimo e veloce, il cibo molto buono.',
    source: 'Google',
  },
  {
    name: 'Marco F.',
    stars: 5,
    date: '4 mesi fa',
    text: 'Sushi eccellente, pesce freschissimo. L\'ambiente è curato e il personale molto disponibile. Il prezzo è onestissimo per la qualità.',
    source: 'Google',
  },
  {
    name: 'Lucia B.',
    stars: 4,
    date: '1 mese fa',
    text: 'Ottima esperienza con l\'all you can eat! Menu vasto tra sushi, pesce e piatti cinesi. Personale cordiale e ottimo rapporto qualità-prezzo.',
    source: 'TripAdvisor',
  },
  {
    name: 'Stefano M.',
    stars: 5,
    date: '3 settimane fa',
    text: 'Il miglior ristorante cinese di Cuneo senza dubbio. Da oltre 25 anni mantengono lo stesso livello qualitativo. Imperdibile!',
    source: 'Google',
  },
];
---
<section id="recensioni" aria-labelledby="reviews-title">
  <div class="container">
    <div class="reviews-header">
      <p class="section-label reveal">Cosa dicono di noi</p>
      <h2 class="section-title reveal d1" id="reviews-title">
        Le voci dei <span>nostri ospiti</span>
      </h2>
      <div class="gold-line reveal d2"></div>
    </div>

    <div class="overall-score reveal d2">
      <div class="score-big">
        <span class="score-number">4.3</span>
        <div class="score-stars" aria-label="4.3 stelle su 5">★★★★½</div>
        <p class="score-count">su oltre 1.000 recensioni Google</p>
      </div>
      <div class="score-bars">
        {[
          { label: 'Cibo',        val: 88 },
          { label: 'Servizio',    val: 92 },
          { label: 'Qualità/Prezzo', val: 95 },
          { label: 'Atmosfera',   val: 82 },
        ].map(b => (
          <div class="score-bar-row">
            <span class="bar-label">{b.label}</span>
            <div class="bar-track" role="progressbar" aria-valuenow={b.val} aria-valuemin="0" aria-valuemax="100" aria-label={b.label + ' ' + b.val + '%'}>
              <div class="bar-fill" style={\`width:\${b.val}%\`}></div>
            </div>
            <span class="bar-pct">{b.val}%</span>
          </div>
        ))}
      </div>
    </div>

    <div class="reviews-grid">
      {reviews.map((r, i) => (
        <article class={\`review-card reveal d\${(i%4)+1}\`} aria-label={\`Recensione di \${r.name}\`}>
          <div class="review-header">
            <div class="review-avatar" aria-hidden="true">
              {r.name.charAt(0)}
            </div>
            <div>
              <p class="reviewer-name">{r.name}</p>
              <p class="review-meta">{r.source} · {r.date}</p>
            </div>
            <div class="review-stars" aria-label={\`\${r.stars} stelle su 5\`}>
              {'★'.repeat(r.stars)}{'☆'.repeat(5-r.stars)}
            </div>
          </div>
          <p class="review-text">"{r.text}"</p>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  #recensioni { background: var(--bg); }

  .reviews-header { max-width: 560px; margin-bottom: 56px; }

  .overall-score {
    display: flex;
    gap: 64px;
    align-items: center;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 40px;
    margin-bottom: 48px;
    flex-wrap: wrap;
  }
  .score-big { text-align: center; flex-shrink: 0; }
  .score-number {
    font-family: 'Cinzel', serif;
    font-size: 5rem;
    font-weight: 900;
    color: var(--gold);
    line-height: 1;
  }
  .score-stars {
    font-size: 1.4rem;
    color: var(--gold);
    letter-spacing: 3px;
    margin: 8px 0 6px;
  }
  .score-count { font-size: .82rem; color: var(--muted); }

  .score-bars { flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 16px; }
  .score-bar-row { display: flex; align-items: center; gap: 12px; }
  .bar-label { font-size: .82rem; color: var(--muted); min-width: 110px; }
  .bar-track {
    flex: 1; height: 6px;
    background: rgba(255,255,255,.08);
    border-radius: 3px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--gold-lt));
    border-radius: 3px;
    transition: width 1.2s ease;
  }
  .bar-pct { font-size: .8rem; color: var(--gold); font-weight: 700; min-width: 36px; text-align: right; }

  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .review-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    transition: border-color var(--trans), transform var(--trans);
  }
  .review-card:hover {
    border-color: rgba(201,150,42,.4);
    transform: translateY(-3px);
  }

  .review-header {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
  }
  .review-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    color: var(--gold);
    flex-shrink: 0;
  }
  .reviewer-name { font-weight: 700; font-size: .92rem; color: var(--cream); }
  .review-meta { font-size: .78rem; color: var(--muted); }
  .review-stars {
    margin-left: auto;
    font-size: .9rem;
    color: var(--gold);
    letter-spacing: 1px;
    flex-shrink: 0;
  }
  .review-text {
    font-size: .9rem;
    color: rgba(244,239,230,.65);
    line-height: 1.75;
    font-style: italic;
  }

  @media (max-width: 768px) {
    .overall-score { flex-direction: column; gap: 32px; }
    .reviews-grid { grid-template-columns: 1fr; }
  }
</style>
`);

// ─── src/components/Hours.astro ──────────────────────────────────────────────
write('src/components/Hours.astro', `---
const days = [
  { day: 'Lunedì',    lunch: null,            dinner: null,            closed: true  },
  { day: 'Martedì',   lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
  { day: 'Mercoledì', lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
  { day: 'Giovedì',   lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
  { day: 'Venerdì',   lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
  { day: 'Sabato',    lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
  { day: 'Domenica',  lunch: '12:15 – 15:00', dinner: '18:30 – 23:30', closed: false },
];

const contacts = [
  { icon: '📞', label: 'Telefono',  value: '339 419 5587',            href: 'tel:+393394195587' },
  { icon: '📍', label: 'Indirizzo', value: 'Corso Nizza, 92 · Cuneo', href: 'https://maps.google.com/?q=Corso+Nizza+92+Cuneo' },
  { icon: '🚚', label: 'Delivery',  value: 'Disponibile tramite app',  href: null },
];
---
<section id="orari" class="hours-section" aria-labelledby="hours-title">
  <div class="container">
    <div class="hours-grid">
      <div class="hours-col">
        <p class="section-label reveal">Vieni a trovarci</p>
        <h2 class="section-title reveal d1" id="hours-title">
          Orari &amp; <span>Contatti</span>
        </h2>
        <div class="gold-line reveal d2"></div>
        <p class="section-desc reveal d2" style="margin-bottom:40px;">
          Siamo aperti dal martedì alla domenica, a pranzo e a cena. Il lunedì siamo chiusi per
          darci il tempo di prepararci al meglio per voi.
        </p>

        <div class="contacts reveal d3">
          {contacts.map(c => (
            <div class="contact-item">
              <span class="contact-icon" aria-hidden="true">{c.icon}</span>
              <div>
                <p class="contact-label">{c.label}</p>
                {c.href
                  ? <a href={c.href} class="contact-value link">{c.value}</a>
                  : <p class="contact-value">{c.value}</p>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      <div class="hours-col reveal reveal-right d1">
        <div class="hours-card">
          <div class="hours-card-header">
            <span class="hch-icon" aria-hidden="true">🕐</span>
            <h3>Orari di apertura</h3>
          </div>
          <ul class="hours-list" role="list">
            {days.map(d => {
              const isToday = new Date().toLocaleDateString('it-IT', { weekday: 'long' }).toLowerCase() === d.day.toLowerCase();
              return (
                <li class={\`hours-row\${d.closed ? ' closed' : ''}\${isToday ? ' today' : ''}\`}>
                  <span class="h-day">
                    {isToday && <span class="today-dot" aria-label="oggi"></span>}
                    {d.day}
                    {isToday && <span class="today-badge">oggi</span>}
                  </span>
                  {d.closed
                    ? <span class="h-closed">Chiuso</span>
                    : <span class="h-times">
                        <span>{d.lunch}</span>
                        <span class="h-sep">·</span>
                        <span>{d.dinner}</span>
                      </span>
                  }
                </li>
              );
            })}
          </ul>
          <div class="delivery-note">
            🚚 <strong>Delivery</strong> disponibile · termina alle 23:00
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hours-section { background: var(--bg-up); }

  .hours-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: start;
  }

  .contacts { display: flex; flex-direction: column; gap: 20px; }
  .contact-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .contact-icon {
    font-size: 1.4rem;
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    flex-shrink: 0;
  }
  .contact-label { font-size: .75rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
  .contact-value { font-size: .97rem; color: var(--cream); font-weight: 400; }
  .contact-value.link { color: var(--gold); transition: color .2s; }
  .contact-value.link:hover { color: var(--gold-lt); }

  /* Hours card */
  .hours-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .hours-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 28px;
    border-bottom: 1px solid var(--border);
    background: rgba(201,150,42,.05);
  }
  .hch-icon { font-size: 1.3rem; }
  .hours-card-header h3 {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 700;
    color: var(--cream);
  }

  .hours-list { list-style: none; }
  .hours-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 28px;
    border-bottom: 1px solid rgba(255,255,255,.04);
    transition: background .2s;
  }
  .hours-row:last-child { border-bottom: none; }
  .hours-row:hover { background: rgba(255,255,255,.025); }

  .hours-row.today {
    background: rgba(201,150,42,.07);
    border-left: 2px solid var(--gold);
  }
  .hours-row.closed { opacity: .4; }

  .h-day {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .9rem;
    font-weight: 700;
    color: var(--cream);
  }
  .today-dot {
    width: 7px; height: 7px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }
  .today-badge {
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .1em;
    text-transform: uppercase;
    background: rgba(201,150,42,.2);
    color: var(--gold);
    padding: 2px 6px;
    border-radius: 100px;
  }

  .h-times {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: .82rem;
    color: var(--muted);
  }
  .h-sep { color: var(--border); }
  .h-closed { font-size: .82rem; color: var(--red-lt); font-weight: 700; letter-spacing: .06em; }

  .delivery-note {
    padding: 16px 28px;
    background: rgba(201,150,42,.06);
    border-top: 1px solid var(--border);
    font-size: .85rem;
    color: var(--muted);
  }
  .delivery-note strong { color: var(--gold); }

  @media (max-width: 900px) {
    .hours-grid { grid-template-columns: 1fr; gap: 48px; }
  }
</style>
`);

// ─── src/components/Location.astro ───────────────────────────────────────────
write('src/components/Location.astro', `---
---
<section id="dove" aria-labelledby="location-title">
  <div class="container">
    <div class="loc-header">
      <p class="section-label reveal">Come raggiungerci</p>
      <h2 class="section-title reveal d1" id="location-title">
        Siamo nel cuore di <span>Cuneo</span>
      </h2>
      <div class="gold-line reveal d2"></div>
    </div>

    <div class="loc-grid">
      <div class="map-wrap reveal d2">
        <iframe
          title="Mappa Ristorante Cielo Azzurro Cuneo"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2832.5486741337455!2d7.541752!3d44.389097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d2b5b2a3b73a0d%3A0x2f3e6c8b4e2a1c5d!2sCorso%20Nizza%2C%2092%2C%2012100%20Cuneo%20CN!5e0!3m2!1sit!2sit!4v1700000000000"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          aria-label="Posizione del ristorante su Google Maps"
        ></iframe>
      </div>

      <div class="loc-info reveal reveal-right d2">
        <div class="info-item">
          <span class="info-icon" aria-hidden="true">📍</span>
          <div>
            <p class="info-label">Indirizzo</p>
            <p class="info-val">Corso Nizza, 92</p>
            <p class="info-sub">12100 Cuneo (CN) · Piemonte</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon" aria-hidden="true">🚗</span>
          <div>
            <p class="info-label">In auto</p>
            <p class="info-val">Parcheggio disponibile nelle vicinanze</p>
            <p class="info-sub">Corso Nizza è facilmente raggiungibile dal centro</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon" aria-hidden="true">🚌</span>
          <div>
            <p class="info-label">Con i mezzi</p>
            <p class="info-val">Fermata autobus nelle vicinanze</p>
            <p class="info-sub">Servito dalle linee urbane di Cuneo</p>
          </div>
        </div>

        <div class="loc-ctas">
          <a
            href="https://maps.google.com/?q=Corso+Nizza+92+Cuneo"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
            aria-label="Apri indicazioni su Google Maps (nuova scheda)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z"/>
            </svg>
            Indicazioni su Maps
          </a>
          <a href="tel:+393394195587" class="btn btn-outline">📞 Chiama</a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #dove { background: var(--bg); }

  .loc-header { max-width: 560px; margin-bottom: 56px; }

  .loc-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 40px;
    align-items: start;
  }

  .map-wrap {
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid var(--border);
    height: 420px;
    position: relative;
  }
  .map-wrap iframe {
    width: 100%; height: 100%;
    filter: invert(90%) hue-rotate(180deg);
  }

  .loc-info {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }
  .info-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding-bottom: 28px;
    border-bottom: 1px solid var(--border);
  }
  .info-item:last-of-type { border-bottom: none; padding-bottom: 0; }
  .info-icon {
    font-size: 1.3rem;
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    background: var(--gold-dim);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    flex-shrink: 0;
  }
  .info-label { font-size: .72rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
  .info-val { font-size: .97rem; font-weight: 700; color: var(--cream); margin-bottom: 2px; }
  .info-sub { font-size: .82rem; color: var(--muted); }

  .loc-ctas {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  @media (max-width: 900px) {
    .loc-grid { grid-template-columns: 1fr; }
    .map-wrap { height: 280px; }
  }
</style>
`);

// ─── src/components/Footer.astro ─────────────────────────────────────────────
write('src/components/Footer.astro', `---
const year = new Date().getFullYear();
const nav = [
  { href: '#chi-siamo',  label: 'Chi siamo' },
  { href: '#cucina',     label: 'Menu' },
  { href: '#ayce',       label: 'All You Can Eat' },
  { href: '#recensioni', label: 'Recensioni' },
  { href: '#orari',      label: 'Orari' },
  { href: '#dove',       label: 'Dove siamo' },
];
---
<footer>
  <div class="footer-top">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-zh">天藍</span>
            <span class="logo-text">Cielo Azzurro</span>
          </div>
          <p class="footer-tagline">
            Cucina cinese &amp; giapponese autentica<br/>
            nel cuore di Cuneo dal 1999.
          </p>
          <div class="footer-socials" aria-label="Social media">
            <a href="https://www.facebook.com/RistoranteCineseAzzurroCuneo" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/explore/locations/ristorante-cinese-cielo-azzurro" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-nav-col">
          <h4>Navigazione</h4>
          <ul role="list">
            {nav.map(l => <li><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </div>

        <div class="footer-contact-col">
          <h4>Contatti</h4>
          <ul role="list" class="footer-contacts">
            <li>
              <span aria-hidden="true">📞</span>
              <a href="tel:+393394195587">339 419 5587</a>
            </li>
            <li>
              <span aria-hidden="true">📍</span>
              <a href="https://maps.google.com/?q=Corso+Nizza+92+Cuneo" target="_blank" rel="noopener noreferrer">Corso Nizza, 92 · Cuneo</a>
            </li>
            <li>
              <span aria-hidden="true">🕐</span>
              <span>Mar–Dom: 12:15–15:00 / 18:30–23:30</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <p>&copy; {year} Ristorante Cielo Azzurro · Cuneo · P.IVA ×××××××××</p>
      <p class="footer-credits">Sito realizzato con ❤️ e <a href="https://astro.build" target="_blank" rel="noopener noreferrer">Astro</a></p>
    </div>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
  }

  .footer-top {
    background: var(--bg-card);
    padding: 72px 24px 48px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr;
    gap: 60px;
  }

  /* Brand */
  .footer-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .logo-zh {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--gold);
    border: 1px solid var(--border);
    padding: 3px 7px;
    border-radius: 4px;
  }
  .logo-text {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--cream);
  }
  .footer-tagline {
    font-size: .88rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .footer-socials { display: flex; gap: 10px; }
  .social-btn {
    width: 38px; height: 38px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--muted);
    transition: color var(--trans), border-color var(--trans), background var(--trans);
  }
  .social-btn:hover {
    color: var(--gold);
    border-color: rgba(201,150,42,.5);
    background: var(--gold-dim);
  }

  /* Nav col */
  .footer-nav-col h4, .footer-contact-col h4 {
    font-family: 'Cinzel', serif;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--cream);
    margin-bottom: 20px;
  }
  .footer-nav-col ul, .footer-contacts {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .footer-nav-col a {
    font-size: .88rem;
    color: var(--muted);
    transition: color .2s;
  }
  .footer-nav-col a:hover { color: var(--gold); }

  .footer-contacts li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: .88rem;
    color: var(--muted);
  }
  .footer-contacts a {
    color: var(--muted);
    transition: color .2s;
  }
  .footer-contacts a:hover { color: var(--gold); }

  /* Bottom bar */
  .footer-bottom {
    background: var(--bg);
    padding: 18px 24px;
    border-top: 1px solid var(--border);
  }
  .footer-bottom .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .footer-bottom p { font-size: .78rem; color: var(--muted); }
  .footer-credits a { color: var(--gold); }
  .footer-credits a:hover { text-decoration: underline; }

  @media (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .footer-brand { grid-column: 1/-1; }
  }
  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
    .footer-bottom .container { flex-direction: column; align-items: flex-start; }
  }
</style>
`);

// ─── src/pages/index.astro ───────────────────────────────────────────────────
write('src/pages/index.astro', `---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Menu from '../components/Menu.astro';
import AllYouCanEat from '../components/AllYouCanEat.astro';
import Reviews from '../components/Reviews.astro';
import Hours from '../components/Hours.astro';
import Location from '../components/Location.astro';
import Footer from '../components/Footer.astro';
---
<Layout>
  <Nav />
  <main id="main-content">
    <Hero />
    <About />
    <Menu />
    <AllYouCanEat />
    <Reviews />
    <Hours />
    <Location />
  </main>
  <Footer />
</Layout>
`);

// ─── public/favicon.svg (overwrite) ──────────────────────────────────────────
// Already written above

console.log('\\n✅  All files generated!');
console.log('\\nNext steps:');
console.log('  1.  npm install');
console.log('  2.  npm run dev');
console.log('  3.  Open http://localhost:4321\\n');
