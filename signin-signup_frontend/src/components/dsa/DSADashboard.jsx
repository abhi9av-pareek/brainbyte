import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, Flame, Award, BookOpen, Star, RefreshCw, ChevronRight, ChevronDown, ChevronUp, Sun, Moon, Edit2 } from "lucide-react";
import { CircularProgress, LinearProgress } from "../common/ProgressBar";
import { useTheme } from "../../contexts/ThemeContext";

const DSADashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState({
    solvedCount: 0,
    totalProblems: 50,
    currentStreak: 0,
    totalXP: 0,
    dailyGoal: { target: 2, completed: 0, percentage: 0 },
    topicProgress: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Daily goals editor states
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(2);

  // Topic-wise accordion expand/collapse state (Arrays expanded by default)
  const [expandedTopics, setExpandedTopics] = useState({
    "Arrays": true,
    "Strings": false,
    "Linked List": false,
    "Trees": false,
    "Graphs": false,
    "Dynamic Programming": false
  });

  const toggleTopicExpand = (topicName) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  const handleSaveGoal = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.put(
        `${API_URL}/api/dsa/progress/daily-goal`,
        { target: Number(tempGoal) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setStats((prev) => ({
        ...prev,
        dailyGoal: {
          ...prev.dailyGoal,
          target: res.data.target,
          completed: res.data.completed,
          percentage: res.data.percentage
        }
      }));
      setIsEditingGoal(false);
    } catch (err) {
      console.error("Error saving daily goal:", err);
    }
  };

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const topicsList = [
    "Mathematics",
    "Arrays",
    "Strings",
    "Linked List",
    "Prefix Sum",
    "Sliding Window",
    "Binary Search",
    "Trees",
    "Graphs",
    "Dynamic Programming"
  ];
  const difficultiesList = ["Easy", "Medium", "Hard"];
  const companiesList = ["Google", "Amazon", "Microsoft", "Apple", "Facebook", "Uber"];

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // Fetch Dashboard Stats
      const statsRes = await axios.get(`${API_URL}/api/dsa/progress/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(statsRes.data);

      // Fetch Problems List
      const queryParams = new URLSearchParams();
      if (selectedTopic) queryParams.append("topic", selectedTopic);
      if (selectedDifficulty) queryParams.append("difficulty", selectedDifficulty);
      if (selectedStatus) queryParams.append("status", selectedStatus);
      if (selectedCompany) queryParams.append("company", selectedCompany);
      if (searchTerm) queryParams.append("search", searchTerm);

      const problemsRes = await axios.get(`${API_URL}/api/dsa/problems?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProblems(problemsRes.data.problems);
    } catch (err) {
      console.error("Error loading DSA dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTopic, selectedDifficulty, selectedStatus, selectedCompany]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans p-6 md:p-10 ${
      isDark ? "bg-[#1a1a1a] text-zinc-100" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <button 
            onClick={() => navigate("/dashboard")} 
            className={`text-xs font-semibold mb-2 block transition-colors ${
              isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"
            }`}
          >
            &larr; Back to Main Dashboard
          </button>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${
            isDark 
              ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" 
              : "text-slate-900"
          }`}>
            Gyantraaa DSA Sheet
          </h1>
          <p className={`text-sm mt-1.5 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
            Master approximately 50 curated DSA problems handpicked for top placement interviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark 
                ? "bg-[#1e1e1e] border-[#2e2e2e] text-yellow-400 hover:bg-[#2a2a2a]" 
                : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-100 shadow-sm"
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`p-2.5 rounded-xl border transition-all ${
              isDark 
                ? "bg-[#1e1e1e] border-[#2e2e2e] text-zinc-400 hover:text-zinc-200 hover:bg-[#2a2a2a]" 
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100 shadow-sm"
            }`}
            title="Refresh Progress"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin text-indigo-500" : ""}`} />
          </button>

          {/* Streak Indicator */}
          <div className={`flex items-center gap-2 border rounded-xl px-4 py-2 ${
            isDark 
              ? "bg-indigo-950/20 border-indigo-900/40 text-orange-400" 
              : "bg-indigo-50 border-indigo-100 text-indigo-700 shadow-sm"
          }`}>
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
            <div>
              <div className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? "text-indigo-300" : "text-indigo-500"}`}>Streak</div>
              <div className="text-base font-extrabold">{stats.currentStreak} Days</div>
            </div>
          </div>
        </div>
      </div>

      {loading && problems.length === 0 ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500"></div>
          <span className={`mt-4 text-xs font-mono ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Loading DSA profile details...</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: Metrics and Problems Table */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Questions Solved */}
              <div className={`border rounded-2xl p-5 flex items-center justify-between transition-all ${
                isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg shadow-black/20" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>Solved</div>
                  <div className="text-3xl font-black mt-1">
                    {stats.solvedCount} <span className={`text-base font-normal ${isDark ? "text-zinc-650" : "text-slate-400"}`}>/ {stats.totalProblems}</span>
                  </div>
                  <div className={`text-xs font-bold mt-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                    {stats.totalProblems > 0 ? Math.round((stats.solvedCount / stats.totalProblems) * 100) : 0}% Complete
                  </div>
                </div>
                <CircularProgress 
                  percentage={stats.totalProblems > 0 ? Math.round((stats.solvedCount / stats.totalProblems) * 100) : 0} 
                  size={65} 
                  strokeWidth={6} 
                  colorClass={isDark ? "text-indigo-400" : "text-indigo-600"} 
                />
              </div>

              {/* Total XP */}
              <div className={`border rounded-2xl p-5 flex items-center justify-between transition-all ${
                isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg shadow-black/20" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>Total XP</div>
                  <div className={`text-3xl font-black mt-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>{stats.totalXP}</div>
                  <div className={`text-xs mt-1 ${isDark ? "text-zinc-500" : "text-slate-400"}`}>Points via correct runs</div>
                </div>
                <div className={`p-3 rounded-xl border ${
                  isDark ? "bg-indigo-950/20 border-indigo-900/30 text-indigo-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                }`}>
                  <Award className="w-8 h-8" />
                </div>
              </div>

              {/* Daily Goal */}
              <div className={`border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg shadow-black/20" : "bg-white border-slate-200/80 shadow-sm"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-slate-500"}`}>Daily Goal</span>
                  {isEditingGoal ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(Number(e.target.value))}
                        className={`w-10 text-center text-[10px] font-bold py-0.5 rounded border focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                          isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-purple-400" : "bg-slate-50 border-slate-200 text-purple-600"
                        }`}
                      />
                      <button
                        onClick={handleSaveGoal}
                        className="text-[9px] font-bold text-emerald-500 hover:text-emerald-450 px-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingGoal(false)}
                        className="text-[9px] font-bold text-zinc-500 hover:text-zinc-450 px-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-black ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                        {stats.dailyGoal?.completed || 0} / {stats.dailyGoal?.target || 2}
                      </span>
                      <button
                        onClick={() => {
                          setTempGoal(stats.dailyGoal?.target || 2);
                          setIsEditingGoal(true);
                        }}
                        className={`p-0.5 rounded transition-colors ${
                          isDark ? "text-zinc-500 hover:text-purple-400 hover:bg-zinc-850" : "text-slate-400 hover:text-purple-650 hover:bg-slate-100"
                        }`}
                        title="Edit Daily Goal"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-base font-extrabold mb-2">
                    {stats.dailyGoal?.percentage === 100 ? "Daily Goal Met! 🎉" : "Ready to code?"}
                  </div>
                  <LinearProgress 
                    percentage={stats.dailyGoal?.percentage || 0} 
                    colorClass={isDark ? "bg-purple-500" : "bg-purple-600"} 
                  />
                </div>
              </div>
            </div>

            {/* Filter Panel */}
            <div className={`border rounded-2xl p-5 transition-all ${
              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by problem title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 ${
                      isDark 
                        ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-200 placeholder-zinc-650 focus:border-indigo-500 focus:ring-indigo-900/30" 
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-555 focus:ring-indigo-100"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`font-semibold rounded-xl px-6 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                    isDark 
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-900/40" 
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm focus:ring-indigo-100"
                  }`}
                >
                  Search
                </button>
              </form>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Topic */}
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className={`border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none focus:border-indigo-500 ${
                    isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-white border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  <option value="">All Topics</option>
                  {topicsList.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                {/* Difficulty */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className={`border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none focus:border-indigo-500 ${
                    isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-white border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  <option value="">All Difficulties</option>
                  {difficultiesList.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Status */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className={`border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none focus:border-indigo-500 ${
                    isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-white border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  <option value="">All Statuses</option>
                  <option value="Solved">Solved</option>
                  <option value="Unsolved">Unsolved</option>
                </select>

                {/* Company */}
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className={`border rounded-xl px-3 py-2 text-xs transition-all focus:outline-none focus:border-indigo-500 ${
                    isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-300" : "bg-white border-slate-200 text-slate-700 shadow-xs"
                  }`}
                >
                  <option value="">All Companies</option>
                  {companiesList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problems Catalog Table */}
            <div className={`border rounded-2xl overflow-hidden transition-all ${
              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <div className={`p-5 border-b flex items-center justify-between ${isDark ? "border-[#2e2e2e]" : "border-slate-100"}`}>
                <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  Problems Catalog
                </h3>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-400" : "bg-slate-50 border-slate-205 text-slate-500"
                }`}>
                  Showing {problems.length} problems
                </span>
              </div>
              {problems.length === 0 ? (
                <div className="p-12 text-center text-zinc-500 text-xs font-mono">
                  No problems matched the filter criteria.
                </div>
              ) : (
                <div className="flex flex-col">
                  {topicsList.map((topicName) => {
                    const topicProblems = problems.filter((p) => p.topic === topicName);
                    
                    // Filter check: If user selected a specific topic, only show that topic's accordion
                    if (selectedTopic && selectedTopic !== topicName) return null;
                    
                    const isExpanded = !!expandedTopics[topicName];
                    const topicSolvedCount = topicProblems.filter((p) => p.status === "Solved").length;
                    const totalInTopic = topicProblems.length;
                    
                    // Skip rendering empty accordion sections if other filters (search/difficulty/company) are active and yield 0 results
                    if (topicProblems.length === 0 && (searchTerm || selectedDifficulty || selectedCompany || selectedStatus)) {
                      return null;
                    }

                    return (
                      <div key={topicName} className={`border-b last:border-b-0 ${isDark ? "border-[#2e2e2e]" : "border-slate-100"}`}>
                        {/* Accordion Header bar */}
                        <div
                          onClick={() => toggleTopicExpand(topicName)}
                          className={`flex items-center justify-between px-5 py-4 cursor-pointer select-none transition-all ${
                            isDark 
                              ? "bg-[#1a1a1a]/40 hover:bg-[#252525]/50 text-zinc-200" 
                              : "bg-slate-50 hover:bg-slate-100/60 text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-extrabold text-sm tracking-tight">{topicName}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] text-zinc-400" : "bg-white border-slate-200 text-slate-500"
                            }`}>
                              {topicSolvedCount} / {totalInTopic} Solved
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-zinc-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-zinc-500" />
                            )}
                          </div>
                        </div>

                        {/* Accordion Expanded Content table */}
                        {isExpanded && (
                          <div className="overflow-x-auto w-full">
                            {topicProblems.length === 0 ? (
                              <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                                No problems in this topic match.
                              </div>
                            ) : (
                              <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                  <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                                    isDark ? "border-[#2e2e2e]/60 text-zinc-500 bg-[#1a1a1a]/10" : "border-slate-150 text-slate-400 bg-slate-50/20"
                                  }`}>
                                    <th className="py-3.5 px-5 w-[6%] text-center">#</th>
                                    <th className="py-3.5 px-4 w-[35%]">Title</th>
                                    <th className="py-3.5 px-4 w-[15%]">Difficulty</th>
                                    <th className="py-3.5 px-4 w-[8%] text-center">XP</th>
                                    <th className="py-3.5 px-4 w-[20%]">Companies</th>
                                    <th className="py-3.5 px-5 text-right w-[15%]">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-850/40 text-sm">
                                  {topicProblems.map((prob) => (
                                    <tr
                                      key={prob._id}
                                      onClick={() => navigate(`/dsa/problem/${prob._id}`)}
                                      className={`cursor-pointer transition-all duration-200 group ${
                                        isDark ? "hover:bg-[#252525]/30" : "hover:bg-slate-100/40"
                                      }`}
                                    >
                                      <td className="py-3.5 px-5 text-center font-mono text-xs text-zinc-500">
                                        {prob.problemNumber}
                                      </td>
                                      <td className="py-3.5 px-4 font-bold tracking-tight group-hover:text-indigo-500 transition-colors">
                                        {prob.title}
                                      </td>
                                      <td className="py-3.5 px-4 text-xs">
                                        <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                                          prob.difficulty === "Easy" ? "bg-emerald-950/45 text-emerald-450 border border-emerald-900/50" :
                                          prob.difficulty === "Medium" ? "bg-amber-950/45 text-amber-450 border border-amber-900/50" :
                                          "bg-rose-950/45 text-rose-400 border border-rose-900/50"
                                        }`}>
                                          {prob.difficulty}
                                        </span>
                                      </td>
                                      <td className="py-3.5 px-4 font-mono text-xs text-indigo-500 font-bold text-center">
                                        +{prob.xpReward}
                                      </td>
                                      <td className="py-3.5 px-4">
                                        <div className="flex flex-wrap gap-1 max-w-[170px]">
                                          {prob.companies.slice(0, 2).map((c) => (
                                            <span key={c} className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                                              isDark ? "bg-zinc-950 text-zinc-400 border-zinc-850" : "bg-slate-50 text-slate-650 border-slate-200"
                                            }`}>
                                              {c}
                                            </span>
                                          ))}
                                          {prob.companies.length > 2 && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                              isDark ? "bg-zinc-950 text-zinc-650 border-zinc-850" : "bg-slate-50 text-slate-400 border-slate-200"
                                            }`}>
                                              +{prob.companies.length - 2}
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                      <td className="py-3.5 px-5 text-right text-xs">
                                        <div className="flex items-center justify-end gap-1.5 font-bold">
                                          {prob.status === "Solved" ? (
                                            <span className="text-emerald-500 font-semibold bg-emerald-950/20 border border-emerald-900/30 px-2.5 py-0.5 rounded-full">
                                              Solved
                                            </span>
                                          ) : (
                                            <span className={`font-medium px-2.5 py-0.5 rounded-full border ${
                                              isDark ? "bg-[#1a1a1a] border-[#2e2e2e] text-zinc-500" : "bg-slate-50 border-slate-205 text-slate-400"
                                            }`}>
                                              Unsolved
                                            </span>
                                          )}
                                          <ChevronRight className="w-4 h-4 text-zinc-650 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COL: Topic progress list, bookmarks, recent activity */}
          <div className="flex flex-col gap-6">
            
            {/* Topic Wise Trackers */}
            <div className={`border rounded-2xl p-5 transition-all ${
              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className="font-extrabold text-sm tracking-tight mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-indigo-500" />
                Topic Wise Progress
              </h3>
              <div className="flex flex-col gap-4">
                {topicsList.map((t) => {
                  const stat = stats.topicProgress?.find((tp) => tp.topicName === t) || { solvedCount: 0 };
                  const topicTotals = {
                    "Mathematics": 10,
                    "Arrays": 11,
                    "Strings": 3,
                    "Linked List": 4,
                    "Prefix Sum": 7,
                    "Sliding Window": 7,
                    "Binary Search": 14,
                    "Trees": 24,
                    "Graphs": 14,
                    "Dynamic Programming": 13
                  };
                  const topicTotal = topicTotals[t] || 8;
                  const percentage = Math.min(100, Math.round((stat.solvedCount / topicTotal) * 100));

                  return (
                    <div key={t} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className={`${isDark ? "text-zinc-300" : "text-slate-700"}`}>{t}</span>
                        <span className={`${isDark ? "text-zinc-500" : "text-slate-400"}`}>{stat.solvedCount} / {topicTotal} Solved</span>
                      </div>
                      <LinearProgress percentage={percentage} colorClass={isDark ? "bg-indigo-500" : "bg-indigo-600"} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bookmarked Questions */}
            <div className={`border rounded-2xl p-5 transition-all ${
              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className="font-extrabold text-sm tracking-tight mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500/10" />
                Bookmarks & Notes
              </h3>
              {stats.bookmarks && stats.bookmarks.length === 0 ? (
                <div className="text-xs text-zinc-500 text-center py-4 font-mono">
                  No bookmarks saved.
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                  {stats.bookmarks?.map((b) => (
                    <div
                      key={b._id}
                      onClick={() => navigate(`/dsa/problem/${b.problemId}`)}
                      className={`border rounded-xl p-3 cursor-pointer transition-colors ${
                        isDark ? "bg-[#1a1a1a] border-[#2e2e2e] hover:bg-[#252525]" : "bg-slate-50 border-slate-150 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-xs font-bold leading-tight group-hover:text-indigo-500">
                          #{b.problemNumber}. {b.title}
                        </span>
                        <span className={`text-[10px] font-mono shrink-0 font-bold ${isDark ? "text-zinc-500" : "text-slate-400"}`}>
                          {b.topic}
                        </span>
                      </div>
                      {b.notes && (
                        <p className={`text-[11px] italic mt-1.5 border-l-2 pl-2 leading-relaxed truncate ${
                          isDark ? "text-indigo-400 border-indigo-900" : "text-indigo-600 border-indigo-200"
                        }`}>
                          {b.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity Feed */}
            <div className={`border rounded-2xl p-5 transition-all ${
              isDark ? "bg-[#1e1e1e] border-[#2e2e2e] shadow-lg" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className="font-extrabold text-sm tracking-tight mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Recent Submissions
              </h3>
              {stats.recentActivity && stats.recentActivity.length === 0 ? (
                <div className="text-xs text-zinc-500 text-center py-4 font-mono">
                  No submissions logged.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {stats.recentActivity?.map((a) => (
                    <div key={a._id} className={`flex justify-between items-center border rounded-xl p-2.5 ${
                      isDark ? "bg-[#1a1a1a] border-[#2e2e2e]" : "bg-slate-50 border-slate-150"
                    }`}>
                      <div>
                        <div className="text-xs font-bold">{a.problemTitle}</div>
                        <div className={`text-[9px] font-mono mt-0.5 ${isDark ? "text-zinc-500" : "text-slate-400"}`}>
                          {new Date(a.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        a.status === "Accepted" 
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/40" 
                          : "bg-rose-950/40 text-rose-450 border border-rose-900/40"
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
          
        </div>
      )}
    </div>
  );
};

export default DSADashboard;
