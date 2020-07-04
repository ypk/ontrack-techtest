import { Redirect } from "../common";
import { BooksListing, NotFound } from "../pages";

const routes = [
  {
    path: "/",
    exact: true,
    component: Redirect,
    redirectTo: { to: "/page/1/items/5" },
    isRedirect: true,
  },
  {
    path: "/page/:pageNumber",
    exact: true,
    component: BooksListing,
  },
  {
    path: "/page/:pageNumber/items/:itemsPerPage",
    exact: true,
    component: BooksListing,
  },
  {
    path: "/page/:pageNumber/items/:itemsPerPage/filters/:filtersString",
    exact: true,
    component: BooksListing,
  },
  {
    component: NotFound,
  },
];

export default routes;
