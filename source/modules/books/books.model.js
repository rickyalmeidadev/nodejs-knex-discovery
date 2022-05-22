import knex from "~/database/knex";
import uuid from "~/shared/uuid";

export default class Book {
  constructor({ title, author_id }) {
    this.id = uuid();
    this.title = title;
    this.author_id = author_id;
  }

  static async all() {
    return knex.select("*").from("books");
  }

  static async find(id) {
    const [book] = await knex.select("*").from("books").where("id", id);

    return book;
  }

  static async create({ title, author_id }) {
    const book = new Book({ title, author_id });

    await knex.insert(book).into("books");

    const [first] = await knex.select("*").from("books").where("id", book.id);

    return first;
  }

  static async update(id, { title, author_id }) {
    await knex.update({ title, author_id }).from("books").where("id", id);

    const [book] = await knex.select("*").from("books").where("id", id);

    return book;
  }

  static async delete(id) {
    const [book] = await knex.select("*").from("books").where("id", id);

    await knex.del().from("books").where("id", id);

    return book;
  }
}
