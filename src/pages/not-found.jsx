import { React, Row, Col, IndexLinkContainer, Button } from "../common";

function NotFound() {
  return (
    <div className="container-fluid not-found-container">
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
    </div>
  );
}

export default NotFound;