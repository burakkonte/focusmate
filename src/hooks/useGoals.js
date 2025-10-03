import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

export const useGoals = () => {
  const [goals, setGoals] = useState(() => {
    return storage.get(STORAGE_KEYS.GOALS, []);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.GOALS, goals);
  }, [goals]);

  const addGoal = (text) => {
    const newGoal = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return { goals, addGoal, toggleGoal, deleteGoal };
};