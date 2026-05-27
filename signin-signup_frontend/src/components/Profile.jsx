import React, { useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* ─── helpers to read/write profile from localStorage ─── */
const readProfile = () => ({
  name: JSON.parse(localStorage.getItem("user") || "{}").name || "",
  email: JSON.parse(localStorage.getItem("user") || "{}").email || "",
  educationLevel:
    JSON.parse(localStorage.getItem("user") || "{}").educationLevel || "",
  contactNumber:
    JSON.parse(localStorage.getItem("user") || "{}").contactNumber || "",
  nickname: localStorage.getItem("bb_nickname") || "",
  bio: localStorage.getItem("bb_bio") || "",
  avatar: localStorage.getItem("bb_avatar") || "",
  defaultDiff: localStorage.getItem("bb_defaultDiff") || "Medium",
  instantFB: localStorage.getItem("bb_instantFB") !== "false",
  shuffleQ: localStorage.getItem("bb_shuffleQ") !== "false",
  showStreak: localStorage.getItem("bb_showStreak") !== "false",
  emailNotif: localStorage.getItem("bb_emailNotif") === "true",
});

const writeProfile = (data) => {
  /* persist quiz preferences */
  localStorage.setItem("bb_nickname", data.nickname);
  localStorage.setItem("bb_bio", data.bio);
  localStorage.setItem("bb_avatar", data.avatar); // base64 or emoji string
  localStorage.setItem("bb_defaultDiff", data.defaultDiff);
  localStorage.setItem("bb_instantFB", String(data.instantFB));
  localStorage.setItem("bb_shuffleQ", String(data.shuffleQ));
  localStorage.setItem("bb_showStreak", String(data.showStreak));
  localStorage.setItem("bb_emailNotif", String(data.emailNotif));

  /* persist name back into the user object */
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...user,
      name: data.name,
      educationLevel: data.educationLevel,
      contactNumber: data.contactNumber,
    }),
  );
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0A0B0F; --surface: #111318; --surface2: #181B23; --surface3: #1E2130;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.13);
    --accent: #7C5CFC; --accent2: #00E5C0; --accent3: #FF6B6B;
    --amber: #FFB347; --text: #F0EFF8; --muted: #7B7A8C; --muted2: #3A394A;
  }
  .pf-root { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

  /* NAV */
  .pf-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; height: 56px; border-bottom: 1px solid var(--border); background: rgba(10,11,15,0.97); position: sticky; top: 0; z-index: 100; }
  .pf-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 19px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .pf-logo-icon { width: 28px; height: 28px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 7px; display: flex; align-items: center; justify-content: center; }
  .pf-logo span { color: var(--accent2); }
  .pf-nav-right { display: flex; gap: 10px; }

  /* BUTTONS */
  .pf-btn { display: inline-flex; align-items: center; gap: 7px; padding: 10px 22px; border-radius: 11px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; border: none; font-family: 'DM Sans', sans-serif; }
  .pf-btn-primary { background: var(--accent); color: #fff; }
  .pf-btn-primary:hover { background: #9074fd; transform: translateY(-1px); }
  .pf-btn-primary:disabled { background: var(--muted2); color: var(--muted); cursor: not-allowed; transform: none; }
  .pf-btn-ghost { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border2); }
  .pf-btn-ghost:hover { background: rgba(255,255,255,0.1); }
  .pf-btn-danger { background: rgba(255,107,107,0.12); color: var(--accent3); border: 1px solid rgba(255,107,107,0.25); }
  .pf-btn-danger:hover { background: rgba(255,107,107,0.2); }

  /* MAIN */
  .pf-main { max-width: 800px; margin: 0 auto; padding: 2rem 1.5rem 7rem; }

  /* TABS */
  .pf-tabs { display: flex; gap: 4px; background: var(--surface2); padding: 4px; border-radius: 12px; border: 1px solid var(--border); margin-bottom: 2rem; width: fit-content; }
  .pf-tab { padding: 8px 20px; border-radius: 9px; border: none; background: none; color: var(--muted); font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; font-weight: 500; transition: all .2s; }
  .pf-tab.active { background: var(--surface); color: var(--text); border: 1px solid var(--border2); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

  /* CARD */
  .pf-card { background: var(--surface); border: 1px solid var(--border2); border-radius: 18px; padding: 1.75rem; margin-bottom: 1.25rem; }
  .pf-card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 8px; }
  .pf-card-title-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }

  /* AVATAR HERO */
  .pf-avatar-hero { display: flex; align-items: center; gap: 1.75rem; }
  .pf-avatar-actions { display: flex; flex-direction: column; gap: 8px; }
  .pf-avatar-hint { font-size: 12px; color: var(--muted); margin-top: 4px; line-height: 1.5; }

  /* UPLOAD ZONE */
  .pf-upload-zone { border: 2px dashed var(--border2); border-radius: 12px; padding: 1.25rem; text-align: center; cursor: pointer; transition: all .2s; margin-top: 1.25rem; }
  .pf-upload-zone:hover { border-color: var(--accent); background: rgba(124,92,252,0.04); }
  .pf-upload-zone-text { font-size: 13px; color: var(--muted); margin-top: 6px; }
  .pf-upload-zone-sub  { font-size: 11px; color: var(--muted2); margin-top: 3px; }

  /* AVATAR GRID */
  .pf-avatar-grid-label { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; margin-top: 1.5rem; }
  .pf-avatar-grid { display: flex; flex-wrap: wrap; gap: 10px; }
  .pf-avatar-option { width: 52px; height: 52px; border-radius: 14px; background: var(--surface2); border: 2px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; transition: all .2s; flex-direction: column; gap: 2px; }
  .pf-avatar-option:hover { border-color: var(--accent); background: rgba(124,92,252,0.1); transform: scale(1.08); }
  .pf-avatar-option.selected { border-color: var(--accent2); background: rgba(0,229,192,0.1); box-shadow: 0 0 0 3px rgba(0,229,192,0.2); }
  .pf-avatar-option-label { font-size: 8px; color: var(--muted); font-family: 'DM Sans', sans-serif; }

  /* FORM */
  .pf-field { margin-bottom: 1.25rem; }
  .pf-field:last-child { margin-bottom: 0; }
  .pf-label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 7px; display: flex; align-items: center; justify-content: space-between; }
  .pf-label-tag { font-size: 10px; background: rgba(0,229,192,0.1); color: var(--accent2); border: 1px solid rgba(0,229,192,0.2); border-radius: 6px; padding: 1px 8px; text-transform: none; letter-spacing: 0; font-weight: 500; }
  .pf-input { width: 100%; background: var(--surface2); border: 1px solid var(--border2); border-radius: 11px; padding: 12px 14px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color .2s, box-shadow .2s; }
  .pf-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,92,252,0.12); }
  .pf-input::placeholder { color: var(--muted); }
  .pf-input:disabled { opacity: 0.5; cursor: not-allowed; }
  .pf-input-hint { font-size: 11px; color: var(--muted); margin-top: 5px; }

  /* BADGE PREVIEW */
  .pf-badge-preview { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,179,71,0.1); border: 1px solid rgba(255,179,71,0.25); border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 600; color: var(--amber); margin-top: 8px; }

  /* SAVE BAR */
  .pf-save-bar { position: fixed; bottom: 0; left: 0; right: 0; background: rgba(10,11,15,0.97); backdrop-filter: blur(12px); border-top: 1px solid var(--border2); padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; z-index: 200; }
  .pf-save-status { font-size: 13px; color: var(--muted); }
  .pf-save-status.changed { color: var(--amber); }

  /* TOAST */
  .pf-toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(20px); background: var(--surface3); border: 1px solid rgba(0,229,192,0.3); border-radius: 12px; padding: 10px 20px; font-size: 13px; font-weight: 600; color: var(--accent2); display: flex; align-items: center; gap: 8px; opacity: 0; transition: all .3s cubic-bezier(.4,0,.2,1); z-index: 600; white-space: nowrap; pointer-events: none; }
  .pf-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* DANGER ZONE */
  .pf-danger-zone { border: 1px solid rgba(255,107,107,0.2); border-radius: 14px; padding: 1.25rem; background: rgba(255,107,107,0.03); }
  .pf-danger-title { font-size: 13px; font-weight: 600; color: var(--accent3); margin-bottom: 4px; }
  .pf-danger-sub   { font-size: 12px; color: var(--muted); margin-bottom: 12px; }

  /* TOGGLES */
  .pf-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .pf-toggle-row:last-child { border-bottom: none; }
  .pf-toggle-info strong { font-size: 13px; font-weight: 500; display: block; margin-bottom: 2px; }
  .pf-toggle-info span   { font-size: 12px; color: var(--muted); }
  .pf-toggle { width: 44px; height: 24px; border-radius: 12px; background: var(--muted2); border: none; cursor: pointer; position: relative; transition: background .2s; flex-shrink: 0; }
  .pf-toggle.on { background: var(--accent); }
  .pf-toggle::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform .2s cubic-bezier(.4,0,.2,1); }
  .pf-toggle.on::after { transform: translateX(20px); }

  @keyframes pf-fadein { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .pf-fadein { animation: pf-fadein .4s ease forwards; }
`;

const TECH_AVATARS = [
  { emoji: "🤖", label: "Robot" },
  { emoji: "👾", label: "Alien" },
  { emoji: "🧠", label: "Brain" },
  { emoji: "💻", label: "Dev" },
  { emoji: "⚡", label: "Flash" },
  { emoji: "🚀", label: "Rocket" },
  { emoji: "🎯", label: "Target" },
  { emoji: "🔬", label: "Sci" },
  { emoji: "🌐", label: "Globe" },
  { emoji: "🛸", label: "UFO" },
  { emoji: "🦾", label: "Cyborg" },
  { emoji: "🧬", label: "DNA" },
  { emoji: "⚛", label: "Atom" },
  { emoji: "🔭", label: "Space" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🏆", label: "Champ" },
  { emoji: "🦉", label: "Owl" },
  { emoji: "🐉", label: "Dragon" },
  { emoji: "🌊", label: "Wave" },
  { emoji: "🔮", label: "Crystal" },
];

/* ─── SVG Icons ─── */
const IconUser = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconSettings = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const IconShield = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCheck = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconUpload = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);

/* ─── Avatar renderer (reused in multiple places) ─── */
export function AvatarRender({ avatar, name, size = 96, fontSize = 38 }) {
  const inner = avatar ? (
    avatar.startsWith("data:") || avatar.startsWith("http") ? (
      <img
        src={avatar}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    ) : (
      <span style={{ fontSize }}>{avatar}</span>
    )
  ) : (
    <span
      style={{
        fontFamily: "Syne,sans-serif",
        fontWeight: 800,
        fontSize,
        color: "#F0EFF8",
      }}
    >
      {(name || "U")[0].toUpperCase()}
    </span>
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#7C5CFC,#00E5C0)",
        padding: 3,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "var(--surface,#111318)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {inner}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileRef = useRef(null);

  const params = new URLSearchParams(location.search);
  const initTab = params.get("tab") || "profile";

  /* load initial values directly from storage — no useEffect needed */
  const initial = readProfile();

  const [activeTab, setActiveTab] = useState(initTab);
  const [toast, setToast] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [saving, setSaving] = useState(false);

  /* profile fields */
  const [name, setName] = useState(initial.name);
  const [nickname, setNickname] = useState(initial.nickname);
  const [bio, setBio] = useState(initial.bio);
  const [avatar, setAvatar] = useState(initial.avatar);
  const [education, setEducation] = useState(initial.educationLevel);
  const [contact, setContact] = useState(initial.contactNumber);

  /* preference fields */
  const [defaultDiff, setDefaultDiff] = useState(initial.defaultDiff);
  const [instantFB, setInstantFB] = useState(initial.instantFB);
  const [shuffleQ, setShuffleQ] = useState(initial.shuffleQ);
  const [showStreak, setShowStreak] = useState(initial.showStreak);
  const [emailNotif, setEmailNotif] = useState(initial.emailNotif);

  /* helper — mark changed without useEffect (avoids firing on mount) */
  const markChanged = useCallback(() => setHasChange(true), []);

  const field = (setter) => (e) => {
    setter(e.target.value);
    markChanged();
  };
  const toggle = (state, setter) => () => {
    setter(!state);
    markChanged();
  };

  /* ── image upload ── */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      markChanged();
    };
    reader.readAsDataURL(file);
  };

  /* ── save — writes everything to localStorage at once ── */
  const handleSave = async () => {
    setSaving(true);
    writeProfile({
      name,
      nickname,
      bio,
      avatar,
      education: education,
      contactNumber: contact,
      defaultDiff,
      instantFB,
      shuffleQ,
      showStreak,
      emailNotif,
    });
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setHasChange(false);
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  /* ── discard changes ── */
  const handleCancel = () => {
    const fresh = readProfile();
    setName(fresh.name);
    setNickname(fresh.nickname);
    setBio(fresh.bio);
    setAvatar(fresh.avatar);
    setEducation(fresh.educationLevel);
    setContact(fresh.contactNumber);
    setDefaultDiff(fresh.defaultDiff);
    setInstantFB(fresh.instantFB);
    setShuffleQ(fresh.shuffleQ);
    setShowStreak(fresh.showStreak);
    setEmailNotif(fresh.emailNotif);
    setHasChange(false);
  };

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">
        {/* NAV */}
        <nav className="pf-nav">
          <div className="pf-logo" onClick={() => navigate("/dashboard")}>
            <div className="pf-logo-icon">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            Brain<span>Byte</span>
          </div>
          <div className="pf-nav-right">
            <button
              className="pf-btn pf-btn-ghost"
              onClick={() => navigate("/dashboard")}
            >
              ← Dashboard
            </button>
          </div>
        </nav>

        <main className="pf-main pf-fadein">
          {/* PAGE HEADER */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "var(--accent2)",
                marginBottom: 8,
              }}
            >
              Account Settings
            </div>
            <div
              style={{
                fontFamily: "Syne,sans-serif",
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              Your Profile
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)" }}>
              Manage your identity, preferences, and account settings
            </div>
          </div>

          {/* TABS */}
          <div className="pf-tabs">
            {[
              { id: "profile", label: "Profile" },
              { id: "preferences", label: "Preferences" },
              { id: "security", label: "Security" },
            ].map((t) => (
              <button
                key={t.id}
                className={`pf-tab${activeTab === t.id ? " active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ══ PROFILE TAB ══ */}
          {activeTab === "profile" && (
            <div>
              {/* AVATAR CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(124,92,252,0.12)",
                      color: "var(--accent)",
                    }}
                  >
                    <IconUser />
                  </div>
                  Profile Picture
                </div>

                <div className="pf-avatar-hero">
                  {/* live preview — reads from state, not localStorage */}
                  <AvatarRender
                    avatar={avatar}
                    name={name}
                    size={96}
                    fontSize={38}
                  />
                  <div className="pf-avatar-actions">
                    <button
                      className="pf-btn pf-btn-ghost"
                      style={{ fontSize: 13 }}
                      onClick={() => fileRef.current?.click()}
                    >
                      <IconUpload /> Upload Photo
                    </button>
                    {avatar && (
                      <button
                        className="pf-btn pf-btn-danger"
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          setAvatar("");
                          markChanged();
                        }}
                      >
                        Remove
                      </button>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <div className="pf-avatar-hint">
                      JPG, PNG or GIF · Max 2MB
                      <br />
                      Recommended: 400×400px
                    </div>
                  </div>
                </div>

                <div
                  className="pf-upload-zone"
                  onClick={() => fileRef.current?.click()}
                >
                  <IconUpload />
                  <div className="pf-upload-zone-text">
                    Click to upload or drag and drop
                  </div>
                  <div className="pf-upload-zone-sub">
                    Or choose a tech avatar below
                  </div>
                </div>

                <div className="pf-avatar-grid-label">Tech Avatars</div>
                <div className="pf-avatar-grid">
                  {TECH_AVATARS.map((a, i) => (
                    <div
                      key={i}
                      className={`pf-avatar-option${avatar === a.emoji ? " selected" : ""}`}
                      onClick={() => {
                        setAvatar(a.emoji);
                        markChanged();
                      }}
                      title={a.label}
                    >
                      <span style={{ fontSize: 26 }}>{a.emoji}</span>
                      <span className="pf-avatar-option-label">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* IDENTITY CARD */}
              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(0,229,192,0.1)",
                      color: "var(--accent2)",
                    }}
                  >
                    <IconUser />
                  </div>
                  Identity
                </div>

                <div className="pf-field">
                  <div className="pf-label">
                    Full Name{" "}
                    <span className="pf-label-tag">Displayed on reports</span>
                  </div>
                  <input
                    className="pf-input"
                    value={name}
                    onChange={field(setName)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="pf-field">
                  <div className="pf-label">
                    Nickname{" "}
                    <span className="pf-label-tag">Shown on Dashboard</span>
                  </div>
                  <input
                    className="pf-input"
                    value={nickname}
                    onChange={field(setNickname)}
                    placeholder="e.g. BrainMaster, Arjun99"
                    maxLength={20}
                  />
                  <div className="pf-input-hint">
                    This replaces your name in the dashboard greeting.
                  </div>
                  {nickname && (
                    <div className="pf-badge-preview">
                      {avatar && !avatar.startsWith("data:") ? avatar : "👤"}
                      &nbsp; Welcome back, {nickname}!
                    </div>
                  )}
                </div>

                <div className="pf-field">
                  <div className="pf-label">Bio</div>
                  <textarea
                    className="pf-input"
                    value={bio}
                    onChange={field(setBio)}
                    placeholder="Tell something about yourself..."
                    rows={3}
                    maxLength={160}
                    style={{ resize: "vertical", minHeight: 80 }}
                  />
                  <div className="pf-input-hint">
                    {bio.length}/160 characters
                  </div>
                </div>

                <div className="pf-field">
                  <div className="pf-label">Email Address</div>
                  <input className="pf-input" value={initial.email} disabled />
                  <div className="pf-input-hint">
                    Email cannot be changed. Contact support if needed.
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div className="pf-field">
                    <div className="pf-label">Contact Number</div>
                    <input
                      className="pf-input"
                      value={contact}
                      onChange={field(setContact)}
                      placeholder="10-digit mobile"
                      maxLength={10}
                    />
                  </div>
                  <div className="pf-field">
                    <div className="pf-label">Education Level</div>
                    <select
                      className="pf-input"
                      value={education}
                      onChange={field(setEducation)}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="">Select level</option>
                      {[
                        "School",
                        "College",
                        "Graduate",
                        "Postgraduate",
                        "Professional",
                      ].map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ PREFERENCES TAB ══ */}
          {activeTab === "preferences" && (
            <div>
              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(255,179,71,0.1)",
                      color: "var(--amber)",
                    }}
                  >
                    <IconSettings />
                  </div>
                  Default Difficulty
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  {["Easy", "Medium", "Hard"].map((d) => (
                    <button
                      key={d}
                      className="pf-btn"
                      style={{
                        flex: 1,
                        background:
                          defaultDiff === d
                            ? "var(--accent)"
                            : "var(--surface2)",
                        color: defaultDiff === d ? "#fff" : "var(--muted)",
                        border: `1px solid ${defaultDiff === d ? "var(--accent)" : "var(--border2)"}`,
                        fontSize: 13,
                      }}
                      onClick={() => {
                        setDefaultDiff(d);
                        markChanged();
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className="pf-input-hint">
                  QuizSetup will pre-select this difficulty for you.
                </div>
              </div>

              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(56,149,255,0.1)",
                      color: "#3895FF",
                    }}
                  >
                    <IconSettings />
                  </div>
                  Quiz Options
                </div>
                {[
                  {
                    label: "Instant Feedback",
                    desc: "Show correct answer immediately after selection",
                    state: instantFB,
                    set: setInstantFB,
                  },
                  {
                    label: "Shuffle Questions",
                    desc: "Randomize question order in every quiz",
                    state: shuffleQ,
                    set: setShuffleQ,
                  },
                  {
                    label: "Show Streak on Nav",
                    desc: "Display your active streak in the navbar",
                    state: showStreak,
                    set: setShowStreak,
                  },
                  {
                    label: "Email Notifications",
                    desc: "Get weekly performance summary via email",
                    state: emailNotif,
                    set: setEmailNotif,
                  },
                ].map((item, i) => (
                  <div key={i} className="pf-toggle-row">
                    <div className="pf-toggle-info">
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </div>
                    <button
                      className={`pf-toggle${item.state ? " on" : ""}`}
                      onClick={toggle(item.state, item.set)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SECURITY TAB ══ */}
          {activeTab === "security" && (
            <div>
              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(0,229,192,0.1)",
                      color: "var(--accent2)",
                    }}
                  >
                    <IconShield />
                  </div>
                  Change Password
                </div>
                <div className="pf-field">
                  <div className="pf-label">Current Password</div>
                  <input
                    className="pf-input"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="pf-field">
                  <div className="pf-label">New Password</div>
                  <input
                    className="pf-input"
                    type="password"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="pf-field">
                  <div className="pf-label">Confirm New Password</div>
                  <input
                    className="pf-input"
                    type="password"
                    placeholder="Repeat new password"
                  />
                </div>
                <button
                  className="pf-btn pf-btn-primary"
                  style={{ marginTop: 4 }}
                >
                  Update Password
                </button>
              </div>

              <div className="pf-card">
                <div className="pf-card-title">
                  <div
                    className="pf-card-title-icon"
                    style={{
                      background: "rgba(124,92,252,0.12)",
                      color: "var(--accent)",
                    }}
                  >
                    <IconShield />
                  </div>
                  Account Info
                </div>
                {[
                  {
                    label: "Account ID",
                    val: initial.email?.split("@")[0] || "—",
                  },
                  {
                    label: "Education Level",
                    val: initial.educationLevel || "—",
                  },
                  { label: "Contact", val: initial.contactNumber || "—" },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>{r.label}</span>
                    <span style={{ fontWeight: 600 }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div className="pf-card">
                <div
                  className="pf-card-title"
                  style={{ color: "var(--accent3)" }}
                >
                  Danger Zone
                </div>
                <div className="pf-danger-zone">
                  <div className="pf-danger-title">Delete Account</div>
                  <div className="pf-danger-sub">
                    Permanently delete your account and all quiz history. This
                    cannot be undone.
                  </div>
                  <button
                    className="pf-btn pf-btn-danger"
                    onClick={() =>
                      alert("Contact support to delete your account.")
                    }
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* SAVE BAR — fixed at bottom */}
        <div className="pf-save-bar">
          <div className={`pf-save-status${hasChange ? " changed" : ""}`}>
            {hasChange ? "You have unsaved changes" : "All changes saved"}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="pf-btn pf-btn-ghost"
              onClick={handleCancel}
              disabled={!hasChange}
            >
              Discard
            </button>
            <button
              className="pf-btn pf-btn-primary"
              onClick={handleSave}
              disabled={saving || !hasChange}
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <IconCheck /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* TOAST */}
        <div className={`pf-toast${toast ? " show" : ""}`}>
          <IconCheck /> Profile saved successfully
        </div>
      </div>
    </>
  );
}
