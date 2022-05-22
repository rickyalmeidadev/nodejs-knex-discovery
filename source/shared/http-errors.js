export default class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class BadRequest extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}

export class NotFound extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}
