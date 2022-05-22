import { BadRequest, NotFound } from "~/shared/http-errors";

export default class AuthorsController {
  constructor({ model, request, response }) {
    this.model = model;
    this.request = request;
    this.response = response;
  }

  async index() {
    const authors = await this.model.all();

    return this.response.set("X-Total-Count", authors.length).json(authors);
  }

  async show() {
    const author = await this.model.find(this.request.params.id);

    if (!author) {
      throw new NotFound("Author not found");
    }

    return this.response.json(author);
  }

  async create() {
    if (!this.request.body.name) {
      throw new BadRequest("Author name is required");
    }

    const author = await this.model.create({ name: this.request.body.name });

    return this.response.status(201).json(author);
  }

  async update() {
    if (!this.request.body.name) {
      throw new BadRequest("Author name is required");
    }

    const author = await this.model.update(this.request.params.id, {
      name: this.request.body.name,
    });

    if (!author) {
      throw new NotFound("Author not found");
    }

    return this.response.json(author);
  }

  async delete() {
    const author = await this.model.delete(this.request.params.id);

    if (!author) {
      throw new NotFound("Author not found");
    }

    return this.response.json(author);
  }
}
