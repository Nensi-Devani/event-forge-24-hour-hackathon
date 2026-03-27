import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import EventManagement from "./pages/admin/EventManagement";
import ParticipantManagement from "./pages/admin/ParticipantManagement";
import JudgeManagement from "./pages/admin/JudgeManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import Scoring from "./pages/admin/Scoring";
import ScoringOversight from "./pages/admin/ScoringOversight";

// Event Pages
import Home from "./pages/event/Home";
import EventDetails from "./pages/event/EventDetails";
import Leaderboard from "./pages/event/Leaderboard";

// Team Pages
import Directory from "./pages/team/Directory";
import Registration from "./pages/team/Registration";
import TeamsDirectory from "./pages/team/TeamsDirectory";

// Judge Pages
import JudgeDashboard from "./pages/judge/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Event Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events/:id/leaderboard" element={<Leaderboard />} />

        {/* Team Routes */}
        <Route path="/teams" element={<Directory />} />
        <Route path="/register" element={<Registration />} />

        {/* Judge Routes */}
        <Route path="/judge/dashboard" element={<JudgeDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="teams" element={<TeamsDirectory />} />
          <Route path="participants" element={<ParticipantManagement />} />
          <Route path="judges" element={<JudgeManagement />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="scoring" element={<Scoring />} />
          <Route path="reports" element={<ScoringOversight />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
