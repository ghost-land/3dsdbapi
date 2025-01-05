// Custom error classes
const { ERROR_CODES, STATUS_CODES, ERROR_MESSAGES } = require('./errorCodes');

class APIError extends Error {
    constructor(code, message = null, details = {}) {
      super(message || ERROR_MESSAGES[code]);
      this.name = this.constructor.name;
      this.code = code;
      this.status = STATUS_CODES[code];
      this.details = details;
    }
  }
  
  class NotFoundError extends APIError {
    constructor(resource, details = {}) {
      const code = ERROR_CODES[`${resource.toUpperCase()}_NOT_FOUND`] || ERROR_CODES.RESOURCE_NOT_FOUND;
      super(code, null, details);
    }
  }
  
  class ValidationError extends APIError {
    constructor(code, message = null, details = {}) {
      super(code, message, details);
    }
  }
  
  class ServerError extends APIError {
    constructor(message = 'Internal server error', details = {}) {
      super(ERROR_CODES.INTERNAL_SERVER_ERROR, message, details);
    }
  }
  
  module.exports = {
    APIError,
    NotFoundError,
    ValidationError,
    ServerError,
    ERROR_CODES
  };