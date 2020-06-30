import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";

import "./common.scss";

function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="title">404 - Not Found</h1>
          <h2>Are you lost?</h2>
          <br />
          <p>Hi Lost!. Why are you here?</p>
          <br />
          <IndexLinkContainer active={false} to="/">
            <Button variant="primary">Take me home!</Button>
          </IndexLinkContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
