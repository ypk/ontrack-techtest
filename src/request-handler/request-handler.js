const apiUrl = 'http://nyx.vima.ekt.gr:3000/api/books'

const RequestHandler = (page, items, query) => {
  const getPageNumber = () => page ? Number.parseInt(page) : 1
  const getItemsPerPage = () => items ? Number.parseInt(items) : 5
  const getFilters = () => [{
    type: 'all', values: [`${query}`]
  }]
  console.log(page, items, query)
  const fetchData = async () => {
    const payload = {
      page: getPageNumber(),
      itemsPerPage: getItemsPerPage(),
      filters: getFilters()
    }
    const result = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(payload)
    })
    return result
  }
  return fetchData()
}

export default RequestHandler
