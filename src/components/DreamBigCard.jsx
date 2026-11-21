import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const DreamBigCard = () => {
  const { navigate } = useGamification();

  return (
    <div className="prodigy-card rounded-3xl p-6 flex flex-col items-center justify-center text-center h-full relative overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Dartboard / Target with Arrows Icon matching mockup */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 via-rose-500 to-amber-400 p-[2px] shadow-lg shadow-orange-500/25 mb-3 flex-shrink-0 animate-pulse-slow">
        <div className="w-full h-full rounded-full bg-[#1b1236] flex items-center justify-center">
          <svg className="w-10 h-10" viewBox="0 0 36 36" fill="none">
            {/* Target Outer Ring */}
            <circle cx="18" cy="18" r="14" stroke="#f97316" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="9.5" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="18" cy="18" r="5" fill="#ef4444" />
            {/* Bullseye Gold */}
            <circle cx="18" cy="18" r="2.5" fill="#facc15" />
            {/* Arrow Hits */}
            <line x1="26" y1="10" x2="19" y2="17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <polygon points="26,10 24,7 28,8" fill="#f59e0b" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h3 className="text-base font-extrabold text-white tracking-tight leading-snug max-w-[180px]">
        Dream Big, Get Things Done!
      </h3>

      {/* Button: Keep Going -> */}
      <button
        onClick={() => navigate('tasks')}
        className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 group transform hover:scale-105"
      >
        <span>Keep Going</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
