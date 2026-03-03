import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Benefits from './components/Benefits';
import Background from './components/Background';
import FeedbackSidebar from './components/FeedbackSidebar';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const audioRef = useRef(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  useEffect(() => {
    let hasPlayed = false;

    const handleGlobalClick = () => {
      if (hasPlayed) return; // Prevent playing again if already played

      if (!audioRef.current) {
        audioRef.current = new Audio('/advoice.mp3');
      }

      audioRef.current.play()
        .then(() => {
          hasPlayed = true; // Mark as played upon successful play
          window.removeEventListener('click', handleGlobalClick); // Remove listener to prevent future triggers
        })
        .catch(e => console.log('Audio playback failed or was interrupted:', e));
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Track Unique Visitor Session
  useEffect(() => {
    // Only track once per active browser session to avoid artificial inflation
    if (!sessionStorage.getItem('hasVisitedThisSession')) {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      fetch(`${API_URL}/api/visit`, { method: 'POST' })
        .then(res => res.json())
        .then(() => {
          sessionStorage.setItem('hasVisitedThisSession', 'true');
        })
        .catch(err => console.error('Failed to log visit:', err));
    }
  }, []);

  return (
    <>
      <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', paddingTop: '50vh' }}>Loading 3D Experience...</div>}>
        <Background />
      </Suspense>

      <main style={{ position: 'relative', zIndex: 1, overflowX: 'hidden' }}>
        <Hero />
        <Problem />
        <Solution />
        <Benefits />

        <footer style={{ padding: '2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
          © 2026 Oral Microbiome Tech. All rights reserved.
        </footer>
        <FeedbackSidebar />

        {/* Floating View Analytics Button */}
        <motion.button
          onClick={() => setIsAnalyticsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            height: '50px',
            padding: '0 20px',
            borderRadius: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            zIndex: 50,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}
        >
          <LayoutDashboard size={20} color="#8b5cf6" />
          View Analytics
        </motion.button>

        <AnalyticsDashboard isOpen={isAnalyticsOpen} onClose={() => setIsAnalyticsOpen(false)} />
      </main>
    </>
  );
}

export default App;
