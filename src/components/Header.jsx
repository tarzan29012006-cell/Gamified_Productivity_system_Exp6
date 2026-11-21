import React, { useState } from 'react';
import { Bell, Check, Sparkles, RotateCcw } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const Header = () => {
  const { user, notifications, markAllNotificationsRead, resetToMockupData, navigate } = useGamification();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="flex items-center justify-between py-6 px-8 select-none relative z-30">
      {/* Welcome Greetings */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <span>Hello, {user.fullName}!</span>
          <span className="inline-block animate-wiggle">👋</span>
        </h1>
        <p className="text-sm font-medium text-[#9d93c4] mt-1">
          Stay focused, complete tasks and level up!
        </p>
      </div>

      {/* Right controls: Reset Demo, Notification Bell, User Avatar */}
      <div className="flex items-center gap-4">
        {/* Reset Demo button for examiner / user test */}
        <button
          onClick={resetToMockupData}
          title="Reset back to initial mockup data"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1742] hover:bg-[#2b205d] text-xs text-[#a99fc9] hover:text-white transition-all border border-[#352763]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Mockup</span>
        </button>

        {/* Notifications Icon with Red Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-10 h-10 rounded-full bg-[#1b153b] hover:bg-[#271e54] flex items-center justify-center text-[#c4bcdc] hover:text-white border border-[#33265e] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0e0a22] shadow-sm animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 bg-[#161135] border border-[#352766] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#291e52] mb-3">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl text-xs transition-colors ${
                      n.unread ? 'bg-[#22184d] border border-purple-500/30' : 'bg-[#1a143d]/50 text-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{n.time}</span>
                    </div>
                    <p className="text-[#a59bc8] mt-1 text-[11px] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Circle */}
        <div 
          onClick={() => navigate('settings')}
          className="relative cursor-pointer group"
          title="Open Profile & Settings"
        >
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-indigo-500 group-hover:scale-105 transition-transform shadow-md shadow-purple-900/40">
            <div className="w-full h-full rounded-full bg-[#1a123d] flex items-center justify-center overflow-hidden">
              {/* Chibi Hero Head Representation */}
              <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#1e1842" />
                {/* Hair */}
                <path d="M12 16 C 12 10, 28 10, 28 16 C 30 18, 29 24, 27 25 C 25 18, 15 18, 13 25 C 11 24, 10 18, 12 16 Z" fill="#2d1d4f"/>
                {/* Face */}
                <circle cx="20" cy="21" r="8" fill="#fcd34d" />
                {/* Anime Eyes */}
                <ellipse cx="17.5" cy="21" rx="1.2" ry="1.6" fill="#1e1842" />
                <ellipse cx="22.5" cy="21" rx="1.2" ry="1.6" fill="#1e1842" />
                {/* Smile */}
                <path d="M18.5 24.5 Q 20 26 21.5 24.5" stroke="#1e1842" strokeWidth="0.8" strokeLinecap="round" />
                {/* Shirt / Armor */}
                <path d="M14 31 C 14 26, 26 26, 26 31 L 28 38 L 12 38 Z" fill="#4338ca" />
                <polygon points="18,31 22,31 20,35" fill="#f59e0b" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
