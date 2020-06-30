import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import {
  ErrorHandler,
  isNumber,
  generateTableHeader,
  generatePagination,
  Loader,
  RequestHandler,
  renderPublicationData,
  noRecordsFound,
} from "../common/common.jsx";

function ListingPage() {
  const { page } = useParams();
  const searchElement = useRef(null);
  const pageNavigationElement = useRef(null);
  const allowedItemsCount = [1, 5, 10, 15, 20];
  const history = useHistory();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(Number.parseInt(page));
  const [queryString, setQueryString] = useState("");
  const [data, setData] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [calculatedPageCount, setCalculatedPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObject, setErrorObject] = useState({
    isError: false,
    message: "",
    reload: false,
  });
  const handleSelect = (event) => {
    const { value } = event.target;
    setPageNumber(1)
    setItemsPerPage(Number.parseInt(value));
  };
  const handleQuery = () => {
    const { value } = searchElement.current;
    setPageNumber(1)
    setQueryString(value);
  };
  const handleNavigationQuery = () => {
    const { value } = pageNavigationElement.current;
    setPageNumber(1)
    setQueryString(value);
    handlePageNavigation({ target: { value } });
  };
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const { value } = event.target;
      setPageNumber(1)
      setQueryString(value);
    }
  };
  const handlePageNavigation = (event) => {
    const { value } = event.target;
    history.push(`/books/${value}`);
  };
  const handleNavigationSearch = (event) => {
    if (event.key === "Enter") {
      setPageNumber(1)
      setQueryString(event.target.value);
      handlePageNavigation({ target: event.target });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPageNumber(Number.parseInt(page));
    const fetchData = async () => {
      try {
        const response = await RequestHandler(
          pageNumber,
          Math.round(itemsPerPage),
          queryString
        );
        await response.json().then((data) => {
          setData(data.books);
          const calculatedPageCount =
            Number.parseInt(data.count) / Number.parseInt(itemsPerPage);
          setTotalPageCount(Number.parseInt(data.count));
          setCalculatedPageCount(Math.round(calculatedPageCount));
          setIsLoading(false);
        });
      } catch (e) {
        setErrorObject({ isError: true, message: e.message, reload: false });
        setIsLoading(false);
      }
    };
    if (
      isNumber(pageNumber) &&
      pageNumber > 0 &&
      isNumber(itemsPerPage) &&
      itemsPerPage > 0
    ) {
      fetchData();
    } else {
      setErrorObject({
        isError: true,
        message: "Invalid Query Parameters",
        reload: false,
      });
      setIsLoading(false);
    }
  }, [page, pageNumber, itemsPerPage, queryString]);

  return (
    <>
      <Container>
        {isLoading ? (
          <Loader />
        ) : errorObject.isError ? (
          <ErrorHandler errorObject={errorObject} />
        ) : data.length > 0 ? (
          <>
            <Accordion className="my-4">
              <Card>
                <Accordion.Toggle as={Button} eventKey="0">
                  <span role="img" aria-label="settings" className="float-left">
                    ⚙️&nbsp;Settings
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Row className="m-4">
                    <Col sm={10}>
                      <Form.Group controlId="searchField" className="mb-0">
                        <Form.Label>Search</Form.Label>
                        <InputGroup>
                          <Form.Control
                            placeholder="e.g: name of a book or an author"
                            aria-label="Search field"
                            ref={searchElement}
                            onKeyPress={handleSearch}
                          />
                          <InputGroup.Append>
                            <Button
                              variant="outline-primary"
                              onClick={handleQuery}
                            >
                              Search
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col sm={2}>
                      <Form.Group
                        controlId="itemsPerPageSelect"
                        className="mb-0"
                      >
                        <Form.Label>Items per page</Form.Label>
                        <Form.Control
                          onChange={handleSelect}
                          as="select"
                          defaultValue={itemsPerPage}
                        >
                          <option value="null" disabled>
                            Items Per Page
                          </option>
                          {allowedItemsCount.map((item, key) => (
                            <option key={key} name={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Row>
              <Col>
                <Table responsive>
                  <thead>{generateTableHeader()}</thead>
                  <tbody>{renderPublicationData(data)}</tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col sm={5} className="mx-auto my-3">
                {generatePagination(
                  pageNumber,
                  calculatedPageCount,
                  itemsPerPage,
                  handlePageNavigation,
                  totalPageCount
                )}
              </Col>
            </Row>
            <Row>
              <Form.Group className="mx-auto">
                <Form.Row className="justify-content-center">
                  <Col sm={5} className="mr-0 align-self-center">
                    <Form.Label className="mb-0">
                      Navigate Directly to:
                    </Form.Label>
                  </Col>
                  <Col sm={5} className="ml-0">
                    <InputGroup>
                      <Form.Control
                        placeholder="Page No"
                        aria-label="Page Number"
                        ref={pageNavigationElement}
                        onKeyPress={handleNavigationSearch}
                      />
                      <InputGroup.Append>
                        <Button
                          variant="outline-primary"
                          onClick={handleNavigationQuery}
                        >
                          Go
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Form.Row>
              </Form.Group>
            </Row>
          </>
        ) : (
          <ErrorHandler errorObject={noRecordsFound} />
        )}
      </Container>
    </>
  );
}
export default ListingPage;
