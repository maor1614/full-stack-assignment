'use client';

import { useEffect, useState } from 'react';
import type { Task, User } from './types';
import TasksList from './components/TasksList';
import CreateTaskForm from './components/CreateTaskForm';


const API_URL = 'http://localhost:3000';

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const refresh = async () => {
    const t = await fetch(`${API_URL}/tasks/open`).then((r) => r.json());
    setTasks(t);
  };

  const loadUsers = async () => {
    const u = await fetch(`${API_URL}/users`).then((r) => r.json());
    setUsers(u);
  };

  useEffect(() => {
    loadUsers();
    refresh();
  }, []);

  const onChangeStatus = async (
    taskId: number,
    targetStatus: number,
    nextUserId: number,
    data: Record<string, any>,
  ) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: targetStatus, nextUserId, data }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.message ?? 'Failed to change status');
      return;
    }

    await refresh();
  };

  const onClose = async (taskId: number) => {
    const res = await fetch(`${API_URL}/tasks/${taskId}/close`, { method: 'POST' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.message ?? 'Failed to close task');
      return;
    }
    await refresh();
  };

return (
  <main className="min-h-screen bg-slate-50 px-4 py-10">
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
          <p className="text-sm text-slate-500">
            Workflow rules enforced by backend. UI disables invalid actions.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{tasks.length}</span> open
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <CreateTaskForm users={users} onCreated={refresh} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <TasksList
          tasks={tasks}
          users={users}
          onChangeStatus={onChangeStatus}
          onClose={onClose}
        />
      </section>
    </div>
  </main>
);
    
}
