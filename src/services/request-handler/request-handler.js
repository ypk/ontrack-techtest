const apiUrl = "http://nyx.vima.ekt.gr:3000/api/books";
/**
 * fetches data specific to apiUrl endpoint
 * @param {number} page - page number to view
 * @param {number} items - number of items to fetch on a page
 * @param {string} query - text from search field to query
 * @returns {function} fetchData - async function to fetch content 
 */
const RequestHandler = (page, itemsPerPage, query) => {
  const filters = [
    {
      type: "all",
      values: [`${query}`]
    }
  ];
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
  };
  const fetchData = async () => {
    const payload = query === undefined ? {
      page,
      itemsPerPage
    } : {
      page,
      itemsPerPage,
      filters,
    };
    const result = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    return result;
  };
  return fetchData();
};

export default RequestHandler;