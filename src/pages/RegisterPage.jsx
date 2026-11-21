import React, { useState } from 'react';
import { Trophy, ShieldCheck, ArrowRight, Eye, EyeOff, Lock, User, Mail, CheckCircle2 } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const RegisterPage = () => {
  const { navigate, setUser } = useGamification();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength meter calculation (REG-6)
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || formData.fullName.length < 2) {
      setError('Full name must be at least 2 characters.');
      return;
    }
    if (!formData.username || formData.username.length < 4) {
      setError('Username must be between 4 and 20 characters.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters with letters, numbers, and symbols.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.terms) {
      setError('You must accept the terms of service.');
      return;
    }

    // Initialize new user account at Level 1 with 0 XP (REG-4)
    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      bio: 'Ready to crush tasks and level up! ⚔️',
      role: 'Student Developer',
      college: 'BCA Final Year',
      avatar: 'chibi-hero',
      equippedFrame: 'default',
      equippedTitle: 'Beginner',
      equippedTheme: 'dark-purple',
      level: 1,
      title: 'Beginner',
      currentLevelXp: 0,
      nextLevelXp: 100, // 100 * n for level 1
      totalXp: 0,
      xpWeeklyGain: 0,
      tasksCompleted: 0,
      tasksCompletedTrend: '0%',
      currentStreak: 1,
      streakTrend: '+1',
      bestStreak: 1,
      joinedDate: 'Just now',
      emailVerified: false,
    };

    setUser(newUser);
    navigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0e0a22] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#150f33] border border-[#2b2055] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand header */}
        <div 
          onClick={() => navigate('home')}
          className="flex items-center gap-3 justify-center mb-6 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy className="w-6 h-6 text-yellow-950 fill-yellow-950" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">QuestForge</h1>
            <span className="text-[10px] text-[#9d93c4] block font-medium -mt-1">
              Plan • Focus • Level Up
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white">Create Your Account</h2>
          <p className="text-xs text-[#9d93c4] mt-1">
            Start at Level 1, complete tasks, and build your daily habit.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Kirthick Kumar"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
              <User className="w-4 h-4 text-[#736894] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="kirthick_pro"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="kirthick@questforge.dev"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
              <Mail className="w-4 h-4 text-[#736894] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            {/* Password strength meter */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-1.5 h-1.5 w-full bg-[#100c28] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength <= 1 ? 'w-1/4 bg-red-500' :
                      strength === 2 ? 'w-2/4 bg-amber-500' :
                      strength === 3 ? 'w-3/4 bg-blue-500' :
                      'w-full bg-emerald-500'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-[#9a91be] mt-1 block">
                  Strength: {strength <= 1 ? 'Weak' : strength === 2 ? 'Medium' : strength === 3 ? 'Good' : 'Strong 🛡️'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-[#b3a8d4] mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              className="w-4 h-4 rounded bg-[#100c28] border-[#2f235b] text-purple-600 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-[#a99fc9] cursor-pointer">
              I agree to the Terms of Service & Privacy Policy
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-[#9d93c4]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="text-purple-400 hover:text-purple-300 font-bold ml-1"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
