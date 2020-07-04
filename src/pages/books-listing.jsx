import { React, useState, useParams, useHistory, useRef } from "../common";
import {
  PageSizeSelector,
  ListingTableContainer,
  SearchBar,
  NotificationHandler,
} from "../components";

function BooksListing() {
  const { pageNumber, itemsPerPage, filtersString } = useParams();
  const history = useHistory();
  const [pageNo, setPageNo] = useState(Number.parseInt(pageNumber) || 1);
  const [pageSize, setPageSize] = useState(Number.parseInt(itemsPerPage) || 5);
  const [filter, setFilter] = useState(filtersString);
  const [notificationObject, setNotificationObject] = useState({
    isError: false,
    message: "",
    dismissible: true,
  });
  const [data, setData] = useState([]);
  const searchElement = useRef(null);
  const PageNavigationElement = useRef(null);

  const updateDataChange = function (data) {
    setData(data);
  };

  const setNotification = function (NotificationObject) {
    setNotificationObject(NotificationObject);
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
      setNotificationObject({
        isError: true,
        message:
          "Because the total records are more than expeted, your page number is reset to 1.",
      });
    } else {
      history.push(`/page/${pageNo}/items/${value}`);
    }
  };

  /* Set search filter string in search bar */

  if (
    filter !== undefined &&
    filter !== "" &&
    searchElement !== null &&
    searchElement.current !== null
  ) {
    searchElement.current.value = filter;
  }

  /* Search Bar */

  const handleSearchOnKeyPress = (event) => {
    if (event.key === "Enter") {
      const { value } = event.target;
      if (value) {
        setFilter(value);
        history.push(`/page/1/items/${pageSize}/filters/${value}`);
      } else {
        setNotificationObject({
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
      setNotificationObject({
        isError: true,
        message: "The search field is empty. Please enter a query to search.",
      });
    }
  };

  /* Page Navigation */

  const handlePageNavigationByKeyPress = (event) => {
    if (event.key === "Enter") {
      const { value } = event.target;
      if (value) {
        navigateToPage(value);
      } else {
        setNotificationObject({
          isError: true,
          message:
            "The page number field is empty. Please enter a page number.",
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
      setNotificationObject({
        isError: true,
        message: "The page number field is empty. Please enter a page number.",
      });
    }
  };

  const handleClose = () => {
    setNotificationObject({
      isError: false,
      message: "",
    });
  };

  return (
    <>
      <SearchBar
        onClickEvent={handleSearchByClick}
        onKeyPressEvent={handleSearchOnKeyPress}
        refElement={searchElement}
      />
      <PageSizeSelector
        data={data}
        handleDataChange={updateDataChange}
        handlePageSizeChange={updatePageSizeChange}
        updateNotifier={handleClose}
        pageSize={pageSize}
      />
      {notificationObject.isError && (
        <NotificationHandler
          handleClose={handleClose}
          notificationObject={notificationObject}
        />
      )}
      <ListingTableContainer
        data={data}
        handleDataChange={updateDataChange}
        handleNotification={setNotification}
        pageNo={pageNo}
        pageSize={pageSize}
        filter={filter}
        updatePageNumber={updatePageNumber}
        handlePageNavigationByKeyPress={handlePageNavigationByKeyPress}
        handlePageNavigationByClick={handlePageNavigationByClick}
      />
    </>
  );
}

export default BooksListing;
