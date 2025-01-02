// Custom error classes
class APIError extends Error {
    constructor(message, status, code, details = {}) {
      super(message);
      this.name = this.constructor.name;
      this.status = status;
      this.code = code;
      this.details = details;
    }
  }
  
  class NotFoundError extends APIError {
    constructor(resource, details = {}) {
      super(`${resource} not found`, 404, 'RESOURCE_NOT_FOUND', details);
    }
  }
  
  class ValidationError extends APIError {
    constructor(message, details = {}) {
      super(message, 400, 'VALIDATION_ERROR', details);
    }
  }
  
  class ServerError extends APIError {
    constructor(message = 'Internal server error', details = {}) {
      super(message, 500, 'INTERNAL_SERVER_ERROR', details);
    }
  }
  
  module.exports = {
    APIError,
    NotFoundError,
    ValidationError,
    ServerError
  };