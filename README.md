# Financer

Financer is a **Next.js** personal finance dashboard: enter your name on the landing screen, then explore **Home** (overview, charts, recent activity), **Transactions** (filterable table), and **Insights** (computed stats and category breakdown). Data is **mocked and persisted locally** in the browser via **Zustand** (`localStorage`).

---

## Tech stack

| Layer            | Choice                                                                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | [Next.js](https://nextjs.org) 15 (App Router), React 19                                                                                        |
| Language         | TypeScript                                                                                                                                     |
| Styling          | [Tailwind CSS](https://tailwindcss.com) v4 (`@tailwindcss/postcss`)                                                                            |
| UI primitives    | [Cloudflare Kumo](https://developers.cloudflare.com/kumo/) — `Button`, `Input`, `Surface`, `Text`, `TooltipProvider`, etc.                     |
| Icons            | [@phosphor-icons/react](https://phosphoricons.com/)                                                                                            |
| Charts           | [Recharts](https://recharts.org) (area, pie), [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) (line) |
| State            | [Zustand](https://zustand-demo.pmnd.rs/) with `persist` middleware                                                                             |
| Dates (insights) | `date-fns` (used in `src/lib/insights.ts`; pulled in via the dependency graph)                                                                 |

Fonts: **SF Pro** is loaded from `public/fonts/SFPro.otf` via `next/font/local` as `--font-my-font` in the root layout.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Development uses Turbopack (`next dev --turbopack`).

Other scripts:

| Script                 | Purpose               |
| ---------------------- | --------------------- |
| `npm run build`        | Production build      |
| `npm run start`        | Run production server |
| `npm run lint`         | ESLint (`next lint`)  |
| `npm run format`       | Prettier write        |
| `npm run format:check` | Prettier check        |
| `npm run check`        | Lint + format check   |

---

## App routes

| Path            | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `/`             | Landing: collect display name, then navigate to `/home`                         |
| `/home`         | Dashboard: greeting, stat cards, income/expense line chart, recent transactions |
| `/transactions` | Full transaction list with search, date range, sort, optional month grouping    |
| `/insights`     | Insight stat cards, balance area chart, spending-by-category pie chart          |

`AppShell` hides the sidebar on `/` only; other routes get the sidebar + main content area. On viewports below the `lg` breakpoint, a mobile header with hamburger opens a slide-out sidebar (`mobileNavOpen` in the common store).

---

## Project structure (high level)

```
src/
  app/                 # App Router: layout, pages, global CSS
  components/          # Feature UI (Home, Transactions, Insights, Sidebar, charts, cards)
  hooks/               # e.g. useIsMobile
  layout/              # AppShell
  lib/                 # Mock API, insights math, formatting, seed data
  store/               # Zustand stores
  types/               # Transaction, UserRole
public/
  fonts/               # SF Pro (see layout)
```

Barrel exports: `@/store` re-exports theme, common, and transaction stores; charts are re-exported from `src/components/charts/index.ts`.

---

## State management (Zustand)

### `useThemeStore` (`src/store/themeStore.ts`)

- **State:** `theme: 'light' | 'dark'`
- **Actions:** `setTheme(theme)`
- **Persist:** key `Theme-storage`, only `theme` is persisted.

`ThemeSync` (`src/components/providers/theme-sync.tsx`) runs on the client and sets `document.documentElement` `data-mode` and the `dark` class so Kumo and Tailwind `dark:` variants stay aligned.

### `useCommonStore` (`src/store/common.ts`)

Global UI and filters. **Persisted** (`common-storage`): `role`, `groupByMonth`, `welcomeMessage`.

| Field / setter                                      | Role                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| `name`, `setName`                                   | Display name (set from landing page)                                  |
| `isLoading`, `setIsLoading`                         | Global loading flag (e.g. home page while fetching mock transactions) |
| `role`, `setRole`                                   | `'viewer' \| 'admin'` (sidebar footer)                                |
| `welcomeMessage`, `setWelcomeMessage`               | Time-of-day greeting (`HomeHeader`)                                   |
| `search`, `setSearch`                               | Transaction search string                                             |
| `sortBy` / `sortOrder`, `setSortBy`, `setSortOrder` | Table sort (`date` or `amount`, `asc` / `desc`)                       |
| `dateFrom` / `dateTo`, `setDateFrom`, `setDateTo`   | ISO date strings for filtering                                        |
| `groupByMonth`, `setGroupByMonth`                   | Group transactions by month in the table                              |
| `collapsed`, `setCollapsed`                         | Sidebar width (desktop)                                               |
| `mobileNavOpen`, `setMobileNavOpen`                 | Mobile slide-out nav                                                  |

### `useTransactionStore` (`src/store/transactions.ts`)

- **State:** `transactions: Transaction[]` (starts empty; seeded by mock fetch or `resetToSeed`).
- **Actions:**
  - `addTransaction(t)` — prepends with generated `id`
  - `deleteTransaction(id)`
  - `updateTransaction(id, patch)`
  - `resetToSeed()` — restores `initialTransactions` from `src/lib/mock-transactions.ts`
- **Persist:** key `transactions-storage`, only `transactions`.

---

## Library layer (`src/lib`)

### `formatMoney.ts`

- **`formatMoney(n: number)`** — `Intl.NumberFormat` USD string (used in insights and elsewhere).

### `mock-transactions.ts`

- **`initialTransactions`** — static seed `Transaction[]` for demos and `resetToSeed`.

### `mock-api.ts`

- **`fetchTransactions(delayMs?)`** — `async` mock: waits (default 900 ms), returns a **clone** of `initialTransactions`. Used on `/home` when there is no persisted transaction list yet.

### `insights.ts` — important functions

| Function                    | Purpose                                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sumIncome` / `sumExpenses` | Totals by transaction type                                                                                                                                                                     |
| `monthlyIncomeExpense`      | Aggregates per `YYYY-MM` month                                                                                                                                                                 |
| **`getBalanceChartData`**   | Returns `BalanceChartPoint[]` (`name`, `income`, `expenses`) for Recharts — short month labels via `date-fns`                                                                                  |
| `balanceTrend`              | Cumulative running balance over time (sorted by date)                                                                                                                                          |
| `expenseByCategory`         | Totals expenses per category, sorted descending                                                                                                                                                |
| **`computeInsights`**       | Builds an array of **`InsightsStatCardProps`** for the Insights UI: highest spending category, month-over-month expenses, **savings rate** \((income − expenses) / income\), top income source |

Types exported: **`BalanceChartPoint`**, **`InsightsStatCardProps`** (title, value, subtitle, accent, icon, backgroundColor).

---

## Custom `Card` system (`src/components/cards.tsx`)

Sharp-cornered, border-first cards used across Home and Insights. Built with a small **`cn`** helper (class string join) and **no external card library**.

| Export                | Role                                                                |
| --------------------- | ------------------------------------------------------------------- |
| **`Card`**            | Root container: `rounded-none`, zinc border, light/dark backgrounds |
| **`CardHeader`**      | Top section with bottom border                                      |
| **`CardContent`**     | Main padded body                                                    |
| **`CardFooter`**      | Footer with top border                                              |
| **`CardTitle`**       | `h3`, bold, tracking                                                |
| **`CardDescription`** | Muted supporting text                                               |

All accept standard HTML attributes for their element (`HTMLAttributes`) plus `className` for composition.

---

## Charts (`src/components/charts/`)

| Component           | Stack                                         | Used for                                                      |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------- |
| **`LineChart`**     | Chart.js + react-chartjs-2                    | Home: income vs expenses over time (tabs: 7-day / monthly)    |
| **`BalanceChart`**  | Recharts `AreaChart`, custom tooltip          | Insights: balance trend area chart                            |
| **`CategoryChart`** | Recharts `PieChart` + Kumo `Surface` / `Text` | Insights: spending by category (empty state when no expenses) |

Re-exports: `src/components/charts/index.ts` → `BalanceChart`, `CategoryChart`, `LineChart`.

---

## Notable UI components

- **`AppShell`** — Layout: optional sidebar, mobile overlay, body scroll lock when mobile menu is open, integrates `ThemeSync`.
- **`SidebarNav`** — Collapsible sidebar; uses `useIsMobile()` (`max-width: 1023px`) to close menu on navigation on small screens.
- **`HomePlaceholder`** — Composes `HomeHeader`, `HomeFirstBox`, `HomeSecondBox`.
- **`HomeFirstBox`** — Stat cards (income, expense, balance) using **`Card`** + local **`StatCard`** styling.
- **`HomeChart1`** — Period toggle + **`LineChart`** fed from transaction data.
- **`HomeTransactions`** — Recent transactions preview.
- **`Transactions`** / **`transactionsTable`** — Full table with filters driven by `useCommonStore` + `useTransactionStore`.
- **`Insights`** / **`insightsFirstBox`** — Cards from **`computeInsights`**, **`BalanceChart`**, **`CategoryChart`**.

---

## Data model

```ts
// src/types/transaction.ts
type TransactionType = 'income' | 'expense';

interface Transaction {
  id: string;
  date: string;       // ISO date
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}
```

---

## Providers

- **`KumoRoot`** (`src/components/providers/kumo-root.tsx`) — Wraps the app with Kumo **`TooltipProvider`**.
- **`ThemeSync`** — Mounted inside `AppShell` (not inside `KumoRoot`) so theme applies to the document root.

---

## Environment & deployment

- No backend or API keys are required for the current mock flow; persistence is entirely client-side `localStorage` via Zustand.

For production deployment, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---
