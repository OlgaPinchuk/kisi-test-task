import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { CustomModal } from "./CustomModal";

export function GroupsList({ groups, onDelete }) {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Methods
  function handleClickDelete(id) {
    setShow(true);
    setDeleteId(id);
  }

  function handleCancel() {
    setShow(false);
  }

  if (!groups.length)
    return <h3 className="d-flex p-2 justify-content-center m-5">No items</h3>;

  return (
    <>
      <CustomModal
        onConfirm={() => onDelete(deleteId)}
        onClose={handleCancel}
        show={show}
        title="Delete a group"
        okLabel="Delete"
        cancelLabel="Close"
      >
        {<p>Are you sure you want to delete this group?</p>}
      </CustomModal>

      <ListGroup className="mt-2">
        {groups.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between"
          >
            {item.name}
            <Button
              className=" bi bi-trash"
              variant="outline-danger"
              onClick={() => handleClickDelete(item.id)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
