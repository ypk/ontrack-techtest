import React from "react";
import { Button, ButtonGroup, ButtonToolbar, Spinner } from "react-bootstrap";

import ErrorHandler from "../error-handler/error-handler.jsx";
import RequestHandler from "../request-handler/request-handler.js";
import NotFound from "./not-found.jsx";

const generatePagination = (
  currentPage,
  totalPages,
  itemsPerPage,
  handlePageNavigation,
  pagesCount
) => {
  const pages = [];
  const pagingLimit = 4;

  pages[0] = (
    <Button
      onClick={(e) => handlePageNavigation(e)}
      variant="primary"
      key="first"
      disabled={currentPage === 1}
      value={1}
    >
      First
    </Button>
  );

  pages.push(
    <Button variant="primary" key="lowerLimitSeparator" disabled>
      ...
    </Button>
  );

  if (currentPage <= totalPages) {
    if (currentPage <= pagingLimit) {
      for (
        let minLowerLimit = currentPage;
        minLowerLimit >= 1;
        minLowerLimit--
      ) {
        pages[minLowerLimit] = (
          <Button
            onClick={(e) => handlePageNavigation(e)}
            variant="primary"
            value={minLowerLimit}
            key={minLowerLimit}
            disabled={minLowerLimit === currentPage}
          >
            {minLowerLimit}
          </Button>
        );
      }
      if (totalPages > itemsPerPage) {
        for (
          let minUpperLimit = currentPage + 1;
          minUpperLimit <= currentPage + pagingLimit;
          minUpperLimit++
        ) {
          pages.push(
            <Button
              onClick={(e) => handlePageNavigation(e)}
              variant="primary"
              value={minUpperLimit}
              key={minUpperLimit}
              disabled={minUpperLimit === currentPage}
            >
              {minUpperLimit}
            </Button>
          );
        }
      } else {
        for (let muCP = currentPage + 1; muCP <= totalPages; muCP++) {
          pages.push(
            <Button
              onClick={(e) => handlePageNavigation(e)}
              variant="primary"
              value={muCP}
              key={muCP}
              disabled={muCP === currentPage}
            >
              {muCP}
            </Button>
          );
        }
      }
    } else if (currentPage + pagingLimit >= totalPages) {
      for (
        let maxLowerLimit = currentPage - pagingLimit;
        maxLowerLimit <= currentPage;
        maxLowerLimit++
      ) {
        pages[maxLowerLimit] = (
          <Button
            onClick={(e) => handlePageNavigation(e)}
            variant="primary"
            key={maxLowerLimit}
            value={maxLowerLimit}
            disabled={maxLowerLimit === currentPage}
          >
            {maxLowerLimit}
          </Button>
        );
      }
      for (
        let maxUpperLimit = currentPage;
        maxUpperLimit <= totalPages;
        maxUpperLimit++
      ) {
        pages[maxUpperLimit] = (
          <Button
            onClick={(e) => handlePageNavigation(e)}
            variant="primary"
            key={maxUpperLimit}
            value={maxUpperLimit}
            disabled={maxUpperLimit === currentPage}
          >
            {maxUpperLimit}
          </Button>
        );
      }
    } else {
      for (
        let maxLowerLimitRest = currentPage - pagingLimit;
        maxLowerLimitRest <= currentPage;
        maxLowerLimitRest++
      ) {
        pages[maxLowerLimitRest] = (
          <Button
            onClick={(e) => handlePageNavigation(e)}
            variant="primary"
            key={maxLowerLimitRest}
            value={maxLowerLimitRest}
            disabled={maxLowerLimitRest === currentPage}
          >
            {maxLowerLimitRest}
          </Button>
        );
      }
      for (
        let maxUpperLimitRest = currentPage + 1;
        maxUpperLimitRest <= currentPage + pagingLimit;
        maxUpperLimitRest++
      ) {
        pages[maxUpperLimitRest] = (
          <Button
            onClick={(e) => handlePageNavigation(e)}
            variant="primary"
            key={maxUpperLimitRest}
            value={maxUpperLimitRest}
            disabled={maxUpperLimitRest === currentPage}
          >
            {maxUpperLimitRest}
          </Button>
        );
      }
    }
  } else {
    for (
      let minCustomLimit = currentPage;
      minCustomLimit <= currentPage;
      minCustomLimit++
    ) {
      pages[minCustomLimit] = (
        <Button
          onClick={(e) => handlePageNavigation(e)}
          variant="primary"
          key={minCustomLimit}
          value={minCustomLimit}
          disabled={minCustomLimit === currentPage}
        >
          {minCustomLimit}
        </Button>
      );
    }
    for (
      let maxCustomLimit = currentPage;
      maxCustomLimit <= totalPages;
      maxCustomLimit++
    ) {
      pages[maxCustomLimit] = (
        <Button
          onClick={(e) => handlePageNavigation(e)}
          variant="primary"
          key={maxCustomLimit}
          value={maxCustomLimit}
          disabled={currentPage === pagesCount}
        >
          {maxCustomLimit}
        </Button>
      );
    }
  }
  if (
    currentPage < totalPages &&
    totalPages <= pagesCount &&
    currentPage + 1 !== totalPages
  ) {
    pages.push(
      <Button variant="primary" key="upperLimitLimitSeparator" disabled>
        ...
      </Button>
    );
  }
  pages[pages.length + 1] = (
    <Button
      onClick={(e) => handlePageNavigation(e)}
      variant="primary"
      key="last"
      disabled={currentPage === totalPages}
      value={totalPages}
    >
      Last
    </Button>
  );
  return (
    <ButtonToolbar
      className="justify-content-center"
      aria-label="Page Navigation Toolbar"
    >
      <ButtonGroup className="mr-2" aria-label="Page Numbers">
        {pages.map((page) => page)}
      </ButtonGroup>
    </ButtonToolbar>
  );
};

const noRecordsFound = {
  isError: false,
  message: "No records match your query. Please try again",
  reload: true,
};

const getBookAuthor = (author) =>
  author.length > 0 ? author.join(", ") : author.pop();

const renderPublicationData = (data) => {
  return data.map((book, key) => {
    const {
      id,
      book_author,
      book_title,
      book_publication_year,
      book_pages,
      book_publication_city,
      book_publication_country,
    } = book;
    return (
      <tr key={key}>
        <td className="align-middle text-center">{id}</td>
        <td className="align-middle text-center">
          {getBookAuthor(book_author)}
        </td>
        <td className="align-middle">{book_title}</td>
        <td className="align-middle text-center">{book_publication_year}</td>
        <td className="align-middle text-center">{book_pages}</td>
        <td className="align-middle text-center">{book_publication_city}</td>
        <td className="align-middle text-center">{book_publication_country}</td>
      </tr>
    );
  });
};

const generateTableHeader = () => {
  return (
    <>
      <tr>
        <th className="align-middle text-center">#</th>
        <th className="align-middle text-center">Author</th>
        <th className="align-middle text-center">Title</th>
        <th className="align-middle text-center">Publication Year</th>
        <th className="align-middle text-center">Page Count</th>
        <th className="align-middle text-center">Publication City</th>
        <th className="align-middle text-center">Publication Country</th>
      </tr>
    </>
  );
};

const Loader = () => {
  return (
    <Spinner
      animation="border"
      variant="primary"
      className="mx-auto my-5"
      size="lg"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

/**
 * @author Sterling Hamilton <sterling.hamilton@gmail.com>
 */
function isNumber(value) {
  // We will not coerce boolean to numbers, although we could.
  // We will not coerce strings to numbers, even though we could try.
  // Referencing https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
  if (typeof value !== "number") {
    return false;
  }
  // Consider this as the NaN check.
  // NaN is a number.
  // NaN has the unique property of never equaling itself.
  // Pulled this hack right off of MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
  if (value !== Number(value)) {
    return false;
  }
  // At this point, we for sure have some sort of number.
  // But not all numbers are finite, and realistically we want finite numbers.
  if (Number.isFinite(value) === false) {
    return false;
  }
  // It is indeed a number
  if (Number.isInteger(value)) {
    return true;
  }
}

export {
  ErrorHandler,
  isNumber,
  generatePagination,
  generateTableHeader,
  RequestHandler,
  renderPublicationData,
  Loader,
  NotFound,
  noRecordsFound,
};
