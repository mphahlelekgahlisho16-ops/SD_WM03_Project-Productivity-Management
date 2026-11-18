# Configuration (Task 02)

Author: Katlego (Learner 3) | SD-WM03 | Fictional data only. This document contains no credentials.

## Requirements
Node.js (LTS), PostgreSQL, Git, VS Code/VSCodium. Postman is optional for testing.

## Environment variables
The API reads its settings from a `.env` file in the project root. A template called `.env.example` is committed to the repository. The real `.env` file is **not** committed (it is listed in `.gitignore`).

| Variable | Purpose | Example (placeholder) |
|---|---|---|
| PORT | Port the API listens on | 3000 |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | productivity_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | *(set by each developer in their own .env)* |

## Setup steps
1. Install PostgreSQL and create an empty database named `productivity_db`.
2. Run `db/task02_schema.sql` inside that database to create the `users`, `projects` and `tasks` tables.
3. Copy `.env.example` to `.env` and enter your own database password.
4. Install packages: `npm install`
5. Start the API: `npm start`

## Database design (keys)
- `users`: primary key `id`; unique `email`.
- `projects`: primary key `id`; foreign key `owner_id` references `users(id)`.
- `tasks`: primary key `id`; foreign key `project_id` references `projects(id)` (cascade delete); foreign key `assignee_id` references `users(id)` (set null on delete).

## Health check
`GET /health` confirms the API is running and can reach PostgreSQL.

Success (HTTP 200):
```json
{ "status": "ok", "database": "connected", "timestamp": "2026-11-10T12:00:00.000Z" }
```
Database unreachable (HTTP 503):
```json
{ "status": "error", "database": "disconnected", "timestamp": "2026-11-10T12:00:00.000Z" }
```
The response never includes credentials or internal error messages.
