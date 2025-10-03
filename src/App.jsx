import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Timer } from './components/Timer';
import { Notes } from './components/Notes';
import { Goals } from './components/Goals';
import { useTheme } from './hooks/useTheme';
import { useTimer } from './hooks/useTimer';
import { useNotes } from './hooks/useNotes';
import { useGoals } from './hooks/useGoals';
import { initAudio } from './utils/audio';
import { THEMES } from './constants/themes';
import './App.css';

function App() {
  const [theme, setTheme] = useTheme();
  const timer = useTimer();
  const notes = useNotes();
  const goals = useGoals();
  const currentTheme = THEMES[theme];

  // Initialize audio on mount
  useEffect(() => {
    initAudio();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg,
      color: currentTheme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      <Header theme={theme} setTheme={setTheme} />

      <main className="app-grid">
        <div>
          <Timer timer={timer} theme={theme} />
        </div>
        <div>
          <Notes notes={notes} theme={theme} />
        </div>
        <div>
          <Goals goals={goals} theme={theme} />
        </div>
      </main>
    </div>
  );
}

export default App;
