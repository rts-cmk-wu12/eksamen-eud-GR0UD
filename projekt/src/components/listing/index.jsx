"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import Pagination from "../pagination";
import SearchBox from "../searchBox";
import FilterButtons from "../filterButtons";

const FILTERS = [
  { label: "New", value: "new" },
  { label: "A-Z Ascending", value: "alpha-asc" },
  { label: "Z-A Descending", value: "alpha-desc" },
];

const sortItems = (a, b, type) => {
  switch (type) {
    case "alpha-asc":
      return (a.title || "")
        .toLowerCase()
        .localeCompare((b.title || "").toLowerCase());
    case "alpha-desc":
      return (b.title || "")
        .toLowerCase()
        .localeCompare((a.title || "").toLowerCase());
    case "new":
      return new Date(b.createdAt) - new Date(a.createdAt);
    default:
      return 0;
  }
};

const SORT_FUNCTIONS = {
  "alpha-asc": (a, b) => sortItems(a, b, "alpha-asc"),
  "alpha-desc": (a, b) => sortItems(a, b, "alpha-desc"),
  new: (a, b) => sortItems(a, b, "new"),
};

export default function Listing() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // hvor mange der skal vises?
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

    const sortFunction = SORT_FUNCTIONS[filter];
    if (sortFunction) {
      result = [...result].sort(sortFunction);
    }

    return result;
  }, [data, search, filter]);

  const paginatedItems = useMemo(() => {
    // gemmer dem der skal vises på den aktuelle side så vi ikke skal beregne det hver gang
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
        <SearchBox
          search={search}
          onSearchChange={setSearch}
          placeholder="Search"
        />
        <FilterButtons
          filters={FILTERS}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      {search && filteredItems.length === 0 && !loading && (
        <div className="listing__search-results">
          No search results found for come back later: "{search}"
        </div>
      )}

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
                <Image
                  src={item.asset.url}
                  alt={item.title}
                  width={300}
                  height={300}
                  loading="lazy"
                  className="listing__img"
                />
              ) : (
                <Image
                  src="/images/placeholder.svg"
                  alt={item.title}
                  width={300}
                  height={300}
                  loading="lazy"
                  className="listing__img"
                />
              )}
            </div>
            <div className="listing__title-wrapper">
              <p
                className={`listing__title marquee-text${
                  overflowingIds[item.id] ? " overflowing" : ""
                }`}
                ref={(titleElement) =>
                  (titleRefs.current[item.id] = titleElement)
                }
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
        // "ceil" runder op til nærmeste hele tal
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
