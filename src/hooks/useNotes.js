import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    return storage.get(STORAGE_KEYS.NOTES, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.NOTES, notes);
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [...prev, newNote]);
  };

  const updateNote = (id, text) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, text } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
};