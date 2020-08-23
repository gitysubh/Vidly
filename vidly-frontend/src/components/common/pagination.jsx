import React from "react";
import _ from "lodash";
import propTypes from "prop-types";

const Pagination = ({ count, pageSize, onPageChange, currentPage }) => {
  if (!count) return <></>;
  const numberOfPage = Math.ceil(count / pageSize);
  const pageArr = _.range(1, numberOfPage + 1);

  if (numberOfPage < 1) return;
  else
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageArr.map((page) => (
            <li
              className={"page-item" + (currentPage === page ? " active" : "")}
              key={page}
            >
              <button
                className="page-link"
                href="#"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
};

Pagination.propTypes = {
  count: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
};

export default Pagination;
