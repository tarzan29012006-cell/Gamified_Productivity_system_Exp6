import React, { useState } from 'react';
import { BarChart2, TrendingUp, CheckCircle, Clock, Calendar, Zap, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsPage = () => {
  const { user, weeklyData, tasks } = useGamification();
  const [timeRange, setTimeRange] = useState('This Week');

  // Chart 1: Spline Line Chart (Daily task velocity)
  const lineChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: weeklyData.completionCounts,
        borderColor: '#a855f7',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#9333ea',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.45,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)');
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0.0)');
          return gradient;
        },
      },
    ],
  };

  // Chart 2: Priority Distribution Doughnut Chart
  const highCount = tasks.filter((t) => t.priority === 'High').length;
  const medCount = tasks.filter((t) => t.priority === 'Medium').length;
  const lowCount = tasks.filter((t) => t.priority === 'Low').length;

  const priorityChartData = {
    labels: ['High (50 XP)', 'Medium (25 XP)', 'Low (10 XP)'],
    datasets: [
      {
        data: [highCount || 5, medCount || 4, lowCount || 3],
        backgroundColor: ['#ec4899', '#3b82f6', '#10b981'],
        borderColor: '#151032',
        borderWidth: 3,
      },
    ],
  };

  // Chart 3: XP Earnings Bar Chart
  const xpBarChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'XP Earned',
        data: [150, 275, 200, 420, 350, 480, 400],
        backgroundColor: '#7c3aed',
        borderRadius: 8,
        hoverBackgroundColor: '#a855f7',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#b3a8d4',
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: '#1a133d',
        borderColor: '#4c2b85',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#8c82ab' },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#8c82ab' },
      },
    },
  };

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8 max-w-6xl mx-auto">
        {/* Title & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#23174a] border border-purple-500/40 flex items-center justify-center text-purple-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Productivity Analytics
              </h2>
            </div>
            <p className="text-xs text-[#9d93c4] mt-1">
              Visual performance metrics drawn using Chart.js as specified in SRS 1.2.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#140e30] text-xs text-[#c4bcdc] rounded-xl px-3 py-2 border border-[#2b2055] focus:outline-none"
            >
              <option value="This Week">This Week</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* 4 Key Performance Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="prodigy-card rounded-2xl p-4 border border-[#2c2057]">
            <span className="text-xs text-[#9d93c4] block">Weekly Completion Rate</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-white">85%</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/40">
                ↑ +4%
              </span>
            </div>
          </div>

          <div className="prodigy-card rounded-2xl p-4 border border-[#2c2057]">
            <span className="text-xs text-[#9d93c4] block">On-Time Delivery Rate</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-emerald-400">92%</span>
              <span className="text-xs text-[#8c82ab]">On-time bonus eligible</span>
            </div>
          </div>

          <div className="prodigy-card rounded-2xl p-4 border border-[#2c2057]">
            <span className="text-xs text-[#9d93c4] block">Average Daily Velocity</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-purple-300">6.8</span>
              <span className="text-xs text-[#8c82ab]">tasks / day</span>
            </div>
          </div>

          <div className="prodigy-card rounded-2xl p-4 border border-[#2c2057]">
            <span className="text-xs text-[#9d93c4] block">Weekly XP Gained</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black text-amber-400">+2,275</span>
              <span className="text-xs text-amber-300 font-bold">XP</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Main Spline Velocity Chart (8 cols) */}
          <div className="lg:col-span-8 prodigy-card rounded-3xl p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center justify-between">
              <span>Daily Completion Curve (This Week)</span>
              <span className="text-xs text-purple-400 font-normal">85% overall adherence</span>
            </h3>
            <div className="w-full h-64">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* Priority Doughnut Chart (4 cols) */}
          <div className="lg:col-span-4 prodigy-card rounded-3xl p-6 flex flex-col justify-between">
            <h3 className="text-base font-bold text-white mb-2">
              Tasks by Priority (XP Tier)
            </h3>
            <div className="w-full h-52 relative flex items-center justify-center">
              <Doughnut
                data={priorityChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom', labels: { color: '#a99fc9', boxWidth: 12 } } },
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar Chart: XP Gains Over Week */}
        <div className="prodigy-card rounded-3xl p-6">
          <h3 className="text-base font-bold text-white mb-4">
            Daily XP Accumulation
          </h3>
          <div className="w-full h-56">
            <Bar data={xpBarChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
