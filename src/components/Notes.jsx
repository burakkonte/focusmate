import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';
import { THEMES } from '../constants/themes';

export const Notes = ({ notes, theme }) => {
  const currentTheme = THEMES[theme];
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAdd = () => {
    if (newNote.trim()) {
      notes.addNote(newNote.trim());
      setNewNote('');
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      notes.updateNote(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

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
        Notes
      </h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new note..."
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
        {notes.notes.length === 0 ? (
          <p style={{ 
            color: currentTheme.textSecondary, 
            fontSize: '0.875rem', 
            textAlign: 'center', 
            padding: '2rem' 
          }}>
            No notes yet. Start by adding one!
          </p>
        ) : (
          notes.notes.map(note => (
            <div
              key={note.id}
              style={{
                background: currentTheme.bg,
                padding: '1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${currentTheme.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}
            >
              {editingId === note.id ? (
                <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: currentTheme.surface,
                      color: currentTheme.text,
                      border: `1px solid ${currentTheme.border}`,
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      padding: '0.5rem',
                      background: currentTheme.success,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Check size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <p style={{ 
                    flex: 1, 
                    margin: 0, 
                    color: currentTheme.text, 
                    fontSize: '0.875rem', 
                    wordBreak: 'break-word' 
                  }}>
                    {note.text}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(note)}
                      style={{
                        padding: '0.25rem',
                        background: 'transparent',
                        color: currentTheme.textSecondary,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => notes.deleteNote(note.id)}
                      style={{
                        padding: '0.25rem',
                        background: 'transparent',
                        color: currentTheme.danger,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};