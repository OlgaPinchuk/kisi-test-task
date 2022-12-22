import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function CustomModal({
  children,
  title,
  onConfirm,
  onClose,
  okLabel,
  cancelLabel,
  disabled,
  show,
}) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={disabled}>
          {okLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
