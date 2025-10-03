let audioInstance = null;

export const initAudio = () => {
  if (!audioInstance) {
    audioInstance = new Audio('/notification.mp3');
  }
  return audioInstance;
};

export const playNotification = () => {
  if (audioInstance) {
    audioInstance.currentTime = 0;
    audioInstance.play().catch(err => {
      console.warn('Audio playback failed:', err);
    });
  }
};