const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let tasks = [];

app.get("/", (req, res) => {
	res.send("Server is working!");
});

// create
app.post("/tasks", (req, res) => {
	const newTask = {
		id: Date.now().toString(),
		title: req.body.title,
		completed: false,
	};

	tasks.push(newTask);

	res.status(201).json({
		message: "Task added",
		task: newTask,
	});
});

// read all
app.get("/tasks", (req, res) => {
	res.json(tasks);
});

// read one
app.get("/tasks/:id", (req, res) => {
	const task = tasks.find((t) => t.id === req.params.id);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	res.json(task);
});

// update
app.put("/tasks/:id", (req, res) => {
	const task = tasks.find((t) => t.id === req.params.id);

	if (!task) {
		return res.status(404).json({ message: "Task not found" });
	}

	task.title = req.body.title ?? task.title;
	if (typeof req.body.completed !== 'undefined') {
    task.completed = req.body.completed;
  }

	res.json({
		message: "Task updated",
		task,
	});
});

// delete
app.delete("/tasks/:id", (req, res) => {
	const index = tasks.findIndex((t) => t.id === req.params.id);

	if (index === -1) {
		return res.status(404).json({ message: "Task not found" });
	}

	tasks.splice(index, 1);

	res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
