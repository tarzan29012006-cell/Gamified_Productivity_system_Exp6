import React from 'react';
import { Crown, Sparkles, Star, Zap, Award, CheckCircle2, Flame, ArrowUpRight } from 'lucide-react';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';

export const ProgressPage = () => {
  const { user, navigate } = useGamification();

  const progressPercent = Math.min(100, Math.round((user.currentLevelXp / user.nextLevelXp) * 100));

  const tiers = [
    {
      range: 'Levels 1 - 4',
      title: 'Beginner',
      unlocks: 'Default avatar, basic task tracking, dark purple theme',
      minLevel: 1,
      maxLevel: 4,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      range: 'Levels 5 - 9',
      title: 'Achiever',
      unlocks: 'Bronze & Silver avatar frames, priority filter quests',
      minLevel: 5,
      maxLevel: 9,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      range: 'Levels 10 - 14',
      title: 'Productivity Pro',
      unlocks: 'Amethyst frame, "Productivity Pro" title, Premium Badge progress',
      minLevel: 10,
      maxLevel: 14,
      color: 'from-purple-600 to-indigo-600',
      current: true,
    },
    {
      range: 'Levels 15 - 24',
      title: 'Expert',
      unlocks: 'Prestige purple themes, custom daily quotas, multiplier bonuses',
      minLevel: 15,
      maxLevel: 24,
      color: 'from-pink-600 to-rose-600',
    },
    {
      range: 'Levels 25+',
      title: 'Master',
      unlocks: 'Legendary Gold profile frame, Hall of Fame leaderboard entry',
      minLevel: 25,
      maxLevel: 99,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const recentXpLog = [
    { source: 'Completed: Read Cybersecurity Notes', xp: '+50 XP', time: '11:30 AM Today', type: 'task' },
    { source: 'Milestone: 7-Day Streak Achieved', xp: '+50 XP', time: '09:00 AM Today', type: 'streak' },
    { source: 'Achievement Unlocked: Streak Hero', xp: '+100 XP', time: '09:00 AM Today', type: 'achievement' },
    { source: 'Completed: Implement JWT Authentication', xp: '+50 XP', time: 'Yesterday', type: 'task' },
    { source: 'Completed: Solve LeetCode DP Problems', xp: '+25 XP', time: 'Yesterday', type: 'task' },
    { source: 'Completed: Design MySQL ER Diagram', xp: '+25 XP', time: '2 days ago', type: 'task' },
  ];

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8 max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2b1b4d] border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              XP and Level Progression
            </h2>
          </div>
          <p className="text-xs text-[#9d93c4] mt-1">
            Detailed breakdown of your XP earnings, tier status, and upcoming unlock milestones.
          </p>
        </div>

        {/* Hero Current Level Card */}
        <div className="prodigy-card rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar with Big Glowing Ring */}
            <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-xl shadow-purple-600/30 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-[#171033] flex items-center justify-center text-4xl">
                🧙‍♂️
              </div>
            </div>

            {/* Level Information */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold mb-2">
                <Crown className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                <span>Tier 3: {user.title}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white">
                Level {user.level}
              </h3>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-[#a99fc9] mb-1.5 font-medium">
                  <span>Progress to Level {user.level + 1}</span>
                  <span className="font-bold text-white">
                    {user.currentLevelXp.toLocaleString()} / {user.nextLevelXp.toLocaleString()} XP ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full bg-[#100b26] h-3.5 rounded-full overflow-hidden p-[2px]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 shadow-md shadow-purple-500/40 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-xs">
                <div>
                  <span className="text-[#8c82ab] block">Total XP Bank:</span>
                  <span className="text-lg font-black text-white">{user.totalXp.toLocaleString()} XP</span>
                </div>
                <div>
                  <span className="text-[#8c82ab] block">XP to Next Level:</span>
                  <span className="text-lg font-black text-purple-300">
                    {(user.nextLevelXp - user.currentLevelXp).toLocaleString()} XP
                  </span>
                </div>
                <div>
                  <span className="text-[#8c82ab] block">Tasks Completed:</span>
                  <span className="text-lg font-black text-emerald-400">{user.tasksCompleted}</span>
                </div>
                <div>
                  <span className="text-[#8c82ab] block">Current Streak:</span>
                  <span className="text-lg font-black text-orange-400">{user.currentStreak} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progression Ladder (Tiers) */}
        <div className="mb-8">
          <h3 className="text-lg font-extrabold text-white mb-4">
            Level Progression Tiers & Perks
          </h3>

          <div className="space-y-3">
            {tiers.map((tier, idx) => {
              const isCurrentTier = user.level >= tier.minLevel && user.level <= tier.maxLevel;
              const isUnlocked = user.level >= tier.minLevel;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isCurrentTier
                      ? 'bg-[#22184d] border-purple-500 shadow-lg shadow-purple-900/30 ring-1 ring-purple-500/50'
                      : isUnlocked
                      ? 'bg-[#150f33] border-[#2c2057] opacity-90'
                      : 'bg-[#110c28] border-[#201842] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tier.color} flex items-center justify-center text-white font-black text-sm shadow-md`}
                    >
                      {tier.minLevel}+
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{tier.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#100c28] text-purple-300 border border-[#2f235b]">
                          {tier.range}
                        </span>
                        {isCurrentTier && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                            Current Rank
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#a59bc8] mt-1">{tier.unlocks}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs font-bold ${isUnlocked ? 'text-purple-300' : 'text-gray-500'}`}>
                      {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* XP Rules & Math Engine Card (SRS 4.1 & 4.2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="prodigy-card rounded-3xl p-6">
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Standard XP Rules (SRS Section 4.1)</span>
            </h4>
            <div className="space-y-2 text-xs text-[#b3a8d4]">
              <div className="flex justify-between py-1.5 border-b border-[#251c4a]">
                <span>Low Priority Task</span>
                <span className="font-bold text-white">10 XP</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#251c4a]">
                <span>Medium Priority Task</span>
                <span className="font-bold text-white">25 XP</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#251c4a]">
                <span>High Priority Task</span>
                <span className="font-bold text-white">50 XP</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#251c4a]">
                <span>On-Time Completion Bonus</span>
                <span className="font-bold text-emerald-400">+5 XP</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#251c4a]">
                <span>Late Penalty</span>
                <span className="font-bold text-amber-400">Half of base XP</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Streak Milestone (7, 14, 30 days)</span>
                <span className="font-bold text-orange-400">+50, +100, +250 XP</span>
              </div>
            </div>
          </div>

          <div className="prodigy-card rounded-3xl p-6">
            <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Level Threshold Math (SRS Section 4.2)</span>
            </h4>
            <p className="text-xs text-[#a99fc9] leading-relaxed mb-4">
              XP required to advance from Level n to Level n+1:
            </p>
            <div className="p-3 rounded-2xl bg-[#120d2a] border border-[#2b2055] font-mono text-xs text-purple-300 mb-3">
              • Levels 1 to 9: 100 × n XP<br />
              • Level 10 and above: Flat 1,000 XP
            </div>
            <p className="text-[11px] text-[#867ba6] leading-relaxed">
              At Level 12, each promotion requires exactly 1,000 XP. Completing High Priority tasks with on-time bonuses grants 55 XP each (advancing ~5.5% per task).
            </p>
          </div>
        </div>

        {/* Recent XP Activity Log */}
        <div className="prodigy-card rounded-3xl p-6">
          <h4 className="text-base font-bold text-white mb-4">
            Recent XP Activity Log
          </h4>
          <div className="space-y-2.5">
            {recentXpLog.map((log, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-[#120d2b] border border-[#261c47] text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-white font-medium">{log.source}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-[#867ba6]">{log.time}</span>
                  <span className="font-extrabold text-emerald-400">{log.xp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
