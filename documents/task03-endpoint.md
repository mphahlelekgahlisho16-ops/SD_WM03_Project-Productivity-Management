# Task 03 - GET /api/tasks (Read Endpoint)

Group: SD-WM03 | Learner 3: Katlego | Role: Backend & Database Developer
Project: Team Project & Productivity Management Platform | Fictional data only.

## Purpose
Add one working task read endpoint to the existing Task 02 Node.js backend and PostgreSQL schema.

## Database check (Task 02 schema reused)
The existing `tasks` table already holds everything needed (`id`, `title`, `status`), so **no SQL migration was required** and the database was not rebuilt.

## What was added
- `GET /api/tasks` in `src/server.js`
- It runs `SELECT id, title, status FROM tasks ORDER BY id` through the existing PostgreSQL connection (`src/db.js`).
- No authentication was added.

## Setup commands (Windows PowerShell, project folder)
```
npm.cmd install
copy .env.example .env      (then enter your own PostgreSQL password in .env)
npm.cmd start
```
The database `productivity_db` and the tables are created by running `db/task02_schema.sql` (see `docs/configuration.md`).

## Request / response evidence
Request:
```
GET http://localhost:3000/api/tasks
```
Response: `200 OK`, `Content-Type: application/json`
```json
[
  { "id": 1, "title": "Create wireframes",   "status": "done" },
  { "id": 2, "title": "Build landing page",  "status": "in_progress" },
  { "id": 3, "title": "Define user stories", "status": "done" },
  { "id": 4, "title": "Design login screen", "status": "todo" }
]
```

## Safe error handling
If PostgreSQL cannot be reached (for example the database is stopped or the connection settings are wrong), the endpoint returns:

`503 Service Unavailable`
```json
{ "error": "Service temporarily unavailable. Please try again later." }
```
The response never contains the password, connection settings or database error text. Only a short error code is written to the server's own console.

## Supervisor checks
- Returns valid JSON: yes.
- Exposes secrets: no. Credentials stay in the `.env` file, which is excluded from Git.
