import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

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
    loadTasks();
  };

  const handleComplete = async (id) => {
    try {
      const updated = await completeTask(id);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          (t.id === id ? updated.task : t)
        )
      );
    }
    catch(error) {
      console.error("Failed to update task:", error)
    }
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center text-center">
      <h1 className="text-3xl">Task Manager</h1>

      <div className="flex flex-col gap-3 items-left">
        <div className="flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <h2 className="text-2xl">Tasks</h2>
        <ul className="my-4">
          {tasks.map((task) => (
            <li key={task.id} className="flex gap-3 justify-between my-1">
              <span className={task.completed ? "line-through" : ""}>{task.title}</span>
              <div className="flex gap-1">
                <button onClick={() => handleComplete(task.id)}>√</button>
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