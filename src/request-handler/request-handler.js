const apiUrl = "http://nyx.vima.ekt.gr:3000/api/books";
/**
 * fetches data specific to apiUrl endpoint
 * @param {number} page - page number to view
 * @param {number} items - number of items to fetch on a page
 * @param {string} query - text from search field to query
 * @returns {function} fetchData - async function to fetch content 
 */
const RequestHandler = (page, items, query) => {
  const getPageNumber = () => (page ? Number.parseInt(page) : 1);
  const getItemsPerPage = () => (items ? Number.parseInt(items) : 5);
  const getFilters = () => [
    {
      type: "all",
      values: [`${query}`]
    }
  ];
  const fetchData = async () => {
    const payload = {
      page: getPageNumber(),
      itemsPerPage: getItemsPerPage(),
      filters: getFilters(),
    };
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return result;
  };
  return fetchData();
};

export default RequestHandler;
