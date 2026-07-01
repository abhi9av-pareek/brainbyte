import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Code, ShieldAlert, Award, ChevronRight } from "lucide-react";

const SubmissionsPane = ({ problemId, onLoadCode, theme, activeTab }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const isDark = theme === "dark";

  const fetchSubmissions = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/api/dsa/problems/${problemId}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error("Error loading submissions history:", err);
      setError("Failed to load submissions history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "submissions") {
      fetchSubmissions();
    }
  }, [problemId, activeTab]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-indigo-500"></div>
        <span className={`text-xs font-mono ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Loading past runs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center flex flex-col items-center justify-center h-full gap-2">
        <ShieldAlert className="w-8 h-8 text-rose-500" />
        <span className="text-xs text-rose-400 font-bold">{error}</span>
        <button
          onClick={fetchSubmissions}
          className="text-xs text-indigo-500 font-semibold hover:underline mt-1"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar transition-colors duration-300 ${
      isDark ? "bg-[#1e1e1e]/40" : "bg-white"
    }`}>
      <div className="flex justify-between items-center border-b pb-2 border-[#2e2e2e]/40">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
          Submission Logs ({submissions.length})
        </h4>
        <span className={`text-[10px] ${isDark ? "text-zinc-500" : "text-slate-400"}`}>
          Click a submission to load code
        </span>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-20 text-xs text-zinc-500 font-mono">
          No past submissions recorded. Click "Submit" to log solutions.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {submissions.map((sub) => {
            const isAccepted = sub.status === "Accepted";
            const date = new Date(sub.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <div
                key={sub._id}
                onClick={() => onLoadCode(sub.code, sub.language)}
                className={`border rounded-2xl p-4 cursor-pointer transition-all duration-200 group flex items-center justify-between ${
                  isDark 
                    ? "bg-[#1a1a1a]/60 border-[#2e2e2e] hover:bg-[#252525]" 
                    : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/60 shadow-xs"
                }`}
                title="Load code into editor"
              >
                <div className="flex flex-col gap-2 flex-1 pr-4">
                  {/* Status & Language */}
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-black ${
                      isAccepted ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {sub.status}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                      isDark ? "bg-[#1e1e1e] border-[#2e2e2e] text-zinc-400" : "bg-white border-slate-250 text-slate-650"
                    }`}>
                      {sub.language}
                    </span>
                  </div>

                  {/* Runtime & Memory stats */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 opacity-60" />
                      <span>{sub.runtime || 0} ms</span>
                    </div>
                    {sub.memory !== undefined && (
                      <div className="flex items-center gap-1">
                        <Code className="w-3.5 h-3.5 opacity-60" />
                        <span>{sub.memory} KB</span>
                      </div>
                    )}
                  </div>

                  {/* Date Submitted */}
                  <div className="text-[10px] text-zinc-650 font-mono">
                    Submitted: {date}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <span className={`text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDark ? "text-indigo-400" : "text-indigo-650"
                  }`}>
                    Load code
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmissionsPane;
