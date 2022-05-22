export const up = (knex) =>
  knex.schema.createTable("books", (table) => {
    table.uuid("id").primary();
    table.string("title").notNullable();
    table.uuid("author_id").notNullable();
    table.timestamps(true, true);

    table.foreign("author_id").references("authors.id");
  });

export const down = (knex) => knex.schema.dropTable("books");
