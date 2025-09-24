import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pagination' aria-label='Pagination Navigation'>
      <button
        className={`pagination-arrow${currentPage === 1 ? " disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label='Previous Page'
      >
        <FaArrowLeft />
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-page${
            number === currentPage ? " active" : ""
          }`}
          onClick={() => onPageChange(number)}
          aria-current={number === currentPage ? "page" : undefined}
        >
          {number}
        </button>
      ))}
      <button
        className={`pagination-arrow${
          currentPage === totalPages ? " disabled" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label='Next Page'
      >
        Next
        <FaArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;
