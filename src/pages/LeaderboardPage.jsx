import React, { useState } from 'react';
import { Trophy, Flame, Star, Crown, Search, Users, Sparkles, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';

export const LeaderboardPage = () => {
  const { leaderboard, user } = useGamification();
  const [tab, setTab] = useState('weekly'); // weekly or allTime
  const [cohort, setCohort] = useState('BCA Cohort'); // BCA Cohort, Global, Friends
  const [searchQuery, setSearchQuery] = useState('');

  // Top 3 Podium
  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  const filteredList = leaderboard.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8 max-w-6xl mx-auto">
        {/* Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2e2114] border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Trophy className="w-5 h-5 fill-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Competitive Leaderboard
              </h2>
            </div>
            <p className="text-xs text-[#9d93c4] mt-1">
              Rankings updated live based on tasks completed, active streaks, and total XP.
            </p>
          </div>

          {/* Time & Cohort Selectors */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#140e30] p-1 rounded-xl border border-[#2b2055]">
              <button
                onClick={() => setTab('weekly')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tab === 'weekly' ? 'bg-purple-600 text-white' : 'text-[#8c82ab] hover:text-white'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setTab('allTime')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  tab === 'allTime' ? 'bg-purple-600 text-white' : 'text-[#8c82ab] hover:text-white'
                }`}
              >
                All-Time
              </button>
            </div>

            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="bg-[#140e30] text-xs text-[#c4bcdc] rounded-xl px-3 py-2 border border-[#2b2055] focus:outline-none"
            >
              <option value="BCA Cohort">BCA Final Year</option>
              <option value="Global">Global All Users</option>
              <option value="Friends">Friends Only</option>
            </select>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 items-end pt-4">
          {/* #2 Silver (Left) */}
          {top2 && (
            <div className="prodigy-card rounded-3xl p-6 text-center border-slate-400/30 flex flex-col items-center order-2 md:order-1">
              <span className="text-2xl mb-1">🥈</span>
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-slate-300 to-slate-500 shadow-lg shadow-slate-500/20 mb-2">
                <div className="w-full h-full rounded-full bg-[#1b143a] flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
              </div>
              <h4 className="text-base font-bold text-white">{top2.name}</h4>
              <span className="text-xs text-purple-300">Level {top2.level} • {top2.title}</span>
              <div className="mt-3 px-3 py-1 rounded-full bg-[#110c28] text-xs font-bold text-slate-300">
                {top2.totalXp.toLocaleString()} XP
              </div>
            </div>
          )}

          {/* #1 Gold (Center, Elevated) */}
          {top1 && (
            <div className="prodigy-card rounded-3xl p-8 text-center border-amber-400/50 shadow-xl shadow-amber-500/10 flex flex-col items-center order-1 md:order-2 md:-translate-y-3 bg-gradient-to-b from-[#2a1c42] to-[#150f33]">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold mb-2">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                <span>Rank #1 Champion</span>
              </div>
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-500 shadow-xl shadow-amber-500/30 mb-2">
                <div className="w-full h-full rounded-full bg-[#1b143a] flex items-center justify-center text-3xl">
                  👑
                </div>
              </div>
              <h4 className="text-lg font-black text-white">{top1.name}</h4>
              <span className="text-xs text-amber-300">Level {top1.level} • {top1.title}</span>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-[#251b10] border border-amber-500/40 text-sm font-black text-amber-400">
                {top1.totalXp.toLocaleString()} XP
              </div>
            </div>
          )}

          {/* #3 Bronze (Right) */}
          {top3 && (
            <div className="prodigy-card rounded-3xl p-6 text-center border-amber-800/30 flex flex-col items-center order-3">
              <span className="text-2xl mb-1">🥉</span>
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-600 to-amber-800 shadow-lg shadow-amber-800/20 mb-2">
                <div className="w-full h-full rounded-full bg-[#1b143a] flex items-center justify-center text-2xl">
                  👩‍💻
                </div>
              </div>
              <h4 className="text-base font-bold text-white">{top3.name}</h4>
              <span className="text-xs text-purple-300">Level {top3.level} • {top3.title}</span>
              <div className="mt-3 px-3 py-1 rounded-full bg-[#110c28] text-xs font-bold text-amber-500">
                {top3.totalXp.toLocaleString()} XP
              </div>
            </div>
          )}
        </div>

        {/* Search Bar for Leaderboard */}
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user in leaderboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#120d2b] border border-[#2b2055] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Full Rankings Table */}
        <div className="prodigy-card rounded-3xl overflow-hidden border border-[#2c2057]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#261c47] bg-[#140e30] text-[11px] font-bold text-[#9d93c4] uppercase tracking-wider">
                  <th className="py-3.5 px-6">Rank</th>
                  <th className="py-3.5 px-6">Student / User</th>
                  <th className="py-3.5 px-6">Level & Title</th>
                  <th className="py-3.5 px-6">Tasks</th>
                  <th className="py-3.5 px-6">Streak</th>
                  <th className="py-3.5 px-6 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#221845] text-xs">
                {filteredList.map((entry) => {
                  const isUser = entry.isCurrentUser;
                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isUser
                          ? 'bg-[#25194d]/80 font-bold border-l-4 border-l-purple-500 shadow-inner'
                          : 'hover:bg-[#181138]'
                      }`}
                    >
                      {/* Rank Number & Delta */}
                      <td className="py-4 px-6 font-extrabold text-sm text-white">
                        <div className="flex items-center gap-2">
                          <span>#{entry.rank}</span>
                          {entry.change === 'up' && (
                            <ArrowUp className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                          )}
                          {entry.change === 'down' && (
                            <ArrowDown className="w-3.5 h-3.5 text-red-400 stroke-[3]" />
                          )}
                          {entry.change === 'same' && (
                            <Minus className="w-3.5 h-3.5 text-gray-500" />
                          )}
                        </div>
                      </td>

                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1f1742] border border-[#3b2b73] flex items-center justify-center text-sm">
                            {entry.isCurrentUser ? '🧙‍♂️' : '👤'}
                          </div>
                          <div>
                            <span className={`block font-semibold ${isUser ? 'text-purple-300' : 'text-white'}`}>
                              {entry.name}
                            </span>
                            {isUser && (
                              <span className="text-[10px] text-emerald-400 font-bold">
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Level & Title */}
                      <td className="py-4 px-6">
                        <span className="text-white font-bold">Level {entry.level}</span>
                        <span className="text-[#8c82ab] block text-[11px]">{entry.title}</span>
                      </td>

                      {/* Tasks Completed */}
                      <td className="py-4 px-6 text-white font-medium">
                        {entry.tasks}
                      </td>

                      {/* Streak */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 text-orange-400 font-bold">
                          <Flame className="w-3.5 h-3.5 fill-orange-400" />
                          <span>{entry.streak}d</span>
                        </span>
                      </td>

                      {/* Total XP */}
                      <td className="py-4 px-6 text-right font-black text-sm text-white">
                        {entry.totalXp.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
