const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { findTidPath } = require('../utils/pathFinder');
const { getBaseUrl } = require('../utils/urlUtils');

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
      .map(file => `${getBaseUrl(req)}/${req.params.tid}/screen/${file.match(/\d+/)[0]}`);

    res.json({
      count: screenshots.length,
      screenshots
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:tid/screen_u', async (req, res) => {
  try {
    const tidPath = await findTidPath(req.params.tid);
    if (!tidPath) {
      return res.status(404).json({ error: 'TID not found' });
    }

    const uncompiledPath = path.join(tidPath, 'screenshots_uncompiled');
    const files = await fs.readdir(uncompiledPath);
    
    const screenshots = {
      upper: [],
      lower: []
    };

    files.forEach(file => {
      const match = file.match(/screenshot_(\d+)_(upper|lower)\.jpg/);
      if (match) {
        const [, num, screen] = match;
        const type = screen === 'upper' ? 'upper' : 'lower';
        const baseUrl = getBaseUrl(req);
        screenshots[type].push({
          number: parseInt(num),
          url: `${baseUrl}/${req.params.tid}/screen_u/${num}/${type[0]}`
        });
      }
    });

    // Sort arrays by screenshot number
    screenshots.upper.sort((a, b) => a.number - b.number);
    screenshots.lower.sort((a, b) => a.number - b.number);

    res.json({
      count: {
        upper: screenshots.upper.length,
        lower: screenshots.lower.length,
        total: screenshots.upper.length + screenshots.lower.length
      },
      screenshots
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;