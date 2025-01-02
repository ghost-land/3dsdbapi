const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const docsRoutes = require('./routes/docs');
const metadataRoutes = require('./routes/metadata');
const imageRoutes = require('./routes/images');
const screenshotRoutes = require('./routes/screenshots');
const thumbnailRoutes = require('./routes/thumbnails');
const mediaRoutes = require('./routes/media');
const uptimeRoutes = require('./routes/uptime');

const app = express();
const PORT = process.env.PORT || 3000;

// Capture the server start time
const serverStartTime = new Date();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Pass start time to uptime route
app.use((req, res, next) => {
  req.serverStartTime = serverStartTime;
  next();
});

// API routes
app.use('/', uptimeRoutes);
app.use('/', metadataRoutes);
app.use('/', mediaRoutes);
app.use('/', imageRoutes);
app.use('/', screenshotRoutes);
app.use('/', thumbnailRoutes);

// Documentation route
app.use('/', docsRoutes);

// 404 handler for undefined routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`3DSDB API running on port ${PORT}`);
});