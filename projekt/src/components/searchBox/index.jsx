import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBox({
  search,
  onSearchChange,
  placeholder = "Search",
}) {
  return (
    <div className="search-box">
      <input
        className="search-box__input"
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <IoSearch className="search-box__icon" />
    </div>
  );
}
