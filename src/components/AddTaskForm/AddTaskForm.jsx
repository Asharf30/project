import React, { useState } from "react";

export function AddTaskForm({ onAddTask, disabled = false }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const nextTitle = title.trim();
    if (!nextTitle) {
      setError("Please enter a task title.");
      return;
    }

    setError("");
    onAddTask(nextTitle);
    setTitle("");
  }

  return (
    <form className="stack" onSubmit={handleSubmit} aria-label="Add task form">
      <label htmlFor="task-title-input">Task title</label>
      <div className="toolbar">
        <input
          className="input"
          id="task-title-input"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          value={title}
        />
        <button
          className="button button-primary"
          disabled={disabled}
          type="submit"
        >
          Add task
        </button>
      </div>
      {error ? (
        <p role="alert" className="danger" style={{ margin: 0 }}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
