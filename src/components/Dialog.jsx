import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Dialog({
  children,
  title,
  buttonTitle,
  onSave,
  onClose,
  okLabel,
  cancelLabel,
  disabled,
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    onClose();
    setShow(false);
  };

  const handleSave = () => {
    onSave();
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonTitle}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={disabled}>
            {okLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
