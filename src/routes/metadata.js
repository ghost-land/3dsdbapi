const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath, getMediaUrls } = require('../utils/pathFinder');
const { NotFoundError } = require('../utils/errors');
const { getBaseUrl } = require('../utils/urlUtils');

const router = express.Router();

router.get('/:tid', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }

    const metaPath = path.join(tidPath, 'meta.json');
    const metaData = JSON.parse(await fs.readFile(metaPath, 'utf-8'));
    
    // Add media URLs to metadata
    const mediaUrls = await getMediaUrls(tidPath, req.params.tid, getBaseUrl(req));
    const response = {
      ...metaData,
      media: mediaUrls
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:tid/meta/:meta', async (req, res, next) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      throw new NotFoundError('TID not found', { tid: req.params.tid });
    }

    const metaPath = path.join(tidPath, 'meta.json');
    const metaData = JSON.parse(await fs.readFile(metaPath, 'utf-8'));
    
    const metaValue = metaData[req.params.meta];
    if (metaValue === undefined) {
      throw new NotFoundError('Metadata field not found', { 
        tid: req.params.tid,
        field: req.params.meta,
        availableFields: Object.keys(metaData)
      });
    }
    
    res.json(metaValue);
  } catch (error) {
    next(error);
  }
});

module.exports = router;