// Error code constants
const ERROR_CODES = {
    // Resource errors (404)
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    TID_NOT_FOUND: 'TID_NOT_FOUND',
    METADATA_NOT_FOUND: 'METADATA_NOT_FOUND',
    CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
    MEDIA_NOT_FOUND: 'MEDIA_NOT_FOUND',
    
    // Validation errors (400)
    INVALID_TID: 'INVALID_TID',
    INVALID_CATEGORY: 'INVALID_CATEGORY',
    INVALID_PARAMETER: 'INVALID_PARAMETER',
    MISSING_PARAMETER: 'MISSING_PARAMETER',
    
    // Server errors (500)
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    FILE_SYSTEM_ERROR: 'FILE_SYSTEM_ERROR',
    
    // Authentication errors (401, 403)
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN'
  };
  
  // Map error codes to HTTP status codes
  const STATUS_CODES = {
    [ERROR_CODES.RESOURCE_NOT_FOUND]: 404,
    [ERROR_CODES.TID_NOT_FOUND]: 404,
    [ERROR_CODES.METADATA_NOT_FOUND]: 404,
    [ERROR_CODES.CATEGORY_NOT_FOUND]: 404,
    [ERROR_CODES.MEDIA_NOT_FOUND]: 404,
    
    [ERROR_CODES.INVALID_TID]: 400,
    [ERROR_CODES.INVALID_CATEGORY]: 400,
    [ERROR_CODES.INVALID_PARAMETER]: 400,
    [ERROR_CODES.MISSING_PARAMETER]: 400,
    
    [ERROR_CODES.INTERNAL_SERVER_ERROR]: 500,
    [ERROR_CODES.DATABASE_ERROR]: 500,
    [ERROR_CODES.FILE_SYSTEM_ERROR]: 500,
    
    [ERROR_CODES.UNAUTHORIZED]: 401,
    [ERROR_CODES.FORBIDDEN]: 403
  };
  
  // Default error messages
  const ERROR_MESSAGES = {
    [ERROR_CODES.RESOURCE_NOT_FOUND]: 'The requested resource was not found',
    [ERROR_CODES.TID_NOT_FOUND]: 'Title ID not found in the database',
    [ERROR_CODES.METADATA_NOT_FOUND]: 'Metadata field not found',
    [ERROR_CODES.CATEGORY_NOT_FOUND]: 'Category not found',
    [ERROR_CODES.MEDIA_NOT_FOUND]: 'Media resource not found',
    
    [ERROR_CODES.INVALID_TID]: 'Invalid Title ID format',
    [ERROR_CODES.INVALID_CATEGORY]: 'Invalid category name',
    [ERROR_CODES.INVALID_PARAMETER]: 'Invalid parameter value',
    [ERROR_CODES.MISSING_PARAMETER]: 'Required parameter is missing',
    
    [ERROR_CODES.INTERNAL_SERVER_ERROR]: 'An internal server error occurred',
    [ERROR_CODES.DATABASE_ERROR]: 'Database operation failed',
    [ERROR_CODES.FILE_SYSTEM_ERROR]: 'File system operation failed',
    
    [ERROR_CODES.UNAUTHORIZED]: 'Authentication required',
    [ERROR_CODES.FORBIDDEN]: 'Access forbidden'
  };
  
  module.exports = {
    ERROR_CODES,
    STATUS_CODES,
    ERROR_MESSAGES
  };