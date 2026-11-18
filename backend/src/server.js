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

// ---------- USERS ----------
app.get('/api/users', (req, res) => res.json(db.users));

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
app.get('/api/projects', (req, res) => res.json(db.projects));

app.get('/api/projects/:id', (req, res) => {
  const project = db.projects.find(p => p.id === +req.params.id);
  return project ? res.json(project) : res.status(404).json({ error: 'Project not found' });
});

app.post('/api/projects', (req, res) => {
  const { name, description, owner_id } = req.body;
  if (!name || !owner_id) return res.status(400).json({ error: 'name and owner_id are required' });
  if (!db.users.some(u => u.id === owner_id)) return res.status(400).json({ error: 'owner_id does not exist' });
  const project = { id: nextId(db.projects), name, description: description || '', owner_id, status: 'planning' };
  db.projects.push(project);
  db.memberships.push({ id: nextId(db.memberships), user_id: owner_id, project_id: project.id, role: 'owner' });
  res.status(201).json(project);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
