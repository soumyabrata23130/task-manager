import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#1a1a1a");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAdd = async () => {
    await createTask(title);
    setTitle("");
    setColor("#1a1a1a");
    loadTasks();
  };

  const handleComplete = async (id, completed) => {
    await completeTask(id, completed);
    setColor("teal");
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setColor("#1a1a1a");
    loadTasks();
  };

  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center text-center">
      <h1 className="text-4xl">Task Manager</h1>

      <div className="flex flex-col gap-3 items-left">
        <div className="flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ul className="my-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex gap-3 justify-between my-1">
              {task.title}
              <div className="flex gap-1">
                <button style={{ backgroundColor: color }} className="complete" onClick={() => handleComplete(task.id, true)}>√</button>
                <button onClick={() => handleDelete(task.id)}>x</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;