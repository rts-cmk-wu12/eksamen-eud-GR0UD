import React from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function FilterButtons({
  filters,
  currentFilter,
  onFilterChange,
}) {
  return (
    <div className="filter-buttons">
      {filters.map((filterOption) => (
        <button
          className={`filter-buttons__button${
            currentFilter === filterOption.value
              ? " filter-buttons__button--active"
              : ""
          }`}
          key={filterOption.value}
          onClick={() => onFilterChange(filterOption.value)}
        >
          {currentFilter === filterOption.value && (
            <IoCheckmarkOutline className="filter-buttons__check" />
          )}
          {filterOption.label}
        </button>
      ))}
    </div>
  );
}
