# CoachingOS — Enterprise Coaching Institute Management Platform

## Overview
**CoachingOS** is a multi-branch, role-aware enterprise management SaaS designed for offline coaching institutes, competitive exam academies, tuition centers, and hybrid online/offline education businesses.

This repository is structured into two main tiers:
- `frontend/`: Next.js 15 App Router frontend application with interactive client-side state management, role-based interfaces (Super Admin, Institute Admin, Teacher, Student), comprehensive analytics, and educational workflows.
- `backend/`: Planned architecture and specifications for the future Node.js/Express/MongoDB enterprise API service.

---

## Architecture Overview

```
COACHING/
├── frontend/              # Next.js 15 + React 19 + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/           # App Router: (marketing), (auth), (dashboard), (student), (teacher)
│   │   ├── components/    # Reusable UI & Layout Components (Design System)
│   │   ├── features/      # Feature modules (students, fees, attendance, timetable, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities, formatters, demo store
│   │   ├── providers/     # Demo state & UI context providers
│   │   ├── schemas/       # Zod validation schemas
│   │   └── types/         # Domain TypeScript definitions
│   └── tests/             # Vitest unit/component tests & Playwright specs
│
├── backend/               # Future Backend Architecture & Service Documentation
│   ├── src/               # Planned module structure (auth, institutes, students, fees, etc.)
│   └── README.md          # Complete REST API blueprint, DB schemas, and roadmap
│
└── README.md              # Project root documentation
```

---

## Phase 1 Frontend Status
- **Framework**: Next.js 15 (App Router), React, TypeScript (strict mode)
- **Styling**: Tailwind CSS, custom design tokens, Lucide React icons
- **State & Interactions**: Reactive demo state store allowing live additions, simulated fee payments, attendance marking, quiz evaluation, and inquiry-to-admission workflows.
- **Portals**:
  - Public Marketing & Lead Gen Portal (`/`)
  - Institute Administration Portal (`/dashboard`)
  - Student Learning Portal (`/student`)
  - Faculty/Teacher Portal (`/teacher`)
  - Auth demo entry points (`/login`)

---

## Getting Started

### Prerequisites
- Node.js >= 18 (Tested on v22)
- npm >= 9

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.
