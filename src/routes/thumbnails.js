const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');
const { getBaseUrl } = require('../utils/urlUtils');
const { NotFoundError, ServerError } = require('../utils/errors');

const router = express.Router();

// Get specific thumbnail
router.get('/:tid/thumb/:num', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }
    res.sendFile(path.join(tidPath, 'thumbnails', `thumbnail_${req.params.num}.jpg`));
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error);
    } else {
      next(new ServerError('Failed to retrieve thumbnail'));
    }
  }
});

// List all thumbnails
router.get('/:tid/thumbs', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }

    const thumbsPath = path.join(tidPath, 'thumbnails');
    const files = await fs.readdir(thumbsPath);
    const thumbnails = files
      .filter(file => file.startsWith('thumbnail_'))
      .sort()
      .map(file => `${getBaseUrl(req)}/${req.params.tid}/thumb/${file.match(/\d+/)[0]}`);

    res.json({
      count: thumbnails.length,
      thumbnails
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error);
    } else {
      next(new ServerError('Failed to retrieve thumbnails list'));
    }
  }
});

module.exports = router;