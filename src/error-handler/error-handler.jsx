import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./error-handler.scss";

const renderDate = () => {
  return new Date().toString();
};
/**
 * displays an error message on page
 * @param {object} props - message to display on screen in case of an error
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
          <small>here's some information to debug what happened:</small>
          <p>{message}</p>
          <small className="debug-time">on {renderDate()}</small>
          <LinkContainer to="/">
            <Button variant="primary">Take me home!</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorHandler;
