# Branching & Integration Strategy

## Branch model
```
main

develop

feature/...
```

Branch              Purpose             Created from    Merges into       Protection
`main`              Releasable code,                                      PR only, CI green
                    tagged per sprint.
`develop`           Integration of      `main`          `main`            PR only, CI green
                    finished features.
`feature/PMP-<id>-name`  One backlog item  `develop`     `develop`
`fix/PMP-<id>-name`     Bug fixes           `develop`    `develop`
`docs/...`              Docs/tooling        `develop`     `develop`

## Naming 
`feature/PMP-12-task-board`, `fix/PMP-31-login-redirect` (ticket ID from Sprint Backlog)

## Commit messages
`feat: add task creation endpoint`, `fix: correct due-date timezone`
`docs: update README` 

## Pull request rules
1. Branch is up to date with `develop` (rebase or merge `develop` in first).
2. PR title = `PMP-<id>: summary`; use the PR template
3. CI (lint + tests) passes.
4. At least **1 approving review** from someone other than the author.
5. **Squash-merge** into `develop`; delete the source branch.
6. Keep PRs small (< ~400 changed lines) and ideally merged withing 2 days.

## Integration cadence
- Merge to `develop` continuously (several times/week) to avoid long-lived branches.
- At sprint end (after review): PR `develop` to `main` (merge commit), tag `sprint-N`.
- Merge conflicts: the author of the later PR resolves them locally, never on develop.

## Definition of Done
Code reviewed and merged · tests pass · README/docs updated if behaviour changed · acceptance criteria met · demoable on `develop`.
 
## Git cheat-sheet
```bash
git checkout develop && git pull
git checkout -b feature/PMP-12-task-board
git add -p && git commit -m "feat: add task board column component"
git fetch origin && git rebase origin/develop
git push -u origin feature/PMP-12-task-board   # then open PR
```
 
## GitHub settings to apply (Settings → Branches)
- Protect `main` and `develop`: require PR, 1 approval, status check `CI`, disallow force-push.
- Allow squash merging only for feature PRs; auto-delete head branches.