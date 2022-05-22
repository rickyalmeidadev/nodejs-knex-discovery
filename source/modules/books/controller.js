import { BadRequest, NotFound } from "~/shared/http-errors";

export default class BooksController {
  constructor({ model, request, response }) {
    this.model = model;
    this.request = request;
    this.response = response;
  }

  async index() {
    const books = await this.model.all();

    return this.response.set("X-Total-Count", books.length).json(books);
  }

  async show() {
    const book = await this.model.find(this.request.params.id);

    if (!book) {
      throw new NotFound("Book not found");
    }

    return this.response.json(book);
  }

  async create() {
    if (!this.request.body.title) {
      throw new BadRequest("Book title is required");
    }

    if (!this.request.body.author_id) {
      throw new BadRequest("Book author is required");
    }

    const book = await this.model.create({
      title: this.request.body.title,
      author_id: this.request.body.author_id,
    });

    return this.response.status(201).json(book);
  }

  async update() {
    if (!this.request.body.title) {
      throw new BadRequest("Book title is required");
    }

    if (!this.request.body.author_id) {
      throw new BadRequest("Book author is required");
    }

    const book = await this.model.update(this.request.params.id, {
      title: this.request.body.title,
      author_id: this.request.body.author_id,
    });

    if (!book) {
      throw new NotFound("Book not found");
    }

    return this.response.json(book);
  }

  async delete() {
    const book = await this.model.delete(this.request.params.id);

    if (!book) {
      throw new NotFound("Book not found");
    }

    return this.response.json(book);
  }
}
