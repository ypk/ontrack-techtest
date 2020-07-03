import { React, Alert, Row, Col } from "../../common";

/**
 * displays an error message on page
 * @param {object} props - object containing flags and message to handle an error
 */
function ErrorHandler(props) {
  const { errorObject, handleClose } = props;
  const { message } = errorObject;

  return (
    <>
      <Row>
        <Col>
          <Alert variant="primary" onClose={handleClose} dismissible>
            {message}
          </Alert>
        </Col>
      </Row>
    </>
  );
}

export default ErrorHandler;
