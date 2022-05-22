export default class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class NotFound extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}
