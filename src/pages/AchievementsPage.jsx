import React, { useState } from 'react';
import { Trophy, Star, Award, Lock, CheckCircle2, Gift, Sparkles, Shield, Palette } from 'lucide-react';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';

export const AchievementsPage = () => {
  const { achievements, rewards, user, setUser } = useGamification();
  const [activeTab, setActiveTab] = useState('badges'); // badges or rewards
  const [filter, setFilter] = useState('all'); // all, unlocked, locked

  const filteredAchievements = achievements.filter((ach) => {
    if (filter === 'unlocked') return ach.unlocked;
    if (filter === 'locked') return !ach.unlocked;
    return true;
  });

  const handleEquipTitle = (title) => {
    setUser({ ...user, title, equippedTitle: title });
  };

  const handleEquipFrame = (frame) => {
    setUser({ ...user, equippedFrame: frame });
  };

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8 max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2e2114] border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Achievements & Rewards
              </h2>
            </div>
            <p className="text-xs text-[#9d93c4] mt-1">
              Unlock rare badges, claim bonus XP, and equip exclusive cosmetic frames and titles.
            </p>
          </div>

          {/* Tab Switcher: Badges vs Cosmetics */}
          <div className="flex items-center gap-1.5 bg-[#140e30] p-1.5 rounded-2xl border border-[#2b2055]">
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'badges'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-[#8c82ab] hover:text-white'
              }`}
            >
              Achievements ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rewards'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-[#8c82ab] hover:text-white'
              }`}
            >
              Rewards & Cosmetics
            </button>
          </div>
        </div>

        {activeTab === 'badges' ? (
          <>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 mb-6">
              {['all', 'unlocked', 'locked'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                    filter === f
                      ? 'bg-[#291e57] text-purple-300 border border-purple-500/40'
                      : 'bg-[#140e30] text-[#867ba6] hover:text-white border border-[#241a47]'
                  }`}
                >
                  {f} Badges
                </button>
              ))}
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAchievements.map((ach) => {
                const isUnlocked = ach.unlocked;
                const progressPercent = Math.min(
                  100,
                  Math.round(((ach.progress || 0) / (ach.maxProgress || 1)) * 100)
                );

                return (
                  <div
                    key={ach.id}
                    className={`prodigy-card rounded-3xl p-6 flex flex-col justify-between transition-all border ${
                      isUnlocked
                        ? 'border-[#3f2f70] hover:border-amber-400/50'
                        : 'border-[#221845] opacity-75'
                    }`}
                  >
                    <div>
                      {/* Top icon & status */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
                            isUnlocked
                              ? 'bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 text-yellow-950 shadow-amber-500/20'
                              : 'bg-[#181236] border border-[#2c2057] text-gray-500'
                          }`}
                        >
                          {isUnlocked ? (
                            ach.iconType === 'trophy' ? '🏆' :
                            ach.iconType === 'calendar-flame' ? '🔥' :
                            ach.iconType === 'rocket' ? '🚀' :
                            ach.iconType === 'footstep' ? '👟' : '👑'
                          ) : (
                            <Lock className="w-6 h-6 text-[#726a8c]" />
                          )}
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isUnlocked
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                              : 'bg-[#191238] text-gray-400 border border-[#2a1f52]'
                          }`}
                        >
                          {isUnlocked ? 'Unlocked' : 'Locked'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">{ach.title}</h3>
                      <p className="text-xs text-[#9d93c4] mt-1 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>

                    {/* Progress Bar & Bonus Reward */}
                    <div className="mt-5 pt-3 border-t border-[#23194a]">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[11px] text-[#867ba6]">Condition Progress:</span>
                        <span className="font-bold text-white text-xs">
                          {ach.progress || 0} / {ach.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-[#100c28] h-2 rounded-full overflow-hidden p-[1px]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : 'bg-gradient-to-r from-purple-600 to-indigo-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="text-amber-400 font-extrabold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>+{ach.bonusXp} XP</span>
                        </span>
                        {isUnlocked && (
                          <span className="text-[11px] text-gray-400">
                            Earned {ach.unlockedDate || 'Recently'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Rewards & Cosmetics Tab (SRS 4.5) */
          <div className="space-y-6">
            {/* Next Reward Progress Feature */}
            <div className="prodigy-card rounded-3xl p-6 bg-gradient-to-r from-[#211447] to-[#160f33] border-purple-500/40">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-amber-300 text-3xl shadow-lg shadow-purple-600/30">
                    🎁
                  </div>
                  <div>
                    <span className="text-xs text-purple-300 font-semibold block">
                      Next Milestone Reward
                    </span>
                    <h3 className="text-xl font-black text-white">Unlock Premium Badge</h3>
                    <p className="text-xs text-[#a99fc9] mt-0.5">
                      Requirement: Reach Level 15 and unlock 3 achievements (Current progress: 80%)
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-xs font-bold text-amber-400 mb-1">
                    <span>Progress</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-[#100c28] h-3 rounded-full overflow-hidden p-[1px]">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 w-[80%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Titles */}
            <div className="prodigy-card rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Profile Titles (Equip your title)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: 'Beginner', unlock: 'Unlocked at Level 1', levelReq: 1 },
                  { title: 'Achiever', unlock: 'Unlocked at Level 5', levelReq: 5 },
                  { title: 'Productivity Pro', unlock: 'Unlocked at Level 10', levelReq: 10 },
                  { title: 'Expert', unlock: 'Reach Level 15', levelReq: 15 },
                  { title: 'Master', unlock: 'Reach Level 25', levelReq: 25 },
                ].map((t) => {
                  const unlocked = user.level >= t.levelReq;
                  const isEquipped = user.title === t.title;

                  return (
                    <div
                      key={t.title}
                      className={`p-4 rounded-2xl border transition-all ${
                        isEquipped
                          ? 'bg-[#271b59] border-purple-500 shadow-md'
                          : unlocked
                          ? 'bg-[#150f33] border-[#2c2057]'
                          : 'bg-[#100c28] border-[#1d163d] opacity-50'
                      }`}
                    >
                      <span className="text-sm font-bold text-white block">{t.title}</span>
                      <span className="text-[11px] text-[#938ba8] block mt-1">{t.unlock}</span>
                      <button
                        disabled={!unlocked || isEquipped}
                        onClick={() => handleEquipTitle(t.title)}
                        className={`mt-3 w-full py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isEquipped
                            ? 'bg-purple-600 text-white cursor-default'
                            : unlocked
                            ? 'bg-[#22184d] text-purple-300 hover:bg-purple-600 hover:text-white'
                            : 'bg-transparent text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {isEquipped ? 'Equipped ✓' : unlocked ? 'Equip Title' : 'Locked'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Avatar Frames */}
            <div className="prodigy-card rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-400" />
                <span>Avatar Glow Frames</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Default Minimal', id: 'default', req: 'Free', unlocked: true },
                  { name: 'Amethyst Glow', id: 'amethyst-glow', req: 'Level 10 (Unlocked)', unlocked: true },
                  { name: 'Legendary Gold Frame', id: 'gold-frame', req: 'Level 25', unlocked: false },
                ].map((frame) => {
                  const isEquipped = user.equippedFrame === frame.id;
                  return (
                    <div
                      key={frame.id}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isEquipped
                          ? 'bg-[#271b59] border-purple-500'
                          : frame.unlocked
                          ? 'bg-[#150f33] border-[#2c2057]'
                          : 'bg-[#100c28] border-[#1d163d] opacity-50'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center p-1 bg-gradient-to-tr from-cyan-400 to-purple-500">
                        <div className="w-full h-full rounded-full bg-[#1b123a] flex items-center justify-center text-xl">
                          👤
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white block">{frame.name}</span>
                      <span className="text-[10px] text-[#938ba8] block mt-0.5">{frame.req}</span>
                      <button
                        disabled={!frame.unlocked || isEquipped}
                        onClick={() => handleEquipFrame(frame.id)}
                        className={`mt-2.5 w-full py-1.5 rounded-xl text-xs font-bold ${
                          isEquipped
                            ? 'bg-purple-600 text-white'
                            : frame.unlocked
                            ? 'bg-[#22184d] text-purple-300 hover:bg-purple-600 hover:text-white'
                            : 'bg-transparent text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {isEquipped ? 'Active' : frame.unlocked ? 'Equip' : 'Locked'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
