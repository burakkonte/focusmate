import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { THEMES, TIMER_MODES } from '../constants/themes';

export const Timer = ({ timer, theme }) => {
  const currentTheme = THEMES[theme];
  const minutes = Math.floor(timer.timeLeft / 60);
  const seconds = timer.timeLeft % 60;
  const progress = ((TIMER_MODES[timer.mode].duration - timer.timeLeft) / TIMER_MODES[timer.mode].duration) * 100;

  return (
    <div style={{
      background: currentTheme.surface,
      borderRadius: '1rem',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{ 
        marginBottom: '1.5rem', 
        display: 'flex', 
        gap: '0.5rem', 
        justifyContent: 'center', 
        flexWrap: 'wrap' 
      }}>
        {Object.entries(TIMER_MODES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => timer.switchMode(key)}
            style={{
              padding: '0.5rem 1rem',
              background: timer.mode === key ? currentTheme.accent : 'transparent',
              color: timer.mode === key ? '#fff' : currentTheme.textSecondary,
              border: `1px solid ${timer.mode === key ? currentTheme.accent : currentTheme.border}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', margin: '2rem auto', width: '240px', height: '240px' }}>
        <svg width="240" height="240" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke={currentTheme.border}
            strokeWidth="8"
          />
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke={currentTheme.accent}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 110}`}
            strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '3rem',
          fontWeight: '700',
          color: currentTheme.text,
          fontFamily: 'monospace'
        }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={timer.toggleTimer}
          style={{
            padding: '1rem 2rem',
            background: currentTheme.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = currentTheme.accentHover}
          onMouseLeave={(e) => e.currentTarget.style.background = currentTheme.accent}
        >
          {timer.isRunning ? <Pause size={20} /> : <Play size={20} />}
          {timer.isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={timer.resetTimer}
          style={{
            padding: '1rem 2rem',
            background: currentTheme.surface,
            color: currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = currentTheme.surfaceHover}
          onMouseLeave={(e) => e.currentTarget.style.background = currentTheme.surface}
        >
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', color: currentTheme.textSecondary, fontSize: '0.875rem' }}>
        Sessions completed: {timer.sessions}
      </div>
    </div>
  );
};