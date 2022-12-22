import { useMemo, useContext } from "react";

import Pagination from "react-bootstrap/Pagination";
import { GroupsContext } from "../global/context";

export function PaginationComponent({ total, itemsPerPage }) {
  const groupsData = useContext(GroupsContext);
  const { currentPage } = groupsData;

  const totalPages = useMemo(
    () => (total > 0 && itemsPerPage > 0 ? Math.ceil(total / itemsPerPage) : 0),
    [itemsPerPage, total]
  );

  const createPaginationItem = (i) => {
    return (
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => groupsData.setCurrentPage(i)}
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
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <Pagination className="mt-2">
      <Pagination.Prev
        onClick={() => groupsData.setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {paginationItems}
      <Pagination.Next
        onClick={() => groupsData.setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
