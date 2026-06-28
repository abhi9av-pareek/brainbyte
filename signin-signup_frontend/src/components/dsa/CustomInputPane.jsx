import React from "react";
import { Terminal, ChevronRight } from "lucide-react";

const CustomInputPane = ({ customInput, onCustomInputChange, expectedOutput, onExpectedOutputChange, theme, onHide }) => {
  const isDark = theme === "dark";

  return (
    <div className={`h-full flex flex-col border rounded-2xl p-4 gap-4 transition-all duration-300 ${
      isDark ? "bg-zinc-900/60 border-zinc-800/80 shadow-lg" : "bg-white border-slate-200 shadow-sm"
    }`}>
      {/* Header with Close/Hide button */}
      <div className={`flex justify-between items-center border-b pb-2 ${
        isDark ? "border-zinc-850" : "border-slate-150"
      }`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          isDark ? "text-zinc-400" : "text-slate-505"
        }`}>
          <Terminal className="w-3.5 h-3.5 text-indigo-500" />
          Custom Test Cases
        </h3>
        {onHide && (
          <button
            onClick={onHide}
            className={`p-1 rounded-md transition-colors ${
              isDark ? "hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300" : "hover:bg-slate-150 text-slate-400 hover:text-slate-700"
            }`}
            title="Hide Test Cases Panel"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Input Field */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-[120px]">
        <label className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-550" : "text-slate-400"}`}>
          Custom Input
        </label>
        <textarea
          value={customInput}
          onChange={(e) => onCustomInputChange(e.target.value)}
          placeholder="Provide program inputs here (e.g. 2 7 11 15\n9)..."
          className={`flex-1 w-full border rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar ${
            isDark ? "bg-zinc-950 border-zinc-855 text-zinc-300" : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        />
      </div>

      {/* Expected Output Field (Optional) */}
      <div className="flex-1 flex flex-col gap-1.5 min-h-[100px]">
        <label className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-550" : "text-slate-400"}`}>
          Expected Output (Optional)
        </label>
        <textarea
          value={expectedOutput}
          onChange={(e) => onExpectedOutputChange(e.target.value)}
          placeholder="What result do you expect? (e.g. 0 1)..."
          className={`flex-1 w-full border rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none custom-scrollbar ${
            isDark ? "bg-zinc-955 border-zinc-855 text-zinc-300" : "bg-slate-50 border-slate-200 text-slate-700"
          }`}
        />
      </div>
    </div>
  );
};

export default CustomInputPane;
