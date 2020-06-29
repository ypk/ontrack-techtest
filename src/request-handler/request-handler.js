const apiUrl = 'http://nyx.vima.ekt.gr:3000/api/books'

const RequestHandler = (page, items, query) => {
  const fetchData = async () => {
    const payload = {
      pageToFetch: page,
      itemsPerPage: items,
      searchQuery: query
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
