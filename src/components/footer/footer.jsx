import { React, Row, Container, Col, DateAPI } from "../../common";

function Footer() {
  const renderedTime = DateAPI().getCurrentRenderedTime();
  return (
    <Container fluid>
      <Row>
        <Col>
          <p className="text-center">
            <small>rendered on {renderedTime}</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
