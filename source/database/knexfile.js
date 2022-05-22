import path from "node:path";
import environment from "../environment";

export default {
  client: "sqlite3",
  connection:
    environment.NODE_ENV === "test"
      ? ":memory:"
      : { filename: path.join(__dirname, "database.sqlite3") },
  migrations: {
    directory: path.join(__dirname, "migrations"),
  },
  useNullAsDefault: true,
};
