const { getErrorHtml } = require('../views/templates');
const { APIError } = require('../utils/errors');

function errorHandler(err, req, res, next) {
  const accepts = req.accepts(['html', 'json']);
  
  // Handle custom API errors
  if (err instanceof APIError) {
    if (accepts === 'json') {
      return res.status(err.status).json({
        error: {
          code: err.code,
          message: err.message,
          details: err.details
        }
      });
    }
    
    return res.status(err.status).send(
      getErrorHtml(err.status, err.message, {
        errorCode: err.code,
        ...err.details
      })
    );
  }
  
  // Handle 404 errors
  if (err.status === 404 || err.statusCode === 404) {
    const tid = req.params.tid;
    const resourceType = getResourceType(req.path);
    const details = {
      tid,
      requestedPath: req.path,
      possibleIssues: [
        'The TID might not exist in the database',
        'The requested resource might not be available for this title',
        'The file might have been moved or deleted',
        'The category might be invalid or empty'
      ],
      availableEndpoints: [
        '/:tid - Get title metadata',
        '/:tid/banner - Get title banner',
        '/:tid/icon - Get title icon',
        '/:tid/screen/:num - Get compiled screenshot',
        '/:tid/screen_u - List all uncompiled screenshots',
        '/:tid/screen_u/:num/:screen - Get uncompiled screenshot (u/l)',
        '/:tid/screens - List all screenshots',
        '/:tid/thumb/:num - Get thumbnail',
        '/:tid/thumbs - List all thumbnails',
        '/:tid/media - List all available media',
        '/uptime - Get server uptime',
        '/stats - Get statistics about titles in each category',
        '/category/:category - List all TIDs in a specific category'
      ]
    };

    if (accepts === 'json') {
      return res.status(404).json({
        error: {
          code: 'RESOURCE_NOT_FOUND',
          status: 404,
          message: `Resource not found: ${resourceType}`
        },
        message: `Resource not found: ${resourceType}`,
        details
      });
    }

    return res.status(404).send(
      getErrorHtml(404, `Resource Not Found: ${resourceType}`, details)
    );
  }

  // Handle other errors
  const status = err.status || 500;
  const details = {
    errorCode: err.code || 'INTERNAL_SERVER_ERROR',
    requestedPath: req.path,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (accepts === 'json') {
    return res.status(status).json({
      error: {
        code: err.code || 'INTERNAL_SERVER_ERROR',
        status,
        message: err.message || 'An unexpected error occurred'
      },
      message: err.message || 'An unexpected error occurred',
      details
    });
  }

  return res.status(status).send(
    getErrorHtml(
      status,
      err.message || 'An unexpected error occurred',
      details
    )
  );
}

function getResourceType(reqPath) {
  if (reqPath.includes('/screen_u/')) {
    return 'Uncompiled Screenshot';
  } else if (reqPath.includes('/screen/')) {
    return 'Screenshot';
  } else if (reqPath.includes('/thumb/')) {
    return 'Thumbnail';
  } else if (reqPath.includes('/banner')) {
    return 'Banner';
  } else if (reqPath.includes('/icon')) {
    return 'Icon';
  } else if (reqPath.includes('/category/')) {
    return 'Category';
  } else if (reqPath === '/stats') {
    return 'Statistics';
  } else if (reqPath === '/uptime') {
    return 'Uptime';
  } else {
    return 'Title Metadata';
  }
}

module.exports = errorHandler;