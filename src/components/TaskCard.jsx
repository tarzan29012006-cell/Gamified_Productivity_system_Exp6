import React, { useState } from 'react';
import { CheckSquare, ArrowRight, Calendar, Check, Plus } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const TaskCard = () => {
  const { tasks, toggleTask, addTask, navigate } = useGamification();
  const [activeTab, setActiveTab] = useState('today');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState('Medium');

  // Filter tasks based on active tab
  const todayTasks = tasks.filter((t) => t.dueDate === 'Today');
  const upcomingTasks = tasks.filter((t) => t.dueDate === 'Tomorrow' || t.dueDate === 'In 2 days');
  const completedTasks = tasks.filter((t) => t.completed);

  const displayedTasks = 
    activeTab === 'today' ? todayTasks :
    activeTab === 'upcoming' ? upcomingTasks :
    completedTasks;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addTask({
      title: quickTitle,
      priority: quickPriority,
      dueDate: activeTab === 'upcoming' ? 'Tomorrow' : 'Today',
      category: 'Study',
    });
    setQuickTitle('');
  };

  return (
    <div className="prodigy-card rounded-3xl p-6 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#27184b] border border-[#48288b] flex items-center justify-center text-purple-400">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              My Tasks
            </h2>
          </div>

          <button
            onClick={() => navigate('tasks')}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-[#6d28d9] text-white shadow-md shadow-purple-900/40'
                : 'bg-[#1b143d] text-[#938ba8] hover:text-white hover:bg-[#251b54]'
            }`}
          >
            Today ({todayTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-[#6d28d9] text-white shadow-md shadow-purple-900/40'
                : 'bg-[#1b143d] text-[#938ba8] hover:text-white hover:bg-[#251b54]'
            }`}
          >
            Upcoming ({upcomingTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-[#6d28d9] text-white shadow-md shadow-purple-900/40'
                : 'bg-[#1b143d] text-[#938ba8] hover:text-white hover:bg-[#251b54]'
            }`}
          >
            Completed ({completedTasks.length})
          </button>
        </div>

        {/* Task Items List */}
        <div className="space-y-3">
          {displayedTasks.slice(0, 5).map((task) => {
            const isCompleted = task.completed;
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`group flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer border ${
                  isCompleted
                    ? 'bg-[#140e2d]/60 border-[#211745] opacity-75'
                    : 'bg-[#181238] border-[#2c2057] hover:border-[#4f389c] hover:bg-[#1f1647]'
                }`}
              >
                {/* Left: Custom Checkbox & Task Title */}
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-sm shadow-purple-500/50'
                        : 'border-2 border-[#544186] group-hover:border-purple-400 bg-transparent'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <span
                    className={`text-sm font-medium tracking-tight truncate ${
                      isCompleted
                        ? 'line-through text-[#7c7499]'
                        : 'text-white group-hover:text-purple-200'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Right: Badges (Priority pill, Due date, or XP earned pill) */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0d3326] text-[#4ade80] border border-[#166548] flex items-center gap-1 shadow-sm shadow-emerald-950/50 animate-check-pop">
                      +{task.xpValue || 50} XP
                    </span>
                  ) : (
                    <>
                      {/* Priority Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.priority === 'High'
                            ? 'bg-[#481747] text-[#f472b6] border border-[#86198f]/40'
                            : task.priority === 'Medium'
                            ? 'bg-[#1b2857] text-[#60a5fa] border border-[#2563eb]/40'
                            : 'bg-[#0f382a] text-[#34d399] border border-[#059669]/40'
                        }`}
                      >
                        {task.priority}
                      </span>

                      {/* Due Date Indicator */}
                      <span className="flex items-center gap-1.5 text-xs text-[#9d93c4] font-medium pl-1">
                        <Calendar className="w-3.5 h-3.5 text-[#867ba6]" />
                        <span>{task.dueDate}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {displayedTasks.length === 0 && (
            <div className="text-center py-8 text-xs text-[#8c82ab]">
              No tasks found in this view. Add one below to earn XP!
            </div>
          )}
        </div>
      </div>

      {/* Quick Add Inline Input */}
      <form onSubmit={handleQuickAdd} className="mt-5 pt-3">
        <div className="flex items-center gap-2 bg-[#120d2a] border border-[#2d2159] focus-within:border-purple-500 rounded-2xl p-1.5 pl-4 transition-colors">
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="+ Add New Task..."
            className="flex-1 bg-transparent text-sm text-white placeholder-[#756c93] focus:outline-none"
          />

          {/* Quick Priority Selector */}
          <select
            value={quickPriority}
            onChange={(e) => setQuickPriority(e.target.value)}
            className="bg-[#1e1644] text-xs text-[#c4bcdc] rounded-xl px-2 py-1.5 border border-[#382a6e] focus:outline-none cursor-pointer"
          >
            <option value="High">High (50 XP)</option>
            <option value="Medium">Medium (25 XP)</option>
            <option value="Low">Low (10 XP)</option>
          </select>

          {/* Add Button */}
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
