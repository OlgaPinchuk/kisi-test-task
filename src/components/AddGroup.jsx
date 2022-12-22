import { useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { CustomModal } from "./CustomModal";

import { GroupsContext } from "../global/context";

export function AddGroup() {
  // State
  const groupsData = useContext(GroupsContext);
  const { errorMessage, pagination, searchQuery } = groupsData;
  const { offset } = pagination;

  const [newGroup, setNewGroup] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [show, setShow] = useState(false);

  // Methods
  async function handleGroupSave() {
    const response = await groupsData.createGroup({
      name: newGroup,
      place_id: null,
    });
    if (response) {
      await groupsData.fetchGroups({ offset, query: searchQuery });
      setNewGroup("");
      setShow(false);
    } else {
      setShowErrorAlert(true);
      setShow(true);
      return false;
    }
  }

  async function handleModalClose() {
    groupsData.setError("");
    await groupsData.fetchGroups({ offset, query: searchQuery });
    setShowErrorAlert(false);
    setNewGroup("");
    setShow(false);
  }

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new group
      </Button>

      <CustomModal
        onConfirm={handleGroupSave}
        onClose={handleModalClose}
        show={show}
        title="Add new group"
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
      </CustomModal>
    </>
  );
}
