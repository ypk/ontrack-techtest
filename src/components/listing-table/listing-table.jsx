
import { React, getBookAuthor } from "../../common";
import { Loader } from "../../components";

const ListingTable = (props) => {
  const { data } = props;
  const { books } = data;

  return (
    <tbody>
      {
        books && books.length > 0 ? books.map((book, key) => {
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
                <td className="align-middle text-center">
                  {book_publication_year}
                </td>
                <td className="align-middle text-center">{book_pages}</td>
                <td className="align-middle text-center">
                  {book_publication_city}
                </td>
                <td className="align-middle text-center">
                  {book_publication_country}
                </td>
              </tr>
            );
          })
        :
          <tr>
            <td>
              <Loader type="section" />
            </td>
          </tr>
      }
    </tbody>
  );
};

export default ListingTable;