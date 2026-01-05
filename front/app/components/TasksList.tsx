'use client';

import { useState } from 'react';
import type { Task, User } from '../types';
import { FINAL_STATUS, getRequiredFields } from '../lib/requirments'; 
import { STATUS_NAMES } from '../lib/workflow-ui';

type Props = {
    tasks: Task[];
    users: User[];
    onChangeStatus: (
        taskId: number,
        targetStatus: number,
        nextUserId: number,
        data: Record<string, any>,
    ) => void;
    onClose: (taskId: number) => void;
};

function normalizeDataForBackend(
    taskType: string,
    targetStatus: number,
    data: Record<string, any>,
): Record<string, any> {
    if (taskType === 'PROCUREMENT' && targetStatus === 2) {
        const q1 = (data.quote1 ?? '').toString().trim();
        const q2 = (data.quote2 ?? '').toString().trim();
        return { ...data, quotes: [q1, q2] };
    }
    return data;
}

export default function TasksList({ tasks, users, onChangeStatus, onClose }: Props) {
    const [nextUserByTask, setNextUserByTask] = useState<Record<number, number>>({});
    const [dataByTask, setDataByTask] = useState<Record<number, Record<string, any>>>({});

    const input =
        'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-blue-200';
    const select =
        'mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-blue-200';

    const btnBase =
        'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold transition border';
    const btn = `${btnBase} bg-white text-slate-900 border-slate-200 hover:bg-slate-50`;
    const btnPrimary = `${btnBase} bg-blue-600 text-white border-blue-600 hover:bg-blue-700`;
    const btnDanger = `${btnBase} bg-red-600 text-white border-red-600 hover:bg-red-700`;
    const btnDisabled =
        'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed';

    if (!tasks.length) {
        return (
            <div className="rounded-xl border border-dashed bg-slate-50 p-6 text-center text-slate-600">
                No open tasks
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Open Tasks</h2>
                <span className="text-sm text-slate-500">{tasks.length} total</span>
            </div>

            {tasks.map((t) => {
                const finalStatus = FINAL_STATUS[t.type] ?? 0;
                const isFinal = t.status === finalStatus;
                const isClosed = t.closed;

                const nextUserId = nextUserByTask[t.id] ?? users[0]?.id ?? 1;
                const currentData = dataByTask[t.id] ?? {};

                const nextStatus = t.status + 1;
                const prevStatus = t.status - 1;

                const canGoBack = !isClosed && t.status > 1;
                const canGoNext = !isClosed && (finalStatus ? t.status < finalStatus : true);

                const requiredForNext: string[] = canGoNext ? getRequiredFields(t.type, nextStatus) : [];

                const missingNextFields = requiredForNext.some((field) => {
                    const v = currentData[field];
                    return v === undefined || v === null || String(v).trim() === '';
                });

                const canClickNext = canGoNext && !missingNextFields;

                return (
                    <div
                        key={t.id}
                        className={`rounded-2xl border p-5 shadow-sm ${isClosed ? 'bg-slate-50 text-slate-600' : 'bg-white text-slate-900'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <div className="text-xs text-slate-500">Task #{t.id}</div>
                                <div className="text-base font-semibold">{t.type}</div>

                                <div className="text-sm">
                                    <span className="font-medium">Status:</span> {t.status}{' '}
                                    {STATUS_NAMES[t.type]?.[t.status] ? (
                                        <span className="text-slate-500">({STATUS_NAMES[t.type][t.status]})</span>
                                    ) : null}
                                </div>

                                <div className="text-sm">
                                    <span className="font-medium">Assigned to:</span> {t.assignedUser?.name ?? '—'}
                                </div>
                            </div>

                            <span
                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${isClosed ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-700'
                                    }`}
                            >
                                {isClosed ? 'Closed' : 'Open'}
                            </span>
                        </div>

                        {!isClosed && (
                            <div className="mt-4 grid gap-2 sm:max-w-sm">
                                <label className="text-sm font-medium text-slate-700">Next assigned user</label>
                                <select
                                    className={select}
                                    value={nextUserId}
                                    onChange={(e) =>
                                        setNextUserByTask((prev) => ({
                                            ...prev,
                                            [t.id]: Number(e.target.value),
                                        }))
                                    }
                                >
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {canGoNext && requiredForNext.length > 0 && (
                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-100 p-4">
                                <div className="text-sm font-semibold text-slate-900">
                                    Required for status {nextStatus}
                                </div>

                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    {requiredForNext.map((field: string) => (
                                        <label key={field} className="text-sm text-slate-700">
                                            <span className="block font-medium">{field}</span>
                                            <input
                                                className={input}
                                                value={currentData[field] ?? ''}
                                                onChange={(e) =>
                                                    setDataByTask((prev) => ({
                                                        ...prev,
                                                        [t.id]: {
                                                            ...(prev[t.id] ?? {}),
                                                            [field]: e.target.value,
                                                        },
                                                    }))
                                                }
                                            />
                                        </label>
                                    ))}
                                </div>

                                {missingNextFields && (
                                    <div className="mt-3 text-xs text-slate-600">
                                        Fill all required fields to move to status {nextStatus}.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                className={canGoBack ? btn : btnDisabled}
                                disabled={!canGoBack}
                                onClick={() =>
                                    onChangeStatus(
                                        t.id,
                                        prevStatus,
                                        nextUserId,
                                        normalizeDataForBackend(t.type, prevStatus, currentData),
                                    )
                                }
                            >
                                Back
                            </button>

                            <button
                                className={canClickNext ? btnPrimary : btnDisabled}
                                disabled={!canClickNext}
                                onClick={() =>
                                    onChangeStatus(
                                        t.id,
                                        nextStatus,
                                        nextUserId,
                                        normalizeDataForBackend(t.type, nextStatus, currentData),
                                    )
                                }
                            >
                                Next
                            </button>

                            <button
                                className={!isFinal || isClosed ? btnDisabled : btnDanger}
                                disabled={!isFinal || isClosed}
                                onClick={() => onClose(t.id)}
                            >
                                Close
                            </button>
                        </div>

                        {isClosed && (
                            <div className="mt-3 text-sm text-slate-500">
                                This task is closed and immutable.
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
