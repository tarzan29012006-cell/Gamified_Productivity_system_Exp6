import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Check, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Info, 
  Tag 
} from 'lucide-react';
import { Header } from '../components/Header';
import { useGamification } from '../context/GamificationContext';

export const TasksPage = () => {
  const { tasks, toggleTask, addTask, editTask, deleteTask } = useGamification();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, completed
  const [priorityFilter, setPriorityFilter] = useState('all'); // all, High, Medium, Low
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formDueDate, setFormDueDate] = useState('Today');
  const [formDueTime, setFormDueTime] = useState('18:00');
  const [formCategory, setFormCategory] = useState('Study');

  // Open Add Modal
  const openAddModal = () => {
    setEditingTaskId(null);
    setFormTitle('');
    setFormPriority('Medium');
    setFormDueDate('Today');
    setFormDueTime('18:00');
    setFormCategory('Study');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (task) => {
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormPriority(task.priority);
    setFormDueDate(task.dueDate);
    setFormDueTime(task.dueTime || '18:00');
    setFormCategory(task.category || 'Study');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTaskId) {
      editTask(editingTaskId, {
        title: formTitle.trim(),
        priority: formPriority,
        dueDate: formDueDate,
        dueTime: formDueTime,
        category: formCategory,
        xpValue: formPriority === 'High' ? 50 : formPriority === 'Medium' ? 25 : 10,
      });
    } else {
      addTask({
        title: formTitle,
        priority: formPriority,
        dueDate: formDueDate,
        dueTime: formDueTime,
        category: formCategory,
      });
    }
    setIsModalOpen(false);
  };

  // Filter & Sort Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'completed'
        ? task.completed
        : !task.completed;
    const matchesPriority = priorityFilter === 'all' ? true : task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' ? true : task.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      const order = { High: 3, Medium: 2, Low: 1 };
      return (order[b.priority] || 0) - (order[a.priority] || 0);
    }
    if (sortBy === 'xp') {
      return (b.xpValue || 0) - (a.xpValue || 0);
    }
    return a.completed ? 1 : -1;
  });

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalTasks - completedCount;
  const totalAvailableXp = tasks
    .filter((t) => !t.completed)
    .reduce((acc, t) => acc + (t.xpValue || 25), 0);

  return (
    <div className="flex-1 min-w-0 pb-12 select-none">
      <Header />

      <div className="px-8">
        {/* Title & Quick Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#28184d] border border-purple-500/40 flex items-center justify-center text-purple-400">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Task Management
              </h2>
            </div>
            <p className="text-xs text-[#9d93c4] mt-1">
              Complete tasks to earn XP, level up, and maintain your streak.
            </p>
          </div>

          {/* New Task Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        </div>

        {/* Gamification Rules Info Banner (SRS 4.1) */}
        <div className="p-4 rounded-2xl bg-[#161033] border border-purple-500/30 mb-6 flex items-start gap-3 text-xs text-[#b8aedb]">
          <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">
              XP Rules & Fair-Play Engine Active:
            </span>
            <span>
              High Priority = 50 XP, Medium = 25 XP, Low = 10 XP. On-time completions receive +5 Bonus XP. Unchecking a completed task automatically deducts the XP to prevent farming.
            </span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="prodigy-card rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-[#786e96] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#120d2b] border border-[#2d2159] focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#786e96] focus:outline-none"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 bg-[#120d2b] p-1 rounded-xl border border-[#2b2055]">
            {['all', 'pending', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-[#8b82a8] hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Priority & Category Selectors */}
          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#120d2b] text-xs text-[#c4bcdc] rounded-xl px-3 py-2 border border-[#2d2159] focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="High">High (50 XP)</option>
              <option value="Medium">Medium (25 XP)</option>
              <option value="Low">Low (10 XP)</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#120d2b] text-xs text-[#c4bcdc] rounded-xl px-3 py-2 border border-[#2d2159] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Study">Study</option>
              <option value="Coding">Coding</option>
              <option value="Health">Health</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#120d2b] text-xs text-[#c4bcdc] rounded-xl px-3 py-2 border border-[#2d2159] focus:outline-none"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="xp">Sort by XP Value</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isCompleted = task.completed;
            return (
              <div
                key={task.id}
                className={`prodigy-card rounded-2xl p-4 flex items-center justify-between gap-4 transition-all border ${
                  isCompleted
                    ? 'border-[#221745] bg-[#140e2d]/60 opacity-80'
                    : 'border-[#2c2057] hover:border-purple-500/50'
                }`}
              >
                {/* Left: Custom Checkbox & Details */}
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-sm shadow-purple-500/50'
                        : 'border-2 border-[#544186] hover:border-purple-400 bg-transparent'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-sm font-semibold block truncate ${
                        isCompleted ? 'line-through text-[#7c7499]' : 'text-white'
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#938ba8]">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span>{task.category || 'General'}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#796f94]" />
                        <span>{task.dueDate}</span>
                      </span>
                      {task.dueTime && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#796f94]" />
                            <span>{task.dueTime}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Badges & Action Buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Priority Tag */}
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

                  {/* XP Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-[#0d3326] text-[#4ade80] border-[#166548]'
                        : 'bg-[#211747] text-purple-300 border-purple-500/30'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>+{task.xpValue || (task.priority === 'High' ? 50 : task.priority === 'Medium' ? 25 : 10)} XP</span>
                  </span>

                  {/* Edit Button */}
                  <button
                    onClick={() => openEditModal(task)}
                    className="p-2 rounded-xl text-[#8f85b0] hover:text-white hover:bg-[#251b54] transition-colors"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-xl text-[#8f85b0] hover:text-red-400 hover:bg-red-950/20 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 rounded-3xl prodigy-card p-8">
              <CheckSquare className="w-12 h-12 text-[#685d8a] mx-auto mb-3 opacity-50" />
              <p className="text-sm font-bold text-white">No tasks match your criteria</p>
              <p className="text-xs text-[#9d93c4] mt-1">Try clearing your filters or create a new quest!</p>
            </div>
          )}
        </div>
      </div>

      {/* Task Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#181138] border border-purple-500/40 rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingTaskId ? 'Edit Task Quest' : 'Create New Task Quest'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Finish Data Structures Lab Assignment"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-[#100c28] border border-[#2f235b] focus:border-purple-500 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Priority (XP Tier)
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="High">High (50 XP)</option>
                    <option value="Medium">Medium (25 XP)</option>
                    <option value="Low">Low (10 XP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Study">Study</option>
                    <option value="Coding">Coding</option>
                    <option value="Health">Health</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Due Date
                  </label>
                  <select
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="In 2 days">In 2 days</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aedb] mb-1">
                    Target Time
                  </label>
                  <input
                    type="time"
                    value={formDueTime}
                    onChange={(e) => setFormDueTime(e.target.value)}
                    className="w-full bg-[#100c28] border border-[#2f235b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#22184d] text-xs font-semibold text-gray-300 hover:bg-[#2d2066]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-purple-600/30"
                >
                  {editingTaskId ? 'Save Changes' : 'Create Task (+XP)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
