const buildHandler = (Controller, name, inject) => (request, response) => {
  const controller = new Controller({
    request,
    response,
    ...inject,
  });

  return controller[name]();
};

export default buildHandler;
