import { useEffect, useContext } from "react";

import GroupsList from "../components/GroupsList";
import PaginationComponent from "../components/PaginationComponent";
import { AddGroup } from "../components/AddGroup";

import { GroupsContext } from "../global/context";

export default function GroupsPage() {
  const groupsData = useContext(GroupsContext);

  const { groups, pagination, offset } = groupsData;

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
      <GroupsList groups={groups} />
      <PaginationComponent
        total={pagination.count}
        itemsPerPage={pagination.limit}
      />
    </div>
  );
}
