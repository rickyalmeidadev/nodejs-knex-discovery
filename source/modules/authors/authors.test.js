import request from "supertest";
import knex from "~/database/knex";
import uuid from "~/shared/uuid";
import server from "~/server";

const buildAuthor = () => ({
  id: uuid(),
  name: `any-name-${uuid()}`,
});

beforeEach(() => knex.migrate.latest());

afterEach(() => knex.migrate.rollback());

afterAll(() => knex.destroy());

describe("GET /authors", () => {
  const authors = Array.from({ length: 3 }).map(() => buildAuthor());

  beforeEach(() => knex.insert(authors).into("authors"));

  it("returns all authors", async () => {
    const response = await request(server).get("/authors");

    expect(response.status).toBe(200);
    expect(response.header["x-total-count"]).toBe(authors.length.toString());
    expect(response.body).toHaveLength(authors.length);
    expect(response.body).toMatchObject(authors);
  });
});

describe("GET /authors/:id", () => {
  const author = buildAuthor();

  beforeEach(() => knex.insert(author).into("authors"));

  it("returns a author by id", async () => {
    const response = await request(server).get(`/authors/${author.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(author.id);
    expect(response.body.name).toBe(author.name);
  });

  it("returns a 404 if author is not found", async () => {
    const response = await request(server).get(`/authors/${uuid()}`);

    expect(response.status).toBe(404);
  });
});

describe("POST /authors", () => {
  const author = buildAuthor();
  delete author.id;

  it("creates a author", async () => {
    const create = await request(server).post("/authors").send(author);

    expect(create.status).toBe(201);
    expect(create.body.id).toBeDefined();
    expect(create.body.name).toBe(author.name);

    const show = await request(server).get(`/authors/${create.body.id}`);

    expect(show.status).toBe(200);
    expect(show.body.id).toBe(create.body.id);
    expect(show.body.name).toBe(author.name);
  });

  it("returns a 400 if author is invalid", async () => {
    const response = await request(server).post("/authors").send({});

    expect(response.status).toBe(400);
  });
});

describe("PUT /authors/:id", () => {
  const author = buildAuthor();

  beforeEach(() => knex.insert(author).into("authors"));

  it("updates a author", async () => {
    const name = "any-name";

    const update = await request(server).put(`/authors/${author.id}`).send({
      name: name,
    });

    expect(update.status).toBe(200);
    expect(update.body.id).toBe(author.id);
    expect(update.body.name).toBe(name);

    const show = await request(server).get(`/authors/${author.id}`);

    expect(show.status).toBe(200);
    expect(show.body.id).toBe(author.id);
    expect(show.body.name).toBe(name);
  });

  it("returns a 404 if author is not found", async () => {
    const response = await request(server).put(`/authors/${uuid()}`).send({
      name: "any-name",
    });

    expect(response.status).toBe(404);
  });

  it("returns a 400 if author is invalid", async () => {
    const response = await request(server)
      .put(`/authors/${author.id}`)
      .send({});

    expect(response.status).toBe(400);
  });
});

describe("DELETE /authors/:id", () => {
  const author = buildAuthor();

  beforeEach(() => knex.insert(author).into("authors"));

  it("deletes a author", async () => {
    const del = await request(server).delete(`/authors/${author.id}`);

    expect(del.status).toBe(200);
    expect(del.body.id).toBe(author.id);
    expect(del.body.name).toBe(author.name);

    const show = await request(server).get(`/authors/${author.id}`);

    expect(show.status).toBe(404);
  });

  it("returns a 404 if author is not found", async () => {
    const response = await request(server).delete(`/authors/${uuid()}`);

    expect(response.status).toBe(404);
  });
});
