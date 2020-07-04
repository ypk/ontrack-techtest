import { React, Row, Col, Form } from "../../common";

function PageSizeSelector(props) {
  const allowedItemsCount = [1, 5, 10, 15, 20];
  const { pageSize, data, handleDataChange, handlePageSizeChange, updateNotifier } = props;
  const { count: totalRecords } = data;

  const updatePageSize = (e, totalRecords) => {
    updateNotifier();
    handlePageSizeChange(e, totalRecords)
    handleDataChange([]);
  };

  return (
    <Row className="page-size-selector-container mt-5">
      <Col lg={10} className="my-2 mx-auto">
        <Form.Group as={Row} className="justify-content-end" controlId="itemsPerPageSelect">
          <Form.Label sm={3} lg={2} column className="text-right">Items per page</Form.Label>
          <Col sm={3} lg={2}>
            <Form.Control
              onChange={(e) => updatePageSize(e, totalRecords)}
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
