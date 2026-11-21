import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialUser,
  initialTasks,
  initialAchievements,
  initialRewards,
  initialLeaderboard,
  initialNotifications,
  weeklyProductivityData
} from '../data/initialData';
import { getXpThresholdForLevel, getTitleForLevel, calculateTaskXp } from '../utils/xpCalculator';
import { sounds } from '../utils/sound';
import { triggerConfetti, triggerLevelUpConfetti } from '../utils/confetti';

const GamificationContext = createContext(null);

export const GamificationProvider = ({ children }) => {
  // Navigation Route State
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    return hash;
  });

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('prodigy_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  // Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('prodigy_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  // Achievements State
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('prodigy_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  // Rewards State
  const [rewards, setRewards] = useState(() => {
    const saved = localStorage.getItem('prodigy_rewards');
    return saved ? JSON.parse(saved) : initialRewards;
  });

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem('prodigy_leaderboard');
    return saved ? JSON.parse(saved) : initialLeaderboard;
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('prodigy_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  // Gamification Settings / XP rules (SRS 4.1)
  const [xpRules, setXpRules] = useState({
    lowBaseXp: 10,
    mediumBaseXp: 25,
    highBaseXp: 50,
    onTimeBonus: 5,
    antiAbuseLimit: true,
    soundEnabled: true,
  });

  // Celebration Modals
  const [levelUpData, setLevelUpData] = useState(null);
  const [achievementUnlockData, setAchievementUnlockData] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync route with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setCurrentRoute(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('prodigy_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('prodigy_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('prodigy_achievements', JSON.stringify(achievements));
  }, [achievements]);

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Task Completion (SRS 4.1)
  const toggleTask = (taskId) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const task = tasks[taskIndex];
    const newCompleted = !task.completed;
    const updatedTasks = [...tasks];

    // Calculate XP
    const taskXp = task.xpValue || (task.priority === 'High' ? 50 : task.priority === 'Medium' ? 25 : 10);

    let updatedUser = { ...user };
    let newTasksCompleted = user.tasksCompleted;

    if (newCompleted) {
      // Award XP
      newTasksCompleted += 1;
      const newTotalXp = user.totalXp + taskXp;
      let newCurrentLevelXp = user.currentLevelXp + taskXp;
      let newLevel = user.level;
      let threshold = user.nextLevelXp;
      let leveledUp = false;

      // Check for Level Up (SRS 4.2)
      while (newCurrentLevelXp >= threshold) {
        newCurrentLevelXp -= threshold;
        newLevel += 1;
        threshold = getXpThresholdForLevel(newLevel);
        leveledUp = true;
      }

      const newTitle = getTitleForLevel(newLevel);

      updatedUser = {
        ...updatedUser,
        tasksCompleted: newTasksCompleted,
        totalXp: newTotalXp,
        currentLevelXp: newCurrentLevelXp,
        nextLevelXp: threshold,
        level: newLevel,
        title: newTitle,
      };

      updatedTasks[taskIndex] = {
        ...task,
        completed: true,
        completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Sound & Visuals
      sounds.taskComplete();
      triggerConfetti();
      showToast(`+${taskXp} XP earned! Keep up the momentum! 🔥`);

      if (leveledUp) {
        setTimeout(() => {
          sounds.levelUp();
          triggerLevelUpConfetti();
          setLevelUpData({
            newLevel,
            title: newTitle,
            reward: newLevel === 13 ? '50 Gems + Level 13 Badge' : 'Cosmetic Frame unlocked!',
          });
        }, 300);
      }

      // Check achievement unlocks
      checkAchievements(newTasksCompleted, updatedUser.currentStreak, updatedUser.level);

    } else {
      // Revert XP to prevent XP farming (SRS 4.1)
      newTasksCompleted = Math.max(0, user.tasksCompleted - 1);
      const newTotalXp = Math.max(0, user.totalXp - taskXp);
      let newCurrentLevelXp = user.currentLevelXp - taskXp;
      let newLevel = user.level;
      let threshold = user.nextLevelXp;

      if (newCurrentLevelXp < 0) {
        if (newLevel > 1) {
          newLevel -= 1;
          threshold = getXpThresholdForLevel(newLevel);
          newCurrentLevelXp = threshold + newCurrentLevelXp;
        } else {
          newCurrentLevelXp = 0;
        }
      }

      updatedUser = {
        ...updatedUser,
        tasksCompleted: newTasksCompleted,
        totalXp: newTotalXp,
        currentLevelXp: newCurrentLevelXp,
        nextLevelXp: threshold,
        level: newLevel,
        title: getTitleForLevel(newLevel),
      };

      updatedTasks[taskIndex] = {
        ...task,
        completed: false,
        completedAt: null,
      };

      showToast(`-${taskXp} XP reverted (Task unchecked)`, 'info');
    }

    setTasks(updatedTasks);
    setUser(updatedUser);

    // Update Leaderboard current user row
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.isCurrentUser
          ? {
              ...entry,
              tasks: updatedUser.tasksCompleted,
              totalXp: updatedUser.totalXp,
              level: updatedUser.level,
              title: updatedUser.title,
            }
          : entry
      )
    );
  };

  // Check achievements after progress
  const checkAchievements = (tasksCount, streakCount, levelCount) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.unlocked) return ach;

        let shouldUnlock = false;
        let currentProg = ach.progress;

        if (ach.id === 'ach-taskmaster') {
          currentProg = tasksCount;
          if (tasksCount >= 50) shouldUnlock = true;
        } else if (ach.id === 'ach-focusguru') {
          currentProg = tasksCount;
          if (tasksCount >= 100) shouldUnlock = true;
        } else if (ach.id === 'ach-streakhero') {
          currentProg = streakCount;
          if (streakCount >= 7) shouldUnlock = true;
        } else if (ach.id === 'ach-consistencyking') {
          currentProg = streakCount;
          if (streakCount >= 30) shouldUnlock = true;
        } else if (ach.id === 'ach-levelup') {
          currentProg = levelCount;
          if (levelCount >= 10) shouldUnlock = true;
        }

        if (shouldUnlock && !ach.unlocked) {
          sounds.achievement();
          triggerConfetti(0.5);
          setAchievementUnlockData({
            ...ach,
            progress: currentProg,
            unlocked: true,
          });
          // Add notification
          setNotifications((notifs) => [
            {
              id: `notif-${Date.now()}`,
              title: `🏆 Unlocked: ${ach.title}!`,
              message: `You completed "${ach.condition}" and earned +${ach.bonusXp} Bonus XP!`,
              time: 'Just now',
              unread: true,
            },
            ...notifs,
          ]);
          return {
            ...ach,
            progress: currentProg,
            unlocked: true,
            unlockedDate: 'Today',
          };
        }

        return {
          ...ach,
          progress: currentProg,
        };
      })
    );
  };

  // Add Task
  const addTask = ({ title, priority = 'Medium', dueDate = 'Today', dueTime = '18:00', category = 'Study' }) => {
    let xp = 25;
    if (priority === 'High') xp = 50;
    else if (priority === 'Low') xp = 10;

    const newTask = {
      id: `t-${Date.now()}`,
      title: title.trim(),
      priority,
      dueDate,
      dueTime,
      category,
      completed: false,
      xpValue: xp,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task created! Complete it to earn +${xp} XP ✨`);
    return newTask;
  };

  // Edit Task
  const editTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    showToast('Task updated successfully');
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task deleted');
  };

  // Mark all notifications read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Reset demo data back to exact mockup state
  const resetToMockupData = () => {
    setUser(initialUser);
    setTasks(initialTasks);
    setAchievements(initialAchievements);
    setRewards(initialRewards);
    setLeaderboard(initialLeaderboard);
    setNotifications(initialNotifications);
    showToast('Reset to PRODIGY Mockup initial state!');
  };

  return (
    <GamificationContext.Provider
      value={{
        user,
        setUser,
        tasks,
        achievements,
        rewards,
        leaderboard,
        notifications,
        weeklyData: weeklyProductivityData,
        currentRoute,
        navigate,
        toggleTask,
        addTask,
        editTask,
        deleteTask,
        markAllNotificationsRead,
        resetToMockupData,
        levelUpData,
        setLevelUpData,
        achievementUnlockData,
        setAchievementUnlockData,
        toastMessage,
        xpRules,
        setXpRules,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};
