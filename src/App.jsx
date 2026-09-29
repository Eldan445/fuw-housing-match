import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import MatchDashboard from './components/MatchDashboard';

function App() {
  return (
    <Router>
      {/* Ambient Cosmic Orbs */}
      <div className="ambient-background">
          <div className="orb orb-primary"></div>
          <div className="orb orb-secondary"></div>
          <div className="orb orb-accent"></div>
      </div>

      <div className="relative z-10 font-sans">
        <nav className="p-4 flex justify-between items-center max-w-6xl mx-auto">
          <div className="space-x-4">
            <Link to="/" className="text-gray-300 hover:text-accentGold">Register</Link>
            <Link to="/matches" className="text-gray-300 hover:text-accentGold">Dashboard</Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/matches" element={<MatchDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;