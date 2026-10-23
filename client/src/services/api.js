const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const getTasks = async () => {
	const res = await fetch(`${BASE_URL}/api/tasks`);
	return res.json();
};

export const createTask = async (title) => {
	const res = await fetch(`${BASE_URL}/api/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	return res.json();
};

export const completeTask = async (id) => {
	const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ completed: !id.completed })
	});

	return res.json();
};

export const deleteTask = async (id) => {
	const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
		method: "DELETE",
	});

	return res.json();
};
