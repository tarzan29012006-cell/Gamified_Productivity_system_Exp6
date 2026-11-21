import React from 'react';
import { Award, Sparkles, X, Flame } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const Modals = () => {
  const {
    levelUpData,
    setLevelUpData,
    achievementUnlockData,
    setAchievementUnlockData,
    toastMessage,
  } = useGamification();

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
          <div className="px-5 py-3 rounded-2xl bg-[#1b133d] border border-purple-500/40 text-white shadow-2xl shadow-purple-950/70 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-bold">{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Level Up Celebration Modal */}
      {levelUpData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-[#22174d] to-[#120d29] border border-purple-500/50 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setLevelUpData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-purple-500 p-[3px] mx-auto mb-4 animate-bounce">
              <div className="w-full h-full rounded-full bg-[#1b123a] flex items-center justify-center text-3xl">
                👑
              </div>
            </div>

            <h3 className="text-2xl font-black text-white">LEVEL UP!</h3>
            <p className="text-lg font-bold text-purple-300 mt-1">
              Level {levelUpData.newLevel}
            </p>
            <p className="text-xs text-purple-200/80 font-medium">
              Title: <span className="font-bold text-amber-300">{levelUpData.title}</span>
            </p>

            <div className="mt-4 p-3 rounded-2xl bg-[#171033] border border-[#37266b] text-xs text-gray-300">
              <span className="text-[10px] text-purple-400 block uppercase font-bold">Reward Unlocked</span>
              <span className="font-semibold text-white mt-0.5 block">{levelUpData.reward}</span>
            </div>

            <button
              onClick={() => setLevelUpData(null)}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/40"
            >
              Awesome! Let's Go
            </button>
          </div>
        </div>
      )}

      {/* Achievement Unlocked Modal */}
      {achievementUnlockData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-gradient-to-b from-[#22174d] to-[#120d29] border border-amber-500/50 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setAchievementUnlockData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-500 p-[3px] mx-auto mb-4 animate-pulse">
              <div className="w-full h-full rounded-full bg-[#1e153b] flex items-center justify-center text-3xl">
                🏆
              </div>
            </div>

            <span className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">
              Achievement Unlocked!
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              {achievementUnlockData.title}
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              {achievementUnlockData.description}
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#352512] text-amber-400 border border-amber-500/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{achievementUnlockData.bonusXp} Bonus XP Claimed!</span>
            </div>

            <button
              onClick={() => setAchievementUnlockData(null)}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-yellow-950 font-black text-sm shadow-lg shadow-amber-500/30"
            >
              Collect Rewards
            </button>
          </div>
        </div>
      )}
    </>
  );
};
