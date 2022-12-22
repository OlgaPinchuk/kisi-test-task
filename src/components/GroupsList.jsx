import { useState } from "react";
import Button from "react-bootstrap/Button";

import { CustomModal } from "./CustomModal";

export function GroupsList({ groups, onDelete }) {
  if (!groups.length) return null;

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
      <ul className="list-group mt-2">
        {groups.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>{item.name}</div>
            <Button
              className=" bi bi-trash"
              variant="outline-danger"
              onClick={() => handleClickDelete(item.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
