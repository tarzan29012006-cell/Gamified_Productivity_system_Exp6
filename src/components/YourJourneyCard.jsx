import React from 'react';
import { Trophy, Flame, Gift, Sparkles } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const YourJourneyCard = () => {
  const { user, rewards, navigate } = useGamification();

  // Find the Next Reward (e.g. Premium Badge from mockup)
  const nextReward = rewards.find((r) => !r.unlocked) || rewards[0];
  const rewardPercent = nextReward ? nextReward.progress : 80;

  return (
    <div className="prodigy-card rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Background starlight / aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center gap-2.5 z-10">
        <div className="w-8 h-8 rounded-lg bg-[#2f2014] border border-[#5a3a1f] flex items-center justify-center text-amber-400">
          <Trophy className="w-4 h-4 fill-amber-400" />
        </div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Your Journey
        </h2>
      </div>

      {/* Hero Showcase Center: Chibi Warrior, Pedestal, Sword & Speech Bubble */}
      <div className="relative flex flex-col items-center justify-center my-2 z-10">
        {/* Streak Speech Bubble */}
        <div className="relative mb-2 animate-float">
          <div className="bg-[#1f153d] border border-[#482c82] px-4 py-2.5 rounded-2xl shadow-xl shadow-purple-950/60 flex items-center gap-2.5">
            <div>
              <p className="text-xs font-bold text-white text-center">
                You're on a {user.currentStreak}-day streak!
              </p>
              <p className="text-[11px] font-semibold text-[#f97316] text-center flex items-center justify-center gap-1">
                <span>Keep going!</span>
                <Flame className="w-3.5 h-3.5 fill-[#f97316] inline" />
              </p>
            </div>
          </div>
          {/* Speech bubble pointer beak */}
          <div className="w-3 h-3 bg-[#1f153d] border-r border-b border-[#482c82] transform rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
        </div>

        {/* Chibi RPG Knight Hero with Glowing Sword & Pedestal */}
        <div className="relative w-44 h-48 flex items-center justify-center">
          {/* Floating magic stars / sparkles */}
          <div className="absolute -top-1 left-4 text-purple-300 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute top-8 right-3 text-amber-300 animate-pulse delay-150">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="absolute bottom-14 left-2 text-indigo-300 animate-pulse delay-300">
            <Sparkles className="w-3 h-3" />
          </div>

          <svg className="w-full h-full" viewBox="0 0 180 200" fill="none">
            {/* Pedestal Bottom Base */}
            <ellipse cx="90" cy="175" rx="58" ry="16" fill="#1b1238" />
            <ellipse cx="90" cy="170" rx="54" ry="14" fill="#301f5c" />
            <path d="M36 170 C 36 158, 144 158, 144 170 L 140 182 L 40 182 Z" fill="#25174a" />
            
            {/* Top Pedestal Layer */}
            <ellipse cx="90" cy="158" rx="46" ry="12" fill="#d97706" opacity="0.9" />
            <ellipse cx="90" cy="156" rx="44" ry="10" fill="#f59e0b" />
            <ellipse cx="90" cy="154" rx="42" ry="9" fill="#fbbf24" />

            {/* Chibi Character Shadow */}
            <ellipse cx="86" cy="154" rx="20" ry="6" fill="#78350f" opacity="0.6" />

            {/* Royal Red/Purple Cape */}
            <path
              d="M62 90 C 50 110, 48 140, 64 150 C 72 135, 74 110, 72 94 Z"
              fill="#dc2626"
            />
            <path
              d="M60 92 C 52 110, 52 135, 62 145 Z"
              fill="#b91c1c"
            />

            {/* Knight Armor Body */}
            <path
              d="M72 88 C 72 80, 104 80, 104 88 L 102 122 C 102 128, 74 128, 74 122 Z"
              fill="#3730a3"
            />
            {/* Golden Belt */}
            <rect x="74" y="114" width="28" height="6" rx="2" fill="#f59e0b" />
            <rect x="85" y="112" width="6" height="10" rx="1.5" fill="#fbbf24" />

            {/* Armor Legs / Boots */}
            <rect x="76" y="124" width="9" height="24" rx="4" fill="#1e1b4b" />
            <rect x="91" y="124" width="9" height="24" rx="4" fill="#1e1b4b" />
            <ellipse cx="80" cy="148" rx="6" ry="3" fill="#312e81" />
            <ellipse cx="95" cy="148" rx="6" ry="3" fill="#312e81" />

            {/* Left Arm (Relaxed) */}
            <path
              d="M72 90 C 66 98, 66 108, 70 114"
              stroke="#3730a3"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Right Arm (Holding Golden Sword Upright) */}
            <path
              d="M102 92 C 110 98, 116 104, 120 108"
              stroke="#3730a3"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="120" cy="108" r="4.5" fill="#f59e0b" />

            {/* Glowing Golden Sword */}
            {/* Sword Blade Glow */}
            <path
              d="M120 108 L 138 42 L 142 42 L 124 108 Z"
              fill="#fef08a"
              filter="drop-shadow(0px 0px 8px #facc15)"
            />
            {/* Inner blade sharp shine */}
            <line x1="122" y1="108" x2="140" y2="42" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Crossguard */}
            <rect x="114" y="104" width="14" height="4" rx="2" fill="#d97706" transform="rotate(-15 120 106)" />
            {/* Pommel */}
            <circle cx="116" cy="116" r="3" fill="#b45309" />

            {/* Chibi Head */}
            <circle cx="88" cy="62" r="23" fill="#fde68a" />
            {/* Spiky Anime Hair */}
            <path
              d="M66 58 C 64 36, 110 34, 110 56 C 114 62, 112 72, 106 74 C 104 62, 72 62, 70 74 C 65 71, 64 64, 66 58 Z"
              fill="#261747"
            />
            {/* Hair bangs */}
            <polygon points="76,46 82,34 88,48" fill="#38216b" />
            <polygon points="88,46 96,36 102,48" fill="#38216b" />

            {/* Large Anime Eyes */}
            <ellipse cx="80" cy="62" rx="3.5" ry="5" fill="#1e153b" />
            <ellipse cx="96" cy="62" rx="3.5" ry="5" fill="#1e153b" />
            {/* Eye sparkle highlights */}
            <circle cx="81.5" cy="60" r="1.4" fill="#ffffff" />
            <circle cx="97.5" cy="60" r="1.4" fill="#ffffff" />
            <circle cx="79" cy="64" r="0.8" fill="#ffffff" />
            <circle cx="95" cy="64" r="0.8" fill="#ffffff" />

            {/* Cute Rosy Cheeks */}
            <ellipse cx="74" cy="68" rx="3" ry="1.8" fill="#f87171" opacity="0.6" />
            <ellipse cx="102" cy="68" rx="3" ry="1.8" fill="#f87171" opacity="0.6" />

            {/* Determined Smile */}
            <path
              d="M84 70 Q 88 74 92 70"
              stroke="#1e153b"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom Reward Progress Bar & Gift Box */}
      <div 
        onClick={() => navigate('achievements')}
        className="bg-[#150f33] border border-[#2e2159] hover:border-purple-500/50 p-4 rounded-2xl cursor-pointer transition-colors z-10"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] text-[#9a91be] block">
              Next Reward:
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              {nextReward.title}
            </span>
          </div>

          {/* Gift Box Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-amber-300 shadow-md shadow-purple-900/40 transform hover:scale-110 transition-transform">
            <Gift className="w-5 h-5" />
          </div>
        </div>

        {/* Golden Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[#0f0b24] h-2.5 rounded-full overflow-hidden p-[1px]">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 h-full rounded-full shadow-sm shadow-amber-500/50 transition-all duration-500"
              style={{ width: `${rewardPercent}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-amber-400">
            {rewardPercent}%
          </span>
        </div>
      </div>
    </div>
  );
};
