const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');

const router = express.Router();

router.get('/:tid', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      const err = new Error('TID not found');
      err.status = 404;
      throw err;
    }

    const metaPath = path.join(tidPath, 'meta.xml');
    const metaData = await fs.readFile(metaPath, 'utf-8');
    res.type('application/xml').send(metaData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;