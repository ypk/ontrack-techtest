import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Accordion,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table
} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import RequestHandler from '../request-handler/request-handler.js'

function ListingPage () {
  const { page } = useParams()
  const searchElement = useRef(null)
  const pageNavigationElement = useRef(null)
  const allowedItemsCount = [5, 10, 25, 50, 100]
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(Number.parseInt(page))
  const [queryString, setQueryString] = useState('')
  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const handleSelect = (event) => {
    const { value } = event.target
    setItemsPerPage(value)
  }
  const handleQuery = () => {
    const { value } = searchElement.current
    setQueryString(value)
  }
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target
      setQueryString(value)
    }
  }
  const handlePageNavigation = (event) => {
    const { value } = event.target
    console.log(value)
  }
  const generatePagination = () => {
    let pages = [];
    if (pageNumber < 3) {
      for (let i = 1; i <= 3; i++) {
        pages[i] = (<Button  onClick={e => handlePageNavigation(e)} value={i} variant="primary" key={i}>{i}</Button>);
      }
    } else {
      for (let j = (pageNumber - 3); j <= pageNumber; j++) {
        pages[j] = (<Button variant="primary" onClick={e => handlePageNavigation(e)} key={j} value={j} disabled={ pageNumber === pageCount }>{j}</Button>);
      }
    }

    return (
      <ButtonToolbar className="mb-3" aria-label="Page Navigation Toolbar">
        <ButtonGroup className="mr-2" aria-label="Page Numbers">
          {
            pages.map(page => page)
          }
        </ButtonGroup>
        <InputGroup>
          <Form.Control
            placeholder='Page No'
            aria-label='Page Number'
            ref={pageNavigationElement}
            onKeyPress={handlePageNavigation}
          />
          <InputGroup.Append>
            <Button variant='outline-primary' onClick={handleQuery}>Go</Button>
          </InputGroup.Append>
        </InputGroup>
      </ButtonToolbar>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await RequestHandler(pageNumber, itemsPerPage, queryString)
      await response.json()
        .then((data) => {
          setData(data.books)
          setDataCount(data.count)
          const calculatedPageCount = Number.parseInt(data.count) / Number.parseInt(itemsPerPage)
          setPageCount(calculatedPageCount)
        })
    }
    fetchData()
  }, [pageNumber, itemsPerPage, queryString])

  const getBookAuthor = (author) => author.length > 0 ? author.join(', ') : author.pop()

  const renderPublicationData = () => {
    return data.map((book, key) => {
      const { id, book_author, book_title, book_publication_year, book_pages, book_publication_city, book_publication_country } = book
      return (
        <tr key={key}>
          <td className='align-middle text-center'>{id}</td>
          <td className='align-middle text-center'>{getBookAuthor(book_author)}</td>
          <td className='align-middle'>{book_title}</td>
          <td className='align-middle text-center'>{book_publication_year}</td>
          <td className='align-middle text-center'>{book_pages}</td>
          <td className='align-middle text-center'>{book_publication_city}</td>
          <td className='align-middle text-center'>{book_publication_country}</td>
        </tr>
      )
    })
  }
  return (
    <>
      <Container>
        <Accordion className='my-4'>
          <Card>
            <Accordion.Toggle as={Button} eventKey='0'>
              <span role='img' aria-label='settings' className='float-left'>⚙️&nbsp;Settings</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <Row className='m-4'>
                <Col sm={9}>
                  <Form.Group controlId='searchField' className='mb-0'>
                    <Form.Label>Search</Form.Label>
                    <InputGroup>
                      <Form.Control
                        placeholder='e.g: name of a book or an author'
                        aria-label='Search field'
                        ref={searchElement}
                        onKeyPress={handleSearch}
                      />
                      <InputGroup.Append>
                        <Button variant='outline-primary' onClick={handleQuery}>Search</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group controlId='itemsPerPageSelect' className='mb-0'>
                    <Form.Label>Items per page</Form.Label>
                    <Form.Control
                      onChange={handleSelect}
                      as='select'
                      defaultValue={itemsPerPage}
                    >
                      <option value='null' disabled>
                        Items Per Page
                      </option>
                      {allowedItemsCount.map((item, key) => (
                        <option key={key} name={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        {
          data.length > 0 && (
            <>
              <Row>
                <Col>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className='align-middle text-center'>#</th>
                        <th className='align-middle text-center'>Author</th>
                        <th className='align-middle text-center'>Title</th>
                        <th className='align-middle text-center'>Publication Year</th>
                        <th className='align-middle text-center'>Page Count</th>
                        <th className='align-middle text-center'>Publication City</th>
                        <th className='align-middle text-center'>Publication Country</th>
                      </tr>
                    </thead>
                    <tbody>{renderPublicationData()}</tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  {generatePagination()}
                </Col>
              </Row>
            </>
          )
        }
      </Container>
    </>
  )
}
export default ListingPage


/*
(e.g: 5, 10 ... ${pageCount > 2 ? pageCount - 1 : 1 }
*/