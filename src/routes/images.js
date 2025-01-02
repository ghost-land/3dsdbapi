const express = require('express');
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');
const { NotFoundError, ServerError } = require('../utils/errors');

const router = express.Router();

router.get('/:tid/banner', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }
    res.sendFile(path.join(tidPath, 'banner.jpg'));
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error);
    } else {
      next(new ServerError('Failed to retrieve banner'));
    }
  }
});

router.get('/:tid/icon', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }
    res.sendFile(path.join(tidPath, 'icon.jpg'));
  } catch (error) {
    if (error instanceof NotFoundError) {
      next(error);
    } else {
      next(new ServerError('Failed to retrieve icon'));
    }
  }
});

module.exports = router;