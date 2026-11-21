import React, { useState } from 'react';
import { GamificationProvider, useGamification } from './context/GamificationContext';
import { Sidebar } from './components/Sidebar';
import { Modals } from './components/Modals';

// 10 Pages
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { ProgressPage } from './pages/ProgressPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Menu, X } from 'lucide-react';

const MainLayout = () => {
  const { currentRoute } = useGamification();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Standalone public pages without sidebar
  if (currentRoute === 'home') return <HomePage />;
  if (currentRoute === 'register') return <RegisterPage />;
  if (currentRoute === 'login') return <LoginPage />;

  // Render appropriate signed-in page
  const renderPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tasks':
        return <TasksPage />;
      case 'progress':
        return <ProgressPage />;
      case 'achievements':
        return <AchievementsPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0e0a22] text-white">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-2xl shadow-purple-900 border border-purple-400"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar for Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar Drawer for Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 w-64 bg-[#130f28] h-full shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {renderPage()}
      </main>

      {/* Global Gamification Celebration Modals */}
      <Modals />
    </div>
  );
};

export function App() {
  return (
    <GamificationProvider>
      <MainLayout />
    </GamificationProvider>
  );
}

export default App;
