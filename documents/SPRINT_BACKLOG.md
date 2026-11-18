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

## Definition of Done

- Acceptance criteria are met and demonstrated.
- Code is committed to a task branch and merged into `develop` through an approved PR.
- Relevant tests/manual checks pass.
- README or technical documentation is updated where needed.
- No secrets or real personal data are committed.
- The task board and sprint status are updated.

## Daily coordination

Each learner posts a short WhatsApp update:
1. What I completed since the last update.
2. What I will work on next.
3. Any blocker or help needed.

## Blockers
ID  Blocker                                                    Impact                                  Owner            Action                                                 Status 
B1  Backend developer's DB-backed routes not yet delivered    Cannot integrate with PostgreSQL          Backend dev     Deliver PR to `develop`; stub marked with `TODO(PMP-31)`  Open
B2  Frontend dev has not yet reviewed spike UI in a browser  UI behaviour unconfirmed beyond build     Frontend dev      Run README steps, report issues                   Open 
B3  Team sign-off of contract not recorded                   Ownership not formally confirmed           Tech Lead        Collect confirmations in integration agreement                             Open 
B4  PostgreSQL scripts (`init.sql`, `seed.sql`) not executed in this environment  Seed script untested  QA / Backend  Run README §4.3 and report                    Open 
B5  Supervisor feedback not yet received                     Cannot confirm milestone realism  Tech Lead  Reminder message sent (see submission document)                              Open 
