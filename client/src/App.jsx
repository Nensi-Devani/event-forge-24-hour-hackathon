import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import JudgeLayout from "./components/layout/JudgeLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import EventManagement from "./pages/admin/EventManagement";
import Teams from "./pages/admin/Teams";
import ParticipantManagement from "./pages/admin/ParticipantManagement";
import JudgeManagement from "./pages/admin/JudgeManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import Scoring from "./pages/admin/Scoring";
import AdminLeaderboard from "./pages/admin/Leaderboard";
import ScoringOversight from "./pages/admin/ScoringOversight";

// Event Pages
import Home from "./pages/event/Home";
import EventDetails from "./pages/event/EventDetails";
import Leaderboard from "./pages/event/Leaderboard";

// Team Pages
import Directory from "./pages/team/Directory";
import TeamRegistration from "./pages/team/Registration";
import TeamsDirectory from "./pages/team/TeamsDirectory";

// Judge Pages
import JudgeDashboard from "./pages/judge/Dashboard";
import JudgeEvents from "./pages/judge/JudgeEvents";
import JudgeScoring from "./pages/judge/JudgeScoring";

// Auth & User Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public / Event Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/:id/leaderboard" element={<Leaderboard />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/teams" element={<Directory />} />
          <Route path="/teams/register" element={<ProtectedRoute><TeamRegistration /></ProtectedRoute>} />
          <Route path="/teams/register/:eventId" element={<ProtectedRoute><TeamRegistration /></ProtectedRoute>} />

          {/* Judge Routes */}
          <Route path="/judge" element={<ProtectedRoute roles={["judge"]}><JudgeLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<JudgeDashboard />} />
            <Route path="events" element={<JudgeEvents />} />
            <Route path="scoring" element={<JudgeScoring />} />
            <Route path="scoring/:eventId" element={<JudgeScoring />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="teams" element={<Teams />} />
            <Route path="participants" element={<ParticipantManagement />} />
            <Route path="judges" element={<JudgeManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="scoring" element={<Scoring />} />
            <Route path="leaderboard" element={<AdminLeaderboard />} />
            <Route path="reports" element={<ScoringOversight />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
