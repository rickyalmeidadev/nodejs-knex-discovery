import knex from "~/database/knex";
import uuid from "~/shared/uuid";

export default class Author {
  constructor({ name }) {
    this.id = uuid();
    this.name = name;
  }

  static async all() {
    return knex.select("*").from("authors");
  }

  static async find(id) {
    const [author] = await knex.select("*").from("authors").where("id", id);

    return author;
  }

  static async create({ name }) {
    const author = new Author({ name });

    await knex.insert(author).into("authors");

    const [first] = await knex
      .select("*")
      .from("authors")
      .where("id", author.id);

    return first;
  }

  static async update(id, { name }) {
    await knex.update({ name }).from("authors").where("id", id);

    const [author] = await knex.select("*").from("authors").where("id", id);

    return author;
  }

  static async delete(id) {
    const [author] = await knex.select("*").from("authors").where("id", id);

    await knex.del().from("authors").where("id", id);

    return author;
  }
}
