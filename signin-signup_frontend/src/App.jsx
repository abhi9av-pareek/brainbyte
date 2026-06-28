import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import LoginModern from "./components/LoginModern";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import QuizSetup from "./components/QuizSetup";
import Quiz from "./components/Quiz";
import ResultsHistory from "./components/ResultsHistory";
import Results from "./components/Results";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import GyantraLanding from "./components/GyantraLanding";
import GyantraBlog from "./components/GyantraBlog";
import Bookmarks from "./components/Bookmarks";
import GyanS from "./components/GyanS";
import DSADashboard from "./components/dsa/DSADashboard";
import CodeWorkspace from "./components/dsa/CodeWorkspace";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing page is the entry point */}
          <Route path="/"          element={<GyantraLanding />} />
          <Route path="/landing"   element={<GyantraLanding />} />
          <Route path="/blog"      element={<GyantraBlog />} />
          <Route path="/login"     element={<LoginModern />} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/QuizSetup" element={<QuizSetup />} />
          <Route path="/quiz"      element={<Quiz />} />
          <Route path="/results"   element={<Results />} />
          <Route path="/results/history" element={<ResultsHistory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile"   element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/gyans"      element={<GyanS />} />
          <Route path="/dsa"       element={<DSADashboard />} />
          <Route path="/dsa/problem/:problemId" element={<CodeWorkspace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

