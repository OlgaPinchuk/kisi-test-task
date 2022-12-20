import { useEffect, useContext } from "react";

import { fetchGroups } from "../client";
import { GroupsContext } from "../global/context";
import GroupsList from "../components/GroupsList";
import { AddGroup } from "../components/AddGroup";

export default function GroupsPage() {
  const { groups, setGroups } = useContext(GroupsContext);

  useEffect(() => {
    // if(!groups.length) api.fetchGroups()
    fetchGroups()
      .then((data) => setGroups(data.data))
      .catch((error) => console.error(error)); //to context method
  }, []);

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

      <nav className="mt-3" aria-label="Page navigation">
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
      </nav>
    </div>
  );
}
