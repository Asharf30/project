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
          className="button"
          onClick={() => onToggle(task.id)}
          type="button"
        >
          {task.isCompleted ? "Mark incomplete" : "Mark complete"}
        </button>

        {isEditing ? (
          <>
            <button className="button" onClick={handleSave} type="button">
              Save
            </button>
            <button
              className="button"
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
            className="button"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit
          </button>
        )}

        <button
          className="button danger"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Move to trash
        </button>
      </div>
    </article>
  );
}
