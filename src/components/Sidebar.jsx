import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Star, 
  Trophy, 
  BarChart2, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const Sidebar = () => {
  const { currentRoute, navigate } = useGamification();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'achievements', label: 'Achievements', icon: Star },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'analytics', label: 'Stats', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#130f28] border-r border-[#261c47] flex flex-col justify-between min-h-screen relative overflow-hidden select-none z-20">
      {/* Top Prodigy Brand */}
      <div>
        <div 
          onClick={() => navigate('dashboard')}
          className="p-6 cursor-pointer flex flex-col items-start gap-1 group"
        >
          <div className="flex items-center gap-3">
            {/* Golden Trophy Logo */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 transform group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-yellow-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v1a6 6 0 0 0 5 5.91V16a2 2 0 0 0 2 2h1v2H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-2v-2h1a2 2 0 0 0 2-2v-2.09A6 6 0 0 0 22 8V7a3 3 0 0 0-3-3zM4 8V7a1 1 0 0 1 1-1h2v4.82A4 4 0 0 1 4 8zm16 0a4 4 0 0 1-3 2.82V6h2a1 1 0 0 1 1 1v1z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                QuestForge
              </h1>
            </div>
          </div>
          <p className="text-xs text-[#9d93c4] font-medium tracking-wide pl-1 mt-1">
            Plan • Focus • Level Up
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 py-2 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white shadow-lg shadow-purple-600/30 font-semibold'
                    : 'text-[#968eb5] hover:text-white hover:bg-[#1f1742]/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#8b82ab]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout & Bottom Mountain Artwork */}
      <div>
        {/* Logout Button */}
        <div className="px-4 mb-3">
          <button
            onClick={() => navigate('login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-[#968eb5] hover:text-red-300 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mountain illustration with flag (matching screenshot bottom left) */}
        <div className="relative w-full h-36 pointer-events-none opacity-85 overflow-hidden">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 256 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stars */}
            <circle cx="40" cy="30" r="1.5" fill="#c084fc" opacity="0.6"/>
            <circle cx="120" cy="20" r="1" fill="#fff" opacity="0.7"/>
            <circle cx="200" cy="40" r="1.5" fill="#a855f7" opacity="0.5"/>
            <circle cx="70" cy="60" r="1" fill="#e9d5ff" opacity="0.4"/>

            {/* Background Mountains */}
            <polygon points="10,160 90,60 170,160" fill="#201547" />
            <polygon points="120,160 190,70 260,160" fill="#1b123d" />

            {/* Foreground High Mountain */}
            <polygon points="-20,160 85,25 210,160" fill="#311f6b" />

            {/* Shading facets */}
            <polygon points="85,25 210,160 85,160" fill="#261754" opacity="0.9" />

            {/* Snow / Light Peak */}
            <polygon points="85,25 105,55 70,55" fill="#6d4cb8" />

            {/* Flagpole on Peak */}
            <line x1="85" y1="25" x2="85" y2="8" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
            
            {/* Waving Flag */}
            <path
              d="M85 9 C 94 8, 98 14, 108 12 L 108 20 C 98 22, 94 16, 85 18 Z"
              fill="#c084fc"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
};
