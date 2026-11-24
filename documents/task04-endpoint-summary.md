# Task 04 - Project/Task Data Flow (Create and List)

Group: SD-WM03 | Learner 3: Katlego | Role: Backend & Database Developer
Fictional data only. This document contains no credentials.

## What was done
The Task 03 backend and PostgreSQL schema were reused. The schema was not changed or rebuilt, and the existing table names, column names and IDs were kept. Create and list operations for projects and tasks now read from and save to PostgreSQL, with input validation.

## Endpoint summary
| Method | Endpoint | Purpose | Success | Error responses |
|---|---|---|---|---|
| GET | /health | API and database check (Task 02) | 200 | 503 |
| GET | /api/users | List users (valid owner_id / assignee_id values) | 200 | 503 |
| GET | /api/projects | List projects | 200 | 503 |
| POST | /api/projects | Create a project | 201 | 400, 503 |
| GET | /api/tasks | List tasks: id, title, status (Task 03) | 200 | 503 |
| POST | /api/tasks | Create a task | 201 | 400, 503 |

## Validation rules
**POST /api/tasks**
- `title`: required text, up to 200 characters
- `project_id`: required whole number, must be an existing project
- `status`: optional, one of todo, in_progress, done (default todo)
- `priority`: optional, one of low, medium, high (default medium)
- `assignee_id`: optional, must be an existing user
- `due_date`: optional, valid date as YYYY-MM-DD
- `description`: optional text

**POST /api/projects**
- `name`: required text, up to 150 characters
- `owner_id`: required whole number, must be an existing user
- `status`: optional, one of planning, active, completed (default planning)
- `description`: optional text

**Responses**
- Validation problem: `400` with `{"error":"Validation failed","details":["..."]}`
- Malformed JSON: `400` with `{"error":"Invalid JSON in request body"}`
- Database unreachable: `503` with `{"error":"Service temporarily unavailable. Please try again later."}` (no credentials or internal details)

## Examples
Valid request: `POST /api/tasks`
```json
{ "title": "Prepare report", "project_id": 1, "priority": "high", "due_date": "2026-11-30" }
```
Response `201 Created`
```json
{ "id": 5, "project_id": 1, "title": "Prepare report", "description": null,
  "status": "todo", "priority": "high", "assignee_id": null, "due_date": "2026-11-30" }
```
Invalid request (missing title): `POST /api/tasks` with `{ "project_id": 1 }`

Response `400 Bad Request`
```json
{ "error": "Validation failed", "details": ["title is required"] }
```

## Setup notes (no credentials)
1. Install PostgreSQL and create an empty database named `productivity_db`.
2. Run `backend/db/task02_schema.sql` in that database. It creates the tables and the sample records below. Running it again resets the data to this sample state.
3. In the `backend` folder run `npm install`.
4. Copy `.env.example` to `.env` and enter your own PostgreSQL password. Never commit `.env`.
5. Run `npm start`. The API runs on `http://localhost:3000`.
6. In Postman use the base URL `http://localhost:3000` and, for POST requests, the header `Content-Type: application/json` with a raw JSON body.

## Sample fictional records (created by task02_schema.sql)
| users.id | full_name | role |
|---|---|---|
| 1 | Alex Morgan | admin |
| 2 | Sam Rivera | member |
| 3 | Jordan Lee | member |

| projects.id | name | owner_id | status |
|---|---|---|---|
| 1 | Website Redesign | 1 | active |
| 2 | Mobile App MVP | 2 | planning |

| tasks.id | project_id | title | status |
|---|---|---|---|
| 1 | 1 | Create wireframes | done |
| 2 | 1 | Build landing page | in_progress |
| 3 | 2 | Define user stories | done |
| 4 | 2 | Design login screen | todo |

## Out of scope
The older scaffold routes from Task 01 (members, update and delete, per-project task routes, GET /api/users/:id, POST /api/users) were not changed. They still use temporary in-memory data and are not saved to PostgreSQL.
