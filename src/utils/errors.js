class BaseError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnknownError extends BaseError {
  constructor(message = "An unexpected error occurred") {
    super(message, 500);
  }
}

class NotFoundError extends BaseError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class UnAuthenticatedError extends BaseError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}

class UnAuthorizedError extends BaseError {
  constructor(message = "Not authorized") {
    super(message, 403);
  }
}

class ResourceConflict extends BaseError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}

class ValidationError extends BaseError {
  constructor(message = "Validation failed", details = {}) {
    super(message, 400);
    this.details = details;
  }
}

module.exports = {
  UnknownError,
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
  ResourceConflict,
  ValidationError
};
