import { React, Row, Col, Form, InputGroup, Button } from "../../common";

const SearchBar = (props) => {
  const { onKeyPressEvent, onClickEvent, refElement } = props;

  return (
    <Row className="search-bar-container mt-5 mb-2">
      <Col>
        <Form.Group
          as={Row}
          className="justify-content-center mb-0"
          controlId="searchField"
        >
          <Col sm={12}>
            <InputGroup>
              <Form.Control
                placeholder="e.g: name of a book or an author"
                aria-label="Search field"
                ref={refElement}
                onKeyPress={onKeyPressEvent}
              />
              <InputGroup.Append>
                <Button variant="outline-primary" onClick={onClickEvent}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default SearchBar;
