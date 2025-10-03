import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { THEMES } from '../constants/themes';

export const Goals = ({ goals, theme }) => {
  const currentTheme = THEMES[theme];
  const [newGoal, setNewGoal] = useState('');

  const handleAdd = () => {
    if (newGoal.trim()) {
      goals.addGoal(newGoal.trim());
      setNewGoal('');
    }
  };

  const completedCount = goals.goals.filter(g => g.completed).length;
  const progress = goals.goals.length > 0 ? (completedCount / goals.goals.length) * 100 : 0;

  return (
    <div style={{
      background: currentTheme.surface,
      borderRadius: '1rem',
      padding: '1.5rem'
    }}>
      <h2 style={{ 
        margin: '0 0 1rem 0', 
        color: currentTheme.text, 
        fontSize: '1.25rem', 
        fontWeight: '600' 
      }}>
        Goals
      </h2>

      {goals.goals.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: currentTheme.textSecondary, fontSize: '0.875rem' }}>
              Progress: {completedCount}/{goals.goals.length}
            </span>
            <span style={{ color: currentTheme.textSecondary, fontSize: '0.875rem' }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: currentTheme.border,
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: currentTheme.success,
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new goal..."
          style={{
            flex: 1,
            padding: '0.75rem',
            background: currentTheme.bg,
            color: currentTheme.text,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            padding: '0.75rem 1rem',
            background: currentTheme.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.5rem', 
        maxHeight: '400px', 
        overflowY: 'auto' 
      }}>
        {goals.goals.length === 0 ? (
          <p style={{ 
            color: currentTheme.textSecondary, 
            fontSize: '0.875rem', 
            textAlign: 'center', 
            padding: '2rem' 
          }}>
            No goals yet. Set your first goal!
          </p>
        ) : (
          goals.goals.map(goal => (
            <div
              key={goal.id}
              style={{
                background: currentTheme.bg,
                padding: '1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${currentTheme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: goal.completed ? 0.6 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <button
                  onClick={() => goals.toggleGoal(goal.id)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: `2px solid ${goal.completed ? currentTheme.success : currentTheme.border}`,
                    background: goal.completed ? currentTheme.success : 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    flexShrink: 0
                  }}
                >
                  {goal.completed && <Check size={12} color="#fff" />}
                </button>
                <p style={{
                  flex: 1,
                  margin: 0,
                  color: currentTheme.text,
                  fontSize: '0.875rem',
                  textDecoration: goal.completed ? 'line-through' : 'none',
                  wordBreak: 'break-word'
                }}>
                  {goal.text}
                </p>
              </div>
              <button
                onClick={() => goals.deleteGoal(goal.id)}
                style={{
                  padding: '0.25rem',
                  background: 'transparent',
                  color: currentTheme.danger,
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};