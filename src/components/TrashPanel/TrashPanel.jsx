import React from "react";

export function TrashPanel({ tasks, onRestore, onPermanentDelete }) {
  if (tasks.length === 0) {
    return (
      <section className="stack" aria-label="Trash panel">
        <h2 className="section-title">Trash</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>Trash is empty.</p>
      </section>
    );
  }

  return (
    <section className="stack" aria-label="Trash panel">
      <h2 className="section-title">Trash</h2>
      <ul className="task-list" aria-label="Trash list">
        {tasks.map((task) => (
          <li className="task-item" key={task.id}>
            <span className="status-chip is-incomplete">In trash</span>
            <span className="title">{task.title}</span>
            <div className="toolbar">
              <button
                className="button"
                onClick={() => onRestore(task.id)}
                type="button"
              >
                Restore
              </button>
              <button
                className="button danger"
                onClick={() => onPermanentDelete(task.id)}
                type="button"
              >
                Delete forever
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
