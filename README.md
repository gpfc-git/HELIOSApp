# HELIOS DECK

**Cosmic Observatory** — Real-time space weather & geophysical signals dashboard.

Dark-mode SPA built with React 19 + Vite, aggregating live data from NASA, NOAA, and more into a mission-control-style interface.

---

## Stack

| Layer         | Technology        |
| ------------- | ----------------- |
| Framework     | React 19 + Vite   |
| Styling       | Tailwind CSS v4   |
| Routing       | React Router v7   |
| Data fetching | TanStack Query v5 |
| Charts        | Recharts          |
| Auth          | DummyJSON         |
| Deploy        | Vercel            |

---

## Signals

| Signal                 | Source         | Cadence    | Widget       |
| ---------------------- | -------------- | ---------- | ------------ |
| Solar Flares           | NASA DONKI     | ~1 hour    | Event Feed   |
| Coronal Mass Ejections | NASA DONKI     | ~1 hour    | Line Chart   |
| Solar Wind Speed       | NOAA SWPC      | ~1 minute  | Line Chart   |
| Kp Index               | NOAA SWPC      | ~3 hours   | Radial Gauge |
| ISS Position           | wheretheiss.at | ~5 minutes | Live Readout |

---

## Routes

| Path           | Page           | Access     |
| -------------- | -------------- | ---------- |
| `/login`       | Login          | Public     |
| `/dashboard`   | Dashboard      | Protected  |
| `/signals`     | Signal Catalog | Protected  |
| `/signals/:id` | Signal Detail  | Protected  |
| `/admin`       | Admin Panel    | Admin only |
| `*`            | 404            | Public     |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A NASA API key (free at [api.nasa.gov](https://api.nasa.gov))

### Install & run

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_NASA_API_KEY=your_nasa_api_key_here
```

Without the key, requests fall back to `DEMO_KEY` (heavily rate-limited).

---

## Demo Credentials

| Username  | Password      | Role      |
| --------- | ------------- | --------- |
| `emilys`  | `emilyspass`  | admin     |
| `oliviaw` | `oliviawpass` | moderator |

Admin users see an extra **Admin** tab in the navbar with access to `/admin`.

---

## Project Structure

```
src/
  app/          Router, providers, QueryClient config
  pages/        LoginPage, DashboardPage, SignalCatalogPage,
                SignalDetailPage, AdminPage, NotFoundPage
  components/
    layout/     Navbar, Layout, ProtectedRoute, AdminRoute
    ui/         SignalCard
    charts/     TimeChart, Gauge
    states/     LoadingState, ErrorState, EmptyState
    widgets/    SolarFlareWidget, SolarWindWidget, KpIndexWidget,
                CMEWidget, ISSWidget
  hooks/        useSolarFlares, useCME, useSolarWind, useKpIndex,
                useISS, useAuth
  lib/          constants.js, fetchers.js, normalizers.js
  styles/       index.css (Tailwind v4 @theme tokens)
```

---

## Build & Deploy

```bash
npm run build   # outputs to dist/
```

Deployed on Vercel with a rewrite rule (`vercel.json`) so all routes serve `index.html` for client-side navigation.

<!-- original Vite template notes below -->

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
