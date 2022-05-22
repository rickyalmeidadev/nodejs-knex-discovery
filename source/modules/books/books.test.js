import request from "supertest";
import knex from "~/database/knex";
import uuid from "~/shared/uuid";
import server from "~/server";

const buildAuthor = () => ({
  id: uuid(),
  name: `any-name-${uuid()}`,
});

const buildBook = () => ({
  id: uuid(),
  title: `any-title-${uuid()}`,
  author_id: author.id,
});

const author = buildAuthor();

beforeEach(async () => {
  await knex.migrate.latest();
  await knex.insert(author).into("authors");
});

afterEach(() => knex.migrate.rollback());

afterAll(() => knex.destroy());

describe("GET /books", () => {
  const books = Array.from({ length: 3 }).map(() => buildBook());

  beforeEach(() => knex.insert(books).into("books"));

  it("returns all books", async () => {
    const response = await request(server).get("/books");

    expect(response.status).toBe(200);
    expect(response.header["x-total-count"]).toBe(books.length.toString());
    expect(response.body).toHaveLength(books.length);
    expect(response.body).toMatchObject(books);
  });
});

describe("GET /books/:id", () => {
  const book = buildBook();

  beforeEach(() => knex.insert(book).into("books"));

  it("returns a book by id", async () => {
    const response = await request(server).get(`/books/${book.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(book.id);
    expect(response.body.title).toBe(book.title);
    expect(response.body.author_id).toBe(book.author_id);
  });

  it("returns a 404 if book is not found", async () => {
    const response = await request(server).get(`/books/${uuid()}`);

    expect(response.status).toBe(404);
  });
});

describe("POST /books", () => {
  const book = buildBook();
  delete book.id;

  it("creates a book", async () => {
    const create = await request(server).post("/books").send(book);

    expect(create.status).toBe(201);
    expect(create.body.id).toBeDefined();
    expect(create.body.title).toBe(book.title);
    expect(create.body.author_id).toBe(book.author_id);

    const show = await request(server).get(`/books/${create.body.id}`);

    expect(show.status).toBe(200);
    expect(show.body.id).toBe(create.body.id);
    expect(show.body.title).toBe(book.title);
    expect(show.body.author_id).toBe(book.author_id);
  });

  it("returns a 400 if book's title is missing", async () => {
    const response = await request(server).post("/books").send({
      author_id: author.id,
    });

    expect(response.status).toBe(400);
  });

  it("returns a 400 if book's author_id is missing", async () => {
    const response = await request(server).post("/books").send({
      title: "any-title",
    });

    expect(response.status).toBe(400);
  });
});

describe("PUT /books/:id", () => {
  const book = buildBook();

  beforeEach(() => knex.insert(book).into("books"));

  it("updates a book", async () => {
    const title = "any-title";

    const update = await request(server).put(`/books/${book.id}`).send({
      title: title,
      author_id: author.id,
    });

    expect(update.status).toBe(200);
    expect(update.body.id).toBe(book.id);
    expect(update.body.title).toBe(title);
    expect(update.body.author_id).toBe(author.id);

    const show = await request(server).get(`/books/${book.id}`);

    expect(show.status).toBe(200);
    expect(show.body.id).toBe(book.id);
    expect(show.body.title).toBe(title);
    expect(show.body.author_id).toBe(author.id);
  });

  it("returns a 404 if book is not found", async () => {
    const response = await request(server).put(`/books/${uuid()}`).send({
      title: "any-title",
      author_id: author.id,
    });

    expect(response.status).toBe(404);
  });

  it("returns a 400 if book's title is missing", async () => {
    const response = await request(server).put(`/books/${book.id}`).send({
      author_id: author.id,
    });

    expect(response.status).toBe(400);
  });

  it("returns a 400 if book's author_id is missing", async () => {
    const response = await request(server).put(`/books/${book.id}`).send({
      title: "any-title",
    });

    expect(response.status).toBe(400);
  });
});

describe("DELETE /books/:id", () => {
  const book = buildBook();

  beforeEach(() => knex.insert(book).into("books"));

  it("deletes a book", async () => {
    const del = await request(server).delete(`/books/${book.id}`);

    expect(del.status).toBe(200);
    expect(del.body.id).toBe(book.id);
    expect(del.body.title).toBe(book.title);
    expect(del.body.author_id).toBe(book.author_id);

    const show = await request(server).get(`/books/${book.id}`);

    expect(show.status).toBe(404);
  });

  it("returns a 404 if book is not found", async () => {
    const response = await request(server).delete(`/books/${uuid()}`);

    expect(response.status).toBe(404);
  });
});
