import React, { useState } from 'react';
import { Trophy, ArrowRight, Eye, EyeOff, Lock, User, Sparkles } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { initialUser } from '../data/initialData';

export const LoginPage = () => {
  const { navigate, setUser, resetToMockupData } = useGamification();

  const [identifier, setIdentifier] = useState('kirthick');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Log in with current profile data
    navigate('dashboard');
  };

  const handleDemoMockupLogin = () => {
    resetToMockupData();
    navigate('dashboard');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setResetSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0e0a22] flex items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-[#150f33] border border-[#2b2055] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 justify-center mb-6 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6 text-yellow-950 fill-yellow-950" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Prodigy</h1>
            <span className="text-[10px] text-[#9d93c4] block font-medium -mt-1">
              Plan • Focus • Level Up
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
          <p className="text-xs text-[#9d93c4] mt-1">
            Sign in to access your quests, streak and leaderboard rank.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Username or Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
              <User className="w-4 h-4 text-[#736894] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#b3a8d4]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736894] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#a99fc9] pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#100c28] border-[#2f235b] text-purple-600 focus:ring-0"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Examiner Demo Login Button */}
        <div className="mt-5 pt-4 border-t border-[#251c4a]">
          <span className="text-[11px] text-[#867ba6] block text-center mb-2 font-semibold">
            Quick BCA Demo Preview:
          </span>
          <button
            type="button"
            onClick={handleDemoMockupLogin}
            className="w-full py-2.5 rounded-xl bg-[#23174f] hover:bg-[#2e1f66] text-purple-200 border border-purple-500/40 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-950/50"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Load Mockup State (Kirthick - Level 12)</span>
          </button>
        </div>

        <div className="text-center mt-6 text-xs text-[#9d93c4]">
          Don't have an account yet?{' '}
          <button
            onClick={() => navigate('register')}
            className="text-purple-400 hover:text-purple-300 font-bold ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#181138] border border-purple-500/40 rounded-3xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white">Reset Password</h3>
            <p className="text-xs text-[#a99fc9] mt-1">
              Enter your email and we'll send a password recovery token.
            </p>
            {resetSuccess ? (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs text-center font-bold">
                ✓ Password reset email sent!
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2 rounded-xl bg-[#22184d] text-xs text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 text-xs font-bold text-white hover:bg-purple-500"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
