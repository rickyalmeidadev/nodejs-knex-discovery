import environment from "~/environment";
import server from "~/server";

server.listen(environment.PORT, () =>
  console.log(`Server listening on port ${environment.PORT}`)
);
