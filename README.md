# Full-Stack Task Workflow Assignment

Mono-repo containing:
- `server-side/` — **NestJS + TypeORM + SQLite** (workflow rules enforced on backend)
- `front/` — **Next.js (App Router) + TypeScript + Tailwind** (UI reflects rules + disables invalid actions)

---

## ✅ Deliverables Included

1. **Source code** (backend + frontend)
2. **README** with setup instructions (this file)
3. **Database schema/migrations + demo users**
   - `src/database/migrations/*-init-schema.ts`
   - `src/database/migrations/*-seed-users.ts`

---

## 🧩 Core Workflow Rules (Implemented)

1. A task is assigned to exactly one user at any moment.
2. A task is either Open or Closed. Closed tasks are immutable.
3. Status is tracked by ascending integers: 1, 2, 3…
4. Forward moves must be sequential (no skipping).
5. Backward moves are always allowed.
6. A task may be closed only at its final status.
7. Every status change must:
   - (a) satisfy type-specific data requirements
   - (b) record the next assigned user

---

## 🏗️ Tech Stack

### Backend
- Node.js + NestJS
- TypeORM
- SQLite
- TypeORM migrations for schema + seeding

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Fetch-based API integration

---

## 🗄️ Database & Migrations

The backend uses SQLite and TypeORM migrations.

### Migration files
Located under:
server-side/src/database/migrations/

markdown
Copy code

Included migrations:
- `*-init-schema.ts` — creates DB schema
- `*-seed-users.ts` — inserts demo users

### Run migrations
```bash
cd server-side
npm run migration:run
typeorm.config.ts uses synchronize: false (schema is managed by migrations).

👥 Demo Users
Seeded by migration:

ID	Name
1	Alice
2	Bob
3	Charlie

You can verify:

GET /users

🚀 Local Setup
Prerequisites

Node.js 18+

npm 9+ (tested on npm 11 as well)

▶ Backend Setup (NestJS)
cd server-side
npm install
npm run migration:run
npm run start:dev


Backend URL:

http://localhost:3000

▶ Frontend Setup (Next.js)
cd front
npm install
npm run dev


Frontend URL:

Next will print the URL (usually http://localhost:3001 or http://localhost:3000 if port is free)

🧪 How to Use

Open the frontend UI.

Create a task:

Choose type (PROCUREMENT / DEVELOPMENT)

Choose the initial assigned user

Move tasks through workflow:

Forward (Next) requires required data + next assigned user

Backward (Back) is always allowed

Close task:

Only enabled when task is at its final status

Closed tasks become immutable
