import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RequestHandler from '../request-handler/request-handler.js'

function ListingPage () {
  const [data, setData] = useState([])
  const { page, items, query } = useParams()

  useEffect(() => {
    const getPage = () => {
      return Number.parseInt(page) || 1
    }
    const getItems = () => {
      return Number.parseInt(items) || 10
    }
    const getQueryString = () => {
      return [
        {
          type: 'all',
          values: query ? [query] : []
        }
      ]
    }
    const request = RequestHandler(getPage(), getItems(), getQueryString())
    request
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
  }, [page, items, query])

  const [books, count] = data

 books && books.map((book) => {
    return book.name
  })
}

export default ListingPage
