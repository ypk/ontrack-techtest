import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function ListingPage () {
  useEffect(() => {
    const { page, items, query } = useParams()
    console.log(page, items, query)
  }, [])

  return 'Hello World'
}

export default ListingPage
