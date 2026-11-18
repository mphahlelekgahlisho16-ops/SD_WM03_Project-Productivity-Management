// SD-WM03 Team Project
// Learner: Tanzwani Denga
// Role: Frontend & UI/UX Developer

import { useState } from "react";

function App() {
  // Sample task data
  const tasks = [
    { id: 1, title: "Prepare report", status: "To do" },
    { id: 2, title: "Review wireframe", status: "Done" },
    { id: 3, title: "Create dashboard", status: "In progress" }
  ];

  // Selected filter
  const [filter, setFilter] = useState("All");

  // Filter tasks
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Dashboard</h1>

      <label>Filter by Status: </label>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>To do</option>
        <option>In progress</option>
        <option>Done</option>
      </select>

      <br />
      <br />

      {filteredTasks.length === 0 ? (
        <p>No tasks match the selected filter.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;