import React from 'react';
import { Crown, CheckCircle2, Flame, Star } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const StatCards = () => {
  const { user, navigate } = useGamification();

  // Calculate percentage of XP progress for current level
  const progressPercent = Math.min(100, Math.round((user.currentLevelXp / user.nextLevelXp) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-8">
      {/* 1. Level Profile Card */}
      <div 
        onClick={() => navigate('progress')}
        className="prodigy-card prodigy-card-hover rounded-3xl p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

        {/* Circular Anime Avatar with Cyan/Purple Glow Ring */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-full bg-[#1b133d] flex items-center justify-center overflow-hidden">
              <svg className="w-13 h-13" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="22" fill="#21174a" />
                {/* Spiky Dark Hair */}
                <path d="M14 20 C 14 11, 36 11, 36 20 C 39 23, 37 31, 34 32 C 32 23, 18 23, 16 32 C 13 31, 11 23, 14 20 Z" fill="#2e1a53" />
                <path d="M19 12 L 23 7 L 27 12 L 31 8 L 33 14" fill="#3b236b" />
                {/* Face */}
                <circle cx="25" cy="26" r="11" fill="#fde68a" />
                {/* Anime Eyes */}
                <circle cx="21" cy="25.5" r="2" fill="#1e153b" />
                <circle cx="29" cy="25.5" r="2" fill="#1e153b" />
                <circle cx="21.5" cy="25" r="0.7" fill="#ffffff" />
                <circle cx="29.5" cy="25" r="0.7" fill="#ffffff" />
                {/* Smile */}
                <path d="M23 29 Q 25 31.5 27 29" stroke="#1e153b" strokeWidth="1.2" strokeLinecap="round" />
                {/* Blue/Purple Hero Hoodie */}
                <path d="M16 38 C 16 32, 34 32, 34 38 L 37 48 L 13 48 Z" fill="#4f46e5" />
                <path d="M22 34 L 25 39 L 28 34" fill="#fbbf24" />
              </svg>
            </div>
          </div>
        </div>

        {/* Level & XP Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-400 fill-purple-400" />
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Level {user.level}
            </h3>
          </div>
          <p className="text-xs text-[#a39ac4] font-medium mt-0.5">
            {user.title}
          </p>

          {/* Progress Bar & Text */}
          <div className="mt-2.5">
            <div className="w-full bg-[#110d28] h-2 rounded-full overflow-hidden p-[1px]">
              <div 
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500 shadow-sm shadow-purple-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-[11px] text-[#938ba8] font-medium">
                {user.currentLevelXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tasks Completed Card */}
      <div 
        onClick={() => navigate('tasks')}
        className="prodigy-card prodigy-card-hover rounded-3xl p-5 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-13 h-13 rounded-2xl bg-[#162a28] border border-[#1d473d] flex items-center justify-center text-[#22c55e] shadow-md shadow-emerald-950/40">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <span className="text-xs font-medium text-[#9a92be] block">
            Tasks Completed
          </span>
          <div className="text-2xl font-black text-white tracking-tight mt-0.5">
            {user.tasksCompleted}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#22c55e] mt-0.5">
            <span>↑</span>
            <span>{user.tasksCompletedTrend}</span>
          </div>
        </div>
      </div>

      {/* 3. Current Streak Card */}
      <div 
        onClick={() => navigate('achievements')}
        className="prodigy-card prodigy-card-hover rounded-3xl p-5 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-13 h-13 rounded-2xl bg-[#321c1f] border border-[#592b23] flex items-center justify-center text-[#f97316] shadow-md shadow-orange-950/40">
          <Flame className="w-7 h-7 fill-[#f97316]" />
        </div>
        <div>
          <span className="text-xs font-medium text-[#9a92be] block">
            Current Streak
          </span>
          <div className="text-2xl font-black text-white tracking-tight mt-0.5">
            {user.currentStreak} days
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#22c55e] mt-0.5">
            <span>↑</span>
            <span>{user.streakTrend}</span>
          </div>
        </div>
      </div>

      {/* 4. Total XP Card */}
      <div 
        onClick={() => navigate('progress')}
        className="prodigy-card prodigy-card-hover rounded-3xl p-5 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-13 h-13 rounded-2xl bg-[#271746] border border-[#4c2b85] flex items-center justify-center text-[#c084fc] shadow-md shadow-purple-950/40">
          <Star className="w-7 h-7 fill-[#c084fc]" />
        </div>
        <div>
          <span className="text-xs font-medium text-[#9a92be] block">
            Total XP
          </span>
          <div className="text-2xl font-black text-white tracking-tight mt-0.5">
            {user.totalXp.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#22c55e] mt-0.5">
            <span>↑</span>
            <span>+{user.xpWeeklyGain}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
