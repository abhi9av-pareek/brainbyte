import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import axiosInstance from "../utils/axiosConfig";
import {
  Bookmark,
  Search,
  Trash2,
  Edit3,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  BookOpen,
  Filter,
  StickyNote,
  Sparkles,
} from "lucide-react";

/* ─── CSS ─── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bk-bg: #0A0B0F; --bk-surface: #111318; --bk-surface2: #181B23; --bk-surface3: #1E2130;
    --bk-border: rgba(255,255,255,0.07); --bk-border2: rgba(255,255,255,0.13);
    --bk-accent: #7C5CFC; --bk-accent2: #00E5C0; --bk-accent3: #FF6B6B;
    --bk-amber: #FFB347; --bk-text: #F0EFF8; --bk-muted: #7B7A8C; --bk-muted2: #3A394A;
  }
  [data-theme="light"] {
    --bk-bg: #F5F5FA; --bk-surface: #FFFFFF; --bk-surface2: #F0EFF8; --bk-surface3: #E8E7F0;
    --bk-border: rgba(0,0,0,0.07); --bk-border2: rgba(0,0,0,0.12);
    --bk-text: #0A0B0F; --bk-muted: #7B7A8C; --bk-muted2: #C8C7D4;
  }

  .bk-root { font-family: 'DM Sans', sans-serif; background: var(--bk-bg); color: var(--bk-text); min-height: 100vh; transition: background .3s, color .3s; }

  /* NAV */
  .bk-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; border-bottom: 1px solid var(--bk-border); background: rgba(10,11,15,0.97); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 100; transition: background .3s; }
  [data-theme="light"] .bk-nav { background: rgba(245,245,250,0.92); }
  .bk-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; display: flex; align-items: center; gap: 8px; }
  .bk-logo-icon { width: 28px; height: 28px; border-radius: 7px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .bk-logo-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .bk-logo span { color: var(--bk-accent2); }
  .bk-nav-right { display: flex; align-items: center; gap: 12px; }
  .bk-back-btn { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--bk-muted); background: none; border: 1px solid var(--bk-muted2); border-radius: 8px; padding: 5px 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .bk-back-btn:hover { border-color: var(--bk-accent); color: var(--bk-accent); }
  .bk-theme-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--bk-surface2); border: 1px solid var(--bk-border2); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: var(--bk-muted); }
  .bk-theme-btn:hover { border-color: var(--bk-accent); color: var(--bk-accent); }

  /* MAIN */
  .bk-main { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }

  /* HERO HEADER */
  .bk-hero { background: var(--bk-surface); border: 1px solid var(--bk-border2); border-radius: 20px; padding: 2rem 2.5rem; margin-bottom: 1.5rem; position: relative; overflow: hidden; transition: background .3s; }
  .bk-hero::before { content: ''; position: absolute; right: -60px; top: -60px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(255,179,71,0.12) 0%, transparent 70%); pointer-events: none; }
  .bk-hero::after { content: ''; position: absolute; left: -40px; bottom: -40px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%); pointer-events: none; }
  .bk-hero-content { position: relative; z-index: 1; }
  .bk-hero-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
  .bk-hero h1 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; display: flex; align-items: center; gap: 10px; }
  .bk-hero h1 .bk-hero-emoji { font-size: 28px; }
  .bk-hero p { color: var(--bk-muted); font-size: 14px; line-height: 1.5; max-width: 500px; }
  .bk-hero-count { display: flex; align-items: center; gap: 8px; background: rgba(255,179,71,0.12); border: 1px solid rgba(255,179,71,0.2); border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 600; color: var(--bk-amber); }

  /* SEARCH & FILTER */
  .bk-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem; flex-wrap: wrap; }
  .bk-search { flex: 1; min-width: 200px; position: relative; }
  .bk-search input { width: 100%; background: var(--bk-surface); border: 1px solid var(--bk-border2); border-radius: 12px; padding: 10px 14px 10px 40px; font-size: 14px; color: var(--bk-text); font-family: 'DM Sans', sans-serif; transition: all .2s; outline: none; }
  .bk-search input::placeholder { color: var(--bk-muted); }
  .bk-search input:focus { border-color: var(--bk-accent); box-shadow: 0 0 0 3px rgba(124,92,252,0.12); }
  .bk-search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--bk-muted); pointer-events: none; }
  .bk-filter-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .bk-pill { font-size: 12px; font-weight: 500; padding: 6px 14px; border-radius: 20px; border: 1px solid var(--bk-border2); background: var(--bk-surface); color: var(--bk-muted); cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .bk-pill:hover { border-color: var(--bk-amber); color: var(--bk-amber); }
  .bk-pill.active { background: rgba(255,179,71,0.12); border-color: rgba(255,179,71,0.3); color: var(--bk-amber); }

  /* BOOKMARK CARDS */
  .bk-list { display: flex; flex-direction: column; gap: 12px; }
  .bk-card { background: var(--bk-surface); border: 1px solid var(--bk-border); border-radius: 16px; overflow: hidden; transition: all .25s; }
  .bk-card:hover { border-color: var(--bk-border2); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
  .bk-card-header { display: flex; align-items: flex-start; gap: 14px; padding: 1.25rem 1.5rem; cursor: pointer; }
  .bk-card-bookmark-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(255,179,71,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--bk-amber); }
  .bk-card-body { flex: 1; min-width: 0; }
  .bk-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; }
  .bk-card-subject { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; background: rgba(124,92,252,0.12); color: var(--bk-accent); }
  .bk-card-topic { font-size: 11px; color: var(--bk-accent2); font-weight: 500; }
  .bk-card-date { font-size: 11px; color: var(--bk-muted); margin-left: auto; }
  .bk-card-question { font-size: 15px; font-weight: 500; line-height: 1.55; color: var(--bk-text); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .bk-card-question.expanded { -webkit-line-clamp: unset; overflow: visible; }
  .bk-card-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .bk-icon-btn { width: 34px; height: 34px; border-radius: 10px; background: var(--bk-surface2); border: 1px solid var(--bk-border); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: var(--bk-muted); }
  .bk-icon-btn:hover { border-color: var(--bk-border2); color: var(--bk-text); }
  .bk-icon-btn.danger:hover { border-color: var(--bk-accent3); color: var(--bk-accent3); background: rgba(255,107,107,0.08); }
  .bk-expand-chevron { color: var(--bk-muted); transition: transform .2s; }

  /* EXPANDED SECTION */
  .bk-card-expanded { border-top: 1px solid var(--bk-border); padding: 1rem 1.5rem 1.25rem; background: var(--bk-surface2); transition: background .3s; }
  .bk-note-label { font-size: 12px; font-weight: 600; color: var(--bk-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .bk-note-display { font-size: 14px; color: var(--bk-text); line-height: 1.6; padding: 10px 14px; background: var(--bk-surface); border: 1px solid var(--bk-border); border-radius: 10px; min-height: 44px; white-space: pre-wrap; }
  .bk-note-empty { color: var(--bk-muted); font-style: italic; }
  .bk-note-textarea { width: 100%; background: var(--bk-surface); border: 1px solid var(--bk-accent); border-radius: 10px; padding: 10px 14px; font-size: 14px; color: var(--bk-text); font-family: 'DM Sans', sans-serif; resize: vertical; min-height: 80px; outline: none; transition: border-color .2s; box-shadow: 0 0 0 3px rgba(124,92,252,0.12); }
  .bk-note-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end; }
  .bk-note-btn { display: flex; align-items: center; gap: 5px; padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
  .bk-note-btn.save { background: var(--bk-accent); border: none; color: #fff; }
  .bk-note-btn.save:hover { background: #9074fd; }
  .bk-note-btn.cancel { background: none; border: 1px solid var(--bk-border2); color: var(--bk-muted); }
  .bk-note-btn.cancel:hover { color: var(--bk-text); }

  /* DELETE CONFIRMATION */
  .bk-delete-confirm { display: flex; align-items: center; gap: 8px; margin-top: 10px; padding: 10px 14px; background: rgba(255,107,107,0.06); border: 1px solid rgba(255,107,107,0.15); border-radius: 10px; }
  .bk-delete-confirm span { font-size: 13px; color: var(--bk-accent3); flex: 1; }
  .bk-delete-yes { background: var(--bk-accent3); border: none; color: #fff; padding: 5px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: opacity .2s; }
  .bk-delete-yes:hover { opacity: 0.85; }
  .bk-delete-no { background: none; border: 1px solid var(--bk-border2); color: var(--bk-muted); padding: 5px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .bk-delete-no:hover { color: var(--bk-text); }

  /* EMPTY STATE */
  .bk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 2rem; text-align: center; }
  .bk-empty-icon { width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, rgba(255,179,71,0.15), rgba(124,92,252,0.1)); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; animation: bk-float 3s ease-in-out infinite; }
  @keyframes bk-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .bk-empty h2 { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .bk-empty p { color: var(--bk-muted); font-size: 14px; max-width: 380px; line-height: 1.6; margin-bottom: 1.5rem; }
  .bk-empty-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; font-family: 'DM Sans', sans-serif; background: var(--bk-accent); color: #fff; }
  .bk-empty-btn:hover { background: #9074fd; transform: translateY(-1px); }

  /* LOADING */
  .bk-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 40vh; gap: 14px; }
  .bk-spinner { width: 40px; height: 40px; border: 3px solid var(--bk-border2); border-top-color: var(--bk-amber); border-radius: 50%; animation: bk-spin 0.8s linear infinite; }
  @keyframes bk-spin { to { transform: rotate(360deg); } }

  /* TOAST */
  .bk-toast { position: fixed; bottom: 24px; right: 24px; background: var(--bk-surface); border: 1px solid var(--bk-border2); border-radius: 12px; padding: 12px 20px; font-size: 14px; font-weight: 500; color: var(--bk-text); box-shadow: 0 8px 30px rgba(0,0,0,0.25); z-index: 200; animation: bk-toast-in 0.3s ease-out; display: flex; align-items: center; gap: 8px; }
  @keyframes bk-toast-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .bk-toast.success { border-left: 3px solid var(--bk-accent2); }
  .bk-toast.error { border-left: 3px solid var(--bk-accent3); }

  /* FOOTER */
  .bk-footer { border-top: 1px solid var(--bk-border); padding: 1rem 2rem; text-align: center; font-size: 11px; color: var(--bk-muted); display: flex; align-items: center; justify-content: center; gap: 5px; }
  .bk-footer img { width: 14px; height: 14px; border-radius: 3px; }

  /* MOBILE */
  @media (max-width: 768px) {
    .bk-nav { padding: 0 1rem; height: 50px; }
    .bk-main { padding: 1.25rem 1rem 3rem; }
    .bk-hero { padding: 1.5rem; border-radius: 16px; }
    .bk-hero h1 { font-size: 20px; }
    .bk-hero-top { flex-direction: column; align-items: flex-start; gap: 8px; }
    .bk-toolbar { flex-direction: column; align-items: stretch; }
    .bk-search { min-width: 100%; }
    .bk-filter-pills { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
    .bk-card-header { padding: 1rem; gap: 10px; }
    .bk-card-expanded { padding: 0.75rem 1rem 1rem; }
    .bk-card-question { font-size: 14px; }
    .bk-card-date { margin-left: 0; }
  }

  @media (max-width: 480px) {
    .bk-nav { padding: 0 0.75rem; height: 46px; }
    .bk-main { padding: 0.75rem 0.75rem 2rem; }
    .bk-hero { padding: 1.25rem; }
    .bk-hero h1 { font-size: 18px; gap: 8px; }
    .bk-hero h1 .bk-hero-emoji { font-size: 22px; }
    .bk-hero p { font-size: 13px; }
    .bk-card-bookmark-icon { width: 34px; height: 34px; border-radius: 10px; }
    .bk-card-actions { gap: 4px; }
    .bk-icon-btn { width: 30px; height: 30px; border-radius: 8px; }
    .bk-back-btn { font-size: 12px; padding: 4px 10px; }
  }
`;

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 172800) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function Bookmarks() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeSubject, setActiveSubject] = useState("All");
  const [expanded, setExpanded] = useState({});
  const [editing, setEditing] = useState(null); // questionId being edited
  const [editNote, setEditNote] = useState("");
  const [deleting, setDeleting] = useState(null); // questionId pending delete
  const [toast, setToast] = useState(null);

  const textareaRef = useRef(null);

  /* ── Fetch bookmarks ── */
  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await axiosInstance.get("/api/quiz/bookmarks");
      if (res.data.success) {
        setBookmarks(res.data.bookmarks || []);
      }
    } catch (err) {
      console.error("Failed to fetch bookmarks:", err);
      showToast("Failed to load bookmarks", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Toast ── */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ── Toggle expand ── */
  const toggleExpand = (qId) => {
    setExpanded((prev) => ({ ...prev, [qId]: !prev[qId] }));
    setDeleting(null);
    if (editing === qId) {
      setEditing(null);
    }
  };

  /* ── Start editing ── */
  const startEdit = (bookmark) => {
    setEditing(bookmark.questionId);
    setEditNote(bookmark.notes || "");
    if (!expanded[bookmark.questionId]) {
      setExpanded((prev) => ({ ...prev, [bookmark.questionId]: true }));
    }
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  /* ── Save note ── */
  const saveNote = async (questionId) => {
    try {
      await axiosInstance.patch(`/api/quiz/bookmark/${questionId}`, {
        notes: editNote,
      });
      setBookmarks((prev) =>
        prev.map((b) =>
          b.questionId === questionId ? { ...b, notes: editNote } : b,
        ),
      );
      setEditing(null);
      showToast("Note saved successfully ✓");
    } catch (err) {
      console.error("Failed to save note:", err);
      showToast("Failed to save note", "error");
    }
  };

  /* ── Delete bookmark ── */
  const confirmDelete = async (questionId) => {
    try {
      await axiosInstance.delete(`/api/quiz/bookmark/${questionId}`);
      setBookmarks((prev) => prev.filter((b) => b.questionId !== questionId));
      setDeleting(null);
      showToast("Bookmark removed");
    } catch (err) {
      console.error("Failed to delete bookmark:", err);
      showToast("Failed to remove bookmark", "error");
    }
  };

  /* ── Filter & Search ── */
  const subjects = ["All", ...new Set(bookmarks.map((b) => b.subject).filter(Boolean))];

  const filtered = bookmarks.filter((b) => {
    if (activeSubject !== "All" && b.subject !== activeSubject) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        (b.questionText || "").toLowerCase().includes(q) ||
        (b.topic || "").toLowerCase().includes(q) ||
        (b.notes || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  /* ═══════ RENDER ═══════ */
  return (
    <>
      <style>{css}</style>
      <div className="bk-root">
        {/* NAV */}
        <nav className="bk-nav">
          <div className="bk-logo">
            <div className="bk-logo-icon">
              <img src="/favicon-32.png" alt="Gyantra" />
            </div>
            Gyan<span>tra</span>
          </div>
          <div className="bk-nav-right">
            <button className="bk-back-btn" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={14} /> Dashboard
            </button>
            <button
              className="bk-theme-btn"
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

        <main className="bk-main">
          {/* HERO */}
          <div className="bk-hero">
            <div className="bk-hero-content">
              <div className="bk-hero-top">
                <h1>
                  <span className="bk-hero-emoji">🔖</span>
                  Your Bookmark Vault
                </h1>
                {bookmarks.length > 0 && (
                  <div className="bk-hero-count">
                    <Bookmark size={14} />
                    {bookmarks.length} saved
                  </div>
                )}
              </div>
              <p>
                Questions you've bookmarked during quizzes live here. Add notes, review before exams, and master the tricky ones.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bk-loading">
              <div className="bk-spinner" />
              <span style={{ color: "var(--bk-muted)", fontSize: 14 }}>
                Loading your bookmarks...
              </span>
            </div>
          ) : bookmarks.length === 0 ? (
            /* EMPTY STATE */
            <div className="bk-empty">
              <div className="bk-empty-icon">
                <Bookmark size={40} color="var(--bk-amber)" />
              </div>
              <h2>No bookmarks yet</h2>
              <p>
                Start a quiz and tap the 🔖 bookmark button on any tricky question.
                Your saved questions will appear here for easy revision.
              </p>
              <button className="bk-empty-btn" onClick={() => navigate("/QuizSetup")}>
                <Sparkles size={16} /> Start a Quiz
              </button>
            </div>
          ) : (
            <>
              {/* TOOLBAR */}
              <div className="bk-toolbar">
                <div className="bk-search">
                  <Search size={16} className="bk-search-icon" />
                  <input
                    placeholder="Search by question, topic, or notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="bk-filter-pills">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      className={`bk-pill${activeSubject === s ? " active" : ""}`}
                      onClick={() => setActiveSubject(s)}
                    >
                      {s === "All" ? "All Subjects" : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* BOOKMARK LIST */}
              {filtered.length === 0 ? (
                <div className="bk-empty" style={{ padding: "3rem 2rem" }}>
                  <div className="bk-empty-icon" style={{ width: 70, height: 70 }}>
                    <Search size={28} color="var(--bk-muted)" />
                  </div>
                  <h2>No matches found</h2>
                  <p>Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="bk-list">
                  {filtered.map((bk) => {
                    const isExpanded = expanded[bk.questionId];
                    const isEditing = editing === bk.questionId;
                    const isDeleting = deleting === bk.questionId;
                    return (
                      <div key={bk.questionId || bk._id} className="bk-card">
                        {/* HEADER */}
                        <div
                          className="bk-card-header"
                          onClick={() => toggleExpand(bk.questionId)}
                        >
                          <div className="bk-card-bookmark-icon">
                            <Bookmark size={18} />
                          </div>
                          <div className="bk-card-body">
                            <div className="bk-card-meta">
                              {bk.subject && (
                                <span className="bk-card-subject">{bk.subject}</span>
                              )}
                              {bk.topic && (
                                <span className="bk-card-topic">• {bk.topic}</span>
                              )}
                              <span className="bk-card-date">
                                {formatDate(bk.createdAt)}
                              </span>
                            </div>
                            <div
                              className={`bk-card-question${isExpanded ? " expanded" : ""}`}
                            >
                              {bk.questionText}
                            </div>
                            {bk.notes && !isExpanded && (
                              <div
                                style={{
                                  marginTop: 6,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                  fontSize: 12,
                                  color: "var(--bk-accent2)",
                                }}
                              >
                                <StickyNote size={12} /> Note attached
                              </div>
                            )}
                          </div>
                          <div className="bk-card-actions">
                            <button
                              className="bk-icon-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(bk);
                              }}
                              title="Edit notes"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              className="bk-icon-btn danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleting(
                                  isDeleting ? null : bk.questionId,
                                );
                                if (!expanded[bk.questionId]) {
                                  setExpanded((prev) => ({
                                    ...prev,
                                    [bk.questionId]: true,
                                  }));
                                }
                              }}
                              title="Remove bookmark"
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="bk-expand-chevron">
                              {isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* EXPANDED SECTION */}
                        {isExpanded && (
                          <div className="bk-card-expanded">
                            <div className="bk-note-label">
                              <StickyNote size={13} /> Your Notes
                            </div>

                            {isEditing ? (
                              <>
                                <textarea
                                  ref={textareaRef}
                                  className="bk-note-textarea"
                                  value={editNote}
                                  onChange={(e) => setEditNote(e.target.value)}
                                  placeholder="Add your revision notes, key formulas, or thoughts about this question..."
                                />
                                <div className="bk-note-actions">
                                  <button
                                    className="bk-note-btn cancel"
                                    onClick={() => setEditing(null)}
                                  >
                                    <X size={13} /> Cancel
                                  </button>
                                  <button
                                    className="bk-note-btn save"
                                    onClick={() => saveNote(bk.questionId)}
                                  >
                                    <Save size={13} /> Save Note
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="bk-note-display">
                                {bk.notes ? (
                                  bk.notes
                                ) : (
                                  <span className="bk-note-empty">
                                    No notes yet — tap the edit icon to add your thoughts.
                                  </span>
                                )}
                              </div>
                            )}

                            {isDeleting && (
                              <div className="bk-delete-confirm">
                                <span>Remove this bookmark permanently?</span>
                                <button
                                  className="bk-delete-no"
                                  onClick={() => setDeleting(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="bk-delete-yes"
                                  onClick={() => confirmDelete(bk.questionId)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>

        {/* FOOTER */}
        <footer className="bk-footer">
          <img src="/favicon-32.png" alt="" />
          © {new Date().getFullYear()} Gyantra. All rights reserved.
        </footer>
      </div>

      {/* TOAST */}
      {toast && (
        <div className={`bk-toast ${toast.type}`}>{toast.message}</div>
      )}
    </>
  );
}
