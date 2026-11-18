# Team Decisions and Assumptions

**Project:** Project & Productvity Management
**Owner:** Technical lead - Kgahlisho Mphahlele
**Base:** existing Task 2 repository (not re-initialised). BRanches start from `develop`

## 1. Milestone 
"View projects and tasks, and change one task's status." Frontend displays a project and a task list; the user can move one task between statuses. Nothing else (no auth, no drag-and-drop) is in scope.

## 2. Agreed API contract
Base URL (local):`http://localhost:4000` Format:JSON. All data is fictional

Method & path                        Description
GET/api/health                       Health check
GET/api/projects                     List projects
GET/api/tasks[?projectId=]           List tasks
PATCH/api/tasks/:id body {"status":  Update status
todo|in_progress|review|done}

**Allowed `status` values:** `todo`, `in_progress`, `review`, `done` (matches the DB CHECK constraint in `database/init.sql`).
 
`GET /api/projects` → `200`
```json
[ { "id": 1, "name": "Demo Project Alpha", "description": "Fictional sample project" } ]
```
 
`GET /api/tasks` → `200`
```json
[
  { "id": 1, "projectId": 1, "title": "Draft sample project plan", "status": "todo",        "priority": "high",   "assigneeId": 1, "dueDate": "2026-11-20" },
  { "id": 2, "projectId": 1, "title": "Review sample wireframes",  "status": "in_progress", "priority": "medium", "assigneeId": 2, "dueDate": "2026-11-22" }
]
```
 
`PATCH /api/tasks/1` request → `200` response
```json
{ "status": "in_progress" }
```
```json
{ "id": 1, "projectId": 1, "title": "Draft sample project plan", "status": "in_progress", "priority": "high", "assigneeId": 1, "dueDate": "2026-11-20" }
```

**Naming rule:** API uses camelCase (projectId); the database uses snake_case (project_id). The backend maps between them.

## 3. Integration points & ownership
Integration point                            Provider  Consumer      Branch         Files owned
IP-1 Tasks/projects read API (DB-backed)     Backend developer       Frontend      `feature/PMP-31-*`  `backend/src/routes/*`, `backend/src/db.js` 
IP-2 Task status PATCH                       Backend developer       Frontend      `feature/PMP-31-*`  `backend/src/routes/tasks.js` 
IP-3 Task list UI + status control           Frontend developer                    `feature/PMP-32-*`  `frontend/src/components/*` 
IP-4 DB schema + seed data                   Backend developer       Backend       `feature/PMP-5-*` (done)  `database/*` 
IP-5 Tests / Postman checks                  QA / Documentation      All           `feature/PMP-33-*`  `backend/test/*`, `docs/postman/*` 
IP-6 Contract, README, backlog, merges       Technical Lead          All           `docs/PMP-30-*`  `docs/*`, `README.md`, `.github/*` 
 
**Rules:** one owner per file area; edits to someone else's area go through a PR to the owner. Contract changes need agreement of backend + frontend + lead and an update to this file in the same PR.
 
**Integration order:** (1) contract merged → (2) backend routes merged → (3) frontend list merged → (4) PATCH wired in UI → (5) Postman + README re-check on clean clone.

## 4. Integration spike (stub) – provided by the Technical Lead
To avoid blocking the frontend, the lead added an **in-memory stub** of the three endpoints (`backend/src/routes/stub.js`, branch `feature/PMP-31-api-contract-stub`) and a minimal task list page (`feature/PMP-32-frontend-task-list-spike`). The stub follows the contract exactly. **It is not the database-backed implementation**: the backend developer replaces it by swapping the data source (see `// TODO(PMP-31)` markers) without changing the contract.
 
## 5. Verification checklist (Postman collection: `docs/postman/pmp-task03.postman_collection.json`)
Check                                             Expected 
GET /api/health                                   200 `{status:"ok"}` 
GET /api/projects                                 200 array 
GET /api/tasks                                    200 array of tasks with the agreed fields 
PATCH /api/tasks/1 `{"status":"in_progress"}`     200, status changed 
PATCH /api/tasks/1 `{"status":"banana"}`          400 
PATCH /api/tasks/999                              404 
 
## 6. Honest status (update before submission)
See `docs/SPRINT_BACKLOG.md` → *Task 03 status* and *Blockers*. **Full DB-backed integration is not claimed** until the backend developer's PR is merged and the checklist above passes against PostgreSQL.
 
## 7. Sign-off 
Name                        Role                                    Agreed contract & ownership
Kgahlisho Mphahlele         Technical Lead / Scrum Coordinator      Y
Katlego Mokwena             Backend developer                       Y
Tanzwani Denga              Frontend developer                      Y
Atlegang Mphahlele          QA, DevOps engineer                     Y
Vincent Thamaga             Product Analyst                         Y