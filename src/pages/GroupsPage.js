import { useEffect, useContext } from "react";
import Spinner from "react-bootstrap/Spinner";

import GroupsList from "../components/GroupsList";
import PaginationComponent from "../components/PaginationComponent";
import { AddGroup } from "../components/AddGroup";

import { GroupsContext } from "../global/context";

export default function GroupsPage() {
  const groupsData = useContext(GroupsContext);

  const { groups, pagination, offset, loading } = groupsData;

  useEffect(() => {
    groupsData.fetchGroups(offset);
  }, [offset]);

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
      <AddGroup offset={offset} />

      {loading ? (
        <div className="d-flex p-2 justify-content-center m-5 ">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <GroupsList groups={groups} />
          <PaginationComponent
            total={pagination.count}
            itemsPerPage={pagination.limit}
          />
        </>
      )}
    </div>
  );
}
