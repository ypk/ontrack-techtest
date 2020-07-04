import { React, Row, Col, Alert } from "../../common";
/**
 * displays an error message on page
 * @param {object} props - object containing flags and message to handle an error
 */
function NotificationHandler(props) {
  const { notificationObject, handleClose } = props;
  const { isError, message } = notificationObject;
  const variant = isError ? "danger" : "primary";

  return (
    <>
      <Row className="notification-container">
        <Col>
          <Alert variant={variant} onClose={handleClose} dismissible>
            {message}
          </Alert>
        </Col>
      </Row>
    </>
  );
}

export default NotificationHandler;

