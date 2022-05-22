import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authors from "~/modules/authors/authors.routes";
import books from "~/modules/books/books.routes";
import HttpError from "~/shared/http-errors";
import environment from "~/environment";

const server = express();

server.use(cors());
server.use(express.json());

if (environment.NODE_ENV === "development") {
  server.use(morgan("dev"));
}

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
