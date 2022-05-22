import buildHandler from "~/shared/build-handler";
import buildRouter from "~/shared/build-router";
import AuthorsController from "./authors.controller";
import Author from "./authors.model";

const routes = [
  {
    path: "/",
    method: "get",
    handler: buildHandler(AuthorsController, "index", { model: Author }),
  },
  {
    path: "/",
    method: "post",
    handler: buildHandler(AuthorsController, "create", { model: Author }),
  },
  {
    path: "/:id",
    method: "get",
    handler: buildHandler(AuthorsController, "show", { model: Author }),
  },
  {
    path: "/:id",
    method: "put",
    handler: buildHandler(AuthorsController, "update", { model: Author }),
  },
  {
    path: "/:id",
    method: "delete",
    handler: buildHandler(AuthorsController, "delete", { model: Author }),
  },
];

const router = buildRouter(routes);

export default router;
