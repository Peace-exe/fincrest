# Fincrest — Personal Finance Dashboard

A clean, interactive personal finance dashboard built as a frontend assessment. Fincrest helps users track financial activity, understand spending patterns, and manage transactions — all with a distinctive vintage-luxury aesthetic.

---

## Live Demo & Repository

- **Deployed App:** _[Add your deployment URL here — Vercel / Netlify]_
- **Repository:** _[Add your GitHub repo URL here]_

---

## Overview

Fincrest is a React + TypeScript single-page application that simulates a personal finance dashboard. It is built with mock data, role-based UI behavior, and a fully client-side state management approach using Zustand.

The design language is intentionally premium — a cream, forest green, and gold palette with vintage-inspired typography — to demonstrate that finance UIs don't have to be sterile.

---

## Features

### 1. Dashboard Overview
- Summary cards for **Total Balance**, **Total Income**, and **Total Expenses**
- A **Net Worth card** showing overall financial position
- A **balance trend line chart** (time-based visualization)
- A **spending breakdown donut/bar chart** by category (categorical visualization)

### 2. Transactions Section
- Full transaction list with **date**, **amount**, **category**, and **type** (income / expense)
- **Search** by description or category
- **Filter** by type (income / expense) and category
- **Sort** by date or amount (ascending / descending)

### 3. Role-Based UI
Roles are simulated entirely on the frontend via a role switcher in the navbar.

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard & transactions | ✅ | ✅ |
| Add new transaction | ❌ | ✅ |
| Edit existing transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

No backend or auth is involved — the active role is stored in Zustand and gates UI elements accordingly.

### 4. Insights Section
- **Highest spending category** for the current period
- **Month-over-month expense comparison** (percentage change)
- **Top 3 spending categories** ranked by total spend
- Graceful empty state when no data is available

### 5. State Management (Zustand)
Three Zustand stores handle all application state:

- `useTransactionStore` — transaction list, CRUD operations, filter/sort state
- `useRoleStore` — active role (`viewer` | `admin`)
- `useUIStore` — dark mode toggle, modal open/close state

This avoids prop drilling and keeps component logic focused.

### 6. UI / UX
- Fully responsive layout (mobile, tablet, desktop)
- Dark mode toggle (vintage palette adapts — deep charcoal background, muted gold accents)
- Scroll-triggered navbar: transparent at top, frosted-glass blur on scroll
- Empty and loading states handled on all data-dependent views
- Dialog for add/edit transactions is decoupled from selection state to prevent stale UI

---

## Optional Enhancements Implemented

- ✅ **Dark mode** — full palette swap via CSS variables
- ✅ **Data persistence** — transactions survive page refresh via `localStorage` (Zustand persist middleware)
- ✅ **Animations** — staggered card entrance, hover transitions on transaction rows
- ✅ **Export** — download transactions as CSV or JSON from the transactions page

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| State | Zustand (with persist middleware) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Sidebar, PageWrapper
│   ├── dashboard/       # SummaryCards, NetWorthCard, BalanceTrendChart, SpendingBreakdown
│   ├── transactions/    # TransactionTable, TransactionDialog, Filters
│   └── insights/        # InsightCards, CategoryRanking, MonthComparison
├── stores/
│   ├── useTransactionStore.ts
│   ├── useRoleStore.ts
│   └── useUIStore.ts
├── data/
│   └── mockTransactions.ts   # Seed data
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts              # Formatting helpers, insight calculations
└── pages/
    ├── Dashboard.tsx
    ├── Transactions.tsx
    └── Insights.tsx
```

---

## Setup & Running Locally

**Prerequisites:** Node.js 18+ and npm/yarn

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd fincrest

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
http://localhost:5173
```

No environment variables or backend setup required — the app runs entirely on mock data.

---

## Assumptions Made

- All data is mock/static; no real financial data is used
- Role switching is for demonstration only — there is no authentication layer
- Persistence uses `localStorage` via Zustand's persist middleware; clearing browser storage resets to seed data
- Charts use Recharts with mock monthly data; in a real app this would be derived from actual transaction history

---

## Design Decisions

**Why Zustand over Context/Redux?**
For a dashboard of this scope, Zustand gives the right balance — minimal boilerplate, built-in persistence support, and clean selector-based subscriptions without the overhead of Redux.

**Why a vintage aesthetic?**
Finance dashboards tend toward sterile, corporate minimalism. A warm, premium palette (cream + forest green + gold) makes the interface feel trustworthy and considered without sacrificing readability. It also served as a deliberate creative constraint to demonstrate design thinking beyond default component library styles.

**Dialog state separation**
The add/edit dialog separates `dialogOpen` (boolean) from `editItem` (transaction | null). This prevents a flash of empty content when the dialog closes — a small but meaningful UX detail.

---

## Author

**Aman Yadav**
B.Tech Computer Science, Gautam Buddha University
[GitHub](https://github.com/Peace-exe)