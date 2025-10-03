import { useState, useEffect } from 'react';
import { TIMER_MODES } from '../constants/themes';
import { playNotification } from '../utils/audio';

export const useTimer = () => {
  const [mode, setMode] = useState('WORK');
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.WORK.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      playNotification();
      setIsRunning(false);
      
      // Auto switch mode
      if (mode === 'WORK') {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        const nextMode = newSessions % 4 === 0 ? 'LONG_BREAK' : 'SHORT_BREAK';
        setMode(nextMode);
        setTimeLeft(TIMER_MODES[nextMode].duration);
      } else {
        setMode('WORK');
        setTimeLeft(TIMER_MODES.WORK.duration);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessions]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_MODES[mode].duration);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_MODES[newMode].duration);
    setIsRunning(false);
  };

  return {
    mode,
    timeLeft,
    isRunning,
    sessions,
    toggleTimer,
    resetTimer,
    switchMode
  };
};