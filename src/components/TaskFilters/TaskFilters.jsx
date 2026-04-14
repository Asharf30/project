import React from "react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "incomplete", label: "Incomplete" },
];

export function TaskFilters({ activeFilter, counts, onFilterChange }) {
  return (
    <section aria-label="Task filters" className="stack">
      <h2 className="section-title">Filters</h2>
      <div className="toolbar">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            className={`button ${activeFilter === filter.id ? "is-active" : ""}`}
            onClick={() => onFilterChange(filter.id)}
            type="button"
          >
            {filter.label} ({counts[filter.id]})
          </button>
        ))}
      </div>
    </section>
  );
}
