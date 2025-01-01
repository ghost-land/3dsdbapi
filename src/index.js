const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const docsRoutes = require('./routes/docs');
const metadataRoutes = require('./routes/metadata');
const imageRoutes = require('./routes/images');
const screenshotRoutes = require('./routes/screenshots');
const thumbnailRoutes = require('./routes/thumbnails');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Documentation route
app.use('/', docsRoutes);

// API routes
app.use('/', metadataRoutes);
app.use('/', imageRoutes);
app.use('/', screenshotRoutes);
app.use('/', thumbnailRoutes);

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