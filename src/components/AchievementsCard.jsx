import React from 'react';
import { Star, ArrowRight, Trophy, Calendar, Rocket, Lock } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const AchievementsCard = () => {
  const { achievements, navigate } = useGamification();

  // Find the 4 main badges to display on Dashboard matching the mockup
  const taskMaster = achievements.find((a) => a.id === 'ach-taskmaster') || achievements[0];
  const streakHero = achievements.find((a) => a.id === 'ach-streakhero') || achievements[1];
  const levelUp = achievements.find((a) => a.id === 'ach-levelup') || achievements[2];
  const focusGuru = achievements.find((a) => a.id === 'ach-focusguru') || achievements[3];

  const badges = [taskMaster, streakHero, levelUp, focusGuru];

  return (
    <div className="prodigy-card rounded-3xl p-6 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2b2413] border border-[#52441f] flex items-center justify-center text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Achievements
          </h2>
        </div>

        <button
          onClick={() => navigate('achievements')}
          className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto">
        {/* 1. Task Master */}
        <div
          onClick={() => navigate('achievements')}
          className="bg-[#171233] hover:bg-[#1f1747] border border-[#2b2055] hover:border-amber-500/40 rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#2b2110] to-[#1c1408] border border-[#6b501f] flex items-center justify-center shadow-lg shadow-amber-950/40 mb-2 transform group-hover:scale-105 transition-transform">
            <Trophy className="w-7 h-7 text-amber-400 fill-amber-400 drop-shadow" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            Task Master
          </span>
          <span className="text-[10px] text-[#938aa8] mt-0.5">
            Complete 50 tasks
          </span>
        </div>

        {/* 2. Streak Hero */}
        <div
          onClick={() => navigate('achievements')}
          className="bg-[#171233] hover:bg-[#1f1747] border border-[#2b2055] hover:border-orange-500/40 rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#331c10] to-[#211108] border border-[#783e1c] flex items-center justify-center shadow-lg shadow-orange-950/40 mb-2 transform group-hover:scale-105 transition-transform">
            <Calendar className="w-7 h-7 text-orange-400 fill-orange-400/20" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            Streak Hero
          </span>
          <span className="text-[10px] text-[#938aa8] mt-0.5">
            7-day streak
          </span>
        </div>

        {/* 3. Level Up */}
        <div
          onClick={() => navigate('achievements')}
          className="bg-[#171233] hover:bg-[#1f1747] border border-[#2b2055] hover:border-blue-500/40 rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#10233b] to-[#091524] border border-[#1d4c82] flex items-center justify-center shadow-lg shadow-blue-950/40 mb-2 transform group-hover:scale-105 transition-transform">
            <Rocket className="w-7 h-7 text-blue-400 fill-blue-400 drop-shadow" />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            Level Up
          </span>
          <span className="text-[10px] text-[#938aa8] mt-0.5">
            Reach Level 10
          </span>
        </div>

        {/* 4. Focus Guru (Locked) */}
        <div
          onClick={() => navigate('achievements')}
          className="bg-[#150f2f] hover:bg-[#1a133b] border border-[#241a47] rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all group opacity-75 hover:opacity-100"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#1b1733] border border-[#302852] flex items-center justify-center shadow-inner mb-2 transform group-hover:scale-105 transition-transform">
            <Lock className="w-6 h-6 text-[#776f8e]" />
          </div>
          <span className="text-xs font-bold text-[#b5adc9] tracking-tight">
            Focus Guru
          </span>
          <span className="text-[10px] text-[#776f8e] mt-0.5">
            (Reach 100 tasks)
          </span>
        </div>
      </div>
    </div>
  );
};
