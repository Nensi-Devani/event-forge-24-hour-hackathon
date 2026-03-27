import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import EventManagement from './pages/admin/EventManagement';
import ParticipantManagement from './pages/admin/ParticipantManagement';
import JudgeManagement from './pages/admin/JudgeManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import Scoring from './pages/admin/Scoring';

// Event Pages
import Home from './pages/event/Home';
import EventDetails from './pages/event/EventDetails';
import Leaderboard from './pages/event/Leaderboard';

// Team Pages
import Directory from './pages/team/Directory';
import Registration from './pages/team/Registration';

// Judge Pages
import JudgeDashboard from './pages/judge/Dashboard';

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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventManagement />} />
        <Route path="/admin/participants" element={<ParticipantManagement />} />
        <Route path="/admin/judges" element={<JudgeManagement />} />
        <Route path="/admin/payments" element={<PaymentManagement />} />
        <Route path="/admin/scoring" element={<Scoring />} />
      </Routes>
    </Router>
  );
}

export default App;
