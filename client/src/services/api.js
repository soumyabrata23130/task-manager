const BASE_URL = "http://localhost:3000";

export const getTasks = async () => {
	const res = await fetch(`${BASE_URL}/tasks`);
	return res.json();
};

export const createTask = async (title) => {
	const res = await fetch(`${BASE_URL}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	return res.json();
};

export const deleteTask = async (id) => {
	const res = await fetch(`${BASE_URL}/tasks/${id}`, {
		method: "DELETE",
	});

	return res.json();
};
