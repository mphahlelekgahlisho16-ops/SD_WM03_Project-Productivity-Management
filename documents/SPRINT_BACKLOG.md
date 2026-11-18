# Sprint Backlog - Project & productivity management platform

**Sprint 1 - "Foundation & core task management"**
**Duration:** 2 weeks. 
**Sprint goal:** A running full-stack platform where a user can register, log in, create a project and add tasks to it
**Team capacity:** 5 members **commited: 40 story points**

## Team roles
Member                   Role                            Focus
Kgahlisho Mphahlele      Team lead/Scrum coordinator     Repository, CI, integration, coordination
Tanzwani Denga           Frontend developer              UI/UX, API integration
Katlego Mokwena         Backend developer                 Database, API, auth
Atlegang Mphahlele      QA, integration, DevOps engineer  Tests
Vincent Thamaga         Documentation, Product analyst    README, demo

## Sprint backlog
ID               Priority           User story                               Acceptance criteria                         Suggested owner
S01              Must               As a team, we need a shared              Repsoitory exists; all five learners        Team coordinator
                                    repository so that everyone can          have appropriate access;
                                    collaborate.                             README and folder structure commited
S02              Must               As a team, we need agreed Git            `main` and `develop` exist; branch          Team coordinator
                                    workflow so changes can be integrated    naming and PR review rules are documented;
                                    safely                                   each learner can create and push a feature
                                                                             branch.
S03              Must               As a developer, I need reproductable     Prerqusities, clone steps, environment       Documentation lead 
                                    local setup instructions.                configuration, database setup, and 
                                                                             frontend/backend run commands are documented
                                                                             and checked
S04              Must               As a team, we need the MVP scope and    MVP covers projects, tasks, assignees, status     
                                    assumptions recorded.                   and deadlines; roles, communication and synthetic
                                                                            data rules are recorded; team approvals are
                                                                            captured.   
S05              Must               As a developer, I need the backend      Express app starts locally; health check       Backend lead
                                    foundation.                             endpoint responds successfully; errors are
                                                                            handled consistently. 
S06              Must               As a developer, I need the frontend     React app starts locally; a basic landing     Frontend developer
                                    foundation.                             shell renders; API base URL is configurable.
S07              Must               As a developer, I need the database     PostgreSQL database can be created; initial   Database lead
                                    foundation                              schema for projects, tasks, and users is 
                                                                            documented.
S08              Should             As a team, we need a shared API         Initial endpoint list and request examples    Backend + Frontend
                                    contract.                               are documented; team reviews the contract
                                                                            before implementation.
S09             Should              As a tem, we need visible progress      Task board has To Do, In Progress,            Team coordinator
                                    process.                                Done; every active item has one owner and 
                                                                            an update

## Product backlog
ID                  Item                                                                         Est.
PMP-20              Drag-and-drop task board, status update via `PATCH/api/tasks:id`             5
PMP-21              Task comments and file attachments                                           8
PMP-22              Sprint/iteration planning module (sprints, burndown)                         8
PMP-23              Productivity dashboard (tasks completed, overdue, per-user workload)         8
PMP-24              Notifications & due-date reminders (email)                                   5
PMP-25              Role-based permisiion (owner.admin/member)                                   5
PMP-26              Time tracking per task                                                       5
PMP-27              Deployment/hosting                                                           5

## Coordination & ceremonies
Ceremony                When                     Purpose
Sprint planning         Day 1 (60 mins)          Confirm goal, assign tickets
Daily stand-up          Daily, 45 mins           Yesterday/Today/Blockers
PR review SLA           Within 24 hours          Keep `develop` flowing
Mid-sprint check        Day 5                    Re-forecast, move scope if needed
Sprint review + demo    Day 10                   Demo from `develop`; tag `sprint-1` on `main`
Retrospective           Day 10 (30 min)          Start/Stop/Continue

**Tooling:** GitHub Projects board with columns *To Do → In Progress → In Review → Done*; each card links to its PR. Branch per ticket (`feature/PMP-<id>-…`).

## Risks
Risk                                Impact                      Mitigation
Members new to Git workflow         Merge conflicts             Pair on first PRs; use cheat-sheet in branching doc
Auth work blocks frontend           Delay of PM-9               Agree API contract
Environment differences             "Works on my machine"       Documented local PostgreSQL setup; Node 20 pinned

# Task 03 - Integration Milestone

**Mileston:** *View projects/tasks and change one task's status
**Contract:** `documents/TEAM_DECISIONS.md` 
Status key

ID              Task                       Owner                       Branch                                               Status                 
PMP-30          Integration agreement,     Tech lead                   `docs/PMP-30-team-decisions`                  Done
                API contract, ownership,
                Postman collection,
                fictional seed data.
PMP-31a         Stub of agreed API + 6     Tech lead                   `docs/PMP-31-api-contract-stub`                    Done                     
                API tests (spike)
PMP-31b         **PostgreSQL-backed** 
                projects/tasks/PATCH routes Backend developer           `feature/PMP-31-*`                                  Pending
                replacing stub.
PMP-32a         Task list UI + status      Tech lead                    `feature/PMP-32-frontend-tasks-list-spike`
                drop-down (spike).  
PMP-33          Run Postman collection
                against live API, record   QA                           `feature/PMP-33*`
                results.
PMP-34          README with reproducable   Tech lead                    `docs/PMP-34-readme-startup`                       Done
                startup steps.
PMP-35          Updated backlog +          Tech lead                    `docs/PMP-35-backlog-evidence`                     Done
                repository evidence.
 
 
**Integration status (honest):** Frontend ↔ backend integration is demonstrated **against the in-memory stub only**. Full integration with PostgreSQL is **not** complete.


## Blockers
ID              Blocker                                 Impact                              Owner                 Action
B1              Backend developer's DB-backed routes    Cannot integrate with PostgreSQL    Backend dev          Deliver PR to `develop`;
                not yet delivered.                                                                               stub marked with `TODO(PMP-31)`
B2              Frontend dev has not yet reviewed spike UI behaviour unconfirmed            Frontend dev         Run README steps, report issues.
                UI in browser.                          beyond build.
B3              Team sign-off of contract not recorded  Ownership not formally confirmed    Tech lead            Collect confirmations in
                                                                                                                 integration agreement.
B4              PostgreSQL scrips not executed in this  Seed script untested.               Backend dev          Run README and report.
                environment.
B5              Supervisor feedback not yet recieved.   Cannot confirm milestone realism    Tech lead            Reminder meessage



