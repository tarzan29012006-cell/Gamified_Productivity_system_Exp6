import React, { useState } from 'react';
import { BarChart2, ChevronDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGamification } from '../context/GamificationContext';

// Register Chart.js components as specified in SRS 1.2
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const ProductivityStatsCard = () => {
  const { weeklyData, navigate } = useGamification();
  const [timeFilter, setTimeFilter] = useState('This Week');

  // Chart data configuration matching the mockup's glowing purple spline line
  const data = {
    labels: weeklyData.labels,
    datasets: [
      {
        fill: true,
        data: weeklyData.completionCounts,
        borderColor: '#a855f7',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#9333ea',
        pointBorderWidth: 2.5,
        pointRadius: 4.5,
        pointHoverRadius: 6,
        tension: 0.45, // Smooth spline bezier curve
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 160);
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0.0)');
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1b133d',
        titleColor: '#ffffff',
        bodyColor: '#c084fc',
        borderColor: '#4c2b85',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: (item) => `${item.raw} tasks completed`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#938ba8',
          font: {
            size: 10,
            weight: '500',
          },
        },
      },
      y: {
        display: false,
        min: 0,
        max: 12,
      },
    },
  };

  return (
    <div 
      onClick={() => navigate('analytics')}
      className="prodigy-card rounded-3xl p-6 flex flex-col justify-between h-full cursor-pointer hover:border-purple-500/40 transition-colors"
    >
      {/* Header with Title, Filter Dropdown and 85% Badge */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-extrabold text-white tracking-tight">
            Productivity Stats
          </h2>
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {/* Dropdown pill */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="appearance-none bg-[#1a133b] text-[#a99fc9] text-xs font-semibold px-3 py-1.5 pr-6 rounded-xl border border-[#30235b] focus:outline-none cursor-pointer"
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#887ea8] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 85% Metric Badge */}
          <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-[#22184d] text-purple-300 border border-[#482e85]">
            {weeklyData.completionPercentage}%
          </span>
        </div>
      </div>

      {/* Chart.js Canvas Container */}
      <div className="w-full h-36 mt-2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
