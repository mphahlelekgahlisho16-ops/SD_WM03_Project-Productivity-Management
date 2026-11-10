# Project & Productivity Management Platform

A web platform for planning projects, assigning and tracking, and measuring team productivity (boards, sprints. deadlines, dashboards)

> **Status:** Sprint 1 - foundation
See [`documents/SPRINT_BACKLOG.md`](documents/SPRINT_BACKLOG.md)

## 1. Tech Stack (agreed)

Layer                                 Technology
Frontend                              React.js
Backend                               Node.js + Express.js
Database                              PostgreSQL 
Version control and collaboration     Git + GitHub
API testing                           Postman
Editor                                VS Code
Diagrams                              diagrams.net
Team communication                    WhatsApp for daily coordination; Microsoft Teams for team meetings
          
## 2. Repsitory Structure

```
pmp-platform/
    backend/        # Express API
    frontend/       # React application
    database/       # SQL schema, seed data, and migrations
    documents/      # Scope, decisions, diagrams, and meeting notes
    .gitignore
    .env.example   # Environment varaible template
    README.md
```

## 3. Prerequisities

Install Git, Node.js (LTS), npm, and PostgreSQL. Install VSCodium and Postman if you will use the proposed tools.

Check installations:

```bash
git --version
node --version
npm --version
psql --version
```

## 4. Clone the repository

Replace `<https://github.com/mphahlelekgahlisho16-ops/SD_WM03_Project-Productivity-Management.git>` with the URL of the team's GitHub repository:

```bash
git clone <https://github.com/mphahlelekgahlisho16-ops/SD_WM03_Project-Productivity-Management.git >
cd SD_WM03_Project_and_Productivity_Management
```


## 5. Run local commands

The frontend and backend will each have their own `package.json`. Once those applications have been scaffolded and dependencies/scripts are committed:

**Backend terminal**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your local PostgreSQL connection details.
npm run dev
```

**Frontend terminal**
```bash
cd frontend
npm install
npm run dev
```

**Database**
1. Create a local PostgreSQL database, for example `project_management_api`.
2. Run the SQL scripts in `database/` in the order documented there.
3. Use synthetic seed records only.

Typical local environment variables (never commit real credentials):

```env
# backend/.env.example
PORT=5000
DATABASE_URL=postgresql://postgres:your_local_password@localhost:5432/project_management_api
```

The commands above are the agreed proposed local workflow; they become executable after the team creates the app manifests, scripts, and database schema.

## 5. Branching & integration (summary)

Trunk-based flow with a protected `develop` integration branch:
- `main` - always releasable; updated only from `develop` at sprint end (tagged `sprint-N`)
- `develop` - integration branch; all features merge here via pull request
- `feature/PMP-<id>-short-name` - one per backlog item, branched from `develop`
- `fix/...`, `docs/...` - same rules

Rules: no direct pushes to `main`/`develop`; 1 approving review; CI must pass; squash-merge features; Conventional commits (`feat:`, `docs:`, `chore:`)

## 6. API overview (planned)
Method    Endpoint              Description
GET       `/api/health`         Health check (done)
POST      `/api/auth/register`  Register user
POST      `/api/auth/login`     Login, returns JWT
GET/POST  `/api/projects`       List/create projects
GET/POST  `/api/projects/:id/tasks   Tasks in a project
PATCH     `/api/tasks/:id       Update status/assignee

## 7. Database (initial schema)
`users`, `projects`, `project_members`, `tasks` 

## 8. Team workflow

1 Pick a ticket from the Sprint Backlog, move it to **In progress**
2 `git checkout develop && git pull && git checkout -b feature/PMP-< id>-name
3 Commit small, push, open a PR to develop using the template
Reviewer approves; squash-merge; delete branch; move ticket to Done

## 9. Troubleshooting
- Port in use: change BACKEND_PORT/FRONTEND_PORT in .env
-DB connection refused: run docker compose ps; wait for db to be healthy
- Stale schema: reset the DB (command above)