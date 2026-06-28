import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sparkles, ArrowLeft, Sun, Moon } from "lucide-react";
import ProblemDescPane from "./ProblemDescPane";
import SubmissionsPane from "./SubmissionsPane";
import MonacoEditorPane from "./MonacoEditorPane";
import CustomInputPane from "./CustomInputPane";
import OutputConsole from "./OutputConsole";
import AIReviewPane from "./AIReviewPane";
import { useTheme } from "../../contexts/ThemeContext";

const CodeWorkspace = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editor States
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Custom Input States
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  // Compiler Execution States
  const [executing, setExecuting] = useState(false);
  const [consoleType, setConsoleType] = useState(null); // 'run' | 'submit' | null
  const [consoleResult, setConsoleResult] = useState(null);
  const [lastSubmissionId, setLastSubmissionId] = useState(null);
  const [consoleState, setConsoleState] = useState("normal"); // 'collapsed' | 'normal' | 'maximized'

  // Bookmark States
  const [bookmarked, setBookmarked] = useState(false);
  const [togglingBookmark, setTogglingBookmark] = useState(false);

  // AI Review States
  const [isAIReviewOpen, setIsAIReviewOpen] = useState(false);
  const [aiReview, setAIReview] = useState(null);
  const [aiLoading, setAILoading] = useState(false);
  const [aiError, setAIError] = useState(null);
  const [activeTab, setActiveTab] = useState("description"); // 'description' | 'submissions'

  // Bookmark custom notes modal states
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const [bookmarkNotes, setBookmarkNotes] = useState("");
  const [isCustomInputOpen, setIsCustomInputOpen] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Load Problem Details
  useEffect(() => {
    const fetchProblemDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/dsa/problems/${problemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const prob = res.data;
        setProblem(prob);
        setBookmarked(prob.isBookmarked);

        // Initialize editor content with preferred language starter code
        if (prob.starterCode) {
          setCode(prob.starterCode[language] || "");
        }

        // Initialize custom input from first example
        if (prob.examples && prob.examples.length > 0) {
          setCustomInput(prob.examples[0].input || "");
          setExpectedOutput(prob.examples[0].output || "");
        }
      } catch (err) {
        console.error("Error loading problem details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetail();
  }, [problemId]);

  // Synchronize starter code text when language dropdown shifts
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    if (problem && problem.starterCode) {
      setCode(problem.starterCode[newLang] || "");
    }
  };

  // Toggle Bookmark Status
  const handleToggleBookmark = async (customNotes = "") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setTogglingBookmark(true);
      const res = await axios.post(
        `${API_URL}/api/dsa/progress/problems/${problem._id}/bookmark`,
        { notes: customNotes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarked(res.data.bookmarked);
    } catch (err) {
      console.error("Error toggling bookmark status:", err);
    } finally {
      setTogglingBookmark(false);
    }
  };

  const handleBookmarkClick = () => {
    if (bookmarked) {
      // Remove bookmark instantly
      handleToggleBookmark("");
    } else {
      // Open notes dialog modal before bookmarking
      setBookmarkNotes("");
      setIsBookmarkModalOpen(true);
    }
  };

  // Trigger Run Code Custom Compiler Sandbox Execution
  const handleRunCode = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setExecuting(true);
      setConsoleType("run");
      setConsoleResult(null);

      const res = await axios.post(
        `${API_URL}/api/dsa/problems/${problem._id}/run`,
        {
          code,
          language,
          customInput
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConsoleResult(res.data);
    } catch (err) {
      console.error("Error running code:", err);
      setConsoleResult({
        success: false,
        errorType: "Runtime Error",
        errorMessage: err.response?.data?.message || "Execution engine offline."
      });
    } finally {
      setExecuting(false);
    }
  };

  // Trigger Submit Code Evaluation against all tests
  const handleSubmitCode = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setExecuting(true);
      setConsoleType("submit");
      setConsoleResult(null);

      const res = await axios.post(
        `${API_URL}/api/dsa/problems/${problem._id}/submit`,
        { code, language },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConsoleResult(res.data);

      // Store the submission ID
      const progressRes = await axios.get(`${API_URL}/api/dsa/progress/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const lastRun = progressRes.data.recentActivity?.find(
        (act) => act.problemId === problem._id
      ) || progressRes.data.recentActivity?.[0];

      if (lastRun) {
        setLastSubmissionId(lastRun._id);
      }
    } catch (err) {
      console.error("Error submitting solution:", err);
      setConsoleResult({
        status: "Compilation Error",
        passedCount: 0,
        totalCount: 1,
        errorMessage: err.response?.data?.message || "Sandbox submission failure."
      });
    } finally {
      setExecuting(false);
    }
  };

  // Trigger AI code quality audit feedback
  const handleFetchAIReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!lastSubmissionId) {
      setIsAIReviewOpen(true);
      setAIError("Please click Submit on your solution first before requesting an AI review.");
      return;
    }

    try {
      setIsAIReviewOpen(true);
      setAILoading(true);
      setAIError(null);
      setAIReview(null);

      const res = await axios.post(
        `${API_URL}/api/dsa/ai/submissions/${lastSubmissionId}/ai-review`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAIReview(res.data);
    } catch (err) {
      console.error("AI review extraction failure:", err);
      setAIError(err.response?.data?.message || "AI inference model is currently busy. Please try again.");
    } finally {
      setAILoading(false);
    }
  };

  const isDark = theme === "dark";

  if (loading && !problem) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDark ? "bg-[#030303] text-zinc-500" : "bg-slate-50 text-slate-400"
      }`}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
        <span className="mt-4 text-xs font-mono">Assembling IDE Workspace...</span>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col overflow-hidden font-sans transition-colors duration-300 ${
      isDark ? "bg-[#030303] text-zinc-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Header (Top Navigation bar) */}
      <header className={`px-4 py-3 flex justify-between items-center z-10 shrink-0 border-b ${
        isDark ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-slate-200 shadow-xs"
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dsa")}
            className={`p-2 rounded-xl transition-all ${
              isDark ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-slate-100 text-slate-650 hover:text-slate-900"
            }`}
            title="Back to Sheet dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className={`font-extrabold text-lg tracking-tight ${
            isDark ? "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent" : "text-slate-900"
          }`}>
            GyanCode <span className={`font-medium text-xs font-mono ml-1 ${isDark ? "text-zinc-500" : "text-slate-400"}`}>IDE</span>
          </span>
        </div>

        {/* Global actions and Theme selector */}
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              isDark 
                ? "bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-850" 
                : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-100 shadow-xs"
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={handleFetchAIReview}
            className={`font-bold rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-all focus:outline-none ${
              isDark 
                ? "bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border border-indigo-900/60" 
                : "bg-indigo-550 hover:bg-indigo-600 text-white shadow-sm"
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current opacity-70" />
            Review with AI
          </button>
        </div>
      </header>

      {/* Main Split Panel Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-3 gap-3">
        
        {/* Left Column: Problem Information Details (35% Width) */}
        {!isFullScreen && (
          <div className={`w-full md:w-[35%] h-full flex flex-col shrink-0 border rounded-2xl overflow-hidden ${
            isDark ? "bg-zinc-900/60 border-zinc-800/80" : "bg-white border-slate-200 shadow-xs"
          }`}>
            {/* Tabs Header bar */}
            <div className={`flex border-b text-xs font-semibold px-2 shrink-0 ${
              isDark ? "border-zinc-800 bg-zinc-950/20" : "border-slate-150 bg-slate-50/50"
            }`}>
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-3 border-b-2 transition-colors focus:outline-none ${
                  activeTab === "description"
                    ? "border-indigo-500 text-indigo-500 font-bold"
                    : isDark ? "border-transparent text-zinc-500 hover:text-zinc-300" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("submissions")}
                className={`px-4 py-3 border-b-2 transition-colors focus:outline-none ${
                  activeTab === "submissions"
                    ? "border-indigo-500 text-indigo-500 font-bold"
                    : isDark ? "border-transparent text-zinc-500 hover:text-zinc-300" : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Submissions
              </button>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-hidden">
              {activeTab === "description" ? (
                <ProblemDescPane
                  problem={problem}
                  bookmarked={bookmarked}
                  onToggleBookmark={handleBookmarkClick}
                  togglingBookmark={togglingBookmark}
                  theme={theme}
                />
              ) : (
                <SubmissionsPane
                  problemId={problem._id}
                  onLoadCode={(pastCode, pastLang) => {
                    setLanguage(pastLang);
                    setCode(pastCode);
                  }}
                  theme={theme}
                  activeTab={activeTab}
                />
              )}
            </div>
          </div>
        )}

        {/* Right Column: Code Editor & Executions (65% or 100% Width) */}
        <div className="flex-1 h-full flex flex-col gap-3 overflow-hidden transition-all duration-300">
          
          {/* Top Row: Editor Canvas & Custom Input Panel */}
          <div className="flex-1 flex flex-col sm:flex-row gap-3 min-h-[350px] overflow-hidden">
            {/* Editor Canvas Container */}
            <div className="flex-1 h-full flex flex-col">
              <MonacoEditorPane
                code={code}
                onChange={setCode}
                language={language}
                onLanguageChange={handleLanguageChange}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                isFullScreen={isFullScreen}
                onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                onRun={handleRunCode}
                onSubmit={handleSubmitCode}
                executing={executing}
                theme={theme}
                isCustomInputOpen={isCustomInputOpen}
                onToggleCustomInput={() => setIsCustomInputOpen(!isCustomInputOpen)}
              />
            </div>

            {/* Custom Input sidebar pane (dotted panel layout) */}
            {!isFullScreen && isCustomInputOpen && (
              <div className={`w-full sm:w-[250px] h-full flex flex-col shrink-0 border-l border-dashed pl-1 ${
                isDark ? "border-zinc-800" : "border-slate-200"
              }`}>
                <CustomInputPane
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                  expectedOutput={expectedOutput}
                  onExpectedOutputChange={setExpectedOutput}
                  theme={theme}
                  onHide={() => setIsCustomInputOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Bottom Row: Terminal Console Outputs Log */}
          <div className={`shrink-0 transition-all duration-300 ${
            consoleState === "collapsed" 
              ? "h-[45px]" 
              : consoleState === "maximized" 
                ? "h-[60%] md:h-[65%]" 
                : "h-[240px] md:h-[280px]"
          }`}>
            <OutputConsole
              result={consoleResult}
              executing={executing}
              type={consoleType}
              theme={theme}
              consoleState={consoleState}
              setConsoleState={setConsoleState}
            />
          </div>

        </div>

      </div>

      {/* Slide-out Drawer: Educational AI Reviews */}
      <AIReviewPane
        isOpen={isAIReviewOpen}
        onClose={() => setIsAIReviewOpen(false)}
        review={aiReview}
        loading={aiLoading}
        error={aiError}
        onRetry={handleFetchAIReview}
        theme={theme}
      />

      {/* Bookmark Notes Modal */}
      {isBookmarkModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md border rounded-2xl p-6 flex flex-col gap-4 shadow-2xl transition-all ${
            isDark ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div>
              <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-550/20" />
                Bookmark Problem
              </h3>
              <p className={`text-xs mt-1 ${isDark ? "text-zinc-400" : "text-slate-550"}`}>
                Add custom review notes or comments for this problem:
              </p>
            </div>
            
            <textarea
              autoFocus
              value={bookmarkNotes}
              onChange={(e) => setBookmarkNotes(e.target.value)}
              placeholder="e.g. Note down logic, tricky cases, or time complexity here..."
              className={`w-full h-24 border rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar ${
                isDark ? "bg-zinc-950 border-zinc-850 text-zinc-300" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            />

            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => setIsBookmarkModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                  isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-850" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleToggleBookmark(bookmarkNotes);
                  setIsBookmarkModalOpen(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md focus:outline-none ${
                  isDark 
                    ? "bg-indigo-650 hover:bg-indigo-500 text-white" 
                    : "bg-indigo-600 hover:bg-indigo-750 text-white"
                }`}
              >
                Add Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CodeWorkspace;
