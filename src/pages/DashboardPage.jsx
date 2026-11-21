import React from 'react';
import { Header } from '../components/Header';
import { StatCards } from '../components/StatCards';
import { TaskCard } from '../components/TaskCard';
import { YourJourneyCard } from '../components/YourJourneyCard';
import { AchievementsCard } from '../components/AchievementsCard';
import { ProductivityStatsCard } from '../components/ProductivityStatsCard';
import { DreamBigCard } from '../components/DreamBigCard';

export const DashboardPage = () => {
  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      {/* Top Header */}
      <Header />

      {/* Top 4 Stat Cards */}
      <div className="mb-6">
        <StatCards />
      </div>

      {/* Middle Grid: Tasks Card (Left, 7 cols) & Your Journey Card (Right, 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-8 mb-6">
        <div className="lg:col-span-7">
          <TaskCard />
        </div>
        <div className="lg:col-span-5">
          <YourJourneyCard />
        </div>
      </div>

      {/* Bottom Grid: Achievements (5 cols), Productivity Stats (4 cols), Dream Big CTA (3 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 px-8">
        <div className="lg:col-span-5">
          <AchievementsCard />
        </div>
        <div className="lg:col-span-4">
          <ProductivityStatsCard />
        </div>
        <div className="lg:col-span-3">
          <DreamBigCard />
        </div>
      </div>
    </div>
  );
};
