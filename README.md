# Full-Stack Task Workflow Assignment

Mono-repo containing:
- `server-side/` (NestJS + TypeORM + SQLite)
- `front/` (Next.js + TypeScript + Tailwind)

## Core Workflow Rules (Implemented)
1. Task assigned to exactly one user at any moment
2. Task is Open or Closed (Closed tasks are immutable)
3. Status tracked by ascending integers: 1,2,3…
4. Forward moves sequential only (no skipping)
5. Backward moves always allowed
6. Close only at final status
7. Every status change validates required data + records next assigned user

## Demo Users
Seeded demo users exist in SQLite (Alice, Bob, Charlie).

## Setup

### Backend
```bash
cd server-side
npm install
npm run start:dev
