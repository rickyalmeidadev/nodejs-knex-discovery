import express from "express";
import books from "~/modules/books/routes";

const server = express();

server.use(express.json());

server.get("/", (_, response) =>
  response.send("Welcome to Node.js Knex Discovery!")
);

server.use("/books", books);

export default server;
