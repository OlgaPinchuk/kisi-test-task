import { useState } from "react";
import Button from "react-bootstrap/Button";

import { createGroup } from "../client";
import Dialog from "./Dialog";

export function AddGroup() {
  const [newGroup, setNewGroup] = useState("");
  const [error, setError] = useState(false);

  // Methods
  async function handleGroupSave() {
    try {
      const group = {
        name: newGroup,
        place_id: null,
      };
      const res = await createGroup(group);
      setNewGroup("");
      console.log({ res });
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
