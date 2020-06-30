import React from "react";
import { render } from "@testing-library/react";
import jest from 'jest-mock';

const mock = jest.fn();

import RequestHandler from "./request-handler/request-handler.js";

const jsonMockData = {
  books: [
    {
      id: 2086,
      book_author: ["Ανώνυμος"],
      book_title: "Ο Αλέξανδρος ο Μακεδών",
      book_publication_year: 1529,
      book_publication_country: "Ιταλία",
      book_publication_city: "Βενετία",
      book_pages: 104,
    },
    {
      id: 2060,
      book_author: ["Ανώνυμος"],
      book_title:
        "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου",
      book_publication_year: 1548,
      book_publication_country: "Ιταλία",
      book_publication_city: "Βενετία",
      book_pages: 32,
    },
    {
      id: 2087,
      book_author: ["Ανώνυμος"],
      book_title: "Ο Αλέξανδρος ο Μακεδών",
      book_publication_year: 1553,
      book_publication_country: "Ιταλία",
      book_publication_city: "Βενετία",
      book_pages: 104,
    },
    {
      id: 2061,
      book_author: ["Ανώνυμος"],
      book_title:
        "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των Ρωμαίων μεγάλου Βελισαρίου",
      book_publication_year: 1554,
      book_publication_country: "Ιταλία",
      book_publication_city: "Βενετία",
      book_pages: 0,
    },
    {
      id: 2062,
      book_author: ["Ανώνυμος"],
      book_title:
        "Διήγησις εις τας πράξεις του περιβοήτου στρατηγού των ρωμαίων μεγάλου Βελισαρίου",
      book_publication_year: 1562,
      book_publication_country: "Ιταλία",
      book_publication_city: "Βενετία",
      book_pages: 32,
    },
  ],
  count: 2425,
};

beforeEach(() => {
  fetch.mockClear();
})

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('testing RequestHandler function', () => {
it("calls the RequestHandler function once", async () => {
      await RequestHandler()
        .then(response => response.json())
        .then(data => {
          expect(fetch).toHaveBeenCalledTimes(1);
        })
  });

})