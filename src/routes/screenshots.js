const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');

const router = express.Router();

router.get('/:tid/screen/:num', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }
    res.sendFile(path.join(tidPath, 'screenshots', `screenshot_${req.params.num}.jpg`));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:tid/screen_u/:num/:screen', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }
    const screen = req.params.screen === 'u' ? 'upper' : 'lower';
    res.sendFile(path.join(tidPath, 'screenshots_uncompiled', `screenshot_${req.params.num}_${screen}.jpg`));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:tid/screens', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }

    const screensPath = path.join(tidPath, 'screenshots');
    const files = await fs.readdir(screensPath);
    const screenshots = files
      .filter(file => file.startsWith('screenshot_'))
      .sort()
      .map(file => `https://api.ghseshop.cc/${req.params.tid}/screen/${file.match(/\d+/)[0]}`);

    res.json({
      count: screenshots.length,
      screenshots
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;