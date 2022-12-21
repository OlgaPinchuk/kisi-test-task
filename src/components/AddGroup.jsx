import { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";

import Dialog from "./Dialog";

import { GroupsContext } from "../global/context";

export function AddGroup({ offset }) {
  const groupsData = useContext(GroupsContext);
  const { errorMessage } = groupsData;
  const [newGroup, setNewGroup] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Methods
  async function handleGroupSave() {
    const response = await groupsData.createGroup({
      name: newGroup,
      place_id: null,
    });
    if (response) {
      await groupsData.fetchGroups(offset);
      setNewGroup("");
    } else {
      setShowErrorAlert(true);
      return false;
    }
  }

  async function handleDialogClose() {
    await groupsData.setError("");
    setShowErrorAlert(false);
    setNewGroup("");
  }

  return (
    <Dialog
      onSave={handleGroupSave}
      onClose={handleDialogClose}
      show={showErrorAlert}
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
      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => {
            groupsData.setError("");
          }}
          dismissible={true}
          show={errorMessage.length > 0}
        >
          <Alert.Heading>You got an error!</Alert.Heading>
          <p>{errorMessage} Please change insert another group name</p>
        </Alert>
      )}
    </Dialog>
  );
}
