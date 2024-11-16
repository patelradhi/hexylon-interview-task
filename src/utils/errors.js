class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class ResourceConflict extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  UnknownError,
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
  ResourceConflict,
}