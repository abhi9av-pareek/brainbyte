import React from "react";
import Editor from "@monaco-editor/react";
import { Play, Send, Maximize2, Minimize2, ZoomIn, ZoomOut, Terminal, ChevronLeft, ChevronRight } from "lucide-react";

const MonacoEditorPane = ({
  code,
  onChange,
  language,
  onLanguageChange,
  fontSize,
  onFontSizeChange,
  isFullScreen,
  onToggleFullScreen,
  onRun,
  onSubmit,
  executing,
  theme,
  isCustomInputOpen,
  onToggleCustomInput
}) => {
  const languages = [
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "Go", value: "go" }
  ];

  const handleEditorChange = (value) => {
    if (onChange) onChange(value);
  };

  const getMonacoLanguage = (lang) => {
    switch (lang) {
      case "cpp": return "cpp";
      case "java": return "java";
      case "python": return "python";
      case "javascript": return "javascript";
      case "go": return "go";
      default: return "cpp";
    }
  };

  const handleZoomIn = () => {
    if (fontSize < 24) onFontSizeChange(fontSize + 1);
  };

  const handleZoomOut = () => {
    if (fontSize > 12) onFontSizeChange(fontSize - 1);
  };

  const isDark = theme === "dark";

  return (
    <div className={`h-full flex flex-col border rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
    }`}>
      
      {/* Top Toolbar */}
      <div className={`flex flex-wrap items-center justify-between px-4 py-3 border-b gap-3 transition-colors ${
        isDark ? "bg-[#252525] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"
      }`}>
        {/* Language Select */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Language</span>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={executing}
            className={`border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 transition-all font-bold ${
              isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-white border-slate-250 text-slate-700 shadow-xs"
            }`}
          >
            {languages.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        {/* Font Controls and Fullscreen Actions */}
        <div className="flex items-center gap-2">
          {/* Font sizing */}
          <div className={`flex items-center border rounded-lg p-0.5 ${
            isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-white border-slate-250 shadow-xs"
          }`}>
            <button
              onClick={handleZoomOut}
              className={`p-1 rounded-md transition-colors ${
                isDark ? "hover:text-indigo-400 text-zinc-400" : "hover:text-indigo-650 text-slate-500"
              }`}
              title="Font Size Down"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-2 font-bold">{fontSize}px</span>
            <button
              onClick={handleZoomIn}
              className={`p-1 rounded-md transition-colors ${
                isDark ? "hover:text-indigo-400 text-zinc-400" : "hover:text-indigo-650 text-slate-500"
              }`}
              title="Font Size Up"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Custom Test Cases Toggle */}
          {!isFullScreen && (
            <button
              onClick={onToggleCustomInput}
              className={`p-1.5 border rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold ${
                isDark 
                  ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-400 hover:text-indigo-400" 
                  : "bg-white border-slate-250 text-slate-600 hover:text-indigo-650 shadow-xs"
              }`}
              title={isCustomInputOpen ? "Hide Test Cases Panel" : "Show Test Cases Panel"}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Test Cases</span>
              {isCustomInputOpen ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
            </button>
          )}

          {/* Full Screen Toggle */}
          <button
            onClick={onToggleFullScreen}
            className={`p-1.5 border rounded-lg transition-all ${
              isDark 
                ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-400 hover:text-indigo-400" 
                : "bg-white border-slate-250 text-slate-550 hover:text-indigo-650 shadow-xs"
            }`}
            title={isFullScreen ? "Minimize Editor" : "Maximize Editor"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          theme={isDark ? "vs-dark" : "light"}
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            automaticLayout: true,
            tabSize: 4,
            scrollBeyondLastLine: false,
            cursorBlinking: "smooth",
            fontFamily: "Fira Code, Source Code Pro, Courier New, monospace",
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            autoIndent: "full",
            lineNumbers: "on",
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
              vertical: "visible",
              horizontal: "visible"
            }
          }}
          loading={
            <div className={`flex items-center justify-center h-full text-xs gap-2 font-mono ${
              isDark ? "text-zinc-500" : "text-slate-400"
            }`}>
              <div className="animate-spin rounded-full h-4.5 w-4.5 border-t-2 border-indigo-500"></div>
              Loading code IDE canvas...
            </div>
          }
        />
      </div>

      {/* Code Controls Footer */}
      <div className={`px-4 py-3 border-t flex justify-end items-center gap-3 transition-colors ${
        isDark ? "bg-[#252525] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"
      }`}>
        <button
          onClick={onRun}
          disabled={executing}
          className={`font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all focus:outline-none disabled:opacity-50 border ${
            isDark 
              ? "bg-[#1a1a1a] hover:bg-[#252525] border-[#2e2e2e] text-zinc-300" 
              : "bg-white hover:bg-slate-100 border-slate-250 text-slate-700 shadow-xs"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current opacity-70" />
          Run Code
        </button>
        <button
          onClick={onSubmit}
          disabled={executing}
          className={`font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md focus:outline-none disabled:opacity-50 ${
            isDark 
              ? "bg-indigo-650 hover:bg-indigo-600 text-white shadow-indigo-950/20" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200/40"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          Submit
        </button>
      </div>

    </div>
  );
};

export default MonacoEditorPane;
