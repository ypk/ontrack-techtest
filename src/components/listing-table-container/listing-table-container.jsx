import {
  React,
  Row,
  Col,
  Table,
  useEffect,
  IndexLinkContainer,
  Button,
} from "../../common";
import {
  ListingTable,
  ListingTableHeader,
  Loader,
  Pagination,
  PageNavigation,
} from "../../components";
import { RequestHandler } from "../../services";

const ListingTableContainer = (props) => {
  const {
    data,
    handleDataChange,
    handleNotification,
    pageNo,
    pageSize,
    filter,
    updatePageNumber,
    handlePageNavigationByKeyPress,
    PageNavigationElement,
    handlePageNavigationByClick,
  } = props;
  const { books } = data;
  const updatePagination = (e) => {
    updatePageNumber(e);
    handleDataChange([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestHandler(pageNo, pageSize, filter);
        await response.json().then((data) => {
          handleDataChange(data);
        });
      } catch (e) {
        handleNotification({
          isError: true,
          message: e.message,
          reload: false,
        });
      }
    };
    fetchData();

    if (books && books.length === 0) {
      const notificationObject = {
        isError: true,
        message:
          "The request yielded 0 results. Please change your search parameters and try again.",
        dismissible: false,
        callback: () => {
          return (
            <Row className="reset-restults-container">
              <Col className="my-3 mx-auto" lg={2}>
                <IndexLinkContainer to="/page/1">
                  <Button variant="outline-primary" block>
                    Reset Search
                  </Button>
                </IndexLinkContainer>
              </Col>
            </Row>
          );
        },
      };
      handleNotification(notificationObject);
    }
  }, [pageNo, pageSize, filter, books]);

  return books === undefined ? (
    <Row className="listing-table-loader-container">
      <Col className="justify-content-center">
        <Loader />
      </Col>
    </Row>
  ) : books.length !== 0 ? (
    <>
      <Row className="listing-table-container mt-4 mb-5">
        <Col lg={10} className="mx-auto">
          <Table striped hover bordered responsive>
            <ListingTableHeader />
            <ListingTable data={data} />
          </Table>
        </Col>
      </Row>
      <Pagination
        data={data}
        handlePagination={updatePagination}
        pageNo={pageNo}
        pageSize={pageSize}
      />
      <PageNavigation
        onKeyPressEvent={handlePageNavigationByKeyPress}
        onClickEvent={handlePageNavigationByClick}
        refElement={PageNavigationElement}
      />
    </>
  ) : null;
};

export default ListingTableContainer;
