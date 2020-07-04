import {
  React,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
} from "../../common";

const PageNavigation = (props) => {
  const {
    onChangeEvent,
    onKeyPressEvent,
    onClickEvent,
    refElement,
    defaultValue
  } = props;

  return (
    <Row className="page-navigation-container my-3">
      <Col>
        <Form.Group as={Row} className="justify-content-center" controlId="searchField">
          <Form.Label sm={1} className="align-self-center mb-0">Navigate to page</Form.Label>
          <Col sm={4} md={3}>
            <InputGroup>
              <Form.Control
                placeholder="Page No"
                aria-label="Page Number"
                ref={refElement}
                onChange={onChangeEvent}
                onKeyPress={onKeyPressEvent}
                value={defaultValue}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={onClickEvent}
                >
                  Go
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default PageNavigation;
