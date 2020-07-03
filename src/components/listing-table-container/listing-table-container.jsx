import { React, Row, Col, Table, useEffect, IndexLinkContainer, Button } from "../../common";
import {
  ListingTable,
  ListingTableHeader,
  Loader,
  Pagination,
  PageNavigation,
  NotificationHandler,
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
  const handleClose = () => {
    handleNotification({
      isError: false,
      message: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestHandler(pageNo, pageSize, filter);
        await response.json().then((data) => {
          handleDataChange(data);
        });
      } catch (e) {
        handleNotification({ isError: true, message: e.message, reload: false });
      }
    };
    fetchData();
  }, [pageNo, pageSize, filter]);

  if (books === undefined) {
    return (
      <Row>
        <Col className="justify-content-center">
          <Loader />
        </Col>
      </Row>
    );
  } else {
    if (books.length !== 0) {
      return (
        <>
          <Row className="listing-container mt-4 mb-5">
            <Col>
              <Table responsive>
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
      );
    } else {
      const notificationObject = {
        isError: true,
        message:
          "The request yielded 0 results. Please change your search parameters and try again.",
      };
      return (
        <>
          <NotificationHandler handleClose={handleClose} notificationObject={notificationObject} />
          <Row>
            <Col lg={2}>
              <IndexLinkContainer to="/page/1">
                <Button variant="outline-primary" block>Reset</Button>
              </IndexLinkContainer>
            </Col>
          </Row>
        </>
      );
    }
  }
};

export default ListingTableContainer;
