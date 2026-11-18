-- Task 02: PostgreSQL schema - users, projects, tasks
-- Author: Katlego (Learner 3) | SD-WM03 | FICTIONAL DATA ONLY
-- Run inside the database "productivity_db" (pgAdmin Query Tool or psql). Safe to re-run.

DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  role       VARCHAR(20)  NOT NULL DEFAULT 'member' CHECK (role IN ('admin','member')),
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  description TEXT,
  owner_id    INT NOT NULL,
  status      VARCHAR(20) NOT NULL DEFAULT 'planning' CHECK (status IN ('planning','active','completed')),
  created_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_projects_owner FOREIGN KEY (owner_id) REFERENCES users(id)
);

CREATE TABLE tasks (
  id          SERIAL PRIMARY KEY,
  project_id  INT NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','done')),
  priority    VARCHAR(10) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  assignee_id INT,
  due_date    DATE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_tasks_project  FOREIGN KEY (project_id)  REFERENCES projects(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_assignee FOREIGN KEY (assignee_id) REFERENCES users(id)    ON DELETE SET NULL
);

-- Fictional sample data
INSERT INTO users (full_name, email, role) VALUES
  ('Alex Morgan', 'alex.morgan@example.com', 'admin'),
  ('Sam Rivera',  'sam.rivera@example.com',  'member'),
  ('Jordan Lee',  'jordan.lee@example.com',  'member');

INSERT INTO projects (name, description, owner_id, status) VALUES
  ('Website Redesign', 'Demo project for a fictional website revamp', 1, 'active'),
  ('Mobile App MVP',   'Demo project for a fictional mobile app',     2, 'planning');

INSERT INTO tasks (project_id, title, status, priority, assignee_id, due_date) VALUES
  (1, 'Create wireframes',   'done',        'high',   2, '2026-11-20'),
  (1, 'Build landing page',  'in_progress', 'high',   3, '2026-11-25'),
  (2, 'Define user stories', 'done',        'high',   2, '2026-11-18'),
  (2, 'Design login screen', 'todo',        'medium', NULL, '2026-11-22');

-- Evidence query: shows the primary keys, foreign keys and unique key on all three tables
SELECT table_name, constraint_type, constraint_name
FROM information_schema.table_constraints
WHERE table_schema = 'public'
  AND table_name IN ('users', 'projects', 'tasks')
  AND constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE')
ORDER BY table_name, constraint_type;
