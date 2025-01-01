const express = require('express');
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');

const router = express.Router();

router.get('/:tid/banner', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }
    res.sendFile(path.join(tidPath, 'banner.jpg'));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:tid/icon', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }
    res.sendFile(path.join(tidPath, 'icon.jpg'));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;