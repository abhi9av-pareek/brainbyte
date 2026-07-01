import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2, XCircle, AlertTriangle, ChevronDown, ChevronUp, Maximize2, Minimize2 } from "lucide-react";

const OutputConsole = ({ result, executing, type, theme, consoleState, setConsoleState }) => {
  const isDark = theme === "dark";
  const isCollapsed = consoleState === "collapsed";
  const isMaximized = consoleState === "maximized";

  const [activeCaseTab, setActiveCaseTab] = useState(0);

  // Reset tab selection when new run result is received
  useEffect(() => {
    if (result) {
      setActiveCaseTab(0);
    }
  }, [result]);

  // Header Action controls
  const handleToggleMinimize = (e) => {
    e.stopPropagation();
    if (isCollapsed) {
      setConsoleState("normal");
    } else {
      setConsoleState("collapsed");
    }
  };

  const handleToggleMaximize = (e) => {
    e.stopPropagation();
    if (isMaximized) {
      setConsoleState("normal");
    } else {
      setConsoleState("maximized");
    }
  };

  const testCases = result?.testCasesResults || [];
  const customCase = result?.customResult;
  const isCompilationError = result?.errorType === "Compilation Error" || 
                             result?.status === "Compilation Error" ||
                             (result && !result.success && !result.testCasesResults && result.status !== "Accepted" && result.status !== "Wrong Answer");

  return (
    <div className={`h-full border rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${
      isDark ? "bg-[#1e1e1e] border-[#2e2e2e]" : "bg-white border-slate-200 shadow-sm"
    }`}>
      
      {/* Console Header (Always visible) */}
      <div 
        onClick={handleToggleMinimize}
        className={`flex justify-between items-center px-5 py-3 border-b cursor-pointer select-none transition-colors ${
          isDark ? "border-[#2e2e2e] hover:bg-[#252525]/40" : "border-slate-150 hover:bg-slate-50"
        }`}
      >
        <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          isDark ? "text-zinc-400" : "text-slate-650"
        }`}>
          <Terminal className="w-3.5 h-3.5 text-indigo-500" />
          Console Output
        </h3>

        <div className="flex items-center gap-4">
          {result && !isCollapsed && (
            <div className={`flex items-center gap-3 text-[11px] font-mono ${isDark ? "text-zinc-550" : "text-slate-400"}`}>
              {(result.runtime !== undefined || result.time !== undefined) && (
                <span>Time: {result.runtime || result.time || 0} ms</span>
              )}
              {result.memory !== undefined && <span>Memory: {result.memory} KB</span>}
            </div>
          )}
          
          {/* Sizing Toggles */}
          <div className="flex items-center gap-1.5">
            {/* Maximize / Restore */}
            <button
              onClick={handleToggleMaximize}
              className={`p-1 rounded-md transition-colors ${
                isDark ? "hover:bg-[#252525] text-zinc-500 hover:text-zinc-350" : "hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              }`}
              title={isMaximized ? "Restore Console" : "Maximize Console"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Collapse / Expand */}
            <button
              onClick={handleToggleMinimize}
              className={`p-1 rounded-md transition-colors ${
                isDark ? "hover:bg-[#252525] text-zinc-500 hover:text-zinc-350" : "hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              }`}
              title={isCollapsed ? "Expand Console" : "Collapse Console"}
            >
              {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Console Content scrollable pane (hidden when collapsed) */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
          {executing ? (
            <div className={`flex items-center justify-center py-10 text-xs gap-2 font-mono ${
              isDark ? "text-zinc-500" : "text-slate-400"
            }`}>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-indigo-500"></div>
              Compiling and executing code in sandbox...
            </div>
          ) : !result && !type ? (
            <div className={`text-xs font-mono py-10 text-center ${
              isDark ? "text-zinc-600" : "text-slate-400"
            }`}>
              &gt; Ready. Run or submit your code to see compiler feedback logs.
            </div>
          ) : isCompilationError ? (
            /* Compile Error Panel */
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold bg-rose-950/20 border-rose-900/35 text-rose-500">
                <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>Compilation Error</span>
              </div>
              <div className={`border rounded-xl p-3 flex flex-col gap-1.5 font-mono text-xs ${
                isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"
              }`}>
                <span className="text-rose-500 font-bold uppercase text-[9px]">Error Detail</span>
                <pre className="text-rose-650 whitespace-pre-wrap leading-relaxed">
                  {result.failedTestCase?.userOutput || result.errorMessage || "Compilation failed."}
                </pre>
              </div>
            </div>
          ) : type === "run" ? (
            /* Run Code Testcases Tabbed Layout */
            <div className="flex flex-col gap-4 flex-1">
              
              {/* Test Cases Tabs Header */}
              <div className="flex flex-wrap gap-2 border-b border-[#2e2e2e] pb-2">
                {testCases.map((tc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCaseTab(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      activeCaseTab === idx
                        ? isDark ? "bg-[#252525] border-[#333333] text-indigo-400" : "bg-slate-100 border-slate-300 text-indigo-650 font-bold shadow-xs"
                        : isDark ? "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300" : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${tc.success ? "bg-emerald-500" : "bg-rose-500"}`} />
                    Case {idx + 1}
                  </button>
                ))}
                {customCase && (
                  <button
                    onClick={() => setActiveCaseTab(testCases.length)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      activeCaseTab === testCases.length
                        ? isDark ? "bg-[#252525] border-[#333333] text-indigo-400" : "bg-slate-100 border-slate-300 text-indigo-650 font-bold shadow-xs"
                        : isDark ? "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300" : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${customCase.success ? "bg-emerald-500" : "bg-rose-500"}`} />
                    Custom Case
                  </button>
                )}
              </div>

              {/* Active Tab Contents */}
              {activeCaseTab < testCases.length ? (
                /* Selected Public Case */
                (() => {
                  const tc = testCases[activeCaseTab];
                  return (
                    <div className="flex flex-col gap-3 text-xs font-mono">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit font-bold ${
                        tc.success ? "bg-emerald-950/20 border-emerald-900/35 text-emerald-500" : "bg-rose-950/20 border-rose-900/35 text-rose-500"
                      }`}>
                        {tc.success ? "Passed" : "Wrong Answer"}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className={`border p-3 rounded-xl flex flex-col gap-1.5 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                          <span className="text-zinc-500 text-[9px] uppercase font-bold">Input</span>
                          <pre className={isDark ? "text-zinc-300" : "text-slate-750"}>{tc.input}</pre>
                        </div>
                        <div className={`border p-3 rounded-xl flex flex-col gap-1.5 border-l-2 border-emerald-500 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                          <span className="text-emerald-500 text-[9px] uppercase font-bold">Expected Output</span>
                          <pre className="text-emerald-600 font-semibold">{tc.expectedOutput}</pre>
                        </div>
                        <div className={`border p-3 rounded-xl flex flex-col gap-1.5 border-l-2 ${tc.success ? "border-emerald-500" : "border-rose-500"} ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]/60" : "bg-slate-50 border-slate-200"}`}>
                          <span className={`${tc.success ? "text-emerald-500" : "text-rose-500"} text-[9px] uppercase font-bold`}>Your Output</span>
                          <pre className={`${tc.success ? "text-emerald-600" : "text-rose-600"} font-semibold`}>
                            {tc.stdout.trim() || "(empty)"}
                          </pre>
                        </div>
                      </div>

                      {tc.stderr && (
                        <div className={`border rounded-xl p-3 flex flex-col gap-1.5 border-l-2 border-rose-500 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                          <span className="text-rose-500 font-bold uppercase text-[9px]">Runtime Error / Stderr</span>
                          <pre className="text-rose-600 whitespace-pre-wrap leading-relaxed">{tc.stderr}</pre>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                /* Selected Custom Input Case */
                customCase && (
                  <div className="flex flex-col gap-3 text-xs font-mono">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit font-bold ${
                      customCase.success ? "bg-emerald-950/20 border-emerald-900/35 text-emerald-500" : "bg-rose-950/20 border-rose-900/35 text-rose-500"
                    }`}>
                      {customCase.success ? "Passed" : "Wrong Answer / Error"}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className={`border p-3 rounded-xl flex flex-col gap-1.5 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                        <span className="text-zinc-500 text-[9px] uppercase font-bold">Input</span>
                        <pre className={isDark ? "text-zinc-300" : "text-slate-750"}>{customCase.input}</pre>
                      </div>
                      <div className={`border p-3 rounded-xl flex flex-col gap-1.5 border-l-2 ${customCase.success ? "border-emerald-500" : "border-rose-500"} ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]/60" : "bg-slate-50 border-slate-200"}`}>
                        <span className={`${customCase.success ? "text-emerald-500" : "text-rose-500"} text-[9px] uppercase font-bold`}>Your Output</span>
                        <pre className={`${customCase.success ? "text-emerald-600" : "text-rose-600"} font-semibold`}>
                          {customCase.stdout.trim() || "(empty)"}
                        </pre>
                      </div>
                    </div>

                    {customCase.stderr && (
                      <div className={`border rounded-xl p-3 flex flex-col gap-1.5 border-l-2 border-rose-500 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                        <span className="text-rose-500 font-bold uppercase text-[9px]">Runtime Error / Stderr</span>
                        <pre className="text-rose-600 whitespace-pre-wrap leading-relaxed">{customCase.stderr}</pre>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            /* Submit Solutions Layout (checks all hidden test cases) */
            <>
              {/* Status Badge */}
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold ${
                result.status === "Accepted"
                  ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-500"
                  : result.status === "Wrong Answer"
                    ? "bg-amber-950/20 border-amber-900/35 text-amber-500"
                    : "bg-rose-950/20 border-rose-900/35 text-rose-500"
              }`}>
                {result.status === "Accepted" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                ) : result.status === "Wrong Answer" ? (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                )}
                <div>
                  <span>{result.status}</span>
                  {result.passedCount !== undefined && (
                    <span className={`font-medium ml-2 font-mono ${isDark ? "text-zinc-500" : "text-slate-400"}`}>
                      (Passed {result.passedCount} / {result.totalCount} Test Cases)
                    </span>
                  )}
                </div>
              </div>

              {/* Failed Test Case Debug Details */}
              {result.failedTestCase && (
                <div className="flex flex-col gap-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                    isDark ? "text-zinc-400" : "text-slate-505"
                  }`}>
                    {result.status === "Wrong Answer" ? "Failing Test Case Case" : "Runtime Exception Case"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                    <div className={`border p-3 rounded-xl flex flex-col gap-1.5 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                      <span className="text-zinc-500 text-[9px] uppercase font-bold">Input</span>
                      <pre className={isDark ? "text-zinc-300" : "text-slate-750"}>{result.failedTestCase.input}</pre>
                    </div>
                    <div className={`border p-3 rounded-xl flex flex-col gap-1.5 border-l-2 border-emerald-500 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-200"}`}>
                      <span className="text-emerald-500 text-[9px] uppercase font-bold">Expected Output</span>
                      <pre className="text-emerald-600 font-semibold">{result.failedTestCase.expectedOutput}</pre>
                    </div>
                    <div className={`border p-3 rounded-xl flex flex-col gap-1.5 border-l-2 border-rose-500 ${isDark ? "bg-[#1a1a1a] border-[#2e2e2e]/60" : "bg-slate-50 border-slate-200"}`}>
                      <span className="text-rose-500 text-[9px] uppercase font-bold">Your Output</span>
                      <pre className="text-rose-600 font-semibold">{result.failedTestCase.userOutput}</pre>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default OutputConsole;
