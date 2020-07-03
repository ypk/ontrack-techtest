import { React, Row, Col, Form } from "../../common";

function PageSizeSelector(props) {
  const allowedItemsCount = [1, 5, 10, 15, 20];
  const { pageSize, data, handlePageSizeChange } = props;
  const { count: totalRecords } = data;

  return (
    <Row className="page-size-selector mt-5">
      <Col>
        <Form.Group as={Row} className="justify-content-end" controlId="itemsPerPageSelect">
          <Form.Label sm={3} lg={1} column>Items per page</Form.Label>
          <Col sm={3}>
            <Form.Control
              onChange={(e) => handlePageSizeChange(e, totalRecords)}
              as="select"
              defaultValue={pageSize}
            >
              <option value="null" disabled>
                Items Per Page
              </option>
              {allowedItemsCount.map((item, index) => (
                <option key={index} name={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default PageSizeSelector;
