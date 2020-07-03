import { React, Row, Col, Table, useEffect } from "../../common";
import { ListingTable, ListingTableHeader } from "..";
import { RequestHandler } from "../../services";

const ListingTableContainer = (props) => {
  const {
    data,
    handleDataChange,
    handleError,
    pageNo,
    pageSize,
    filter,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RequestHandler(pageNo, pageSize, filter);
        await response.json().then((data) => {
          handleDataChange(data);
        });
      } catch (e) {
        handleError({ isError: true, message: e.message, reload: false });
      }
    };
    fetchData();
  }, [pageNo, pageSize, filter]);

  return (
    <Row className="listing-container mt-4 mb-5">
      <Col>
        <Table responsive>
          <ListingTableHeader />
          <ListingTable data={data} />
        </Table>
      </Col>
    </Row>
  )
};

export default ListingTableContainer;
