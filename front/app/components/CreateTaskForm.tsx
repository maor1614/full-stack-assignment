'use client';

import { useEffect, useState } from 'react';
import type { User } from '../types';

const API_URL = 'http://localhost:3000';

export default function CreateTaskForm({
  users,
  onCreated,
}: {
  users: User[];
  onCreated: () => void;
}) {
  const [type, setType] = useState<'PROCUREMENT' | 'DEVELOPMENT'>('PROCUREMENT');
  const [assignedUserId, setAssignedUserId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (users.length) setAssignedUserId(users[0].id);
  }, [users]);

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, assignedUserId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? 'Failed to create task');
      }

      onCreated();
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const input =
    'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-blue-200';
  const label = 'block text-sm font-medium text-slate-700';

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Create Task</h2>
          <p className="text-sm text-slate-500">
            Pick a task type and the initial assignee.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          New
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className={label}>Task type</label>
          <select
            className={input}
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            <option value="PROCUREMENT">PROCUREMENT</option>
            <option value="DEVELOPMENT">DEVELOPMENT</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label className={label}>Assigned user</label>
          <select
            className={input}
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(Number(e.target.value))}
            disabled={!users.length}
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1 flex items-end">
          <button
            onClick={submit}
            disabled={loading || !users.length}
            className={
              loading || !users.length
                ? 'w-full rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 cursor-not-allowed'
                : 'w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
            }
          >
            {loading ? 'Creating…' : 'Create'}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
}
