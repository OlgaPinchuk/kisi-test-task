import { useState } from "react";

import Alert from "react-bootstrap/Alert";
// import Button from "react-bootstrap/Button";

export default function CustomAlert({
  variant,
  dismissible,
  message,
  onClose,
}) {
  // const [show, setShow] = useState(false);

  // function handleOpen() {
  //   setShow(false);
  // }
  // function handleClose() {
  //   setShow(false);
  // }

  return (
    <Alert variant={variant} onClose={onClose} dismissible={dismissible}>
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
  // return <Button onClick={handleOpen}>Show Alert</Button>;
}
