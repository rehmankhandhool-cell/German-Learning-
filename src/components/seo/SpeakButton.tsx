import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGerman } from '../../utils/audio';

interface SpeakButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  size = 'sm',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    try {
      setIsPlaying(true);
      await speakGerman(text);
    } finally {
      setIsPlaying(false);
    }
  };

  const sizeClasses = size === 'sm' ? 'w-7 h-7 p-1 text-slate-500 hover:text-red-600' : 'w-9 h-9 p-1.5 text-slate-700 hover:text-red-600';

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
      title={`Listen to German pronunciation: ${text}`}
      aria-label={`Listen to German pronunciation: ${text}`}
      className={`rounded-md hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0 disabled:opacity-50 ${sizeClasses} ${className}`}
    >
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-red-600' : ''}`} />
    </button>
  );
};
