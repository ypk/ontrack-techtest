import { React, Row, Col, Button } from "../../common";
import { Loader } from "../../components";

const Pagination = (props) => {
  const { data, pageNo: currentPage, handlePagination, pageSize } = props;
  const { books, count: totalRecords } = data;

  if (books && books.length > 0) {
    const totalPages = Math.ceil(totalRecords / pageSize);

    return (
      <Row className="pagination-container">
        <Col>
          <nav className="pagination-buttons d-flex justify-content-center m-2">
            <Button
              variant="primary"
              onClick={(e) => handlePagination(e)}
              value={1}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline-primary"
              onClick={(e) => handlePagination(e)}
              value={currentPage - 1}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <Button variant="light" value={currentPage} disabled={currentPage}>
              {currentPage}
            </Button>
            <Button
              variant="outline-primary"
              onClick={(e) => handlePagination(e)}
              value={currentPage + 1}
              disabled={currentPage + 1 > totalPages}
            >
              Next
            </Button>
            <Button
              variant="primary"
              onClick={(e) => handlePagination(e)}
              value={totalPages}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </nav>
        </Col>
      </Row>
    );
  } else {
    return (
      <Row>
        <Col>
          <Loader type="section" />
        </Col>
      </Row>
    );
  }
};

export default Pagination;
