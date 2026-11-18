// SYNTHETIC DATA ONLY - all names, emails and tasks are fictional.
const users = [
  { id: 1, full_name: 'Alex Morgan',   email: 'alex.morgan@example.com',   role: 'admin'  },
  { id: 2, full_name: 'Sam Rivera',    email: 'sam.rivera@example.com',    role: 'member' },
  { id: 3, full_name: 'Jordan Lee',    email: 'jordan.lee@example.com',    role: 'member' },
  { id: 4, full_name: 'Taylor Smith',  email: 'taylor.smith@example.com',  role: 'member' },
  { id: 5, full_name: 'Casey Brown',   email: 'casey.brown@example.com',   role: 'member' }
];

const projects = [
  { id: 1, name: 'Website Redesign', description: 'Demo project for a fictional website revamp', owner_id: 1, status: 'active' },
  { id: 2, name: 'Mobile App MVP',   description: 'Demo project for a fictional mobile app',     owner_id: 2, status: 'planning' }
];

const memberships = [
  { id: 1, user_id: 1, project_id: 1, role: 'owner'  },
  { id: 2, user_id: 2, project_id: 1, role: 'member' },
  { id: 3, user_id: 3, project_id: 1, role: 'member' },
  { id: 4, user_id: 2, project_id: 2, role: 'owner'  },
  { id: 5, user_id: 4, project_id: 2, role: 'member' },
  { id: 6, user_id: 5, project_id: 2, role: 'viewer' }
];

const tasks = [
  { id: 1, project_id: 1, title: 'Create wireframes',        status: 'done',        priority: 'high',   assignee_id: 2, due_date: '2026-11-20' },
  { id: 2, project_id: 1, title: 'Build landing page',       status: 'in_progress', priority: 'high',   assignee_id: 3, due_date: '2026-11-25' },
  { id: 3, project_id: 1, title: 'Write content',            status: 'todo',        priority: 'medium', assignee_id: 1, due_date: '2026-11-28' },
  { id: 4, project_id: 2, title: 'Define user stories',      status: 'done',        priority: 'high',   assignee_id: 2, due_date: '2026-11-18' },
  { id: 5, project_id: 2, title: 'Design login screen',      status: 'in_progress', priority: 'medium', assignee_id: 4, due_date: '2026-11-22' },
  { id: 6, project_id: 2, title: 'Set up test environment',  status: 'todo',        priority: 'low',    assignee_id: null, due_date: '2026-12-01' }
];

module.exports = { users, projects, memberships, tasks };
