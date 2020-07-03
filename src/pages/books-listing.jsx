import { React, useState, useParams, useHistory, useRef } from "../common";
import {
  PageSizeSelector,
  ListingTableContainer,
  Pagination,
  PageNavigation,
  SearchBar,
  ErrorHandler
} from "../components";

function BooksListing() {
  const { pageNumber, itemsPerPage, filtersString } = useParams();
  const history = useHistory();
  const [pageNo, setPageNo] = useState(Number.parseInt(pageNumber) || 1);
  const [pageSize, setPageSize] = useState(Number.parseInt(itemsPerPage) || 5);
  const [filter, setFilter] = useState(filtersString);
  const [errorObject, setErrorObject] = useState({
    isError: false,
    message: "",
    reload: false,
  });
  const [data, setData] = useState([]);
  const searchElement = useRef(null);
  const PageNavigationElement = useRef(null);

  const updateDataChange = function (data) {
    setData(data);
  };

  const setError = function (errorObject) {
    setErrorObject(errorObject);
  };

  const navigateToPage = function (value) {
    setPageNo(Number.parseInt(value));
    history.push(`/page/${value}/items/${pageSize}`);
  };

  const updatePageNumber = function (event) {
    event.preventDefault();
    const { value } = event.target;
    navigateToPage(value);
  };

  const updatePageSizeChange = function (event, size, count) {
    event.preventDefault();
    const { value } = event.target;
    setPageSize(Number.parseInt(value));
    if (count > 250) {
      history.push(`/page/1/items/${value}`);
      setErrorObject({
        isError: true,
        message: "Because the total records are more than expeted, your page number is reset to 1.",
      });
    } else {
      history.push(`/page/${pageNo}/items/${value}`);
    }
  };

  /* Filter Events */

  const handleSearchOnKeyPress = (event) => {
    if (event.key === "Enter") {
      const { value } = event.target;
      if (value) {
        setFilter(value);
        history.push(`/page/1/items/${pageSize}/filters/${value}`);
      } else {
        setErrorObject({
          isError: true,
          message: "The search field is empty. Please enter a query to search.",
        });
      }
    }
  };

  const handleSearchByClick = (event) => {
    event.preventDefault();
    const { value } = searchElement.current;
    if (value) {
      setFilter(value);
      history.push(`/page/1/items/${pageSize}/filters/${value}`);
    } else {
      setErrorObject({
        isError: true,
        message: "The search field is empty. Please enter a query to search.",
      });
    }
  };

  /* Page Navigation By Form Events */

  const handlePageNavigationByKeyPress = (event) => {
    if (event.key === "Enter") {
      const { value } = event.target;
      if (value) {
        navigateToPage(value);
      } else {
        setErrorObject({
          isError: true,
          message: "The page number field is empty. Please enter a page number.",
        });
      }
    }
  };

  const handlePageNavigationByClick = (event) => {
    event.preventDefault();
    const { value } = PageNavigationElement.current;
    if (value) {
      navigateToPage(value);
    } else {
      setErrorObject({
        isError: true,
        message: "The page number field is empty. Please enter a page number.",
      });
    }
  };

  const handleClose = () => {
    setErrorObject({
      isError: false,
      message: "",
    });
  }

  return (
    <>
      <SearchBar
        onClickEvent={handleSearchByClick}
        onKeyPressEvent={handleSearchOnKeyPress}
        refElement={searchElement}
      />
      <PageSizeSelector
        data={data}
        handlePageSizeChange={updatePageSizeChange}
        pageSize={pageSize}
      />
      {
        errorObject.isError && <ErrorHandler handleClose={handleClose} errorObject={errorObject} /> 
      }
      <ListingTableContainer
        data={data}
        handleDataChange={updateDataChange}
        handleError={setError}
        pageNo={pageNo}
        pageSize={pageSize}
        filter={filter}
      />
      <Pagination
        data={data}
        handlePagination={updatePageNumber}
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
}

export default BooksListing;
