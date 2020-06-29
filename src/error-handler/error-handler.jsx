import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

import "./error-handler.scss";

const renderDate = () => {
  return new Date().toString();
};
/**
 * displays an error message on page
 * @param {object} props - object containing flags and message to handle an error
 */
function ErrorHandler(props) {
  const { message } = props.errorObject;
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">Client Error</h1>
          <h2>An error has occurred whilst rendering the page</h2>
          <br />
          <p>here's some information to debug what happened:</p>
          <ul>
            <li>{message}</li>
          </ul>
          <small className="debug-time mt-2 mb-3">on {renderDate()}</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <IndexLinkContainer to="/">
            <Button variant="primary">Take me home!</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorHandler;
