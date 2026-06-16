import React, { useState, useRef, useCallback, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import axiosInstance from "../utils/axiosConfig";
import { ScanLine, Upload, Image, Trash2, Edit3, Check, X, Clock, Target, Award, ChevronRight, Brain, Flame, ArrowLeft, History, Camera, FileText, AlertTriangle } from "lucide-react";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

/* ─── CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0A0B0F; --surface: #111318; --surface2: #181B23;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.13);
    --accent: #7C5CFC; --accent2: #00E5C0; --accent3: #FF6B6B;
    --amber: #FFB347; --text: #F0EFF8; --muted: #7B7A8C; --muted2: #3A394A;
  }
  [data-theme="light"] {
    --bg: #F5F5FA; --surface: #FFFFFF; --surface2: #F0EFF8;
    --border: rgba(0,0,0,0.07); --border2: rgba(0,0,0,0.12);
    --text: #0A0B0F; --muted: #7B7A8C; --muted2: #C8C7D4;
  }

  .gs-root { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; transition: background .3s, color .3s; }

  /* NAV */
  .gs-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; border-bottom: 1px solid var(--border); background: rgba(10,11,15,0.97); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; transition: background .3s; }
  [data-theme="light"] .gs-nav { background: rgba(245,245,250,0.92); }
  .gs-nav-left { display: flex; align-items: center; gap: 12px; }
  .gs-back-btn { background: none; border: 1px solid var(--border2); border-radius: 10px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); transition: all .2s; }
  .gs-back-btn:hover { border-color: var(--accent); color: var(--accent); }
  .gs-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; display: flex; align-items: center; gap: 8px; }
  .gs-logo-icon { width: 28px; height: 28px; border-radius: 7px; overflow: hidden; }
  .gs-logo-icon img { width: 100%; height: 100%; object-fit: cover; }
  .gs-logo span { color: var(--accent2); }
  .gs-nav-right { display: flex; align-items: center; gap: 10px; }
  .gs-theme-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--surface2); border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: var(--muted); }
  .gs-theme-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* MAIN */
  .gs-main { max-width: 840px; margin: 0 auto; padding: 1.5rem 1.5rem 4rem; }

  /* TABS */
  .gs-tabs { display: flex; gap: 4px; background: var(--surface2); padding: 4px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 1.5rem; }
  .gs-tab { flex: 1; padding: 10px; border-radius: 10px; border: none; background: none; color: var(--muted); font-size: 14px; font-family: 'DM Sans', sans-serif; cursor: pointer; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .gs-tab.active { background: var(--surface); color: var(--text); border: 1px solid var(--border2); box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .gs-tab:hover:not(.active) { color: var(--text); }

  /* HERO BADGE */
  .gs-hero { text-align: center; margin-bottom: 2rem; }
  .gs-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, rgba(124,92,252,0.15), rgba(0,229,192,0.1)); border: 1px solid rgba(124,92,252,0.25); border-radius: 24px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: var(--accent); letter-spacing: 0.5px; margin-bottom: 12px; }
  .gs-hero h1 { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 8px; }
  .gs-hero h1 .gs-accent { color: var(--accent2); }
  .gs-hero p { color: var(--muted); font-size: 14px; max-width: 480px; margin: 0 auto; line-height: 1.6; }

  /* UPLOAD ZONE */
  .gs-upload-zone { border: 2px dashed var(--border2); border-radius: 20px; padding: 2.5rem 2rem; text-align: center; cursor: pointer; transition: all .3s; background: var(--surface); position: relative; overflow: hidden; }
  .gs-upload-zone:hover { border-color: var(--accent); background: rgba(124,92,252,0.04); }
  .gs-upload-zone.dragging { border-color: var(--accent2); background: rgba(0,229,192,0.06); transform: scale(1.01); }
  .gs-upload-zone.has-images { border-style: solid; border-color: var(--accent); padding: 1.5rem; }
  .gs-upload-icon { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, rgba(124,92,252,0.12), rgba(0,229,192,0.08)); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: var(--accent); }
  .gs-upload-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 6px; }
  .gs-upload-sub { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
  .gs-upload-btn-row { display: flex; gap: 10px; justify-content: center; }
  .gs-upload-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; transition: all .2s; }
  .gs-upload-primary { background: var(--accent); color: #fff; }
  .gs-upload-primary:hover { background: #9074fd; transform: translateY(-1px); }
  .gs-upload-secondary { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border2); }
  [data-theme="light"] .gs-upload-secondary { background: rgba(0,0,0,0.04); }
  .gs-upload-secondary:hover { background: rgba(255,255,255,0.1); }
  .gs-upload-hint { font-size: 11px; color: var(--muted2); margin-top: 12px; }

  /* IMAGE PREVIEW */
  .gs-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; }
  .gs-preview-card { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid var(--border2); background: var(--surface2); aspect-ratio: 4/3; }
  .gs-preview-card img { width: 100%; height: 100%; object-fit: cover; }
  .gs-preview-remove { position: absolute; top: 8px; right: 8px; width: 28px; height: 28px; border-radius: 50%; background: rgba(255,107,107,0.9); border: none; color: #fff; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; backdrop-filter: blur(4px); }
  .gs-preview-remove:hover { background: var(--accent3); transform: scale(1.1); }
  .gs-add-more { border-radius: 14px; border: 2px dashed var(--border2); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: var(--muted); font-size: 13px; gap: 4px; aspect-ratio: 4/3; }
  .gs-add-more:hover { border-color: var(--accent); color: var(--accent); }

  /* SCAN BUTTON */
  .gs-scan-row { display: flex; gap: 10px; margin-top: 1.5rem; }
  .gs-scan-btn { flex: 1; padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #0A0B0F; }
  .gs-scan-btn:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
  .gs-scan-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .gs-clear-btn { padding: 14px 20px; border-radius: 14px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; background: none; border: 1px solid var(--border2); color: var(--muted); transition: all .2s; }
  .gs-clear-btn:hover { border-color: var(--accent3); color: var(--accent3); }

  /* SCANNING ANIMATION */
  .gs-scanning { text-align: center; padding: 3rem 1rem; }
  .gs-scan-orb { width: 80px; height: 80px; border-radius: 50%; background: conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent3), var(--accent)); padding: 3px; animation: gs-spin 1.5s linear infinite; margin: 0 auto 20px; }
  @keyframes gs-spin { to { transform: rotate(360deg); } }
  .gs-spinner-small { width: 18px; height: 18px; border: 2px solid var(--border2); border-top-color: var(--accent); border-radius: 50%; display: inline-block; animation: gs-spin .7s linear infinite; }
  .gs-scan-orb-inner { width: 100%; height: 100%; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; }
  .gs-scanning h2 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .gs-scanning p { font-size: 13px; color: var(--muted); }
  .gs-scanning .gs-dots { display: inline-flex; gap: 4px; margin-top: 12px; }
  .gs-scanning .gs-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: gs-pulse 1.2s infinite; }
  .gs-scanning .gs-dot:nth-child(2) { animation-delay: 0.2s; }
  .gs-scanning .gs-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes gs-pulse { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }

  /* EXTRACTED QUESTIONS PREVIEW */
  .gs-results-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .gs-results-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; }
  .gs-results-count { font-size: 13px; color: var(--accent2); font-weight: 500; }

  .gs-meta-pills { display: flex; gap: 8px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .gs-meta-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; background: var(--surface); border: 1px solid var(--border); }
  .gs-meta-pill .pill-icon { color: var(--accent); }
  .gs-meta-pill .pill-val { color: var(--accent2); font-weight: 600; }

  .gs-question-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 1.5rem; }
  .gs-question-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem; transition: all .2s; }
  .gs-question-card:hover { border-color: var(--border2); }
  .gs-q-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .gs-q-num { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: var(--accent); background: rgba(124,92,252,0.12); border-radius: 6px; padding: 2px 8px; flex-shrink: 0; }
  .gs-q-actions { display: flex; gap: 6px; }
  .gs-q-action-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--border2); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all .2s; }
  .gs-q-action-btn:hover { border-color: var(--accent); color: var(--accent); }
  .gs-q-action-btn.delete:hover { border-color: var(--accent3); color: var(--accent3); }
  .gs-q-text { font-size: 14px; line-height: 1.5; margin-bottom: 10px; font-weight: 500; }
  .gs-q-options { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }
  .gs-q-opt { font-size: 12px; padding: 6px 10px; border-radius: 8px; background: var(--surface2); border: 1px solid var(--border); color: var(--muted); }
  .gs-q-opt.correct { border-color: rgba(0,229,192,0.3); color: var(--accent2); background: rgba(0,229,192,0.06); }
  .gs-q-bottom { display: flex; gap: 8px; flex-wrap: wrap; }
  .gs-q-tag { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 10px; letter-spacing: 0.5px; }
  .gs-q-tag.easy { background: rgba(0,229,192,0.12); color: var(--accent2); }
  .gs-q-tag.medium { background: rgba(255,179,71,0.12); color: var(--amber); }
  .gs-q-tag.hard { background: rgba(255,107,107,0.12); color: var(--accent3); }
  .gs-q-tag.topic { background: rgba(124,92,252,0.1); color: var(--accent); }

  /* EDIT MODE */
  .gs-edit-input { width: 100%; background: var(--surface2); border: 1px solid var(--border2); border-radius: 10px; padding: 10px 14px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; resize: vertical; }
  .gs-edit-input:focus { border-color: var(--accent); }
  .gs-edit-opt-row { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
  .gs-edit-opt-label { font-size: 12px; font-weight: 700; color: var(--muted); min-width: 18px; }
  .gs-edit-opt-input { flex: 1; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; }
  .gs-edit-opt-input:focus { border-color: var(--accent); }
  .gs-edit-correct-select { margin-top: 8px; display: flex; align-items: center; gap: 8px; }
  .gs-edit-correct-select label { font-size: 12px; color: var(--muted); }
  .gs-edit-correct-select select { background: var(--surface2); border: 1px solid var(--border2); border-radius: 8px; padding: 4px 10px; color: var(--text); font-size: 12px; font-family: 'DM Sans', sans-serif; }

  /* START QUIZ ROW */
  .gs-start-row { display: flex; gap: 10px; }
  .gs-start-btn { flex: 1; padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #0A0B0F; transition: all .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .gs-start-btn:hover { opacity: .9; transform: translateY(-1px); }
  .gs-rescan-btn { padding: 14px 20px; border-radius: 14px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; background: none; border: 1px solid var(--border2); color: var(--muted); transition: all .2s; }
  .gs-rescan-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* ── PAST RECORDS ── */
  .gs-history-empty { text-align: center; padding: 3rem; color: var(--muted); }
  .gs-history-empty .gs-empty-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(124,92,252,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; color: var(--muted2); }
  .gs-history-list { display: flex; flex-direction: column; gap: 10px; }
  .gs-history-card { background: rgba(17,19,24,0.7); border: 1px solid var(--border); border-radius: 16px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: all .25s; backdrop-filter: blur(8px); }
  [data-theme="light"] .gs-history-card { background: rgba(255,255,255,0.7); }
  .gs-history-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(124,92,252,0.15); }

  /* FEATURES GRID */
  .gs-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 2.5rem; }
  .gs-feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; text-align: left; transition: all 0.2s; position: relative; overflow: hidden; }
  .gs-feature-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(124,92,252,0.05) 0%, transparent 60%); pointer-events: none; }
  .gs-feature-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
  .gs-feature-icon-wrapper { width: 40px; height: 40px; border-radius: 10px; background: rgba(124,92,252,0.1); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
  .gs-feature-card h3 { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 6px; }
  .gs-feature-card p { font-size: 12px; color: var(--muted); line-height: 1.5; }
  @media (max-width: 768px) {
    .gs-features-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 1.5rem; }
  }
  .gs-history-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .gs-history-icon.scanned { background: rgba(124,92,252,0.12); color: var(--accent); }
  .gs-history-icon.completed { background: rgba(0,229,192,0.12); color: var(--accent2); }
  .gs-history-info { flex: 1; min-width: 0; }
  .gs-history-info strong { font-size: 14px; font-weight: 600; display: block; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .gs-history-info span { font-size: 12px; color: var(--muted); }
  .gs-history-score { text-align: right; flex-shrink: 0; }
  .gs-history-score .score-val { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; display: block; }
  .gs-history-score .score-label { font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
  .score-great { color: var(--accent2); }
  .score-good { color: var(--accent); }
  .score-ok { color: var(--amber); }
  .score-low { color: var(--accent3); }
  .gs-history-arrow { color: var(--muted2); flex-shrink: 0; }
  .gs-history-delete { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all .2s; flex-shrink: 0; }
  .gs-history-delete:hover { border-color: var(--accent3); color: var(--accent3); background: rgba(255,107,107,0.08); }

  /* ERROR */
  .gs-error { text-align: center; padding: 2rem; }
  .gs-error-icon { font-size: 40px; margin-bottom: 12px; }
  .gs-error h3 { font-family: 'Syne', sans-serif; font-size: 18px; margin-bottom: 6px; }
  .gs-error p { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
  .gs-error-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; background: var(--accent); color: #fff; }
  .gs-error-btn:hover { background: #9074fd; }

  /* FOOTER */
  .gs-footer { border-top: 1px solid var(--border); padding: 1rem 2rem; text-align: center; font-size: 11px; color: var(--muted); display: flex; align-items: center; justify-content: center; gap: 5px; }
  .gs-footer img { width: 14px; height: 14px; border-radius: 3px; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .gs-nav { padding: 0 1rem; height: 50px; }
    .gs-logo { font-size: 16px; }
    .gs-main { padding: 1rem 1rem 3rem; }
    .gs-hero h1 { font-size: 22px; }
    .gs-upload-zone { padding: 1.5rem 1rem; }
    .gs-preview-grid { grid-template-columns: repeat(2, 1fr); }
    .gs-q-options { grid-template-columns: 1fr; }
    .gs-start-row { flex-direction: column; }
    .gs-scan-row { flex-direction: column; }
    .gs-meta-pills { gap: 6px; }
    .gs-upload-btn-row { flex-direction: column; align-items: center; }
  }

  @media (max-width: 480px) {
    .gs-nav { padding: 0 0.75rem; height: 46px; }
    .gs-main { padding: 0.75rem 0.75rem 2.5rem; }
    .gs-hero h1 { font-size: 20px; }
    .gs-hero p { font-size: 13px; }
    .gs-tabs { font-size: 13px; }
    .gs-tab { font-size: 12px; padding: 8px; }
    .gs-upload-icon { width: 48px; height: 48px; }
    .gs-upload-title { font-size: 16px; }
    .gs-question-card { padding: 1rem; }
    .gs-q-text { font-size: 13px; }
    .gs-history-card { padding: 0.75rem 1rem; }
  }
`;

/* ─── Helpers ─── */
const LETTERS = ["A", "B", "C", "D"];

const getScoreClass = (pct) => {
  if (pct >= 90) return "score-great";
  if (pct >= 75) return "score-good";
  if (pct >= 50) return "score-ok";
  return "score-low";
};

const formatDate = (d) => {
  const date = new Date(d);
  const now = Date.now();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

/* ════════════════════════════════════════════════════════
   GYANS COMPONENT
════════════════════════════════════════════════════════ */
export default function GyanS() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState("scanner");

  // Scanner state
  const [images, setImages] = useState([]);          // base64 images
  const [imageFiles, setImageFiles] = useState([]);   // File objects for names
  const [pdfFile, setPdfFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgressText, setScanProgressText] = useState("");

  // Dynamic Scanner logs for Image scanning path
  useEffect(() => {
    if (!scanning || pdfFile) return;
    const logs = [
      "Initializing GyanS OCR Engine...",
      "Optimizing image layers for layout scanning...",
      "Detecting columns and text coordinates...",
      "Synthesizing questions with NVIDIA DeepSeek AI...",
      "Generating explanations and difficulty ratings...",
      "Finalizing MCQ structure..."
    ];
    let currentLogIdx = 0;
    setScanProgressText(logs[0]);
    const interval = setInterval(() => {
      currentLogIdx++;
      if (currentLogIdx < logs.length) {
        setScanProgressText(logs[currentLogIdx]);
      }
    }, 2200);
    return () => clearInterval(interval);
  }, [scanning, pdfFile]);
  const [scanError, setScanError] = useState(null);
  const [extractedQuestions, setExtractedQuestions] = useState([]);
  const [scanMeta, setScanMeta] = useState(null);
  const [scanId, setScanId] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Edit state
  const [editingIdx, setEditingIdx] = useState(null);
  const [editData, setEditData] = useState(null);

  // History state
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loadingRecordId, setLoadingRecordId] = useState(null);

  const handleRecordClick = async (record) => {
    if (loadingRecordId) return;
    setLoadingRecordId(record._id);
    try {
      const res = await axiosInstance.get(`/api/scan/${record._id}`);
      if (res.data.success) {
        const { scan, quiz } = res.data;
        if (scan.quizCompleted && quiz) {
          navigate("/results", {
            state: {
              result: {
                scorePercent: quiz.scorePercent,
                totalCorrect: quiz.totalCorrect,
                totalWrong: quiz.totalWrong,
                totalSkipped: quiz.totalSkipped,
                xpEarned: quiz.xpEarned,
                totalXpEarned: quiz.xpEarned,
                streakBonus: 0,
                newStreak: 0,
              },
              questions: quiz.questions.map((q, idx) => {
                const scanQ = scan.extractedQuestions[idx] || {};
                return {
                  questionText: q.questionText,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  userAnswer: q.userAnswer,
                  isCorrect: q.isCorrect,
                  timeTaken: q.timeTaken,
                  topic: q.topic || scan.detectedSubject || "General",
                  explanation: scanQ.explanation || "No explanation provided.",
                };
              }),
              config: {
                subject: quiz.subject,
                difficulty: quiz.difficulty,
                totalQ: quiz.totalQuestions,
              },
            },
          });
        } else {
          // If quiz not completed, start/resume the quiz
          navigate("/quiz", {
            state: {
              subject: scan.detectedSubject || "Scanned Test",
              difficulty: "Medium",
              questions: scan.extractedQuestions.length,
              timePerQ: 60,
              options: { shuffle: false, hints: false, instant: false, review: true },
              preGeneratedQuestions: scan.extractedQuestions.map((eq) => ({
                question: eq.questionText,
                options: eq.options,
                answer: LETTERS.indexOf(eq.correctAnswer),
                correctAnswer: eq.correctAnswer,
                explanation: eq.explanation || "",
                difficulty: eq.difficulty || "Medium",
                topic: eq.topic || scan.detectedSubject || "General",
              })),
              scanId: scan._id,
              isScannedQuiz: true,
            },
          });
        }
      }
    } catch (err) {
      console.error("Failed to load scan record detail:", err);
      alert("Failed to load details. Please try again.");
    } finally {
      setLoadingRecordId(null);
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await axiosInstance.get("/api/scan/history");
      if (res.data.success) {
        setHistory(res.data.history);
      }
    } catch (err) {
      console.error("Failed to load scan history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "history") {
      loadHistory();
    }
  };

  // ── File handling ──
  const processFile = useCallback((file) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve(null);
        return;
      }
      // Compress image before converting to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1200;
          let w = img.width, h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
            else { w = Math.round(w * maxDim / h); h = maxDim; }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/jpeg", 0.8);
          resolve(compressed);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check if a PDF file is selected
    const pdf = files.find((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (pdf) {
      setImages([]);
      setImageFiles([]);
      setPdfFile(pdf);
      if (e.target) e.target.value = "";
      return;
    }

    setPdfFile(null);
    const remaining = 2 - images.length;
    const toProcess = files.slice(0, remaining);

    for (const file of toProcess) {
      const base64 = await processFile(file);
      if (base64) {
        setImages((prev) => [...prev, base64]);
        setImageFiles((prev) => [...prev, file]);
      }
    }
    // Reset input
    if (e.target) e.target.value = "";
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImageFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setImages([]);
    setImageFiles([]);
    setPdfFile(null);
    setExtractedQuestions([]);
    setScanMeta(null);
    setScanId(null);
    setScanError(null);
    setEditingIdx(null);
  };

  // ── Drag & Drop ──
  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = async (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;

    const pdf = files.find((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (pdf) {
      setImages([]);
      setImageFiles([]);
      setPdfFile(pdf);
      return;
    }

    setPdfFile(null);
    const remaining = 2 - images.length;
    const toProcess = files.slice(0, remaining);
    for (const file of toProcess) {
      const base64 = await processFile(file);
      if (base64) {
        setImages((prev) => [...prev, base64]);
        setImageFiles((prev) => [...prev, file]);
      }
    }
  };

  // ── Scan ──
  const handleScan = async () => {
    if (images.length === 0 && !pdfFile) return;
    setScanning(true);
    setScanError(null);
    setExtractedQuestions([]);
    setScanProgressText("");

    try {
      if (pdfFile) {
        setScanProgressText("Reading PDF document...");
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;

        setScanProgressText(`Checking text content across ${totalPages} pages...`);
        const pageTexts = [];
        let hasExtractableText = false;

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join(" ");
          pageTexts.push(text);
          if (text.trim().length > 30) {
            hasExtractableText = true;
          }
        }

        let combinedQuestions = [];
        let currentScanId = null;
        let detectedSubject = "General";
        let totalDuration = 0;

        if (hasExtractableText) {
          // Path A: Text Extraction with Chunking (10 pages per chunk)
          const chunkSize = 10;
          const chunks = [];
          for (let i = 0; i < pageTexts.length; i += chunkSize) {
            chunks.push(pageTexts.slice(i, i + chunkSize));
          }

          for (let c = 0; c < chunks.length; c++) {
            const startPage = c * chunkSize + 1;
            const endPage = Math.min((c + 1) * chunkSize, totalPages);
            setScanProgressText(`Extracting questions (Pages ${startPage}-${endPage} of ${totalPages})...`);

            const chunkData = chunks[c];
            const res = await axiosInstance.post("/api/scan/extract-pdf-text", {
              textChunks: chunkData,
              fileName: pdfFile.name,
              scanId: currentScanId,
            });

            if (res.data.success) {
              combinedQuestions.push(...res.data.questions);
              currentScanId = res.data.scanId;
              detectedSubject = res.data.meta.detectedSubject;
              totalDuration += res.data.meta.scanDurationMs;
            } else {
              throw new Error(res.data.message || "Failed to extract questions from text chunk");
            }
          }
        } else {
          // Path B: Scanned PDF Image rendering OCR (2 pages per chunk)
          setScanProgressText("No text found. Rendering pages to images...");
          const renderedImages = [];
          for (let i = 1; i <= totalPages; i++) {
            setScanProgressText(`Rendering page ${i} of ${totalPages} to image...`);
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport }).promise;
            const base64 = canvas.toDataURL("image/jpeg", 0.85);
            renderedImages.push(base64);
          }

          const chunkSize = 2;
          const chunks = [];
          for (let i = 0; i < renderedImages.length; i += chunkSize) {
            chunks.push(renderedImages.slice(i, i + chunkSize));
          }

          for (let c = 0; c < chunks.length; c++) {
            const startPage = c * chunkSize + 1;
            const endPage = Math.min((c + 1) * chunkSize, totalPages);
            setScanProgressText(`OCR Processing (Pages ${startPage}-${endPage} of ${totalPages})...`);

            const chunkImages = chunks[c];
            const res = await axiosInstance.post("/api/scan/extract", {
              images: chunkImages.map((img) => img.startsWith("data:") ? img.split(",")[1] : img),
              fileName: pdfFile.name,
              scanId: currentScanId,
            });

            if (res.data.success) {
              combinedQuestions.push(...res.data.questions);
              currentScanId = res.data.scanId;
              detectedSubject = res.data.meta.detectedSubject;
              totalDuration += res.data.meta.scanDurationMs;
            } else {
              throw new Error(res.data.message || "Failed to extract questions from OCR batch");
            }
          }
        }

        setExtractedQuestions(combinedQuestions);
        setScanId(currentScanId);
        setScanMeta({
          detectedSubject,
          scanDurationMs: totalDuration,
          model: "Hybrid PDF Engine",
        });
      } else {
        // Existing image extraction path
        setScanProgressText("Extracting questions from images...");
        const res = await axiosInstance.post("/api/scan/extract", {
          images: images.map((img) => {
            return img.startsWith("data:") ? img : img;
          }),
          fileName: imageFiles[0]?.name || "scan.jpg",
        });

        if (res.data.success) {
          setExtractedQuestions(res.data.questions);
          setScanMeta(res.data.meta);
          setScanId(res.data.scanId);
        } else {
          throw new Error(res.data.message || "Extraction failed");
        }
      }
    } catch (err) {
      console.error("Scan error:", err);
      setScanError(
        err.response?.data?.message || err.message || "Failed to extract questions",
      );
    } finally {
      setScanning(false);
      setScanProgressText("");
    }
  };

  // ── Edit question ──
  const startEdit = (idx) => {
    setEditingIdx(idx);
    const q = extractedQuestions[idx];
    setEditData({
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
    });
  };

  const saveEdit = () => {
    if (editingIdx === null || !editData) return;
    setExtractedQuestions((prev) => {
      const next = [...prev];
      next[editingIdx] = {
        ...next[editingIdx],
        question: editData.question,
        options: editData.options,
        correctAnswer: editData.correctAnswer,
        answer: LETTERS.indexOf(editData.correctAnswer),
      };
      return next;
    });
    setEditingIdx(null);
    setEditData(null);
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setEditData(null);
  };

  const deleteQuestion = (idx) => {
    setExtractedQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Start quiz with extracted questions ──
  const startQuiz = () => {
    if (extractedQuestions.length === 0) return;

    const subject = scanMeta?.detectedSubject || "Scanned Test";
    navigate("/quiz", {
      state: {
        subject,
        difficulty: "Medium",
        questions: extractedQuestions.length,
        timePerQ: 60,
        options: { shuffle: false, hints: false, instant: false, review: true },
        // Pass pre-generated questions so Quiz.jsx skips the API call
        preGeneratedQuestions: extractedQuestions,
        scanId,
        isScannedQuiz: true,
      },
    });
  };

  // ── Delete history record ──
  const deleteRecord = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this scan record?")) return;
    try {
      await axiosInstance.delete(`/api/scan/${id}`);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{css}</style>
      <div className="gs-root">
        {/* NAV */}
        <nav className="gs-nav">
          <div className="gs-nav-left">
            <button className="gs-back-btn" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={16} />
            </button>
            <div className="gs-logo" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
              <div className="gs-logo-icon"><img src="/favicon-32.png" alt="Gyantra" /></div>
              Gyan<span>S</span>
            </div>
          </div>
          <div className="gs-nav-right">
            <button
              className="gs-theme-btn"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>
          </div>
        </nav>

        <main className="gs-main">
          {/* HERO */}
          <div className="gs-hero">
            <div className="gs-hero-badge">
              <ScanLine size={14} /> GyanS Scanner
            </div>
            <h1>Scan. <span className="gs-accent">Extract.</span> Quiz.</h1>
            <p>
              Upload an image of any MCQ test paper. Gyantraa will extract the questions,
              generate answers & explanations, and create a quiz instantly.
            </p>
          </div>

          {/* TABS */}
          <div className="gs-tabs">
            <button
              className={`gs-tab${activeTab === "scanner" ? " active" : ""}`}
              onClick={() => handleTabChange("scanner")}
            >
              <ScanLine size={15} /> Scanner
            </button>
            <button
              className={`gs-tab${activeTab === "history" ? " active" : ""}`}
              onClick={() => handleTabChange("history")}
            >
              <History size={15} /> Past Records
            </button>
          </div>

          {/* ══════════ SCANNER TAB ══════════ */}
          {activeTab === "scanner" && (
            <>
              {/* STATE: No questions extracted yet */}
              {extractedQuestions.length === 0 && !scanning && !scanError && (
                <>
                  {/* Upload Zone */}
                  <div
                    className={`gs-upload-zone${dragging ? " dragging" : ""}${images.length > 0 || pdfFile ? " has-images" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {images.length === 0 && !pdfFile ? (
                      <>
                        <div className="gs-upload-icon">
                          <Upload size={28} />
                        </div>
                        <div className="gs-upload-title">Upload Test Document / Image</div>
                        <div className="gs-upload-sub">
                          Drag & drop your MCQ PDF or test paper here, or choose an option below
                        </div>
                        <div className="gs-upload-btn-row">
                          <button
                            className="gs-upload-btn gs-upload-primary"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Image size={14} /> Browse Files
                          </button>
                          <button
                            className="gs-upload-btn gs-upload-secondary"
                            onClick={() => cameraInputRef.current?.click()}
                          >
                            <Camera size={14} /> Take Photo
                          </button>
                        </div>
                        <div className="gs-upload-hint">
                          Supports PDF, JPG, PNG, WEBP · Max 2 images or 1 PDF
                        </div>
                      </>
                    ) : pdfFile ? (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
                        <div className="gs-upload-icon" style={{ background: "rgba(255,107,107,0.12)", color: "var(--accent3)" }}>
                          <FileText size={28} />
                        </div>
                        <div className="gs-upload-title" style={{ fontSize: "16px", wordBreak: "break-all" }}>
                          {pdfFile.name}
                        </div>
                        <div className="gs-upload-sub" style={{ fontSize: "12px", marginTop: "4px" }}>
                          PDF Document · {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                        <button
                          className="gs-preview-remove"
                          style={{ position: "absolute", top: "16px", right: "16px" }}
                          onClick={(e) => { e.stopPropagation(); setPdfFile(null); }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="gs-preview-grid">
                          {images.map((img, i) => (
                            <div key={i} className="gs-preview-card">
                              <img src={img} alt={`Scan ${i + 1}`} />
                              <button
                                className="gs-preview-remove"
                                onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          {images.length < 2 && (
                            <div
                              className="gs-add-more"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Upload size={18} />
                              Add more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Features Grid */}
                  {images.length === 0 && !pdfFile && (
                    <div className="gs-features-grid">
                      <div className="gs-feature-card">
                        <div className="gs-feature-icon-wrapper">
                          <Brain size={20} className="gs-feature-icon" />
                        </div>
                        <h3>Smart AI Extraction</h3>
                        <p>Extract MCQs from physical papers, worksheets, or textbook snapshots in seconds using NVIDIA AI.</p>
                      </div>
                      <div className="gs-feature-card">
                        <div className="gs-feature-icon-wrapper">
                          <Clock size={20} className="gs-feature-icon" />
                        </div>
                        <h3>Simulated Exam Mode</h3>
                        <p>Launch custom timed tests directly from your scans to build speed and accuracy under pressure.</p>
                      </div>
                      <div className="gs-feature-card">
                        <div className="gs-feature-icon-wrapper">
                          <Target size={20} className="gs-feature-icon" />
                        </div>
                        <h3>Deep Feedback & Edits</h3>
                        <p>Verify and edit extracted questions manually. Get detailed AI explanations for all correct answers.</p>
                      </div>
                    </div>
                  )}

                  {/* Hidden file inputs */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />

                  {/* Scan / Clear buttons */}
                  {(images.length > 0 || pdfFile) && (
                    <div className="gs-scan-row">
                      <button
                        className="gs-scan-btn"
                        onClick={handleScan}
                        disabled={scanning}
                      >
                        <ScanLine size={18} /> Scan & Extract Questions
                      </button>
                      <button className="gs-clear-btn" onClick={clearAll}>
                        Clear
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* STATE: Scanning */}
              {scanning && (
                <div className="gs-scanning">
                  <div className="gs-scan-orb">
                    <div className="gs-scan-orb-inner">
                      <Brain size={32} color="var(--accent)" />
                    </div>
                  </div>
                  <h2>Extracting Questions...</h2>
                  <p>{scanProgressText || "Gyantraa is analyzing your document and detecting MCQs"}</p>
                  <div className="gs-dots">
                    <div className="gs-dot" />
                    <div className="gs-dot" />
                    <div className="gs-dot" />
                  </div>
                </div>
              )}

              {/* STATE: Error */}
              {scanError && (
                <div className="gs-error">
                  <div className="gs-error-icon">
                    <AlertTriangle size={36} color="var(--accent3)" style={{ margin: "0 auto 12px" }} />
                  </div>
                  <h3>Extraction Failed</h3>
                  <p>{scanError}</p>
                  <button className="gs-error-btn" onClick={() => { setScanError(null); }}>
                    Try Again
                  </button>
                </div>
              )}

              {/* STATE: Questions extracted — preview & edit */}
              {extractedQuestions.length > 0 && !scanning && (
                <>
                  <div className="gs-results-header">
                    <div className="gs-results-title">Extracted Questions</div>
                    <div className="gs-results-count">
                      {extractedQuestions.length} questions found
                    </div>
                  </div>

                  <div className="gs-meta-pills">
                    <div className="gs-meta-pill">
                      <Target size={13} className="pill-icon" />
                      <span className="pill-val">{scanMeta?.detectedSubject || "General"}</span>
                    </div>
                    <div className="gs-meta-pill">
                      <Clock size={13} className="pill-icon" />
                      <span className="pill-val">
                        {scanMeta?.scanDurationMs
                          ? `${(scanMeta.scanDurationMs / 1000).toFixed(1)}s`
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <div className="gs-question-list">
                    {extractedQuestions.map((q, idx) => (
                      <div key={idx} className="gs-question-card">
                        <div className="gs-q-top">
                          <span className="gs-q-num">Q{idx + 1}</span>
                          <div className="gs-q-actions">
                            {editingIdx === idx ? (
                              <>
                                <button className="gs-q-action-btn" onClick={saveEdit} title="Save">
                                  <Check size={14} />
                                </button>
                                <button className="gs-q-action-btn" onClick={cancelEdit} title="Cancel">
                                  <X size={14} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="gs-q-action-btn" onClick={() => startEdit(idx)} title="Edit">
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  className="gs-q-action-btn delete"
                                  onClick={() => deleteQuestion(idx)}
                                  title="Remove"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {editingIdx === idx && editData ? (
                          <>
                            <textarea
                              className="gs-edit-input"
                              value={editData.question}
                              onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                              rows={2}
                            />
                            <div style={{ marginTop: 8 }}>
                              {editData.options.map((opt, oi) => (
                                <div key={oi} className="gs-edit-opt-row">
                                  <span className="gs-edit-opt-label">{LETTERS[oi]}</span>
                                  <input
                                    className="gs-edit-opt-input"
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...editData.options];
                                      newOpts[oi] = e.target.value;
                                      setEditData({ ...editData, options: newOpts });
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="gs-edit-correct-select">
                              <label>Correct:</label>
                              <select
                                value={editData.correctAnswer}
                                onChange={(e) => setEditData({ ...editData, correctAnswer: e.target.value })}
                              >
                                {LETTERS.map((l) => (
                                  <option key={l} value={l}>{l}</option>
                                ))}
                              </select>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="gs-q-text">{q.question}</div>
                            <div className="gs-q-options">
                              {q.options.map((opt, oi) => (
                                <div
                                  key={oi}
                                  className="gs-q-opt"
                                >
                                  <strong>{LETTERS[oi]}.</strong> {opt}
                                </div>
                              ))}
                            </div>
                            <div className="gs-q-bottom">
                              <span className={`gs-q-tag ${(q.difficulty || "medium").toLowerCase()}`}>
                                {q.difficulty || "Medium"}
                              </span>
                              {q.topic && q.topic !== "General" && (
                                <span className="gs-q-tag topic">{q.topic}</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="gs-start-row">
                    <button className="gs-start-btn" onClick={startQuiz}>
                      <Brain size={18} /> Start Quiz ({extractedQuestions.length} Questions)
                    </button>
                    <button className="gs-rescan-btn" onClick={clearAll}>
                      ← Scan Another
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {/* ══════════ PAST RECORDS TAB ══════════ */}
          {activeTab === "history" && (
            <>
              {historyLoading ? (
                <div className="gs-scanning">
                  <div className="gs-scan-orb">
                    <div className="gs-scan-orb-inner">
                      <History size={28} color="var(--accent)" />
                    </div>
                  </div>
                  <h2>Loading Records...</h2>
                </div>
              ) : history.length === 0 ? (
                <div className="gs-history-empty">
                  <div className="gs-empty-icon">
                    <ScanLine size={28} />
                  </div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
                    No scans yet
                  </p>
                  <p>Scan your first test paper to see records here.</p>
                </div>
              ) : (
                <div className="gs-history-list">
                  {history.map((record) => {
                    const scorePercent = record.totalQuestionsExtracted > 0 && record.quizCompleted
                      ? Math.round((record.totalCorrect / record.totalQuestionsExtracted) * 100)
                      : null;

                    return (
                      <div
                        key={record._id}
                        className="gs-history-card"
                        onClick={() => handleRecordClick(record)}
                      >
                        <div className={`gs-history-icon ${record.quizCompleted ? "completed" : "scanned"}`}>
                          {loadingRecordId === record._id ? (
                            <div className="gs-spinner-small" />
                          ) : record.quizCompleted ? (
                            <Award size={20} />
                          ) : (
                            <ScanLine size={20} />
                          )}
                        </div>
                        <div className="gs-history-info">
                          <strong>{record.detectedSubject || record.fileName}</strong>
                          <span>
                            {record.totalQuestionsExtracted} questions · {formatDate(record.createdAt)}
                            {record.quizCompleted && ` · ${record.totalCorrect}/${record.totalQuestionsExtracted} correct`}
                          </span>
                        </div>
                        {record.quizCompleted && scorePercent !== null && (
                          <div className="gs-history-score">
                            <span className={`score-val ${getScoreClass(scorePercent)}`}>
                              {scorePercent}%
                            </span>
                            <span className="score-label">Score</span>
                          </div>
                        )}
                        {!record.quizCompleted && (
                          <div className="gs-history-score">
                            <span className="score-val" style={{ color: "var(--amber)", fontSize: 12 }}>
                              Pending
                            </span>
                            <span className="score-label">Quiz</span>
                          </div>
                        )}
                        <button
                          className="gs-history-delete"
                          onClick={(e) => deleteRecord(record._id, e)}
                          title="Delete record"
                        >
                          <Trash2 size={14} />
                        </button>
                        <ChevronRight size={16} className="gs-history-arrow" />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>

        {/* FOOTER */}
        <footer className="gs-footer">
          <img src="/favicon-32.png" alt="" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }} />
          © {new Date().getFullYear()} Gyantra · GyanS Scanner
        </footer>
      </div>
    </>
  );
}
