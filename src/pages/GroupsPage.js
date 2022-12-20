import { useEffect, useContext, useState } from "react";

import { GroupsContext } from "../global/context";
import GroupsList from "../components/GroupsList";
import PaginationComponent from "../components/Pagination";
import { AddGroup } from "../components/AddGroup";

export default function GroupsPage() {
  const groupsData = useContext(GroupsContext);
  console.log({ groupsData });
  const { groups, pagination } = groupsData;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!groups.length) groupsData.fetchGroups();
  }, [groups, currentPage]);

  return (
    <div className="m-4">
      <h4 className="mb-3">Groups</h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="col-9">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Group"
          />
        </div>
      </div>
      <AddGroup />
      <GroupsList groups={groups} />
      <PaginationComponent
        total={80}
        itemsPerPage={groups.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* <nav className="mt-3" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item">
            <div className="page-link">1</div>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
