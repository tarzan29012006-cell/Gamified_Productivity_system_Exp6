import React from 'react';
import { 
  CheckSquare, 
  Flame, 
  Star, 
  Trophy, 
  BarChart2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Users,
  Compass
} from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const HomePage = () => {
  const { navigate, user } = useGamification();

  const features = [
    {
      title: 'Smart Tasks & Priority XP',
      desc: 'Organize tasks by High, Medium, and Low priorities with dynamic XP rewards and on-time bonuses.',
      icon: CheckSquare,
      color: 'text-purple-400',
      bg: 'bg-purple-950/40 border-purple-800/40',
    },
    {
      title: 'Level & Title Progression',
      desc: 'Level up from Beginner to Master. Unlock cosmetic frames, profile titles, and prestige badges.',
      icon: Zap,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/40 border-indigo-800/40',
    },
    {
      title: 'Habit Streaks',
      desc: 'Keep your daily momentum burning. Reach 7, 14, and 30-day streak milestones for huge XP multipliers.',
      icon: Flame,
      color: 'text-orange-400',
      bg: 'bg-orange-950/40 border-orange-800/40',
    },
    {
      title: 'Achievements & Badges',
      desc: 'Earn rare collectible badges like Task Master, Streak Hero, and Focus Guru as you complete milestones.',
      icon: Star,
      color: 'text-amber-400',
      bg: 'bg-amber-950/40 border-amber-800/40',
    },
    {
      title: 'Competitive Leaderboard',
      desc: 'Compete with peers in weekly and all-time rankings. Claim top spot on the podium with your hard work.',
      icon: Trophy,
      color: 'text-yellow-400',
      bg: 'bg-yellow-950/40 border-yellow-800/40',
    },
    {
      title: 'Productivity Analytics',
      desc: 'Study interactive Chart.js graphs, completion rates, priority breakdowns, and daily productivity trends.',
      icon: BarChart2,
      color: 'text-cyan-400',
      bg: 'bg-cyan-950/40 border-cyan-800/40',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0a22] text-white flex flex-col justify-between selection:bg-purple-600">
      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div 
          onClick={() => navigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6 text-yellow-950 fill-yellow-950" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
              QuestForge
            </span>
            <span className="text-[10px] text-[#9d93c4] block font-medium -mt-1">
              Plan • Focus • Level Up
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('login')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#b5add1] hover:text-white transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('register')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 transition-all transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Gamified Productivity & Task Management System</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Stay focused, complete tasks and{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
            level up!
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#a99fc9] mt-6 leading-relaxed">
          QUESTFORGE turns everyday assignments and to-dos into an immersive RPG quest. Earn XP, maintain daily streaks, unlock rare titles, and compete on the leaderboard.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('dashboard')}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-purple-600/40 flex items-center gap-2 group transition-all transform hover:scale-105"
          >
            <span>Open Dashboard Preview</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('register')}
            className="px-8 py-3.5 rounded-2xl bg-[#1a133b] hover:bg-[#251b54] text-purple-300 font-bold text-sm border border-purple-500/30 transition-all"
          >
            Create Free Account
          </button>
        </div>

        {/* Live Platform Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto p-4 rounded-3xl bg-[#140e30]/80 border border-[#2b2055] backdrop-blur-md">
          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl font-black text-white">48</span>
            <span className="text-xs text-[#9d93c4] block mt-0.5">Tasks Completed</span>
          </div>
          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">7 Days</span>
            <span className="text-xs text-[#9d93c4] block mt-0.5">Active Streak</span>
          </div>
          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl font-black text-purple-400">7,850</span>
            <span className="text-xs text-[#9d93c4] block mt-0.5">Total XP Earned</span>
          </div>
          <div className="text-center p-3">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">Level 12</span>
            <span className="text-xs text-[#9d93c4] block mt-0.5">Productivity Pro</span>
          </div>
        </div>
      </section>

      {/* 6 Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Level Up Your Workflow in Every Dimension
          </h2>
          <p className="text-sm text-[#9f94c4] mt-2">
            Built strictly according to IEEE 830 SRS specifications with dark purple aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="prodigy-card prodigy-card-hover rounded-3xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${f.bg} border flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-[#a39ac4] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works in 3 Steps */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
          How QUESTFORGE Works in 3 Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#161033] border border-[#2c2057]">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-3">
              1
            </div>
            <h4 className="font-bold text-white text-base">Plan Tasks</h4>
            <p className="text-xs text-[#9a91be] mt-1">Set priority (High, Med, Low) with due dates.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#161033] border border-[#2c2057]">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto mb-3">
              2
            </div>
            <h4 className="font-bold text-white text-base">Focus & Execute</h4>
            <p className="text-xs text-[#9a91be] mt-1">Crush your to-do items on time and build daily habits.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#161033] border border-[#2c2057]">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-yellow-950 font-black text-lg flex items-center justify-center mx-auto mb-3">
              3
            </div>
            <h4 className="font-bold text-white text-base">Earn XP & Level Up</h4>
            <p className="text-xs text-[#9a91be] mt-1">Collect badges, climb the leaderboard, and unlock cosmetics.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-6 my-10 w-full">
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#2c1a63] via-[#43238c] to-[#1e1447] border border-purple-500/40 text-center relative overflow-hidden shadow-2xl">
          <h3 className="text-3xl font-black text-white">
            Dream Big, Get Things Done!
          </h3>
          <p className="text-sm text-purple-200/80 max-w-md mx-auto mt-2">
            Start earning XP on your very first task today. Join Kirthick and the BCA cohort.
          </p>
          <button
            onClick={() => navigate('dashboard')}
            className="mt-6 px-8 py-3 rounded-full bg-white text-purple-950 font-black text-sm shadow-xl hover:bg-purple-100 transition-all transform hover:scale-105"
          >
            Launch QUESTFORGE Dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1f173f] py-8 text-center text-xs text-[#7c7499]">
        <p>© 2026 QUESTFORGE – Gamified Productivity and Task Management System.</p>
        <p className="mt-1">Prepared in IEEE 830 / 29148 style for BCA Final Year Project.</p>
      </footer>
    </div>
  );
};
