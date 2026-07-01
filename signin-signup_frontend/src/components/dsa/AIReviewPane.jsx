import React from "react";
import { X, Sparkles, AlertCircle, RefreshCw, CheckCircle } from "lucide-react";

const AIReviewPane = ({ isOpen, onClose, review, loading, error, onRetry, theme }) => {
  if (!isOpen) return null;

  const isDark = theme === "dark";

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-[480px] border-l shadow-2xl z-50 flex flex-col font-sans transition-all duration-300 ${
      isDark ? "bg-[#1e1e1e] border-[#2e2e2e] text-zinc-200" : "bg-white border-slate-200 text-black"
    }`}>
      
      {/* Header */}
      <div className={`p-4 border-b flex justify-between items-center ${isDark ? "bg-[#252525] border-[#2e2e2e]" : "bg-white border-slate-200"}`}>
        <h3 className={`font-extrabold text-sm tracking-wide flex items-center gap-2 ${
          isDark ? "text-transparent bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text" : "text-indigo-600"
        }`}>
          <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />
          AI Review & Mentorship
        </h3>
        <button
          onClick={onClose}
          className={`p-1.5 rounded-lg transition-colors ${
            isDark ? "hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200" : "hover:bg-slate-100 text-slate-500 hover:text-slate-800"
          }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-20 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
            <span className={`text-xs font-mono text-center max-w-[280px] ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
              DeepSeek compiling complexities, optimization approaches, missed edge cases, and traces...
            </span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full py-20 gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-rose-500" />
            <div>
              <h4 className="font-bold">Analysis Review Request</h4>
              <p className={`text-xs mt-1.5 max-w-[280px] ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                {error}
              </p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="bg-indigo-650 hover:bg-indigo-600 text-white px-5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            )}
          </div>
        ) : !review ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500 py-20 text-xs font-mono">
            Submit your solution first, then click "Review with AI" to generate feedback.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Rating and Complexities Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center ${
                isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs text-black"
              }`}>
                <span className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Grade</span>
                <span className="text-xl font-black text-indigo-650 mt-1">
                  {review.analysis?.codeQualityRating || "B+"}
                </span>
              </div>
              <div className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center ${
                isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs text-black"
              }`}>
                <span className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Time</span>
                <span className="text-xs font-mono font-bold text-emerald-600 mt-2 truncate max-w-full">
                  {review.analysis?.timeComplexity?.split(" ")[0] || "O(N)"}
                </span>
              </div>
              <div className={`border rounded-xl p-3 flex flex-col items-center justify-center text-center ${
                isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs text-black"
              }`}>
                <span className={`text-[9px] uppercase tracking-wider font-bold ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Space</span>
                <span className="text-xs font-mono font-bold text-purple-650 mt-2 truncate max-w-full">
                  {review.analysis?.spaceComplexity?.split(" ")[0] || "O(1)"}
                </span>
              </div>
            </div>

            {/* Time / Space Complexity Detail */}
            <div className={`border p-4 rounded-xl flex flex-col gap-2 ${
              isDark ? "bg-[#1a1a1a]/60 border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs"
            }`}>
              <h4 className="text-xs font-bold text-indigo-650 uppercase tracking-wider">Complexity Details</h4>
              <div className={`text-xs flex flex-col gap-1.5 font-mono ${isDark ? "text-zinc-300" : "text-black"}`}>
                <div><span className={`font-semibold ${isDark ? "text-zinc-500" : "text-slate-450"}`}>Time Complexity:</span> {review.analysis?.timeComplexity}</div>
                <div><span className={`font-semibold ${isDark ? "text-zinc-500" : "text-slate-450"}`}>Space Complexity:</span> {review.analysis?.spaceComplexity}</div>
              </div>
            </div>

            {/* Optimal Better Approach */}
            <div className={`border p-4 rounded-xl flex flex-col gap-2 ${
              isDark ? "bg-[#1a1a1a]/60 border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs"
            }`}>
              <h4 className="text-xs font-bold text-pink-600 uppercase tracking-wider">Optimal Strategy Suggestions</h4>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? "text-zinc-300" : "text-black"}`}>
                {review.analysis?.betterApproach}
              </p>
            </div>

            {/* Optimization Suggestions */}
            {review.analysis?.optimizationSuggestions && review.analysis.optimizationSuggestions.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-505" : "text-slate-500"}`}>Refactoring Action Items</h4>
                <ul className={`flex flex-col gap-1.5 text-xs pl-4 list-disc marker:text-indigo-600 ${
                  isDark ? "text-zinc-300" : "text-black"
                }`}>
                  {review.analysis.optimizationSuggestions.map((s, i) => (
                    <li key={i} className="leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missed Edge Cases */}
            {review.analysis?.edgeCasesMissed && review.analysis.edgeCasesMissed.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider">Edge Cases to Double Check</h4>
                <ul className={`flex flex-col gap-1.5 text-xs pl-4 list-disc marker:text-rose-500 ${
                  isDark ? "text-zinc-300" : "text-black"
                }`}>
                  {review.analysis.edgeCasesMissed.map((s, i) => (
                    <li key={i} className="leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dry Run Explanation */}
            <div className={`border p-4 rounded-xl flex flex-col gap-2 ${
              isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-white border-slate-200 shadow-inner"
            }`}>
              <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">Trace / Dry Run Log</h4>
              <p className={`text-xs font-mono leading-relaxed whitespace-pre-wrap ${isDark ? "text-zinc-400" : "text-black"}`}>
                {review.analysis?.dryRunExplanation}
              </p>
            </div>

            {/* Interview Tips */}
            {review.analysis?.interviewTips && review.analysis.interviewTips.length > 0 && (
              <div className={`border p-4 rounded-xl flex flex-col gap-2 ${
                isDark 
                  ? "bg-gradient-to-br from-indigo-950/20 to-purple-950/20 border-indigo-900/30" 
                  : "bg-indigo-50/40 border-indigo-100/50"
              }`}>
                <h4 className="text-xs font-bold text-indigo-650 uppercase tracking-wider">Interview Tips & Mentorship</h4>
                <ul className={`flex flex-col gap-2 text-xs mt-1 pl-4 list-disc ${isDark ? "text-zinc-350" : "text-black"}`}>
                  {review.analysis.interviewTips.map((s, i) => (
                    <li key={i} className="leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Footer */}
      <div className={`p-4 border-t flex items-center justify-between text-xs transition-colors ${
        isDark ? "bg-[#252525] border-[#2e2e2e] text-zinc-500" : "bg-white border-slate-200 text-slate-500"
      }`}>
        <span>Powered by DeepSeek V4 NIM</span>
        <span className="flex items-center gap-1 text-indigo-600 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          Feedback Sync
        </span>
      </div>

    </div>
  );
};

export default AIReviewPane;
