import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Sparkles } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'about' | 'privacy' | 'terms' | 'careers' | 'advertise'

  const handleLinkClick = (e, modalType) => {
    e.preventDefault();
    setActiveModal(modalType);
    document.body.style.overflow = "hidden"; // disable background scrolling when modal is open
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = ""; // restore background scrolling
  };

  // SVGs for Brand & Platform Icons
  const Icons = {
    android: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 15.3c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm-11 0c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm11.577-8.38l1.704-2.95a.43.43 0 0 0-.158-.588.43.43 0 0 0-.588.159l-1.722 2.98C14.77 5.56 13.43 5.03 12 5.03c-1.43 0-2.77.53-3.738 1.48L6.54 3.53a.43.43 0 0 0-.588-.159.43.43 0 0 0-.158.588l1.704 2.95C4.62 8.35 2.87 11.08 2.54 14.33h18.92c-.33-3.25-2.08-5.98-4.96-7.41zM2 15.67h20v1.67H2v-1.67zm3.33 3.33h1.67v2.5H5.33v-2.5zm11.67 0h1.67v2.5H17v-2.5z" />
      </svg>
    ),
    apple: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-1 2.94 1.08.08 2.17-.52 2.83-1.33z" />
      </svg>
    ),
    facebook: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
      </svg>
    ),
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    pinterest: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.175-.105-.945-.199-2.4 0-3.443.18-.937 1.152-4.886 1.152-4.886s-.292-.587-.292-1.455c0-1.361.791-2.379 1.775-2.379.836 0 1.24.627 1.24 1.379 0 .84-.533 2.097-.807 3.262-.23.975.494 1.77 1.454 1.77 1.747 0 3.09-1.84 3.09-4.5 0-2.353-1.69-3.997-4.1-3.997-2.793 0-4.432 2.097-4.432 4.262 0 .846.326 1.75.733 2.247.08.098.092.183.067.283l-.274 1.117c-.044.183-.146.221-.337.133-1.258-.585-2.046-2.422-2.046-3.896 0-3.172 2.302-6.084 6.643-6.084 3.488 0 6.2 2.484 6.2 5.812 0 3.465-2.185 6.255-5.216 6.255-1.018 0-1.977-.529-2.306-1.156l-.628 2.396c-.227.873-.842 1.968-1.255 2.637a11.91 11.91 0 0 0 3.407.497c6.621 0 11.988-5.366 11.988-11.987C23.987 5.367 18.618 0 12.017 0z" />
      </svg>
    ),
  };

  return (
    <>
      <style>{`
        /* ─── Premium Multi-Column Footer ─── */
        .gyantra-footer {
          background: linear-gradient(180deg, rgba(3, 7, 17, 0) 0%, rgba(6, 13, 26, 0.98) 100%);
          border-top: 1px solid var(--border, rgba(0, 229, 192, 0.12));
          padding: 5rem 2rem 2rem 2rem;
          color: var(--text2, #8BA8A0);
          font-family: 'Exo 2', sans-serif;
          position: relative;
          z-index: 10;
        }

        .gyantra-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1.2fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 968px) {
          .gyantra-footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .gyantra-footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
        }

        .gyantra-footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Column 1 Details */
        .footer-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .footer-logo-wrap:hover {
          transform: translateY(-1px);
        }
        .footer-logo-img {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 229, 192, 0.05);
          border: 1px solid rgba(0, 229, 192, 0.2);
        }
        .footer-logo-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .footer-logo-text {
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 19px;
          color: var(--text, #E8F4F0);
          letter-spacing: 2px;
        }
        .footer-logo-text span {
          color: var(--cyan, #00E5C0);
        }

        .footer-about-text {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--text2, #8BA8A0);
        }

        /* Column Titles */
        .footer-col-title {
          font-family: 'Orbitron', monospace;
          font-size: 13px;
          font-weight: 700;
          color: var(--text, #E8F4F0);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-bottom: 2px solid rgba(0, 229, 192, 0.15);
          padding-bottom: 0.5rem;
          width: fit-content;
        }
        @media (max-width: 576px) {
          .footer-col-title {
            margin: 0 auto;
          }
        }

        /* Links Lists */
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-link-item a {
          font-size: 13px;
          color: var(--text2, #8BA8A0);
          text-decoration: none;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .footer-link-item a:hover {
          color: var(--cyan, #00E5C0);
          transform: translateX(4px);
        }
        @media (max-width: 576px) {
          .footer-link-item a:hover {
            transform: translateY(-2px);
          }
        }

        /* Apps & Social Grids */
        .footer-app-button {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(10, 22, 40, 0.6);
          border: 1px solid rgba(0, 229, 192, 0.12);
          padding: 8px 16px;
          border-radius: 8px;
          color: var(--text, #E8F4F0);
          text-decoration: none;
          transition: all 0.3s;
          font-size: 12px;
          font-weight: 500;
        }
        .footer-app-button:hover {
          background: rgba(0, 229, 192, 0.08);
          border-color: var(--cyan, #00E5C0);
          box-shadow: 0 0 15px rgba(0, 229, 192, 0.15);
          transform: translateY(-2px);
        }
        .footer-app-button-text span {
          display: block;
          font-size: 9px;
          color: var(--text3, #4A7A72);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-socials-grid {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        @media (max-width: 576px) {
          .footer-socials-grid {
            justify-content: center;
          }
        }
        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(10, 22, 40, 0.6);
          border: 1px solid rgba(0, 229, 192, 0.1);
          color: var(--text2, #8BA8A0);
          transition: all 0.3s;
        }
        .footer-social-icon:hover {
          color: #030711;
          background: var(--cyan, #00E5C0);
          box-shadow: 0 0 15px rgba(0, 229, 192, 0.4);
          transform: translateY(-3px) rotate(8deg);
        }

        /* Copyright Bar */
        .footer-copyright-bar {
          border-top: 1px solid rgba(0, 229, 192, 0.08);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: var(--text3, #4A7A72);
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .footer-copyright-bar {
            flex-direction: column;
            text-align: center;
          }
        }
        .footer-copyright-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-copyright-right {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-copyright-right a {
          color: var(--text3, #4A7A72);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-copyright-right a:hover {
          color: var(--cyan, #00E5C0);
        }

        /* Flag element */
        .footer-flag {
          display: inline-block;
          vertical-align: middle;
          border-radius: 2px;
          box-shadow: 0 0 1px rgba(0,0,0,0.2);
        }

        /* ─── Premium Glass Modal Overlay ─── */
        .footer-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 17, 0.7);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          opacity: 0;
          animation: modalFadeIn 0.3s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }

        .footer-modal-card {
          background: rgba(10, 22, 40, 0.85);
          border: 1px solid rgba(0, 229, 192, 0.25);
          box-shadow: 0 20px 50px rgba(0, 229, 192, 0.15);
          width: 100%;
          max-width: 680px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          overflow: hidden;
          transform: translateY(20px);
          animation: modalSlideUp 0.35s forwards cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .footer-modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0, 229, 192, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-modal-title {
          font-family: 'Orbitron', monospace;
          color: var(--text, #E8F4F0);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-modal-title span {
          color: var(--cyan, #00E5C0);
        }

        .footer-modal-close {
          background: none;
          border: none;
          color: var(--text2, #8BA8A0);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
        }
        .footer-modal-close:hover {
          color: var(--cyan, #00E5C0);
          background: rgba(0, 229, 192, 0.08);
          transform: rotate(90deg);
        }

        .footer-modal-body {
          padding: 2rem;
          overflow-y: auto;
          font-size: 14px;
          line-height: 1.7;
          color: var(--text2, #8BA8A0);
        }

        .footer-modal-body::-webkit-scrollbar {
          width: 6px;
        }
        .footer-modal-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .footer-modal-body::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 192, 0.2);
          border-radius: 4px;
        }
        .footer-modal-body::-webkit-scrollbar-thumb:hover {
          background: var(--cyan, #00E5C0);
        }

        .footer-modal-body h4 {
          font-family: 'Orbitron', monospace;
          color: var(--text, #E8F4F0);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 14px;
          letter-spacing: 1px;
        }
        .footer-modal-body p {
          margin-bottom: 1rem;
        }
        .footer-modal-body ul {
          margin-bottom: 1.25rem;
          padding-left: 1.25rem;
        }
        .footer-modal-body li {
          margin-bottom: 0.5rem;
        }

        .footer-modal-footer {
          padding: 1.25rem;
          border-top: 1px solid rgba(0, 229, 192, 0.1);
          text-align: right;
        }
        .footer-modal-btn {
          padding: 8px 24px;
          border-radius: 6px;
          font-weight: 600;
          font-family: 'Exo 2', sans-serif;
          cursor: pointer;
          border: none;
          background: var(--cyan, #00E5C0);
          color: #030711;
          transition: all 0.2s;
        }
        .footer-modal-btn:hover {
          box-shadow: 0 0 15px rgba(0, 229, 192, 0.4);
          transform: translateY(-1px);
        }

        @keyframes modalFadeIn {
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          to { transform: translateY(0); }
        }
      `}</style>

      <footer className="gyantra-footer">
        <div className="gyantra-footer-container">
          {/* Column 1: Logo & About */}
          <div className="gyantra-footer-col">
            <div
              className="footer-logo-wrap"
              onClick={() => {
                if (localStorage.getItem("token")) {
                  navigate("/dashboard");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="footer-logo-img">
                <img src="/favicon-32.png" alt="Gyantra logo" />
              </div>
              <span className="footer-logo-text">
                GY<span>AN</span>TRA
              </span>
            </div>
            <p className="footer-about-text">
              India's premier AI-powered preparation suite for exam warriors. Build confidence, master complex concepts, and track real-time analytics for JEE, NEET, UPSC, and GATE.
            </p>
          </div>

          {/* Column 2: Apps / Downloads */}
          <div className="gyantra-footer-col">
            <h3 className="footer-col-title">Mobile Apps</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="#" onClick={(e) => e.preventDefault()} className="footer-app-button">
                {Icons.android}
                <div className="footer-app-button-text">
                  <span>Download for</span>
                  Android APK
                </div>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="footer-app-button">
                {Icons.apple}
                <div className="footer-app-button-text">
                  <span>Download on the</span>
                  iOS App Store
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Follow Us */}
          <div className="gyantra-footer-col">
            <h3 className="footer-col-title">Follow Us</h3>
            <div className="footer-socials-grid">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">
                {Icons.facebook}
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Twitter">
                {Icons.twitter}
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">
                {Icons.youtube}
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Pinterest">
                {Icons.pinterest}
              </a>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className="gyantra-footer-col">
            <h3 className="footer-col-title">Company</h3>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>About Us</a>
              </li>
              <li className="footer-link-item">
                <a href="#careers" onClick={(e) => handleLinkClick(e, "careers")}>Careers</a>
              </li>
              <li className="footer-link-item">
                <a href="#advertise" onClick={(e) => handleLinkClick(e, "advertise")}>Advertise</a>
              </li>
              <li className="footer-link-item">
                <a href="#privacy" onClick={(e) => handleLinkClick(e, "privacy")}>Privacy Policy</a>
              </li>
              <li className="footer-link-item">
                <a href="#terms" onClick={(e) => handleLinkClick(e, "terms")}>Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="footer-copyright-bar">
          <div className="footer-copyright-left">
            <span>
              © {new Date().getFullYear()} Gyantra Platforms Private Limited. All rights reserved.
            </span>
            <span>·</span>
            <span>Built with ⚡ in India</span>
            <svg
              width="16"
              height="12"
              viewBox="0 0 3 2"
              className="footer-flag"
            >
              <rect width="3" height="0.667" fill="#FF9933" />
              <rect y="0.667" width="3" height="0.667" fill="#FFFFFF" />
              <rect y="1.333" width="3" height="0.667" fill="#138808" />
              <circle cx="1.5" cy="1" r="0.2" fill="#000080" />
              <circle cx="1.5" cy="1" r="0.15" fill="none" stroke="#FFFFFF" strokeWidth="0.02" />
              <path d="M 1.5 0.8 L 1.5 1.2 M 1.3 1 L 1.7 1 M 1.36 0.86 L 1.64 1.14 M 1.36 1.14 L 1.64 0.86" stroke="#000080" strokeWidth="0.02" />
            </svg>
          </div>
          <div className="footer-copyright-right">
            <a href="#privacy" onClick={(e) => handleLinkClick(e, "privacy")}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => handleLinkClick(e, "terms")}>Terms of Service</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>About</a>
          </div>
        </div>
      </footer>

      {/* ─── Interactive Policy Details Modals ─── */}
      {activeModal && (
        <div className="footer-modal-overlay" onClick={closeModal}>
          <div className="footer-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <h3 className="footer-modal-title">
                <Sparkles size={18} style={{ color: "var(--cyan)" }} />
                {activeModal === "about" && <span>About Us</span>}
                {activeModal === "careers" && <span>Careers @ Gyantra</span>}
                {activeModal === "advertise" && <span>Advertise With Us</span>}
                {activeModal === "privacy" && <span>Privacy Policy</span>}
                {activeModal === "terms" && <span>Terms of Service</span>}
              </h3>
              <button className="footer-modal-close" onClick={closeModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <div className="footer-modal-body">
              {activeModal === "about" && (
                <div>
                  <p>
                    <strong>Gyantra</strong> is India's leading AI-powered educational technology ecosystem, specifically crafted for <strong>exam warriors</strong>.
                  </p>
                  <p>
                    We believe standard, generic questionnaires fail to build true competence. To bridge this gap, we integrate state-of-the-art Generative AI models to dynamically draft custom questions, adaptive testing models that evolve based on student success metrics, and deep statistical analysis toolsets.
                  </p>
                  <h4>Our Core Pillars:</h4>
                  <ul>
                    <li><strong>Adaptive Learning paths:</strong> Questions automatically align with your strengths and weaknesses in real-time.</li>
                    <li><strong>Rigorous AI Auditing:</strong> Quality control over all generated MCQs to ensure syllabus alignment and absolute clarity.</li>
                    <li><strong>Data-First Insights:</strong> High-resolution progress metrics, heatmaps, and subject mastery scoring.</li>
                  </ul>
                  <p>
                    Our mission is simple: democratize highly personalized learning for JEE, NEET, UPSC, and GATE aspirants across India, ensuring no student is left behind due to lack of adaptive feedback.
                  </p>
                </div>
              )}

              {activeModal === "careers" && (
                <div>
                  <p>
                    Help us shape the future of adaptive learning in India! At Gyantra, we are building tools that touch the lives of millions of competitive exam aspirants daily.
                  </p>
                  <h4>Open Roles:</h4>
                  <ul>
                    <li><strong>Senior Frontend Engineer (React/Tailwind):</strong> Help design our premium interactive dashboard, real-time code runner, and analytical dashboards.</li>
                    <li><strong>AI & NLP Research Engineer:</strong> Refine our prompt architectures and model fine-tuning processes for generating high-fidelity scientific questions.</li>
                    <li><strong>Subject Matter Experts (Physics & CS):</strong> Formulate quality standards, review AI outputs, and train reinforcement learning feedback loops.</li>
                  </ul>
                  <h4>Perks of working with us:</h4>
                  <ul>
                    <li>Flexible, remote-first working culture.</li>
                    <li>Competitive salary packages and equity options.</li>
                    <li>Comprehensive healthcare and wellness benefits.</li>
                  </ul>
                  <p>
                    Interested? Submit your resume and portfolio of work to <strong>careers@gyantra.com</strong> and our team will get in touch!
                  </p>
                </div>
              )}

              {activeModal === "advertise" && (
                <div>
                  <p>
                    Partner with India's most focused, metrics-driven student community. Gyantra offers native placement formats and sponsorship opportunities that reach high-intent aspirants for engineering, medical, civil service, and tech fields.
                  </p>
                  <h4>Why Partner with Gyantra?</h4>
                  <ul>
                    <li><strong>Highly Segmented Audience:</strong> Focus your message directly on specific test groups (JEE, NEET, UPSC, GATE).</li>
                    <li><strong>Premium Experience:</strong> We maintain strict standards to ensure ads integrate natively and non-intrusively.</li>
                    <li><strong>Collaborative Campaigns:</strong> Custom scholarships, quiz sponsorship days, and brand features.</li>
                  </ul>
                  <p>
                    For inquiries and custom package options, please connect with our growth team at <strong>advertise@gyantra.com</strong>.
                  </p>
                </div>
              )}

              {activeModal === "privacy" && (
                <div>
                  <p>Last updated: June 30, 2026</p>
                  <p>
                    At Gyantra, accessible from Gyantra.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Gyantra and how we use it.
                  </p>
                  <h4>1. Information We Collect</h4>
                  <p>
                    We collect personal identification information in a variety of ways, including when users visit our site, register, and engage with our quizzes:
                  </p>
                  <ul>
                    <li><strong>Account Details:</strong> Email address, usernames, and profile details requested during setup.</li>
                    <li><strong>Usage Data:</strong> Quiz response records, completion times, bookmark annotations, earned XP points, and performance levels.</li>
                    <li><strong>Technical Metrics:</strong> IP addresses, browser types, session timings, and system logs to protect our servers against abuse.</li>
                  </ul>

                  <h4>2. How We Use Your Information</h4>
                  <p>We use the collected data to operate, maintain, and optimize our platform, including to:</p>
                  <ul>
                    <li>Personalize questions according to our Adaptive Difficulty algorithms.</li>
                    <li>Assemble real-time statistics, performance metrics, and activity dashboards.</li>
                    <li>Manage user leaderboards, daily streaks, and custom certificates.</li>
                    <li>Prevent fraudulent behavior and secure our cloud infrastructure.</li>
                  </ul>

                  <h4>3. Data Protection & Sharing</h4>
                  <p>
                    We do not sell, trade, or rent user personal identification information to third parties. We may utilize trusted third-party service providers (such as hosting, AI generation APIs, and analytics packages) to help us operate our business, provided they operate under strict confidentiality clauses.
                  </p>
                </div>
              )}

              {activeModal === "terms" && (
                <div>
                  <p>Last updated: June 30, 2026</p>
                  <p>
                    Welcome to Gyantra. These Terms of Service outline the rules and regulations for the use of Gyantra's website and application services.
                  </p>
                  <h4>1. Acceptance of Terms</h4>
                  <p>
                    By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Gyantra if you do not agree to all terms stated on this page.
                  </p>

                  <h4>2. Account Registration & Safety</h4>
                  <ul>
                    <li>You must provide accurate and complete registration information.</li>
                    <li>You are solely responsible for maintaining the confidentiality of your account credentials.</li>
                    <li>Any unauthorized use of your account must be reported immediately.</li>
                  </ul>

                  <h4>3. Acceptable Use License</h4>
                  <p>
                    Unless otherwise stated, Gyantra owns the intellectual property rights for all material on this platform. All intellectual property rights are reserved. You must not:
                  </p>
                  <ul>
                    <li>Republish or scrape generated questions, coding problems, or solution paths.</li>
                    <li>Sell, rent, or sub-license materials from Gyantra.</li>
                    <li>Use automated scraper tools, bots, or scripts to access or catalog data.</li>
                  </ul>

                  <h4>4. Disclaimer of Warranties</h4>
                  <p>
                    Our AI models generate questions based on advanced prompt patterns. While we audit performance, we do not warrant that all explanations, values, and syllabus mappings are 100% correct or reflect official exam guidelines. Use Gyantra services as an adaptive educational aid.
                  </p>
                </div>
              )}
            </div>

            <div className="footer-modal-footer">
              <button className="footer-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
