import React, { useState } from 'react';
import { User, Settings as SettingsIcon, Shield, Sliders, Bell, Sparkles, Volume2, Save, RotateCcw } from 'lucide-react';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';
import { sounds } from '../utils/sound';

export const SettingsPage = () => {
  const { user, setUser, xpRules, setXpRules } = useGamification();

  // Profile Form state
  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    bio: user.bio,
    college: user.college,
  });

  // Gamification Rules Admin State (SRS 2.3 & 4.1)
  const [rulesForm, setRulesForm] = useState({ ...xpRules });
  const [soundEnabled, setSoundEnabled] = useState(sounds.enabled);
  const [saveToast, setSaveToast] = useState('');

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser({ ...user, ...profileData });
    setSaveToast('Profile information saved!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleRulesSave = (e) => {
    e.preventDefault();
    setXpRules(rulesForm);
    sounds.enabled = soundEnabled;
    setSaveToast('XP Rules & Game Engine configuration updated!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  const resetRulesToDefault = () => {
    const defaults = {
      lowBaseXp: 10,
      mediumBaseXp: 25,
      highBaseXp: 50,
      onTimeBonus: 5,
      antiAbuseLimit: true,
      soundEnabled: true,
    };
    setRulesForm(defaults);
    setXpRules(defaults);
    setSaveToast('XP rules reset to IEEE 830 defaults!');
    setTimeout(() => setSaveToast(''), 3000);
  };

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8 max-w-5xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2b1f47] border border-purple-500/40 flex items-center justify-center text-purple-400">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              User Profile and Settings
            </h2>
          </div>
          <p className="text-xs text-[#9d93c4] mt-1">
            Manage your account, cosmetic preferences, and customize the gamification engine.
          </p>
        </div>

        {saveToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
            <span>✓</span>
            <span>{saveToast}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Profile Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prodigy-card rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Profile Information</span>
              </h3>

              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                      className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    College / Organization
                  </label>
                  <input
                    type="text"
                    value={profileData.college}
                    onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Bio / Status
                  </label>
                  <textarea
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Profile</span>
                </button>
              </form>
            </div>

            {/* Sound & Notifications */}
            <div className="prodigy-card rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-400" />
                <span>Audio & Alerts</span>
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#120d2a] border border-[#2b2055] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="text-xs font-semibold text-white block">Game Sound Effects</span>
                      <span className="text-[10px] text-[#8c82ab]">Task completion chime & Level up fanfare</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => {
                      setSoundEnabled(e.target.checked);
                      sounds.enabled = e.target.checked;
                    }}
                    className="w-4 h-4 text-purple-600 rounded bg-[#1b143a]"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Right: Gamification Rules Administrator Panel (SRS 2.3 & 4.1) (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="prodigy-card rounded-3xl p-6 border-purple-500/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>XP Engine Tuning (Admin / Demo)</span>
                </h3>
              </div>

              <p className="text-[11px] text-[#9a91be] mb-4 leading-relaxed">
                As per SRS 2.3 & 4.1, gamification parameters are stored dynamically and can be tuned without code changes.
              </p>

              <form onSubmit={handleRulesSave} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-[#b8aedb] mb-1">
                    High Priority Task Base XP
                  </label>
                  <input
                    type="number"
                    value={rulesForm.highBaseXp}
                    onChange={(e) => setRulesForm({ ...rulesForm, highBaseXp: Number(e.target.value) })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#b8aedb] mb-1">
                    Medium Priority Task Base XP
                  </label>
                  <input
                    type="number"
                    value={rulesForm.mediumBaseXp}
                    onChange={(e) => setRulesForm({ ...rulesForm, mediumBaseXp: Number(e.target.value) })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#b8aedb] mb-1">
                    Low Priority Task Base XP
                  </label>
                  <input
                    type="number"
                    value={rulesForm.lowBaseXp}
                    onChange={(e) => setRulesForm({ ...rulesForm, lowBaseXp: Number(e.target.value) })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#b8aedb] mb-1">
                    On-Time Completion Bonus XP
                  </label>
                  <input
                    type="number"
                    value={rulesForm.onTimeBonus}
                    onChange={(e) => setRulesForm({ ...rulesForm, onTimeBonus: Number(e.target.value) })}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#120d2a] border border-[#2b2055] mt-2">
                  <span className="text-[11px] text-[#c4bcdc]">Anti-Abuse 60s Limit</span>
                  <input
                    type="checkbox"
                    checked={rulesForm.antiAbuseLimit}
                    onChange={(e) => setRulesForm({ ...rulesForm, antiAbuseLimit: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded bg-[#1b143a]"
                  />
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={resetRulesToDefault}
                    className="flex-1 py-2 rounded-xl bg-[#22184d] text-[11px] font-semibold text-gray-300 hover:bg-[#2d2066]"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-[11px] font-bold text-white shadow-md shadow-purple-600/30"
                  >
                    Save Rules
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
