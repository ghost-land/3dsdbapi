const { getErrorHtml } = require('../views/templates');

function errorHandler(err, req, res, next) {
  const accepts = req.accepts(['html', 'json']);
  
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
        'The file might have been moved or deleted'
      ],
      availableEndpoints: [
        '/:tid - Get title metadata',
        '/:tid/banner - Get title banner',
        '/:tid/icon - Get title icon',
        '/:tid/screen/:num - Get compiled screenshot',
        '/:tid/screen_u/:num/:screen - Get uncompiled screenshot (u/l)',
        '/:tid/screens - List all screenshots',
        '/:tid/thumb/:num - Get thumbnail',
        '/:tid/thumbs - List all thumbnails'
      ]
    };

    if (accepts === 'json') {
      return res.status(404).json({
        status: 404,
        error: 'Not Found',
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
    requestedPath: req.path,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (accepts === 'json') {
    return res.status(status).json({
      status,
      error: err.name || 'Internal Server Error',
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
  } else {
    return 'Title Metadata';
  }
}

module.exports = errorHandler;