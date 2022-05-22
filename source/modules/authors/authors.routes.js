import { Router } from "express";
import AuthorsController from "./authors.controller";
import Author from "./authors.model";

const buildHandler = (name) => (request, response) => {
  const controller = new AuthorsController({
    model: Author,
    request,
    response,
  });

  return controller[name]();
};

const routes = [
  { path: "/", method: "get", handler: buildHandler("index") },
  { path: "/", method: "post", handler: buildHandler("create") },
  { path: "/:id", method: "get", handler: buildHandler("show") },
  { path: "/:id", method: "put", handler: buildHandler("update") },
  { path: "/:id", method: "delete", handler: buildHandler("delete") },
];

const router = Router();

routes.forEach(({ handler, method, path }) => router[method](path, handler));

export default router;
