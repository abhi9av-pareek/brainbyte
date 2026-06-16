import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

/* ─── Scroll reveal hook (same as landing) ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════
   GYANTRA BLOG PAGE
══════════════════════════════════════════════════════ */
export default function GyantraBlog() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroRef, heroVisible] = useReveal(0.1);
  const [problemRef, problemVisible] = useReveal(0.1);
  const [solutionRef, solutionVisible] = useReveal(0.1);
  const [howRef, howVisible] = useReveal(0.1);
  const [nameRef, nameVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:    #030711; --bg2:   #060D1A; --surface: #0A1628;
      --surf2: #0E1F38; --border: rgba(0,229,192,0.12); --border2: rgba(0,229,192,0.28);
      --cyan:  #00E5C0; --cyan2:  #00B896; --cyan3:  rgba(0,229,192,0.08);
      --purple: #7C5CFC; --text:  #E8F4F0; --text2: #8BA8A0; --text3: #4A7A72;
    }
    html { scroll-behavior: smooth; overflow-x: hidden; }
    body { font-family: 'Exo 2', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; -webkit-tap-highlight-color: transparent; }
    * { -webkit-tap-highlight-color: transparent; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--cyan2); border-radius: 4px; }

    /* ── NAV ── */
    .blog-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;
      transition: all 0.4s cubic-bezier(.4,0,.2,1);
    }
    .blog-nav.scrolled {
      background: rgba(3,7,17,0.92); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border); padding: 0.65rem 2rem;
    }
    .blog-nav-left { display: flex; align-items: center; gap: 16px; }
    .blog-back-btn {
      display: flex; align-items: center; gap: 6px;
      font-family: 'Exo 2', sans-serif; font-size: 12px; font-weight: 600;
      color: var(--text2); letter-spacing: 1.5px; text-transform: uppercase;
      cursor: pointer; background: none; border: none; transition: color 0.2s;
      padding: 6px 0;
    }
    .blog-back-btn:hover { color: var(--cyan); }
    .blog-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .blog-logo-img { width: 36px; height: 36px; border-radius: 9px; overflow: hidden; flex-shrink: 0; }
    .blog-logo-img img { width: 100%; height: 100%; object-fit: cover; }
    .blog-logo-text {
      font-family: 'Orbitron', monospace; font-weight: 700; font-size: 20px;
      color: var(--text); letter-spacing: 2px;
    }
    .blog-logo-text span { color: var(--cyan); }
    .blog-nav-right { display: flex; align-items: center; gap: 10px; }
    .blog-theme-btn {
      width: 36px; height: 36px; border-radius: 10px;
      background: rgba(255,255,255,0.06); border: 1px solid var(--border2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all .2s; color: var(--text2);
    }
    .blog-theme-btn:hover { border-color: var(--cyan); color: var(--cyan); }
    .blog-login-btn {
      padding: 9px 22px; border-radius: 7px; font-size: 12px; font-weight: 600;
      font-family: 'Exo 2', sans-serif; cursor: pointer; border: 1px solid var(--border2);
      color: var(--cyan); background: transparent; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s;
    }
    .blog-login-btn:hover { background: var(--cyan3); transform: translateY(-1px); }
    .blog-signup-btn {
      padding: 9px 22px; border-radius: 7px; font-size: 12px; font-weight: 700;
      font-family: 'Exo 2', sans-serif; cursor: pointer; border: none;
      background: var(--cyan); color: #030711; letter-spacing: 1px; text-transform: uppercase;
      transition: all 0.2s; box-shadow: 0 0 16px rgba(0,229,192,0.25);
    }
    .blog-signup-btn:hover { box-shadow: 0 0 32px rgba(0,229,192,0.5); transform: translateY(-2px); }

    /* ── BLOG LAYOUT ── */
    .blog-page {
      min-height: 100vh; position: relative;
    }
    .blog-bg {
      position: fixed; inset: 0; z-index: 0;
      background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,229,192,0.04) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 40% at 80% 80%, rgba(124,92,252,0.03) 0%, transparent 60%),
                  linear-gradient(180deg, #030711 0%, #060D1A 100%);
    }
    .blog-content {
      position: relative; z-index: 1;
      max-width: 720px; margin: 0 auto; padding: 0 2rem;
    }

    /* ── HERO ── */
    .blog-hero {
      padding-top: 140px; padding-bottom: 80px; text-align: center;
    }
    .blog-hero-sanskrit {
      font-family: 'Orbitron', monospace; font-size: clamp(1.8rem, 4.5vw, 3rem);
      font-weight: 900; line-height: 1.3; margin-bottom: 1.5rem;
      letter-spacing: -0.5px;
    }
    .blog-hero-devanagari {
      display: block; color: var(--text); margin-bottom: 0.25rem;
    }
    .blog-hero-equals {
      display: block;
      color: transparent;
      background: linear-gradient(90deg, #00E5C0 0%, #00FFA3 50%, #7C5CFC 100%);
      -webkit-background-clip: text; background-clip: text;
    }
    .blog-hero-meaning {
      font-size: 0.95rem; color: var(--text2); font-weight: 300; line-height: 1.7;
      font-style: italic; max-width: 480px; margin: 0 auto 2rem;
    }
    .blog-hero-divider {
      width: 60px; height: 2px; margin: 0 auto;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    }

    /* ── SECTIONS ── */
    .blog-section {
      padding: 60px 0; border-top: 1px solid var(--border);
    }
    .blog-section:first-of-type { border-top: none; }
    .blog-section-eyebrow {
      font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;
      color: var(--cyan); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
    }
    .blog-section-eyebrow-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--cyan);
      animation: pulse 2s infinite;
    }
    .blog-section-title {
      font-family: 'Orbitron', monospace; font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: 1.5rem;
    }
    .blog-section-text {
      font-size: 1rem; color: var(--text2); line-height: 1.85; font-weight: 300;
      margin-bottom: 1.25rem;
    }
    .blog-section-text:last-child { margin-bottom: 0; }
    .blog-section-text strong { color: var(--text); font-weight: 500; }
    .blog-section-text em { color: var(--cyan2); font-style: normal; }

    /* ── QUOTE BLOCK ── */
    .blog-quote {
      border-left: 2px solid var(--cyan);
      padding: 1.25rem 1.5rem; margin: 2rem 0;
      background: var(--cyan3); border-radius: 0 12px 12px 0;
    }
    .blog-quote p {
      font-size: 1.05rem; color: var(--text); line-height: 1.8;
      font-weight: 400; font-style: italic;
    }
    .blog-quote cite {
      display: block; margin-top: 0.75rem;
      font-size: 0.85rem; color: var(--text3); font-style: normal; letter-spacing: 1px;
    }

    /* ── HOW STEPS ── */
    .blog-steps {
      display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;
    }
    .blog-step {
      display: flex; gap: 1.25rem; align-items: flex-start;
      padding: 1.25rem 1.5rem; border-radius: 14px;
      background: var(--surface); border: 1px solid var(--border);
      transition: all 0.3s;
    }
    .blog-step:hover {
      border-color: var(--border2); transform: translateX(4px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    .blog-step-num {
      font-family: 'Orbitron', monospace; font-size: 1.6rem; font-weight: 900;
      color: transparent; -webkit-text-stroke: 1px rgba(0,229,192,0.3);
      flex-shrink: 0; line-height: 1; min-width: 36px;
    }
    .blog-step-content {}
    .blog-step-title {
      font-family: 'Orbitron', monospace; font-size: 0.78rem; font-weight: 700;
      color: var(--text); letter-spacing: 1px; margin-bottom: 0.35rem;
    }
    .blog-step-desc {
      font-size: 0.9rem; color: var(--text2); line-height: 1.65; font-weight: 300;
    }

    /* ── NAME SECTION SPECIAL ── */
    .blog-name-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin: 2rem 0;
    }
    .blog-name-card {
      padding: 1.75rem; border-radius: 16px;
      background: var(--surface); border: 1px solid var(--border);
      text-align: center; transition: all 0.3s;
    }
    .blog-name-card:hover {
      border-color: var(--border2); transform: translateY(-4px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    }
    .blog-name-sanskrit {
      font-size: 2.5rem; margin-bottom: 0.5rem; line-height: 1;
    }
    .blog-name-roman {
      font-family: 'Orbitron', monospace; font-size: 0.8rem; font-weight: 700;
      color: var(--cyan); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem;
    }
    .blog-name-meaning {
      font-size: 0.88rem; color: var(--text2); font-weight: 300; line-height: 1.5;
    }
    .blog-name-plus {
      display: flex; align-items: center; justify-content: center;
      grid-column: 1 / -1; font-family: 'Orbitron', monospace; font-size: 1.5rem;
      font-weight: 900; color: var(--cyan); padding: 0.75rem 0;
    }
    .blog-name-result {
      grid-column: 1 / -1; text-align: center;
      padding: 2rem; border-radius: 16px;
      background: linear-gradient(135deg, var(--surface) 0%, var(--surf2) 100%);
      border: 1px solid var(--border2);
    }
    .blog-name-result-text {
      font-family: 'Orbitron', monospace; font-size: clamp(1.2rem, 3vw, 1.6rem);
      font-weight: 900; margin-bottom: 0.5rem;
      color: transparent;
      background: linear-gradient(90deg, #00E5C0 0%, #00FFA3 50%, #7C5CFC 100%);
      -webkit-background-clip: text; background-clip: text;
    }
    .blog-name-result-sub {
      font-size: 0.9rem; color: var(--text2); font-weight: 300; line-height: 1.6;
    }

    /* ── CTA ── */
    .blog-cta {
      padding: 80px 0; text-align: center;
      border-top: 1px solid var(--border);
    }
    .blog-cta-glow {
      position: absolute; left: 50%; transform: translateX(-50%);
      width: 400px; height: 400px; border-radius: 50%;
      background: rgba(0,229,192,0.04); filter: blur(80px); pointer-events: none;
    }
    .blog-cta-title {
      font-family: 'Orbitron', monospace; font-size: clamp(1.5rem, 4vw, 2.2rem);
      font-weight: 900; color: var(--text); margin-bottom: 1rem; position: relative;
    }
    .blog-cta-title span { color: var(--cyan); }
    .blog-cta-sub {
      font-size: 1rem; color: var(--text2); margin-bottom: 2rem;
      font-weight: 300; position: relative; line-height: 1.7;
      max-width: 460px; margin-left: auto; margin-right: auto;
    }
    .blog-cta-buttons {
      display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative;
    }
    .blog-cta-btn-primary {
      padding: 14px 32px; border-radius: 9px; font-size: 14px; font-weight: 700;
      font-family: 'Exo 2', sans-serif; cursor: pointer; letter-spacing: 1px;
      text-transform: uppercase; transition: all 0.25s; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px; border: none;
      background: var(--cyan); color: #030711;
      box-shadow: 0 0 30px rgba(0,229,192,0.3);
    }
    .blog-cta-btn-primary:hover { box-shadow: 0 0 50px rgba(0,229,192,0.5); transform: translateY(-2px); }
    .blog-cta-btn-outline {
      padding: 14px 32px; border-radius: 9px; font-size: 14px; font-weight: 700;
      font-family: 'Exo 2', sans-serif; cursor: pointer; letter-spacing: 1px;
      text-transform: uppercase; transition: all 0.25s; text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--cyan); border: 1px solid var(--border2);
    }
    .blog-cta-btn-outline:hover { background: var(--cyan3); transform: translateY(-2px); }

    /* ── FOOTER ── */
    .blog-footer {
      padding: 2.5rem 2rem; text-align: center;
      border-top: 1px solid var(--border); font-size: 12px; color: var(--text3);
      position: relative; z-index: 1;
    }
    .blog-footer-logo { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 0.5rem; }
    .blog-footer-logo-img { width: 20px; height: 20px; border-radius: 5px; overflow: hidden; }
    .blog-footer-logo-img img { width: 100%; height: 100%; object-fit: cover; }
    .blog-footer-logo-text { font-family: 'Orbitron', monospace; font-size: 15px; font-weight: 700; color: var(--text); letter-spacing: 2px; }
    .blog-footer-logo-text span { color: var(--cyan); }

    /* ── REVEAL ── */
    .blog-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .blog-reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── KEYFRAMES ── */
    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

    /* ════════════════════════════════════
       LIGHT MODE
    ════════════════════════════════════ */
    [data-theme="light"] {
      --bg: #F5F7FA; --bg2: #EFF1F5; --surface: #FFFFFF;
      --surf2: #F0F2F8; --border: rgba(0,0,0,0.08); --border2: rgba(0,0,0,0.15);
      --cyan: #00B896; --cyan2: #009E82; --cyan3: rgba(0,184,150,0.08);
      --purple: #7C5CFC; --text: #1A1A2E; --text2: #555566; --text3: #888899;
    }
    [data-theme="light"] body { background: var(--bg); color: var(--text); }
    [data-theme="light"] .blog-nav.scrolled { background: rgba(245,247,250,0.95); }
    [data-theme="light"] .blog-bg {
      background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,184,150,0.04) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 40% at 80% 80%, rgba(124,92,252,0.03) 0%, transparent 60%),
                  linear-gradient(180deg, #F5F7FA 0%, #EFF1F5 100%);
    }
    [data-theme="light"] .blog-step { background: #FFFFFF; }
    [data-theme="light"] .blog-step:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
    [data-theme="light"] .blog-name-card { background: #FFFFFF; }
    [data-theme="light"] .blog-name-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.06); }
    [data-theme="light"] .blog-name-result { background: linear-gradient(135deg, #FFFFFF 0%, #F0F2F8 100%); }
    [data-theme="light"] .blog-quote { background: rgba(0,184,150,0.06); }
    [data-theme="light"] .blog-theme-btn { background: rgba(0,0,0,0.05); }
    [data-theme="light"] .blog-cta-btn-primary { color: #FFFFFF; }
    [data-theme="light"] .blog-signup-btn { color: #FFFFFF; }
    [data-theme="light"] .blog-cta-glow { background: rgba(0,184,150,0.04); }
    [data-theme="light"] .blog-footer { background: var(--bg); }
    [data-theme="light"] ::-webkit-scrollbar-track { background: var(--bg); }
    [data-theme="light"] ::-webkit-scrollbar-thumb { background: var(--cyan); }

    /* ════════════════════════════════════
       RESPONSIVE — TABLET (≤ 900px)
    ════════════════════════════════════ */
    @media (max-width: 900px) {
      .blog-nav { padding: 0.85rem 1.25rem; }
      .blog-nav.scrolled { padding: 0.6rem 1.25rem; }
      .blog-logo-text { font-size: 17px; }
      .blog-nav-cta-btns { display: none; }

      .blog-content { padding: 0 1.5rem; }
      .blog-hero { padding-top: 120px; padding-bottom: 60px; }
      .blog-section { padding: 50px 0; }
      .blog-name-grid { gap: 1rem; }
    }

    /* ════════════════════════════════════
       RESPONSIVE — MOBILE (≤ 600px)
    ════════════════════════════════════ */
    @media (max-width: 600px) {
      .blog-nav { padding: 0.75rem 1rem; }
      .blog-logo-text { font-size: 15px; letter-spacing: 1px; }
      .blog-logo-img { width: 28px; height: 28px; }
      .blog-nav-cta-btns { display: none; }
      .blog-back-btn { font-size: 11px; letter-spacing: 1px; }

      .blog-content { padding: 0 1rem; }
      .blog-hero { padding-top: 100px; padding-bottom: 50px; }
      .blog-hero-sanskrit { font-size: clamp(1.5rem, 8vw, 2.2rem); }
      .blog-hero-meaning { font-size: 0.88rem; }

      .blog-section { padding: 40px 0; }
      .blog-section-title { font-size: clamp(1.1rem, 5vw, 1.4rem); }
      .blog-section-text { font-size: 0.93rem; }

      .blog-name-grid { grid-template-columns: 1fr; gap: 0.85rem; }
      .blog-name-sanskrit { font-size: 2rem; }
      .blog-name-card { padding: 1.25rem; }

      .blog-step { padding: 1rem 1.25rem; gap: 1rem; }
      .blog-step-num { font-size: 1.3rem; min-width: 28px; }
      .blog-step-title { font-size: 0.75rem; }
      .blog-step-desc { font-size: 0.85rem; }

      .blog-quote { padding: 1rem 1.25rem; }
      .blog-quote p { font-size: 0.95rem; }

      .blog-cta { padding: 60px 0; }
      .blog-cta-title { font-size: clamp(1.2rem, 6vw, 1.6rem); }
      .blog-cta-sub { font-size: 0.9rem; }
      .blog-cta-buttons { flex-direction: column; align-items: center; gap: 10px; }
      .blog-cta-buttons button { width: 100%; max-width: 320px; justify-content: center; }

      .blog-footer { padding: 1.5rem 1rem; font-size: 11px; }
    }

    /* ════════════════════════════════════
       RESPONSIVE — SMALL PHONE (≤ 380px)
    ════════════════════════════════════ */
    @media (max-width: 380px) {
      .blog-hero-sanskrit { font-size: 1.4rem; }
      .blog-logo-text { display: none; }
      .blog-name-sanskrit { font-size: 1.7rem; }
      .blog-name-result-text { font-size: 1.1rem; }
      .blog-cta-title { font-size: 1.15rem; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="blog-page">
        <div className="blog-bg" />

        {/* ── NAV ── */}
        <nav className={`blog-nav${scrolled ? " scrolled" : ""}`}>
          <div className="blog-nav-left">
            <button className="blog-back-btn" onClick={() => navigate("/")}>
              <ArrowLeft size={14} /> Home
            </button>
            <div className="blog-logo" onClick={() => {
              if (localStorage.getItem("token")) {
                navigate("/dashboard");
              } else {
                navigate("/");
              }
            }}>
              <div className="blog-logo-img"><img src="/favicon-32.png" alt="Gyantra" /></div>
              <span className="blog-logo-text">GY<span>AN</span>TRA</span>
            </div>
          </div>

          <div className="blog-nav-right">
            <button className="blog-theme-btn" onClick={toggleTheme} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <span className="blog-nav-cta-btns">
              <button className="blog-login-btn" onClick={() => navigate("/login")}>Log In</button>
              <button className="blog-signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
            </span>
          </div>
        </nav>

        <div className="blog-content">

          {/* ══ HERO ══ */}
          <div className="blog-hero" ref={heroRef}>
            <div className={`blog-reveal${heroVisible ? " visible" : ""}`}>
              <h1 className="blog-hero-sanskrit">
                <span className="blog-hero-devanagari">ज्ञान + यंत्र</span>
                <span className="blog-hero-equals"> Gyantra</span>
              </h1>
              <p className="blog-hero-meaning">
                Knowledge + Machine — a Sanskrit fusion that became a mission to make exam preparation intelligent, adaptive, and free for every student in India.
              </p>
              <div className="blog-hero-divider" />
            </div>
          </div>

          {/* ══ THE PROBLEM ══ */}
          <section className="blog-section" ref={problemRef}>
            <div className={`blog-reveal${problemVisible ? " visible" : ""}`}>
              <div className="blog-section-eyebrow">
                <span className="blog-section-eyebrow-dot" />
                The Problem
              </div>
              <h2 className="blog-section-title">Why We Built This</h2>

              <p className="blog-section-text">
                Every year, millions of Indian students sit for competitive exams — <strong>JEE, NEET, UPSC, GATE</strong>. The preparation is brutal. Coaching centers charge lakhs. Practice material is stale, recycled from years ago. And the worst part? There's no way to know <em>exactly where you're weak</em> and what to focus on next.
              </p>

              <p className="blog-section-text">
                Most students study blindly, solving the same textbook problems, hoping the next mock test will magically go better. But it rarely does — because the study isn't <em>adaptive</em>. It doesn't respond to you. It doesn't know you.
              </p>

              <p className="blog-section-text">
                We've been there. We know how it feels to prepare for months, only to realize you spent all your time on topics you were already good at — while your weak areas quietly grew weaker. <strong>That gap between effort and outcome</strong> is the problem we wanted to solve.
              </p>

              <div className="blog-quote">
                <p>"The hardest part of exam prep isn't studying hard — it's studying the right things."</p>
              </div>
            </div>
          </section>

          {/* ══ THE SOLUTION ══ */}
          <section className="blog-section" ref={solutionRef}>
            <div className={`blog-reveal${solutionVisible ? " visible" : ""}`}>
              <div className="blog-section-eyebrow">
                <span className="blog-section-eyebrow-dot" />
                What Gyantra Does
              </div>
              <h2 className="blog-section-title">An AI That Knows Your Weak Spots</h2>

              <p className="blog-section-text">
                Gyantra is an <strong>AI-powered quiz platform</strong> that generates infinite, exam-grade MCQs on any subject. Every question is unique — created in real-time by NVIDIA AI. No question bank. No repetition. No limits.
              </p>

              <p className="blog-section-text">
                But questions alone aren't enough. Gyantra tracks your performance with <strong>deep analytics</strong> — subject-wise accuracy, score trends, difficulty breakdowns, activity heatmaps, and a <em>weak-topic radar</em> that flags exactly which areas need more work.
              </p>

              <p className="blog-section-text">
                The platform <em>adapts to you</em>. Topics below 60% accuracy get flagged automatically. Your difficulty level adjusts based on actual performance. Every quiz session is personalized — not generic.
              </p>

              <p className="blog-section-text">
                And it's all <strong>completely free</strong>. No premium tiers. No hidden paywalls. No "upgrade to unlock" messages. Just pure, AI-powered preparation for anyone with the will to learn.
              </p>
            </div>
          </section>

          {/* ══ HOW IT WORKS ══ */}
          <section className="blog-section" ref={howRef}>
            <div className={`blog-reveal${howVisible ? " visible" : ""}`}>
              <div className="blog-section-eyebrow">
                <span className="blog-section-eyebrow-dot" />
                The Process
              </div>
              <h2 className="blog-section-title">How It Actually Works</h2>

              <p className="blog-section-text">
                From sign-up to mastery, the entire flow takes under a minute to start — and a lifetime to master.
              </p>

              <div className="blog-steps">
                {[
                  { num: "01", title: "Create Your Account", desc: "Sign up in 30 seconds. Your profile, streak, and XP start immediately." },
                  { num: "02", title: "Pick a Subject & Difficulty", desc: "Choose from JEE, NEET, UPSC, GATE, or any custom topic. Set your difficulty — Easy, Medium, or Hard." },
                  { num: "03", title: "AI Generates Your Quiz", desc: "Gyantra's AI creates unique, contextual, exam-grade questions tailored to your chosen parameters. Every quiz is different." },
                  { num: "04", title: "Attempt With Live Timer", desc: "Take the quiz with a real exam-like timer, question map sidebar, and the ability to bookmark any question mid-quiz." },
                  { num: "05", title: "Review Every Answer", desc: "After submission, get per-question explanations, correct answer breakdowns, and topic-wise performance analysis." },
                  { num: "06", title: "Track Your Growth", desc: "Score trends, accuracy heatmaps, XP progression, global rank — all visualized beautifully on your analytics dashboard." },
                ].map((step, i) => (
                  <div className="blog-step" key={i}>
                    <div className="blog-step-num">{step.num}</div>
                    <div className="blog-step-content">
                      <div className="blog-step-title">{step.title}</div>
                      <div className="blog-step-desc">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ THE NAME ══ */}
          <section className="blog-section" ref={nameRef}>
            <div className={`blog-reveal${nameVisible ? " visible" : ""}`}>
              <div className="blog-section-eyebrow">
                <span className="blog-section-eyebrow-dot" />
                The Name
              </div>
              <h2 className="blog-section-title">Why "Gyantra"</h2>

              <div className="blog-name-grid">
                <div className="blog-name-card">
                  <div className="blog-name-sanskrit">ज्ञान</div>
                  <div className="blog-name-roman">Gyan</div>
                  <div className="blog-name-meaning">Knowledge — the pursuit of understanding, wisdom, and truth. The foundation of every exam, every career, every life well-lived.</div>
                </div>
                <div className="blog-name-card">
                  <div className="blog-name-sanskrit">यंत्र</div>
                  <div className="blog-name-roman">Yantra</div>
                  <div className="blog-name-meaning">Machine, instrument — a tool designed with precision to serve a purpose. Technology with intent.</div>
                </div>
                <div className="blog-name-plus">+</div>
                <div className="blog-name-result">
                  <div className="blog-name-result-text">ज्ञानयंत्र — Gyantra</div>
                  <div className="blog-name-result-sub">A machine of knowledge. An intelligent instrument that helps you acquire knowledge, test it, and grow.</div>
                </div>
              </div>

              <p className="blog-section-text">
                The name carries our core belief — that <strong>technology should serve learning</strong>. Not replace the teacher, but <em>amplify the student</em>. Not make studying easier, but make it <em>smarter</em>.
              </p>

              <p className="blog-section-text">
                Every feature in Gyantra — from AI-generated questions to the weak-topic radar to the XP system — exists because we believe that <strong>knowledge, when paired with the right instrument, becomes unstoppable</strong>.
              </p>

              <div className="blog-quote">
                <p>"ज्ञान + यंत्र — because knowledge deserves a machine built just for it."</p>
              </div>
            </div>
          </section>

          {/* ══ CTA ══ */}
          <div className="blog-cta" ref={ctaRef} style={{ position: "relative" }}>
            <div className="blog-cta-glow" />
            <div className={`blog-reveal${ctaVisible ? " visible" : ""}`} style={{ position: "relative" }}>
              <h2 className="blog-cta-title">
                Built for India's <span>Exam Warriors</span>
              </h2>
              <p className="blog-cta-sub">
                Free forever. No hidden fees. No premium tiers. Just pure, AI-powered exam preparation for anyone who has the will to study.
              </p>
              <div className="blog-cta-buttons">
                <button className="blog-cta-btn-primary" onClick={() => navigate("/signup")}>
                  <Sparkles size={16} /> Start Preparing Free
                </button>
                <button className="blog-cta-btn-outline" onClick={() => navigate("/")}>
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── FOOTER ── */}
        <footer className="blog-footer">
          <div className="blog-footer-logo" onClick={() => {
            if (localStorage.getItem("token")) {
              navigate("/dashboard");
            } else {
              navigate("/");
            }
          }} style={{ cursor: "pointer" }}>
            <div className="blog-footer-logo-img"><img src="/favicon-32.png" alt="" /></div>
            <span className="blog-footer-logo-text">GY<span>AN</span>TRA</span>
          </div>
          <div>
            © {new Date().getFullYear()} Gyantra. All rights reserved. Built for India's exam warriors.
            <svg width="16" height="12" viewBox="0 0 3 2" style={{ display: "inline-block", marginLeft: "8px", verticalAlign: "middle", borderRadius: "2px", boxShadow: "0 0 1px rgba(0,0,0,0.2)" }}>
              <rect width="3" height="0.667" fill="#FF9933" />
              <rect y="0.667" width="3" height="0.667" fill="#FFFFFF" />
              <rect y="1.333" width="3" height="0.667" fill="#138808" />
              <circle cx="1.5" cy="1" r="0.2" fill="#000080" />
              <circle cx="1.5" cy="1" r="0.15" fill="none" stroke="#FFFFFF" strokeWidth="0.02" />
              <path d="M 1.5 0.8 L 1.5 1.2 M 1.3 1 L 1.7 1 M 1.36 0.86 L 1.64 1.14 M 1.36 1.14 L 1.64 0.86" stroke="#000080" strokeWidth="0.02" />
            </svg>
          </div>
        </footer>
      </div>
    </>
  );
}
