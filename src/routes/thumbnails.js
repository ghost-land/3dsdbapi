const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');

const router = express.Router();

router.get('/:tid/thumb/:num', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }
    res.sendFile(path.join(tidPath, 'thumbnails', `thumbnail_${req.params.num}.jpg`));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:tid/thumbs', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }

    const thumbsPath = path.join(tidPath, 'thumbnails');
    const files = await fs.readdir(thumbsPath);
    const thumbnails = files
      .filter(file => file.startsWith('thumbnail_'))
      .sort()
      .map(file => `https://api.ghseshop.cc/${req.params.tid}/thumb/${file.match(/\d+/)[0]}`);

    res.json({
      count: thumbnails.length,
      thumbnails
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;