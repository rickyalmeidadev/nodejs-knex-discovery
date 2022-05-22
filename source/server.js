import "express-async-errors";
import express from "express";
import books from "~/modules/books/routes";
import HttpError from "./shared/http-errors";

const server = express();

server.use(express.json());

server.get("/", (_, response) =>
  response.send("Welcome to Node.js Knex Discovery!")
);

server.use("/books", books);

server.use((error, request, response, next) => {
  if (error instanceof HttpError) {
    return response.status(error.status).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal server error" });
});

export default server;
