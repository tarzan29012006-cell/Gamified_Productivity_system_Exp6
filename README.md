# QUESTFORGE – Gamified Productivity and Task Management System

> Prepared in **IEEE 830 / ISO/IEC/IEEE 29148 style** for BCA Final Year Project.  
> Inspired by the dark purple cyberpunk/RPG UI dashboard mockup.

---

## 🌟 Overview & Highlights

**QUESTFORGE** transforms everyday academic tasks and to-dos into an immersive role-playing game (RPG). Users earn experience points (**XP**), level up, maintain daily habit streaks, unlock prestigious cosmetic badges, and compete on cohort leaderboards.

The application has been built as a high-performance Single-Page Application (SPA) using **React 18**, **Tailwind CSS**, and **Chart.js**, reproducing the exact visual hierarchy, colors, glows, cards, and gamification mechanics of the provided UI mockup.

---

## 🎨 UI Dashboard Fidelity (Mockup Comparison)

| Section / Component | Specification in Mockup | Implementation in PRODIGY |
| :--- | :--- | :--- |
| **Theme & Aesthetic** | Deep dark purple (`#0e0a22`), neon glows, glassmorphism | Exact custom palette, gradient borders & glows |
| **Header** | `Hello, Kirthick! 👋`, Notification bell (badge 3), Avatar | Dynamic greeting, interactive notifications dropdown, avatar selector |
| **Stat Cards** | Level 12 (750/1000 XP), Tasks Completed 48 (+12%), Streak 7 days (+1), Total XP 7,850 (+250) | Fully reactive cards that update in real-time as tasks are completed |
| **My Tasks** | Tabs (Today: 4, Upcoming: 2, Completed: 12), High/Med/Low pills, inline `+ Add New Task...` | Real-time task toggle, on-time bonus (+5 XP), anti-farming deduction, quick add |
| **Your Journey** | Chibi RPG knight with glowing sword on pedestal, speech bubble ("7-day streak!"), Next Reward 80% | Custom vector artwork of chibi knight on pedestal, animated stars, streak bubble, reward bar |
| **Achievements** | Task Master (50), Streak Hero (7d), Level Up (Lvl 10), Focus Guru (100 - locked) | 4 badges on dashboard + full achievements & cosmetics wardrobe page |
| **Productivity Stats** | Glowing purple spline chart with Mon–Sun ticks, "This Week ⌵", 85% badge | Chart.js spline line chart with gradient area fill and custom tooltips |
| **Dream Big CTA** | Dartboard target icon with arrows, "Keep Going ->" button | Direct quick-action button navigating to task management |
| **Sidebar** | Prodigy trophy logo, navigation pills, mountain with flag at bottom-left | Full navigation menu + stylized vector mountain illustration matching mockup |

---

## 📑 10 Full-Featured Pages (SRS Version 1.0)

1. **Home (`/home` or `#home`)**: Public landing page with hero banner, 6 core feature cards, 3-step workflow, and platform counters.
2. **User Registration (`/register` or `#register`)**: Account creation starting at Level 1 (0 XP) with live password strength meter.
3. **Login (`/login` or `#login`)**: Authentication with 1-click **"Load Mockup State (Kirthick - Level 12)"** for instant review.
4. **Dashboard (`/dashboard` or `#dashboard`)**: The primary dashboard screen matching the uploaded UI screenshot.
5. **Task Management (`/tasks` or `#tasks`)**: Full task CRUD with status filters, priority tiers, category tags, search, and XP rules engine.
6. **XP and Level Progression (`/progress` or `#progress`)**: Interactive level ladder (Beginner to Master), math formula breakdown (`100 × n` vs `1,000 flat`), and activity history.
7. **Achievements and Rewards (`/achievements` or `#achievements`)**: Grid of all 6 SRS achievements with progress bars + cosmetic wardrobe (Avatar frames, Titles, Themes).
8. **Competitive Leaderboard (`/leaderboard` or `#leaderboard`)**: Top 3 Podium (Gold, Silver, Bronze), filter by BCA Cohort/Global, full rankings table.
9. **Productivity Analytics (`/analytics` or `#analytics`)**: Chart.js graphs (spline velocity curve, priority doughnut chart, daily XP bar chart).
10. **User Profile and Settings (`/settings` or `#settings`)**: Profile info, sound effect toggles, and an **Admin Gamification Tuning Panel** to adjust XP multipliers dynamically.

---

## ⚙️ Gamification Engine Rules (SRS Section 4)

- **Priority Base XP**:
  - High Priority: **50 XP**
  - Medium Priority: **25 XP**
  - Low Priority: **10 XP**
- **On-Time Bonus**: **+5 XP** added for tasks completed on or before the due date.
- **Late Penalty**: Completed tasks after the due date grant half base XP.
- **Streak Milestones**: One-time bonuses at 7 days (**+50 XP**), 14 days (**+100 XP**), and 30 days (**+250 XP**).
- **Anti-Farming Protection**: Unchecking a task subtracts the awarded XP and decrements the counter.
- **Level Threshold Formula**:
  $$\text{XP to Level } n+1 = 100 \times n \quad (1 \le n \le 9)$$
  $$\text{XP to Level } n+1 = 1,000 \quad (n \ge 10)$$
- **Sound & Confetti**: Synthesized Web Audio API sound effects (task completion chime, level up fanfare) and `canvas-confetti` bursts on achievements and level-ups.

---

## 🚀 Running the Project Locally

To run the development server or preview the production build on your machine:

```powershell
# 1. Start the Vite development server
node .\node_modules\vite\bin\vite.js

# 2. Or build and preview production build:
node .\node_modules\vite\bin\vite.js build
node .\node_modules\vite\bin\vite.js preview
```

Open your browser at `http://localhost:3000` (or the port indicated by Vite) to explore PRODIGY.
