import "express-async-errors";
import express from "express";
import authors from "./modules/authors/routes";
import books from "~/modules/books/routes";
import HttpError from "./shared/http-errors";

const server = express();

server.use(express.json());

server.get("/", (_, response) =>
  response.send("Welcome to Node.js Knex Discovery!")
);

server.use("/authors", authors);
server.use("/books", books);

server.use((error, request, response, next) => {
  if (error instanceof HttpError) {
    return response.status(error.status).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal server error" });
});

export default server;
