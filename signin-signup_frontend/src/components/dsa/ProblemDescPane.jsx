import React from "react";
import { Award, Clock, Star, Landmark } from "lucide-react";

const ProblemDescPane = ({ problem, bookmarked, onToggleBookmark, togglingBookmark, theme }) => {
  if (!problem) return null;

  const isDark = theme === "dark";

  return (
    <div className={`h-full overflow-y-auto border rounded-2xl p-6 flex flex-col gap-5 custom-scrollbar transition-colors duration-300 ${
      isDark ? "bg-[#1e1e1e]/60 border-[#2e2e2e]" : "bg-white border-slate-200 shadow-xs"
    }`}>
      
      {/* Title & Actions */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${
            isDark ? "text-zinc-500" : "text-slate-400"
          }`}>
            Problem #{problem.problemNumber}
          </span>
          <h2 className={`text-xl md:text-2xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
            {problem.title}
          </h2>
        </div>
        <button
          onClick={onToggleBookmark}
          disabled={togglingBookmark}
          className={`p-2.5 rounded-xl border transition-all ${
            bookmarked 
              ? "bg-yellow-950/20 border-yellow-800/50 text-yellow-500 fill-yellow-500" 
              : isDark 
                ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-400 hover:text-zinc-200" 
                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 shadow-xs"
          }`}
          title={bookmarked ? "Bookmarked!" : "Bookmark Problem"}
        >
          <Star className={`w-4.5 h-4.5 ${togglingBookmark ? "animate-pulse" : ""}`} />
        </button>
      </div>

      {/* Metadata Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
          problem.difficulty === "Easy" ? "bg-emerald-950/45 text-emerald-450 border border-emerald-900/40" :
          problem.difficulty === "Medium" ? "bg-amber-950/45 text-amber-455 border border-amber-900/40" :
          "bg-rose-950/45 text-rose-400 border border-rose-900/40"
        }`}>
          {problem.difficulty}
        </span>
        <div className={`flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-0.5 border ${
          isDark 
            ? "text-indigo-400 bg-indigo-950/20 border-indigo-900/40" 
            : "text-indigo-650 bg-indigo-50 border-indigo-100"
        }`}>
          <Award className="w-3.5 h-3.5" />
          +{problem.xpReward} XP
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold rounded-full px-2.5 py-0.5 border ${
          isDark 
            ? "text-zinc-400 bg-zinc-950 border-zinc-850" 
            : "text-slate-650 bg-slate-50 border-slate-200"
        }`}>
          <Clock className="w-3.5 h-3.5 opacity-60" />
          {problem.estimatedTime} mins
        </div>
      </div>

      {/* Topics */}
      <div>
        <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2.5 ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Topic</h4>
        <span className={`text-xs font-bold rounded-lg px-3 py-1.5 border ${
          isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-slate-100/70 border-slate-200 text-slate-650"
        }`}>
          {problem.topic}
        </span>
      </div>

      {/* Companies */}
      {problem.companies && problem.companies.length > 0 && (
        <div>
          <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
            isDark ? "text-zinc-500" : "text-slate-400"
          }`}>
            <Landmark className="w-3.5 h-3.5 opacity-65" />
            Asked In
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {problem.companies.map((c) => (
              <span key={c} className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                isDark ? "bg-[#1a1a1a] text-zinc-400 border-[#2e2e2e]" : "bg-slate-50 text-slate-600 border-slate-200"
              }`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <hr className={isDark ? "border-[#2e2e2e]" : "border-slate-150"} />

      {/* Statement */}
      <div className="flex flex-col gap-2">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Problem Statement</h4>
        <div className={`text-sm leading-relaxed whitespace-pre-wrap font-sans ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
          {problem.statement}
        </div>
      </div>

      <hr className={isDark ? "border-[#2e2e2e]" : "border-slate-150"} />

      {/* Input Format */}
      <div className="flex flex-col gap-2">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Input Format</h4>
        <div className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
          {problem.inputFormat}
        </div>
      </div>

      <hr className={isDark ? "border-[#2e2e2e]" : "border-slate-150"} />

      {/* Output Format */}
      <div className="flex flex-col gap-2">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Output Format</h4>
        <div className={`text-sm leading-relaxed ${isDark ? "text-zinc-300" : "text-slate-700"}`}>
          {problem.outputFormat}
        </div>
      </div>

      <hr className={isDark ? "border-[#2e2e2e]" : "border-slate-150"} />

      {/* Constraints */}
      <div className="flex flex-col gap-2">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Constraints</h4>
        <div className={`font-mono text-xs leading-relaxed whitespace-pre-wrap ${
          isDark ? "text-rose-450" : "text-rose-650"
        }`}>
          {problem.constraints}
        </div>
      </div>

      <hr className={isDark ? "border-[#2e2e2e]" : "border-slate-150"} />

      {/* Examples */}
      <div className="flex flex-col gap-6">
        <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Examples</h4>
        {problem.examples && problem.examples.map((ex, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <h5 className={`text-xs font-bold uppercase tracking-wide ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
              Example {index + 1}
            </h5>
            <div className={`font-mono text-xs p-4 rounded-xl border flex flex-col gap-2.5 ${
              isDark ? "bg-[#1a1a1a]/60 border-[#2e2e2e] text-zinc-300" : "bg-slate-50/50 border-slate-200 text-slate-700"
            }`}>
              <div>
                <span className="text-zinc-500 font-bold mr-2 text-[10px] uppercase">Input:</span>
                <span className="whitespace-pre-wrap">{ex.input}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-bold mr-2 text-[10px] uppercase">Output:</span>
                <span className="whitespace-pre-wrap">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className={`border-t pt-2 italic font-sans leading-relaxed text-xs ${
                  isDark ? "border-[#2e2e2e] text-zinc-400" : "border-slate-150 text-slate-505"
                }`}>
                  <span className="font-bold not-italic">Explanation: </span>
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProblemDescPane;
