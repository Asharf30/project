import React, { useState } from "react";

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  function handleSave() {
    onEdit(task.id, draftTitle);
    setIsEditing(false);
  }

  return (
    <article className={`task-item ${task.isCompleted ? "is-completed" : ""}`}>
      <span
        className={`status-chip ${task.isCompleted ? "is-completed" : "is-incomplete"}`}
      >
        {task.isCompleted ? "Completed" : "Active"}
      </span>

      <div>
        {isEditing ? (
          <input
            aria-label="Edit task title"
            className="input"
            onChange={(event) => setDraftTitle(event.target.value)}
            value={draftTitle}
          />
        ) : (
          <span className="title">{task.title}</span>
        )}
      </div>

      <div className="toolbar">
        <button
          className={`button ${task.isCompleted ? "button-secondary" : "button-primary"}`}
          onClick={() => onToggle(task.id)}
          type="button"
        >
          {task.isCompleted ? "Mark incomplete" : "Mark complete"}
        </button>

        {isEditing ? (
          <>
            <button
              className="button button-primary"
              onClick={handleSave}
              type="button"
            >
              Save
            </button>
            <button
              className="button button-secondary"
              onClick={() => {
                setDraftTitle(task.title);
                setIsEditing(false);
              }}
              type="button"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="button button-accent"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit
          </button>
        )}

        <button
          className="button button-danger"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Move to trash
        </button>
      </div>
    </article>
  );
}
