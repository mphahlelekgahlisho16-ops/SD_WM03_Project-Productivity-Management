# Repository Evidence – Task 03

Branches (local; push to remote when publishing):
```
develop
docs/PMP-1-repo-evidence
docs/PMP-2-branching-strategy
docs/PMP-30-team-decision
docs/PMP-34-readme-startup
docs/PMP-35-backlog-evidence
docs/PMP-36-evidence-refresh
docs/PMP-37-repo-evidence-final
docs/PMP-7-sprint-backlog
docs/evidence-refresh
feature/PMP-3-backend-skeleton
feature/PMP-31-api-contract-stub
feature/PMP-32-frontend-task-list-spike
feature/PMP-4-frontend-skeleton
feature/PMP-5-db-schema-ci
feature/PMP-6-auth-register
main
```

Commit graph:
```
*   36bdbf5 (HEAD -> docs/PMP-37-repo-evidence-final, develop) Merge PR #13: PMP-36 evidence outputs
|\  
| * 7b646da (docs/PMP-36-evidence-refresh) docs: add test, build and smoke-test output as evidence
|/  
*   c062e60 Merge PR #12: PMP-35 backlog update
|\  
| * 60fd23d (docs/PMP-35-backlog-evidence) docs: Task 03 backlog update with status, blockers and progress log
|/  
*   5024c3b Merge PR #11: PMP-34 README startup steps
|\  
| * 149177f (docs/PMP-34-readme-startup) docs: README with reproducible startup, remove Docker (not an approved tool), document limitations
|/  
*   178bf1c Merge PR #10: PMP-32 frontend task list spike
|\  
| * cd8a906 (feature/PMP-32-frontend-task-list-spike) feat: task list UI with status change, wired to agreed contract (spike)
|/  
*   5c7ee19 Merge PR #9: PMP-31 API contract stub + tests
|\  
| * e18eaaa (feature/PMP-31-api-contract-stub) feat: in-memory stub of agreed task API contract with API tests (PMP-31 spike)
|/  
*   0548c0d Merge PR #8: PMP-30 integration agreement
|\  
| * 696ab06 (docs/PMP-30-integration-agreement) docs: Task 03 integration agreement, API contract, Postman collection, fictional seed data
|/  
| *   91503f5 (main) Release: sprint-1 baseline update
| |\  
| |/  
|/|   
* |   8149afe Merge PR #7: refresh evidence
|\ \  
| * | 2423101 (docs/evidence-refresh) docs: refresh repository evidence
|/ /  
| *   8226938 (tag: sprint-1-baseline) Release: sprint-1 planning baseline
| |\  
| |/  
|/|   
* |   1b8ed81 Merge PR #6: repository evidence
|\ \  
| * | 7526556 (docs/PMP-1-repo-evidence) docs: add repository evidence
|/ /  
* |   8ad3425 (tag: sprint-1-planning) Merge PR #5: PMP-7 sprint backlog
|\ \  
| * | 77c75e3 (docs/PMP-7-sprint-backlog) docs: add Sprint 1 backlog, product backlog and coordination plan
|/ /  
| | * 2fb2472 (feature/PMP-6-auth-register) chore: start PMP-6 auth registration (in progress)
| |/  
|/|   
* |   ecbad0a Merge PR #4: PMP-5 DB schema and CI
|\ \  
| * | 979ad37 (feature/PMP-5-db-schema-ci) feat: initial DB schema and CI workflow
|/ /  
* |   892acd0 Merge PR #3: PMP-4 frontend skeleton
|\ \  
| * | 8580468 (feature/PMP-4-frontend-skeleton) feat: frontend React/Vite skeleton wired to backend health
|/ /  
* |   1d5cab9 Merge PR #2: PMP-3 backend skeleton
|\ \  
| * | dc64238 (feature/PMP-3-backend-skeleton) feat: backend Express skeleton with health endpoint
|/ /  
* |   795eacb Merge PR #1: PMP-2 branching strategy
|\ \  
| |/  
|/|   
| * 2b4a28f (docs/PMP-2-branching-strategy) docs: add branching strategy, PR and issue templates
|/  
* fe374ae chore: initial repository skeleton, README, docker-compose
```

Task 03 commits (since sprint-1-baseline):
```
7b646da docs: add test, build and smoke-test output as evidence
60fd23d docs: Task 03 backlog update with status, blockers and progress log
149177f docs: README with reproducible startup, remove Docker (not an approved tool), document limitations
cd8a906 feat: task list UI with status change, wired to agreed contract (spike)
e18eaaa feat: in-memory stub of agreed task API contract with API tests (PMP-31 spike)
696ab06 docs: Task 03 integration agreement, API contract, Postman collection, fictional seed data
2423101 docs: refresh repository evidence
```

Tracked files:
```
.editorconfig
.env.example
.github/ISSUE_TEMPLATE/user_story.md
.github/pull_request_template.md
.github/workflows/ci.yml
.gitignore
README.md
backend/package-lock.json
backend/package.json
backend/src/index.js
backend/src/routes/stub.js
backend/test/tasks.test.js
database/init.sql
database/seed.sql
docs/BRANCHING_STRATEGY.md
docs/INTEGRATION_AGREEMENT.md
docs/REPOSITORY_EVIDENCE.md
docs/SPRINT_BACKLOG.md
docs/evidence_api_smoke_test.txt
docs/evidence_backend_tests.txt
docs/evidence_frontend_build.txt
docs/postman/pmp-task03.postman_collection.json
frontend/index.html
frontend/package-lock.json
frontend/package.json
frontend/src/components/TaskList.jsx
frontend/src/main.jsx
frontend/vite.config.js
```

Verification outputs: `docs/evidence_backend_tests.txt` (6/6 pass), `docs/evidence_api_smoke_test.txt`, `docs/evidence_frontend_build.txt`.

Screenshots still to attach from the real shared repo: GitHub commits/branches/PR pages, Postman run, browser view of task list.