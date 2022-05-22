export const up = (knex) =>
  knex.schema.createTable("authors", (table) => {
    table.uuid("id").primary();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });

export const down = (knex) => knex.schema.dropTable("authors");
