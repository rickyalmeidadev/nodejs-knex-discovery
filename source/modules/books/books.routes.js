import buildHandler from "~/shared/build-handler";
import buildRouter from "~/shared/build-router";
import BooksController from "./books.controller";
import Book from "./books.model";

const routes = [
  {
    path: "/",
    method: "get",
    handler: buildHandler(BooksController, "index", { model: Book }),
  },
  {
    path: "/",
    method: "post",
    handler: buildHandler(BooksController, "create", { model: Book }),
  },
  {
    path: "/:id",
    method: "get",
    handler: buildHandler(BooksController, "show", { model: Book }),
  },
  {
    path: "/:id",
    method: "put",
    handler: buildHandler(BooksController, "update", { model: Book }),
  },
  {
    path: "/:id",
    method: "delete",
    handler: buildHandler(BooksController, "delete", { model: Book }),
  },
];

const router = buildRouter(routes);

export default router;
