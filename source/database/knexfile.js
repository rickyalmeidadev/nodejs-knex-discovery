import path from "node:path";

export default {
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "database.sqlite3"),
  },
  migrations: {
    directory: path.join(__dirname, "migrations"),
  },
  useNullAsDefault: true,
};
