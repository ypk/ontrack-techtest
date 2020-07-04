import { React, Row, Col, Alert } from "../../common";
/**
 * displays an error message on page
 * @param {object} props - object containing flags and message to handle an error
 */
function NotificationHandler(props) {
  const { notificationObject, handleClose} = props;
  const { isError, message, dismissible = true, callback } = notificationObject;
  const variant = isError ? "danger" : "primary";

  return (
    <>
      <Row className="notification-container">
        <Col className="my-3 mx-auto" lg={10}>
          <Alert
            variant={variant}
            onClose={handleClose}
            dismissible={dismissible}
          >
            {message}
          </Alert>
        </Col>
      </Row>
      {callback && callback()}
    </>
  );
}

export default NotificationHandler;
