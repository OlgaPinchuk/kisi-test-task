import { useEffect, useState, useMemo } from "react";

import Pagination from "react-bootstrap/Pagination";

function PaginationComponent(props) {
  const { onPageChange, total, itemsPerPage, currentPage } = props;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const createPaginationItem = (i) => {
    return (
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  };

  const paginationItems = useMemo(() => {
    const pages = [];

    if (totalPages > 10) {
      pages.push(createPaginationItem(1));
      pages.push(<Pagination.Ellipsis />);
      const midpoint = totalPages / 2;
      for (let i = midpoint; i <= midpoint + 4; i++) {
        pages.push(createPaginationItem(i));
      }
      pages.push(<Pagination.Ellipsis />);
    } else {
      for (let i = 1; i < totalPages; i++) {
        pages.push(createPaginationItem(i));
      }
    }

    pages.push(createPaginationItem(totalPages));
    return pages;
  }, [totalPages]);

  if (totalPages === 0) return null;

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default PaginationComponent;
