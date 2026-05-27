import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

/* ─────────────────────────────────────────────────────────────────────────────
   AVATAR RENDERER  (exported so Dashboard/navbar can reuse it)
───────────────────────────────────────────────────────────────────────────── */
export function AvatarRender({ avatar, name, size = 96, fontSize = 38 }) {
  const inner = avatar ? (
    avatar.startsWith("data:") || avatar.startsWith("http") ? (
      <img
        src={avatar}
        alt="avatar"
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
      />
    ) : (
      <span style={{ fontSize }}>{avatar}</span>
    )
  ) : (
    <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize, color: "#F0EFF8" }}>
      {(name || "U")[0].toUpperCase()}
    </span>
  );

  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg,#7C5CFC,#00E5C0)", padding: 3, flexShrink: 0,
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: "50%",
        background: "var(--surface,#111318)", display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden",
      }}>
        {inner}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const TECH_AVATARS = [
  { emoji: "🤖", label: "Robot" }, { emoji: "👾", label: "Alien" },
  { emoji: "🧠", label: "Brain" }, { emoji: "💻", label: "Dev" },
  { emoji: "⚡", label: "Flash" }, { emoji: "🚀", label: "Rocket" },
  { emoji: "🎯", label: "Target" }, { emoji: "🔬", label: "Sci" },
  { emoji: "🌐", label: "Globe" }, { emoji: "🛸", label: "UFO" },
  { emoji: "🦾", label: "Cyborg" }, { emoji: "🧬", label: "DNA" },
  { emoji: "⚛", label: "Atom" }, { emoji: "🔭", label: "Space" },
  { emoji: "🎮", label: "Gaming" }, { emoji: "🏆", label: "Champ" },
  { emoji: "🦉", label: "Owl" }, { emoji: "🐉", label: "Dragon" },
  { emoji: "🌊", label: "Wave" }, { emoji: "🔮", label: "Crystal" },
  { emoji: "🦊", label: "Fox" }, { emoji: "🐺", label: "Wolf" },
  { emoji: "🦁", label: "Lion" }, { emoji: "🌙", label: "Moon" },
];

const EDUCATION_LEVELS = ["School", "College", "Graduate", "Postgraduate", "Professional", "Self-taught"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni/Graduated"];

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────────────────────── */
const IconUser = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSettings = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconShield = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconUpload = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);
const IconEye = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const IconGraduation = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const IconX = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconSpin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "pf-spin 0.8s linear infinite" }}>
    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
    <path d="M12 3a9 9 0 019 9" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   INLINE STYLES (CSS-in-JS string injected once)
───────────────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #08090D; --surface: #0F1117; --surface2: #161923; --surface3: #1C2130;
    --border: rgba(255,255,255,0.06); --border2: rgba(255,255,255,0.11);
    --accent: #7C5CFC; --accent2: #00E5C0; --accent3: #FF6B6B;
    --amber: #FFB347; --text: #F0EFF8; --muted: #7B7A8C; --muted2: #3A394A;
    --green: #4ADE80; --blue: #60A5FA;
  }

  .pf-root { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  /* NAV */
  .pf-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 58px; border-bottom: 1px solid var(--border);
    background: rgba(8,9,13,0.96); position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(12px);
  }
  .pf-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; display: flex; align-items: center; gap: 9px; cursor: pointer; text-decoration: none; color: var(--text); }
  .pf-logo-icon { width: 30px; height: 30px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .pf-logo span { color: var(--accent2); }

  /* BUTTONS */
  .pf-btn { display: inline-flex; align-items: center; gap: 7px; padding: 10px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all .18s; border: none; font-family: 'DM Sans', sans-serif; line-height: 1; }
  .pf-btn-primary { background: linear-gradient(135deg, #7C5CFC, #9B7DFD); color: #fff; box-shadow: 0 4px 14px rgba(124,92,252,0.3); }
  .pf-btn-primary:hover:not(:disabled) { background: linear-gradient(135deg, #8B6CFD, #A88DFE); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(124,92,252,0.4); }
  .pf-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
  .pf-btn-ghost { background: rgba(255,255,255,0.05); color: var(--text); border: 1px solid var(--border2); }
  .pf-btn-ghost:hover:not(:disabled) { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.18); }
  .pf-btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }
  .pf-btn-danger { background: rgba(255,107,107,0.1); color: var(--accent3); border: 1px solid rgba(255,107,107,0.2); }
  .pf-btn-danger:hover { background: rgba(255,107,107,0.18); }
  .pf-btn-green { background: rgba(74,222,128,0.1); color: var(--green); border: 1px solid rgba(74,222,128,0.2); }
  .pf-btn-green:hover { background: rgba(74,222,128,0.18); }

  /* MAIN */
  .pf-main { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.5rem 7rem; }

  /* TABS */
  .pf-tabs { display: flex; gap: 3px; background: var(--surface2); padding: 4px; border-radius: 13px; border: 1px solid var(--border); margin-bottom: 2rem; width: fit-content; }
  .pf-tab { padding: 8px 22px; border-radius: 10px; border: none; background: none; color: var(--muted); font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; font-weight: 500; transition: all .2s; display: flex; align-items: center; gap: 6px; }
  .pf-tab.active { background: var(--surface); color: var(--text); border: 1px solid var(--border2); box-shadow: 0 2px 8px rgba(0,0,0,0.35); }
  .pf-tab:hover:not(.active) { color: var(--text); background: rgba(255,255,255,0.04); }

  /* CARD */
  .pf-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 20px; padding: 1.75rem; margin-bottom: 1.25rem; position: relative; overflow: hidden; }
  .pf-card::before { content: ''; position: absolute; inset: 0; border-radius: 20px; pointer-events: none; background: linear-gradient(135deg, rgba(124,92,252,0.03) 0%, transparent 60%); }
  .pf-card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 9px; }
  .pf-card-title-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* AVATAR HERO */
  .pf-avatar-hero { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }
  .pf-avatar-glow { position: relative; }
  .pf-avatar-glow::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; background: linear-gradient(135deg,#7C5CFC,#00E5C0); filter: blur(10px); opacity: 0.35; z-index: -1; }
  .pf-avatar-actions { display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 180px; }
  .pf-avatar-hint { font-size: 12px; color: var(--muted); margin-top: 2px; line-height: 1.6; }

  /* UPLOAD ZONE */
  .pf-upload-zone { border: 2px dashed var(--border2); border-radius: 14px; padding: 1.5rem; text-align: center; cursor: pointer; transition: all .22s; margin-top: 1.5rem; }
  .pf-upload-zone:hover { border-color: var(--accent); background: rgba(124,92,252,0.05); transform: translateY(-1px); }
  .pf-upload-zone-text { font-size: 13px; color: var(--muted); margin-top: 8px; font-weight: 500; }
  .pf-upload-zone-sub  { font-size: 11px; color: var(--muted2); margin-top: 3px; }

  /* AVATAR GRID */
  .pf-avatar-grid-label { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; margin-top: 1.5rem; }
  .pf-avatar-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .pf-avatar-option { width: 54px; height: 54px; border-radius: 14px; background: var(--surface2); border: 2px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: all .18s; flex-direction: column; gap: 2px; position: relative; }
  .pf-avatar-option:hover { border-color: var(--accent); background: rgba(124,92,252,0.1); transform: scale(1.1) translateY(-1px); }
  .pf-avatar-option.selected { border-color: var(--accent2); background: rgba(0,229,192,0.1); box-shadow: 0 0 0 3px rgba(0,229,192,0.2); }
  .pf-avatar-option-label { font-size: 8px; color: var(--muted); font-family: 'DM Sans', sans-serif; }
  .pf-avatar-selected-check { position: absolute; top: -5px; right: -5px; width: 16px; height: 16px; background: var(--accent2); border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  /* FORM */
  .pf-field { margin-bottom: 1.2rem; }
  .pf-field:last-child { margin-bottom: 0; }
  .pf-label { font-size: 11.5px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 7px; display: flex; align-items: center; justify-content: space-between; }
  .pf-label-tag { font-size: 10px; background: rgba(0,229,192,0.08); color: var(--accent2); border: 1px solid rgba(0,229,192,0.18); border-radius: 6px; padding: 2px 8px; text-transform: none; letter-spacing: 0; font-weight: 500; }
  .pf-label-tag-amber { font-size: 10px; background: rgba(255,179,71,0.08); color: var(--amber); border: 1px solid rgba(255,179,71,0.18); border-radius: 6px; padding: 2px 8px; text-transform: none; letter-spacing: 0; font-weight: 500; }
  .pf-input { width: 100%; background: var(--surface2); border: 1px solid var(--border2); border-radius: 11px; padding: 12px 14px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .18s, box-shadow .18s; }
  .pf-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }
  .pf-input::placeholder { color: var(--muted2); }
  .pf-input:disabled { opacity: 0.45; cursor: not-allowed; background: var(--surface3); }
  .pf-input-hint { font-size: 11px; color: var(--muted); margin-top: 5px; line-height: 1.5; }
  .pf-input-error { font-size: 11px; color: var(--accent3); margin-top: 5px; display: flex; align-items: center; gap: 4px; }
  .pf-input-success { font-size: 11px; color: var(--green); margin-top: 5px; display: flex; align-items: center; gap: 4px; }
  .pf-input-wrap { position: relative; }
  .pf-input-wrap .pf-input { padding-right: 44px; }
  .pf-input-eye { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--muted); display: flex; padding: 2px; transition: color .15s; }
  .pf-input-eye:hover { color: var(--text); }

  /* PASSWORD STRENGTH */
  .pf-strength-bar { display: flex; gap: 4px; margin-top: 8px; }
  .pf-strength-seg { height: 3px; flex: 1; border-radius: 3px; background: var(--muted2); transition: background .3s; }
  .pf-strength-seg.active-weak { background: var(--accent3); }
  .pf-strength-seg.active-fair { background: var(--amber); }
  .pf-strength-seg.active-good { background: var(--blue); }
  .pf-strength-seg.active-strong { background: var(--green); }
  .pf-strength-label { font-size: 10px; margin-top: 4px; }
  .pf-strength-weak { color: var(--accent3); }
  .pf-strength-fair { color: var(--amber); }
  .pf-strength-good { color: var(--blue); }
  .pf-strength-strong { color: var(--green); }

  /* BADGE PREVIEW */
  .pf-badge-preview { display: inline-flex; align-items: center; gap: 7px; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); border-radius: 20px; padding: 6px 14px; font-size: 13px; font-weight: 600; color: var(--accent); margin-top: 10px; }

  /* SAVE BAR */
  .pf-save-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(8,9,13,0.96); backdrop-filter: blur(14px); border-top: 1px solid var(--border2); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; z-index: 200; }
  .pf-save-status { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 6px; }
  .pf-save-status.changed { color: var(--amber); }

  /* TOAST */
  .pf-toast { position: fixed; bottom: 88px; left: 50%; transform: translateX(-50%) translateY(16px); background: var(--surface3); border: 1px solid rgba(0,229,192,0.3); border-radius: 14px; padding: 12px 22px; font-size: 13px; font-weight: 600; color: var(--accent2); display: flex; align-items: center; gap: 9px; opacity: 0; transition: all .3s cubic-bezier(.4,0,.2,1); z-index: 600; white-space: nowrap; pointer-events: none; box-shadow: 0 8px 30px rgba(0,0,0,0.4); }
  .pf-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  .pf-toast.error { border-color: rgba(255,107,107,0.3); color: var(--accent3); }

  /* DANGER ZONE */
  .pf-danger-zone { border: 1px solid rgba(255,107,107,0.18); border-radius: 14px; padding: 1.4rem; background: rgba(255,107,107,0.025); }
  .pf-danger-title { font-size: 13px; font-weight: 700; color: var(--accent3); margin-bottom: 5px; }
  .pf-danger-sub   { font-size: 12px; color: var(--muted); margin-bottom: 14px; line-height: 1.6; }

  /* TOGGLES */
  .pf-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .pf-toggle-row:last-child { border-bottom: none; }
  .pf-toggle-info strong { font-size: 13.5px; font-weight: 500; display: block; margin-bottom: 3px; }
  .pf-toggle-info span   { font-size: 12px; color: var(--muted); }
  .pf-toggle { width: 44px; height: 24px; border-radius: 12px; background: var(--muted2); border: none; cursor: pointer; position: relative; transition: background .22s; flex-shrink: 0; }
  .pf-toggle.on { background: var(--accent); }
  .pf-toggle::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform .22s cubic-bezier(.4,0,.2,1); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
  .pf-toggle.on::after { transform: translateX(20px); }

  /* STAT ROW */
  .pf-stat-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
  .pf-stat-row:last-child { border-bottom: none; }

  /* LOADING SKELETON */
  .pf-skeleton { background: linear-gradient(90deg, var(--surface2) 25%, var(--surface3) 50%, var(--surface2) 75%); background-size: 200% 100%; animation: pf-shimmer 1.5s infinite; border-radius: 8px; }
  @keyframes pf-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  @keyframes pf-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pf-spin { to { transform: rotate(360deg); } }
  .pf-fadein { animation: pf-fadein .35s ease forwards; }

  /* GRID */
  .pf-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 560px) { .pf-grid-2 { grid-template-columns: 1fr; } }

  /* PAGE HEADER */
  .pf-page-header { margin-bottom: 2rem; }
  .pf-page-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent2); margin-bottom: 8px; }
  .pf-page-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .pf-page-sub { font-size: 14px; color: var(--muted); }

  /* SECTION DIVIDER */
  .pf-divider { height: 1px; background: var(--border); margin: 1.5rem 0; }

  /* DIFF CHIP */
  .pf-diff-chip { display: flex; gap: 8px; }
  .pf-diff-btn { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid var(--border2); background: var(--surface2); color: var(--muted); font-size: 13px; font-weight: 600; cursor: pointer; transition: all .18s; font-family: 'DM Sans', sans-serif; }
  .pf-diff-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); box-shadow: 0 3px 12px rgba(124,92,252,0.3); }
  .pf-diff-btn:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: var(--text); }

  /* ALERT BANNER */
  .pf-alert { padding: 12px 16px; border-radius: 10px; font-size: 12.5px; font-weight: 500; display: flex; align-items: flex-start; gap: 10px; margin-bottom: 1rem; }
  .pf-alert-info { background: rgba(96,165,250,0.08); border: 1px solid rgba(96,165,250,0.2); color: var(--blue); }
  .pf-alert-success { background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2); color: var(--green); }
  .pf-alert-error { background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.2); color: var(--accent3); }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   PASSWORD STRENGTH HELPER
───────────────────────────────────────────────────────────────────────────── */
function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: "", cls: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { score: 1, label: "Weak", cls: "weak" };
  if (score === 2) return { score: 2, label: "Fair", cls: "fair" };
  if (score === 3) return { score: 3, label: "Good", cls: "good" };
  return { score: 4, label: "Strong", cls: "strong" };
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);

  const params = new URLSearchParams(location.search);
  const initTab = params.get("tab") || "profile";

  /* ── loading / saving state ── */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [activeTab, setActiveTab] = useState(initTab);

  /* ── toast ── */
  const [toast, setToast] = useState({ show: false, msg: "", error: false });
  const showToast = (msg, error = false) => {
    setToast({ show: true, msg, error });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  };

  /* ── profile fields ── */
  const [profile, setProfile] = useState({
    name: "", nickname: "", bio: "", avatar: "", email: "",
    contactNumber: "", educationLevel: "", institution: "",
    yearOfStudy: "", fieldOfStudy: "",
  });

  /* ── preferences ── */
  const [prefs, setPrefs] = useState({
    defaultDifficulty: "Medium",
    instantFeedback: true, shuffleQuestions: true,
    showStreak: true, emailNotifications: false,
  });

  /* ── password change ── */
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });
  const [showPwd, setShowPwd] = useState({ current: false, newPwd: false, confirm: false });
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");

  /* ─── Fetch profile from MongoDB on mount ─── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/api/user/profile");
        if (data.success) {
          const p = data.profile;
          setProfile({
            name: p.name || "",
            nickname: p.nickname || "",
            bio: p.bio || "",
            avatar: p.avatar || "",
            email: p.email || "",
            contactNumber: p.contactNumber || "",
            educationLevel: p.educationLevel || "",
            institution: p.institution || "",
            yearOfStudy: p.yearOfStudy || "",
            fieldOfStudy: p.fieldOfStudy || "",
          });
          if (p.preferences) {
            setPrefs({
              defaultDifficulty: p.preferences.defaultDifficulty || "Medium",
              instantFeedback: p.preferences.instantFeedback !== false,
              shuffleQuestions: p.preferences.shuffleQuestions !== false,
              showStreak: p.preferences.showStreak !== false,
              emailNotifications: p.preferences.emailNotifications === true,
            });
          }
          // sync localStorage so dashboard greets with correct name
          const stored = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem("user", JSON.stringify({ ...stored, ...p }));
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        // fallback to localStorage if API fails (offline / token expired)
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        setProfile(prev => ({
          ...prev,
          name: stored.name || "",
          email: stored.email || "",
          nickname: stored.nickname || "",
          avatar: stored.avatar || "",
          contactNumber: stored.contactNumber || "",
          educationLevel: stored.educationLevel || "",
        }));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  /* ── generic field change ── */
  const setField = (key) => (e) => {
    setProfile(p => ({ ...p, [key]: e.target.value }));
    setHasChange(true);
  };
  const setPref = (key) => (val) => {
    setPrefs(p => ({ ...p, [key]: val }));
    setHasChange(true);
  };

  /* ── image upload (compress > 1MB) ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("Image must be under 5MB", true); return; }
    const reader = new FileReader();
    reader.onload = () => {
      // If large, compress via canvas
      if (file.size > 500 * 1024) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 400;
          const ratio = Math.min(maxDim / img.width, maxDim / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          setProfile(p => ({ ...p, avatar: canvas.toDataURL("image/jpeg", 0.8) }));
          setHasChange(true);
        };
        img.src = reader.result;
      } else {
        setProfile(p => ({ ...p, avatar: reader.result }));
        setHasChange(true);
      }
    };
    reader.readAsDataURL(file);
  };

  /* ── SAVE PROFILE to MongoDB ── */
  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await axiosInstance.patch("/api/user/profile", {
        name: profile.name,
        nickname: profile.nickname,
        bio: profile.bio,
        avatar: profile.avatar,
        contactNumber: profile.contactNumber,
        educationLevel: profile.educationLevel,
        institution: profile.institution,
        yearOfStudy: profile.yearOfStudy,
        fieldOfStudy: profile.fieldOfStudy,
        preferences: prefs,
      });

      if (data.success) {
        // Sync localStorage
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...stored, ...data.profile }));
        setHasChange(false);
        showToast("✓ Profile saved to cloud!");
      } else {
        showToast(data.message || "Save failed", true);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Could not save profile";
      showToast(msg, true);
    } finally {
      setSaving(false);
    }
  };

  /* ── DISCARD ── */
  const handleCancel = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/user/profile");
      if (data.success) {
        const p = data.profile;
        setProfile({
          name: p.name || "", nickname: p.nickname || "", bio: p.bio || "",
          avatar: p.avatar || "", email: p.email || "",
          contactNumber: p.contactNumber || "", educationLevel: p.educationLevel || "",
          institution: p.institution || "", yearOfStudy: p.yearOfStudy || "",
          fieldOfStudy: p.fieldOfStudy || "",
        });
        if (p.preferences) setPrefs({ ...prefs, ...p.preferences });
      }
    } catch (_) {}
    setHasChange(false);
    setLoading(false);
  };

  /* ── CHANGE PASSWORD ── */
  const handleChangePassword = async () => {
    setPwdError("");
    setPwdSuccess("");

    if (!pwd.current || !pwd.newPwd || !pwd.confirm) {
      setPwdError("All password fields are required"); return;
    }
    if (pwd.newPwd !== pwd.confirm) {
      setPwdError("New passwords do not match"); return;
    }
    if (pwd.newPwd.length < 8) {
      setPwdError("New password must be at least 8 characters"); return;
    }
    if (pwd.newPwd === pwd.current) {
      setPwdError("New password must be different from current password"); return;
    }

    setPwdSaving(true);
    try {
      const { data } = await axiosInstance.post("/api/user/change-password", {
        currentPassword: pwd.current,
        newPassword: pwd.newPwd,
        confirmPassword: pwd.confirm,
      });
      if (data.success) {
        setPwdSuccess("Password changed successfully!");
        setPwd({ current: "", newPwd: "", confirm: "" });
        showToast("✓ Password updated!");
      } else {
        setPwdError(data.message || "Failed to change password");
      }
    } catch (err) {
      setPwdError(err.response?.data?.message || "Something went wrong");
    } finally {
      setPwdSaving(false);
    }
  };

  const pwdStrength = getPasswordStrength(pwd.newPwd);

  /* ── loading skeleton ── */
  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="pf-root">
          <nav className="pf-nav">
            <div className="pf-logo"><div className="pf-logo-icon" />&nbsp;Gyan<span>tra</span></div>
          </nav>
          <main className="pf-main">
            {[1,2,3].map(i => (
              <div key={i} className="pf-card" style={{ marginBottom: 16 }}>
                <div className="pf-skeleton" style={{ height: 18, width: "40%", marginBottom: 16 }} />
                <div className="pf-skeleton" style={{ height: 48, marginBottom: 12 }} />
                <div className="pf-skeleton" style={{ height: 48 }} />
              </div>
            ))}
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">

        {/* ── NAV ── */}
        <nav className="pf-nav">
          <div className="pf-logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
            <div className="pf-logo-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            Gyan<span>tra</span>
          </div>
          <button className="pf-btn pf-btn-ghost" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>
        </nav>

        <main className="pf-main pf-fadein">

          {/* PAGE HEADER */}
          <div className="pf-page-header">
            <div className="pf-page-eyebrow">Account Settings</div>
            <div className="pf-page-title">Your Profile</div>
            <div className="pf-page-sub">
              {profile.nickname
                ? <>Welcome, <strong>{profile.nickname}</strong> — manage your identity and preferences</>
                : "Manage your identity, preferences, and security settings"}
            </div>
          </div>

          {/* TABS */}
          <div className="pf-tabs">
            {[
              { id: "profile", label: "Profile", icon: <IconUser /> },
              { id: "preferences", label: "Preferences", icon: <IconSettings /> },
              { id: "security", label: "Security", icon: <IconShield /> },
            ].map(t => (
              <button
                key={t.id}
                className={`pf-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════
              PROFILE TAB
          ════════════════════════════════════ */}
          {activeTab === "profile" && (
            <div className="pf-fadein">

              {/* AVATAR CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(124,92,252,0.12)", color: "var(--accent)" }}>
                    <IconUser size={15} />
                  </div>
                  Profile Picture
                </div>

                <div className="pf-avatar-hero">
                  <div className="pf-avatar-glow">
                    <AvatarRender avatar={profile.avatar} name={profile.name} size={100} fontSize={40} />
                  </div>
                  <div className="pf-avatar-actions">
                    <button className="pf-btn pf-btn-ghost" style={{ fontSize: 13 }} onClick={() => fileRef.current?.click()}>
                      <IconUpload size={16} /> Upload Photo
                    </button>
                    {profile.avatar && (
                      <button className="pf-btn pf-btn-danger" style={{ fontSize: 13 }}
                        onClick={() => { setProfile(p => ({ ...p, avatar: "" })); setHasChange(true); }}>
                        <IconX size={12} /> Remove
                      </button>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                    <div className="pf-avatar-hint">
                      JPG, PNG or GIF · Max 5MB<br />
                      Auto-compressed to 400×400px
                    </div>
                  </div>
                </div>

                <div className="pf-upload-zone" onClick={() => fileRef.current?.click()}>
                  <IconUpload size={22} />
                  <div className="pf-upload-zone-text">Click to upload or drag &amp; drop</div>
                  <div className="pf-upload-zone-sub">Or pick a tech avatar below ↓</div>
                </div>

                <div className="pf-avatar-grid-label">Tech Avatars — Pick One</div>
                <div className="pf-avatar-grid">
                  {TECH_AVATARS.map((a, i) => (
                    <div
                      key={i}
                      className={`pf-avatar-option${profile.avatar === a.emoji ? " selected" : ""}`}
                      onClick={() => { setProfile(p => ({ ...p, avatar: a.emoji })); setHasChange(true); }}
                      title={a.label}
                    >
                      {profile.avatar === a.emoji && (
                        <div className="pf-avatar-selected-check">
                          <IconCheck size={9} />
                        </div>
                      )}
                      <span style={{ fontSize: 24 }}>{a.emoji}</span>
                      <span className="pf-avatar-option-label">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IDENTITY CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(0,229,192,0.1)", color: "var(--accent2)" }}>
                    <IconUser size={15} />
                  </div>
                  Identity
                </div>

                <div className="pf-grid-2">
                  <div className="pf-field">
                    <div className="pf-label">
                      Full Name <span className="pf-label-tag">On reports</span>
                    </div>
                    <input className="pf-input" value={profile.name} onChange={setField("name")} placeholder="Your full name" />
                  </div>
                  <div className="pf-field">
                    <div className="pf-label">
                      Nickname <span className="pf-label-tag">Dashboard greeting</span>
                    </div>
                    <input
                      className="pf-input" value={profile.nickname} onChange={setField("nickname")}
                      placeholder="e.g. GyanMaster99" maxLength={20}
                    />
                    {profile.nickname && (
                      <div className="pf-badge-preview">
                        {profile.avatar && !profile.avatar.startsWith("data:") ? profile.avatar : "✨"}
                        &nbsp; Hey, {profile.nickname}!
                      </div>
                    )}
                  </div>
                </div>

                <div className="pf-field">
                  <div className="pf-label">Bio <span className="pf-label-tag-amber">Optional</span></div>
                  <textarea
                    className="pf-input" value={profile.bio} onChange={setField("bio")}
                    placeholder="Tell something about yourself — your interests, goals, favourite subject..."
                    rows={3} maxLength={300} style={{ resize: "vertical", minHeight: 80 }}
                  />
                  <div className="pf-input-hint">{profile.bio.length}/300 characters</div>
                </div>

                <div className="pf-field">
                  <div className="pf-label">Email Address</div>
                  <input className="pf-input" value={profile.email} disabled />
                  <div className="pf-input-hint">Email cannot be changed. Contact support if needed.</div>
                </div>

                <div className="pf-field">
                  <div className="pf-label">Contact Number</div>
                  <input
                    className="pf-input" value={profile.contactNumber} onChange={setField("contactNumber")}
                    placeholder="10-digit mobile number" maxLength={10} type="tel"
                  />
                </div>
              </div>

              {/* EDUCATION CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(255,179,71,0.1)", color: "var(--amber)" }}>
                    <IconGraduation size={15} />
                  </div>
                  Education Details
                </div>

                <div className="pf-grid-2">
                  <div className="pf-field">
                    <div className="pf-label">Education Level</div>
                    <select className="pf-input" value={profile.educationLevel} onChange={setField("educationLevel")} style={{ cursor: "pointer" }}>
                      <option value="">Select level</option>
                      {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="pf-field">
                    <div className="pf-label">Year of Study <span className="pf-label-tag-amber">Optional</span></div>
                    <select className="pf-input" value={profile.yearOfStudy} onChange={setField("yearOfStudy")} style={{ cursor: "pointer" }}>
                      <option value="">Select year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pf-grid-2">
                  <div className="pf-field">
                    <div className="pf-label">Institution <span className="pf-label-tag-amber">Optional</span></div>
                    <input
                      className="pf-input" value={profile.institution} onChange={setField("institution")}
                      placeholder="e.g. IIT Delhi, Mumbai University"
                    />
                  </div>
                  <div className="pf-field">
                    <div className="pf-label">Field of Study <span className="pf-label-tag-amber">Optional</span></div>
                    <input
                      className="pf-input" value={profile.fieldOfStudy} onChange={setField("fieldOfStudy")}
                      placeholder="e.g. Computer Science, MBA"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              PREFERENCES TAB
          ════════════════════════════════════ */}
          {activeTab === "preferences" && (
            <div className="pf-fadein">
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(255,179,71,0.1)", color: "var(--amber)" }}>
                    <IconSettings size={15} />
                  </div>
                  Default Difficulty
                </div>
                <div className="pf-diff-chip">
                  {["Easy", "Medium", "Hard"].map(d => (
                    <button
                      key={d}
                      className={`pf-diff-btn${prefs.defaultDifficulty === d ? " active" : ""}`}
                      onClick={() => setPref("defaultDifficulty")(d)}
                    >
                      {d === "Easy" ? "🟢" : d === "Medium" ? "🟡" : "🔴"} {d}
                    </button>
                  ))}
                </div>
                <div className="pf-input-hint" style={{ marginTop: 10 }}>QuizSetup will pre-select this difficulty for you.</div>
              </div>

              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(96,165,250,0.1)", color: "var(--blue)" }}>
                    <IconSettings size={15} />
                  </div>
                  Quiz Behaviour
                </div>
                {[
                  { key: "instantFeedback", label: "Instant Feedback", desc: "Show correct answer immediately after selection" },
                  { key: "shuffleQuestions", label: "Shuffle Questions", desc: "Randomize question order in every quiz" },
                  { key: "showStreak", label: "Show Streak on Nav", desc: "Display your active streak in the navbar" },
                  { key: "emailNotifications", label: "Email Notifications", desc: "Get weekly performance summary via email" },
                ].map(item => (
                  <div key={item.key} className="pf-toggle-row">
                    <div className="pf-toggle-info">
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <button
                      className={`pf-toggle${prefs[item.key] ? " on" : ""}`}
                      onClick={() => setPref(item.key)(!prefs[item.key])}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              SECURITY TAB
          ════════════════════════════════════ */}
          {activeTab === "security" && (
            <div className="pf-fadein">

              {/* CHANGE PASSWORD CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(0,229,192,0.1)", color: "var(--accent2)" }}>
                    <IconShield size={15} />
                  </div>
                  Change Password
                </div>

                {pwdError && (
                  <div className="pf-alert pf-alert-error" style={{ marginBottom: 16 }}>
                    <IconX size={14} /> {pwdError}
                  </div>
                )}
                {pwdSuccess && (
                  <div className="pf-alert pf-alert-success" style={{ marginBottom: 16 }}>
                    <IconCheck size={14} /> {pwdSuccess}
                  </div>
                )}

                <div className="pf-field">
                  <div className="pf-label">Current Password</div>
                  <div className="pf-input-wrap">
                    <input
                      className="pf-input"
                      type={showPwd.current ? "text" : "password"}
                      value={pwd.current}
                      onChange={e => { setPwd(p => ({ ...p, current: e.target.value })); setPwdError(""); setPwdSuccess(""); }}
                      placeholder="Enter your current password"
                      autoComplete="current-password"
                    />
                    <button className="pf-input-eye" type="button"
                      onClick={() => setShowPwd(s => ({ ...s, current: !s.current }))}>
                      {showPwd.current ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="pf-field">
                  <div className="pf-label">New Password</div>
                  <div className="pf-input-wrap">
                    <input
                      className="pf-input"
                      type={showPwd.newPwd ? "text" : "password"}
                      value={pwd.newPwd}
                      onChange={e => { setPwd(p => ({ ...p, newPwd: e.target.value })); setPwdError(""); setPwdSuccess(""); }}
                      placeholder="At least 8 characters"
                      autoComplete="new-password"
                    />
                    <button className="pf-input-eye" type="button"
                      onClick={() => setShowPwd(s => ({ ...s, newPwd: !s.newPwd }))}>
                      {showPwd.newPwd ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {pwd.newPwd && (
                    <>
                      <div className="pf-strength-bar">
                        {[1, 2, 3, 4].map(seg => (
                          <div key={seg} className={`pf-strength-seg${seg <= pwdStrength.score ? ` active-${pwdStrength.cls}` : ""}`} />
                        ))}
                      </div>
                      <div className={`pf-strength-label pf-strength-${pwdStrength.cls}`}>
                        {pwdStrength.label} password
                        {pwdStrength.cls === "weak" && " — add uppercase, numbers, symbols"}
                        {pwdStrength.cls === "fair" && " — almost there!"}
                        {pwdStrength.cls === "good" && " — looking solid"}
                        {pwdStrength.cls === "strong" && " — excellent! 🔒"}
                      </div>
                    </>
                  )}
                </div>

                <div className="pf-field">
                  <div className="pf-label">Confirm New Password</div>
                  <div className="pf-input-wrap">
                    <input
                      className="pf-input"
                      type={showPwd.confirm ? "text" : "password"}
                      value={pwd.confirm}
                      onChange={e => { setPwd(p => ({ ...p, confirm: e.target.value })); setPwdError(""); setPwdSuccess(""); }}
                      placeholder="Repeat new password"
                      autoComplete="new-password"
                    />
                    <button className="pf-input-eye" type="button"
                      onClick={() => setShowPwd(s => ({ ...s, confirm: !s.confirm }))}>
                      {showPwd.confirm ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                  {pwd.confirm && pwd.newPwd && (
                    pwd.newPwd === pwd.confirm
                      ? <div className="pf-input-success"><IconCheck size={12} /> Passwords match</div>
                      : <div className="pf-input-error"><IconX size={12} /> Passwords do not match</div>
                  )}
                </div>

                <button
                  className="pf-btn pf-btn-primary"
                  style={{ marginTop: 6 }}
                  onClick={handleChangePassword}
                  disabled={pwdSaving || !pwd.current || !pwd.newPwd || !pwd.confirm}
                  id="change-password-btn"
                >
                  {pwdSaving ? <><IconSpin /> Updating...</> : <><IconShield size={14} /> Update Password</>}
                </button>
              </div>

              {/* ACCOUNT INFO CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div className="pf-card-title-icon" style={{ background: "rgba(124,92,252,0.12)", color: "var(--accent)" }}>
                    <IconUser size={15} />
                  </div>
                  Account Overview
                </div>
                {[
                  { label: "Registered Email", val: profile.email || "—" },
                  { label: "Education Level", val: profile.educationLevel || "—" },
                  { label: "Institution", val: profile.institution || "—" },
                  { label: "Field of Study", val: profile.fieldOfStudy || "—" },
                  { label: "Contact", val: profile.contactNumber || "—" },
                ].map((r, i) => (
                  <div key={i} className="pf-stat-row">
                    <span style={{ color: "var(--muted)" }}>{r.label}</span>
                    <span style={{ fontWeight: 600, maxWidth: "60%", textAlign: "right", wordBreak: "break-word" }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* DANGER ZONE */}
              <div className="pf-card">
                <div className="pf-card-title" style={{ color: "var(--accent3)" }}>
                  ⚠️ Danger Zone
                </div>
                <div className="pf-danger-zone">
                  <div className="pf-danger-title">Delete Account</div>
                  <div className="pf-danger-sub">
                    Permanently delete your account and all quiz history, XP, and analytics data.
                    This action <strong>cannot be undone</strong>.
                  </div>
                  <button
                    className="pf-btn pf-btn-danger"
                    onClick={() => alert("Contact support at support@gyantra.app to delete your account.")}
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ── SAVE BAR (Profile & Preferences tabs only) ── */}
        {activeTab !== "security" && (
          <div className="pf-save-bar">
            <div className={`pf-save-status${hasChange ? " changed" : ""}`}>
              {hasChange ? "⚠ Unsaved changes" : <><IconCheck size={12} /> All changes saved to cloud</>}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="pf-btn pf-btn-ghost" onClick={handleCancel} disabled={!hasChange || saving}>
                Discard
              </button>
              <button className="pf-btn pf-btn-primary" onClick={handleSave} disabled={saving || !hasChange} id="save-profile-btn">
                {saving ? <><IconSpin /> Saving...</> : <><IconCheck /> Save Changes</>}
              </button>
            </div>
          </div>
        )}

        {/* ── TOAST ── */}
        <div className={`pf-toast${toast.show ? " show" : ""}${toast.error ? " error" : ""}`}>
          {toast.error ? <IconX size={14} /> : <IconCheck size={14} />} {toast.msg}
        </div>
      </div>
    </>
  );
}
