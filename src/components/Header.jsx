import React from 'react';
import { THEMES } from '../constants/themes';

export const Header = ({ theme, setTheme }) => {
  const currentTheme = THEMES[theme];

  return (
    <header style={{
      padding: '1.5rem 2rem',
      borderBottom: `1px solid ${currentTheme.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: currentTheme.text,
        margin: 0
      }}>
        FocusMate
      </h1>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.entries(THEMES).map(([key, t]) => {
          const Icon = t.icon;
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              style={{
                padding: '0.5rem 1rem',
                background: theme === key ? currentTheme.accent : currentTheme.surface,
                color: theme === key ? '#fff' : currentTheme.text,
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (theme !== key) e.currentTarget.style.background = currentTheme.surfaceHover;
              }}
              onMouseLeave={(e) => {
                if (theme !== key) e.currentTarget.style.background = currentTheme.surface;
              }}
            >
              <Icon size={16} />
              {t.name}
            </button>
          );
        })}
      </div>
    </header>
  );
};