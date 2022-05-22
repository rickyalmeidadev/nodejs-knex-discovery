import { Router } from "express";

const buildRouter = (routes) => {
  const router = Router();

  routes.forEach(({ handler, method, path }) => router[method](path, handler));

  return router;
};

export default buildRouter;
