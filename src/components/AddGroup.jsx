import { useState, useContext } from "react";

import Dialog from "./Dialog";

import { GroupsContext } from "../global/context";

export function AddGroup({ offset }) {
  const groupsData = useContext(GroupsContext);
  const [newGroup, setNewGroup] = useState("");

  // Methods
  async function handleGroupSave() {
    const resp = await groupsData.createGroup({
      name: newGroup,
      place_id: null,
    });
    if (resp) {
      await groupsData.fetchGroups(offset);
    }
    setNewGroup("");
  }

  function handleDialogClose() {
    setNewGroup("");
  }

  return (
    <Dialog
      onSave={handleGroupSave}
      onClose={handleDialogClose}
      title="Add new group"
      buttonTitle="Add new"
      okLabel="Save"
      cancelLabel="Close"
      disabled={!newGroup}
    >
      <input
        type="text"
        value={newGroup}
        onChange={(e) => setNewGroup(e.target.value)}
        autoFocus
      />
    </Dialog>
  );
}
