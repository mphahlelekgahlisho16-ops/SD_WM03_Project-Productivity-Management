require('dotenv').config();
const express = require('express');
const seed = require('./data/seed');
const pool = require('./db');

const app = express();
app.use(express.json());

// In-memory store loaded with synthetic data (resets on restart)
let db = JSON.parse(JSON.stringify(seed));
const nextId = (list) => (list.length ? Math.max(...list.map(i => i.id)) + 1 : 1);
const TASK_STATUS = ['todo', 'in_progress', 'done'];

app.get('/', (req, res) => res.json({ service: 'Productivity Platform API', status: 'running' }));

// ---------- HEALTH CHECK (Task 02) ----------
// Author: Katlego (Learner 3)
// Confirms the API is running and can reach PostgreSQL. Returns no credentials or error details.
app.get('/health', async (req, res) => {
  const timestamp = new Date().toISOString();
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ok', database: 'connected', timestamp });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected', timestamp });
  }
});

// ---------- TASKS READ ENDPOINT (Task 03) ----------
// Author: Katlego (Learner 3)
// GET /api/tasks - returns id, title and status of every task stored in PostgreSQL.
// On a database error it sends a safe, generic message (no credentials or internal details).
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, status FROM tasks ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('GET /api/tasks failed:', err.code || 'database error');
    res.status(503).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }
});

// ---------- TASK 04: DATABASE-BACKED CREATE / LIST OPERATIONS ----------
// Author: Katlego (Learner 3)
// Projects and tasks are read from and saved to PostgreSQL, with input validation.
// Validation problems return 400 with clear messages; database problems return a safe 503.
const TASK_PRIORITY = ['low', 'medium', 'high'];
const PROJECT_STATUS = ['planning', 'active', 'completed'];
const SAFE_DB_ERROR = { error: 'Service temporarily unavailable. Please try again later.' };

function parseId(value) {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value;
  if (typeof value === 'string' && /^\d+$/.test(value) && Number(value) > 0) return Number(value);
  return null;
}
function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
async function rowExists(table, id) {
  const allowed = { users: 'users', projects: 'projects' };
  const result = await pool.query(`SELECT 1 FROM ${allowed[table]} WHERE id = $1`, [id]);
  return result.rowCount > 0;
}
const bodyOf = (req) => (req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {});

// GET /api/users - list users (fictional) so valid owner_id / assignee_id values can be seen
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, full_name, email, role FROM users ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('GET /api/users failed:', err.code || 'database error');
    res.status(503).json(SAFE_DB_ERROR);
  }
});

// GET /api/projects - list projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, description, owner_id, status FROM projects ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('GET /api/projects failed:', err.code || 'database error');
    res.status(503).json(SAFE_DB_ERROR);
  }
});

// POST /api/projects - create a project (required: name, owner_id)
app.post('/api/projects', async (req, res) => {
  const body = bodyOf(req);
  const errors = [];
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) errors.push('name is required');
  else if (name.length > 150) errors.push('name must be 150 characters or fewer');
  let owner_id = null;
  if (body.owner_id === undefined || body.owner_id === null) errors.push('owner_id is required');
  else if ((owner_id = parseId(body.owner_id)) === null) errors.push('owner_id must be a positive whole number');
  if (body.description !== undefined && body.description !== null && typeof body.description !== 'string')
    errors.push('description must be text');
  const status = body.status === undefined ? 'planning' : body.status;
  if (!PROJECT_STATUS.includes(status)) errors.push(`status must be one of: ${PROJECT_STATUS.join(', ')}`);
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  try {
    if (!(await rowExists('users', owner_id)))
      return res.status(400).json({ error: 'Validation failed', details: ['owner_id does not exist'] });
    const result = await pool.query(
      'INSERT INTO projects (name, description, owner_id, status) VALUES ($1, $2, $3, $4) ' +
      'RETURNING id, name, description, owner_id, status',
      [name, body.description || null, owner_id, status]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/projects failed:', err.code || 'database error');
    res.status(503).json(SAFE_DB_ERROR);
  }
});

// POST /api/tasks - create a task (required: title, project_id)
app.post('/api/tasks', async (req, res) => {
  const body = bodyOf(req);
  const errors = [];
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) errors.push('title is required');
  else if (title.length > 200) errors.push('title must be 200 characters or fewer');
  let project_id = null;
  if (body.project_id === undefined || body.project_id === null) errors.push('project_id is required');
  else if ((project_id = parseId(body.project_id)) === null) errors.push('project_id must be a positive whole number');
  const status = body.status === undefined ? 'todo' : body.status;
  if (!TASK_STATUS.includes(status)) errors.push(`status must be one of: ${TASK_STATUS.join(', ')}`);
  const priority = body.priority === undefined ? 'medium' : body.priority;
  if (!TASK_PRIORITY.includes(priority)) errors.push(`priority must be one of: ${TASK_PRIORITY.join(', ')}`);
  let assignee_id = null;
  if (body.assignee_id !== undefined && body.assignee_id !== null &&
      (assignee_id = parseId(body.assignee_id)) === null) errors.push('assignee_id must be a positive whole number');
  let due_date = null;
  if (body.due_date !== undefined && body.due_date !== null) {
    if (isValidDate(body.due_date)) due_date = body.due_date;
    else errors.push('due_date must be a valid date in YYYY-MM-DD format');
  }
  if (body.description !== undefined && body.description !== null && typeof body.description !== 'string')
    errors.push('description must be text');
  if (errors.length) return res.status(400).json({ error: 'Validation failed', details: errors });

  try {
    const missing = [];
    if (!(await rowExists('projects', project_id))) missing.push('project_id does not exist');
    if (assignee_id !== null && !(await rowExists('users', assignee_id))) missing.push('assignee_id does not exist');
    if (missing.length) return res.status(400).json({ error: 'Validation failed', details: missing });
    const result = await pool.query(
      'INSERT INTO tasks (project_id, title, description, status, priority, assignee_id, due_date) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7) ' +
      'RETURNING id, project_id, title, description, status, priority, assignee_id, due_date::text AS due_date',
      [project_id, title, body.description || null, status, priority, assignee_id, due_date]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/tasks failed:', err.code || 'database error');
    res.status(503).json(SAFE_DB_ERROR);
  }
});

// ---------- USERS ----------

app.get('/api/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === +req.params.id);
  return user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

app.post('/api/users', (req, res) => {
  const { full_name, email, role } = req.body;
  if (!full_name || !email) return res.status(400).json({ error: 'full_name and email are required' });
  if (db.users.some(u => u.email === email)) return res.status(409).json({ error: 'Email already exists' });
  const user = { id: nextId(db.users), full_name, email, role: role || 'member' };
  db.users.push(user);
  res.status(201).json(user);
});

// ---------- PROJECTS ----------

app.get('/api/projects/:id', (req, res) => {
  const project = db.projects.find(p => p.id === +req.params.id);
  return project ? res.json(project) : res.status(404).json({ error: 'Project not found' });
});

app.put('/api/projects/:id', (req, res) => {
  const project = db.projects.find(p => p.id === +req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  const { name, description, status } = req.body;
  if (name) project.name = name;
  if (description !== undefined) project.description = description;
  if (status) project.status = status;
  res.json(project);
});

app.delete('/api/projects/:id', (req, res) => {
  const id = +req.params.id;
  if (!db.projects.some(p => p.id === id)) return res.status(404).json({ error: 'Project not found' });
  db.projects = db.projects.filter(p => p.id !== id);
  db.memberships = db.memberships.filter(m => m.project_id !== id);
  db.tasks = db.tasks.filter(t => t.project_id !== id);
  res.status(204).end();
});

// ---------- MEMBERSHIPS ----------
app.get('/api/projects/:id/members', (req, res) => {
  const id = +req.params.id;
  const members = db.memberships
    .filter(m => m.project_id === id)
    .map(m => ({ ...m, user: db.users.find(u => u.id === m.user_id) }));
  res.json(members);
});

app.post('/api/projects/:id/members', (req, res) => {
  const project_id = +req.params.id;
  const { user_id, role } = req.body;
  if (!db.projects.some(p => p.id === project_id)) return res.status(404).json({ error: 'Project not found' });
  if (!db.users.some(u => u.id === user_id)) return res.status(400).json({ error: 'user_id does not exist' });
  if (db.memberships.some(m => m.project_id === project_id && m.user_id === user_id))
    return res.status(409).json({ error: 'User is already a member' });
  const membership = { id: nextId(db.memberships), user_id, project_id, role: role || 'member' };
  db.memberships.push(membership);
  res.status(201).json(membership);
});

app.delete('/api/projects/:id/members/:userId', (req, res) => {
  const before = db.memberships.length;
  db.memberships = db.memberships.filter(m => !(m.project_id === +req.params.id && m.user_id === +req.params.userId));
  return db.memberships.length < before ? res.status(204).end() : res.status(404).json({ error: 'Membership not found' });
});

// ---------- TASKS ----------
app.get('/api/projects/:id/tasks', (req, res) => {
  const id = +req.params.id;
  let tasks = db.tasks.filter(t => t.project_id === id);
  if (req.query.status) tasks = tasks.filter(t => t.status === req.query.status);
  res.json(tasks);
});

app.post('/api/projects/:id/tasks', (req, res) => {
  const project_id = +req.params.id;
  const { title, priority, assignee_id, due_date } = req.body;
  if (!db.projects.some(p => p.id === project_id)) return res.status(404).json({ error: 'Project not found' });
  if (!title) return res.status(400).json({ error: 'title is required' });
  const task = { id: nextId(db.tasks), project_id, title, status: 'todo', priority: priority || 'medium',
                 assignee_id: assignee_id || null, due_date: due_date || null };
  db.tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = db.tasks.find(t => t.id === +req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  if (req.body.status && !TASK_STATUS.includes(req.body.status))
    return res.status(400).json({ error: `status must be one of: ${TASK_STATUS.join(', ')}` });
  Object.assign(task, req.body, { id: task.id, project_id: task.project_id });
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const before = db.tasks.length;
  db.tasks = db.tasks.filter(t => t.id !== +req.params.id);
  return db.tasks.length < before ? res.status(204).end() : res.status(404).json({ error: 'Task not found' });
});

// Safe error handler: bad JSON in a request body gets a clear 400; anything else a generic 500 (no internal details)
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed')
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  console.error('Unexpected error:', (err && err.type) || 'unknown');
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
