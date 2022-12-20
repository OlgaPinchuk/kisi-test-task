import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";

import { GroupsContext } from "../global/context";
import Dialog from "./Dialog";

export function AddGroup() {
  const groupsData = useContext(GroupsContext);
  const [newGroup, setNewGroup] = useState("");
  const [error, setError] = useState(false);

  // Methods
  async function handleGroupSave() {
    try {
      await groupsData.createGroup({
        name: newGroup,
        place_id: null,
      });
      setNewGroup("");
    } catch (err) {
      setError(true);
      console.error(err);
    }
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
