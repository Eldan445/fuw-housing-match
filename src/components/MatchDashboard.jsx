// src/components/MatchDashboard.jsx
import { useState } from 'react';
import axios from 'axios';

export default function MatchDashboard() {
  const [userId, setUserId] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMatches = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/api/matches/${userId}`);
      setMatches(response.data.topMatches);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 animate-slide-up">
      {/* Search Console */}
      <div className="bg-surfaceBlack p-8 rounded-2xl border border-gray-800 shadow-2xl mb-10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-accentGold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-3xl text-white font-bold mb-2">Algorithm Terminal</h2>
        <p className="text-gray-400 text-sm mb-6">Initialize vector comparison for candidate lifestyle matrices.</p>
        
        <form onSubmit={fetchMatches} className="flex space-x-4 relative z-10">
          <input 
            type="text" 
            placeholder="Input verified User ID" 
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1 p-4 bg-primaryBlack border border-gray-700 rounded-xl text-white focus:outline-none focus:border-accentGold transition-colors shadow-inner" 
            required 
          />
          <button type="submit" disabled={loading} className="bg-accentGold text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? (
              <span className="flex items-center"><span className="animate-spin mr-2 border-2 border-black border-t-transparent rounded-full w-4 h-4"></span> Processing...</span>
            ) : 'Run Engine'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-sm bg-red-900/20 p-3 rounded">{error}</p>}
      </div>

      {/* Results Feed */}
      <div className="space-y-6">
        {matches.map((match, index) => {
          const scorePercent = parseFloat(match.compatibilityScore);
          return (
            <div 
              key={index} 
              className="bg-surfaceBlack p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-center shadow-lg hover:border-accentGold/50 transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="w-full md:w-2/3 mb-4 md:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                    <span className="text-accentGold font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{match.matricNo}</h3>
                    <p className="text-xs text-blue-400 font-medium">Trust Score: {match.trustScore}/100 — Verified Profile</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 pl-13 ml-13">{match.explanation}</p>
              </div>

              <div className="w-full md:w-1/3 text-right">
                <div className="flex justify-between md:justify-end items-end space-x-4 mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold pb-1">Vector Match</span>
                  <span className="text-4xl font-black text-accentGold drop-shadow-md">{match.compatibilityScore}</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-900 rounded-full h-2 mt-2 overflow-hidden border border-gray-800">
                  <div 
                    className="bg-gradient-to-r from-yellow-600 to-accentGold h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '0%', animation: `fillBar 1.5s ease-out ${index * 150 + 300}ms forwards` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Inline styles for dynamic keyframes not supported directly by Tailwind classes */}
      <style>{`
        @keyframes fillBar {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
      `}</style>
      
      {/* Injecting the target width via a global script for the bars */}
      {matches.map((match, index) => (
         <style key={`style-${index}`}>{`
           .bg-gradient-to-r:nth-of-type(${index + 1}) {
              --target-width: ${match.compatibilityScore};
           }
         `}</style>
      ))}
    </div>
  );
}