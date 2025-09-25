"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { IoSearch } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";

import Pagination from "../pagination";
import Link from "next/link";

const FILTERS = [
  { label: "New", value: "new" },
  { label: "A-Z Ascending", value: "alpha-asc" },
  { label: "Z-A Descending", value: "alpha-desc" },
];

export default function Listing() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { data, error, loading } = useFetch("/listings");

  const filteredItems = useMemo(() => {
    let result = Array.isArray(data) ? data : [];
    if (search) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "alpha-asc") {
      result = [...result].sort((a, b) =>
        (a.title || "")
          .toLowerCase()
          .localeCompare((b.title || "").toLowerCase())
      );
    } else if (filter === "alpha-desc") {
      result = [...result].sort((a, b) =>
        (b.title || "")
          .toLowerCase()
          .localeCompare((a.title || "").toLowerCase())
      );
    } else if (filter === "new") {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return result;
  }, [data, search, filter]);

  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredItems, currentPage]);

  const titleRefs = useRef({});
  const [overflowingIds, setOverflowingIds] = useState({});

  useEffect(() => {
    setOverflowingIds(
      paginatedItems.reduce((acc, item) => {
        const ref = titleRefs.current[item.id];
        if (ref?.scrollWidth > ref?.clientWidth) acc[item.id] = true;
        return acc;
      }, {})
    );
  }, [paginatedItems]);

  return (
    <div className="listing">
      <div className="listing__controls">
        <div className="listing__search-wrapper">
          <input
            className="listing__search"
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <IoSearch className="listing__search-icon" />
        </div>
        <div className="listing__filters">
          {FILTERS.map((f) => (
            <button
              className={`listing__filter${
                filter === f.value ? " listing__filter--active" : ""
              }`}
              key={f.value}
              onClick={() => setFilter(f.value)}
            >
              {filter === f.value && (
                <IoCheckmarkOutline className="listing__filter-check" />
              )}
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {loading && <div className="listing__loading">Loading...</div>}
      {error && <div className="listing__error">Error: {error.message}</div>}
      <div className="listing__grid">
        {paginatedItems.map((item) => (
          <Link
            href={`/details/${item.id}`}
            className="listing__card"
            key={item.id}
          >
            <div className="listing__image">
              {item.asset?.url ? (
                <img
                  src={item.asset.url}
                  alt={item.title}
                  className="listing__img"
                />
              ) : (
                <img
                  src="/images/placeholder.svg"
                  alt={item.title}
                  className="listing__img"
                />
              )}
            </div>
            <div className="listing__title-wrapper">
              <p
                className={`listing__title marquee-text${
                  overflowingIds[item.id] ? " overflowing" : ""
                }`}
                ref={(el) => (titleRefs.current[item.id] = el)}
              >
                {item.title || "Text"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.max(1, Math.ceil(filteredItems.length / itemsPerPage))}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
