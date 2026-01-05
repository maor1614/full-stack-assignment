const API_URL = 'http://localhost:3000';

export async function getUsers() {
  return fetch(`${API_URL}/users`).then(res => res.json());
}


export async function getUserTasks(userId: number) {
  const res = await fetch(`${API_URL}/tasks/user/${userId}`);
  if (!res.ok) return []; 
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}



export async function createTask(type: string, assignedUserId: number) {
  return fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, assignedUserId }),
  }).then(res => res.json());
}

export async function changeStatus(
  taskId: number,
  payload: {
    status: number;
    nextUserId: number;
    data: Record<string, any>;
  },
) {
  return fetch(`${API_URL}/tasks/${taskId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(res => res.json());
}

export async function closeTask(taskId: number) {
  return fetch(`${API_URL}/tasks/${taskId}/close`, {
    method: 'POST',
  }).then(res => res.json());
}
