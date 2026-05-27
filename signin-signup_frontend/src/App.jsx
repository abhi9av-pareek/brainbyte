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

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginModern />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/QuizSetup" element={<QuizSetup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/results/history" element={<ResultsHistory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
