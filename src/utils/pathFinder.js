const path = require('path');
const fs = require('fs').promises;

async function getMediaUrls(tidPath, tid, baseUrl) {
  const media = {
    banner: `${baseUrl}/${tid}/banner`,
    icon: `${baseUrl}/${tid}/icon`,
    screenshots: {
      compiled: [],
      uncompiled: {
        upper: [],
        lower: []
      }
    },
    thumbnails: []
  };

  // Get compiled screenshots
  try {
    const screensPath = path.join(tidPath, 'screenshots');
    const screenFiles = await fs.readdir(screensPath);
    media.screenshots.compiled = screenFiles
      .filter(file => file.startsWith('screenshot_'))
      .sort()
      .map(file => `${baseUrl}/${tid}/screen/${file.match(/\d+/)[0]}`);
  } catch (error) {
    // Directory might not exist
  }

  // Get uncompiled screenshots
  try {
    const uncompiledPath = path.join(tidPath, 'screenshots_uncompiled');
    const uncompiledFiles = await fs.readdir(uncompiledPath);
    
    uncompiledFiles.forEach(file => {
      const match = file.match(/screenshot_(\d+)_(upper|lower)\.jpg/);
      if (match) {
        const [, num, screen] = match;
        const type = screen === 'upper' ? 'upper' : 'lower';
        media.screenshots.uncompiled[type].push(
          `${baseUrl}/${tid}/screen_u/${num}/${type[0]}`
        );
      }
    });
    
    media.screenshots.uncompiled.upper.sort();
    media.screenshots.uncompiled.lower.sort();
  } catch (error) {
    // Directory might not exist
  }

  // Get thumbnails
  try {
    const thumbsPath = path.join(tidPath, 'thumbnails');
    const thumbFiles = await fs.readdir(thumbsPath);
    media.thumbnails = thumbFiles
      .filter(file => file.startsWith('thumbnail_'))
      .sort()
      .map(file => `${baseUrl}/${tid}/thumb/${file.match(/\d+/)[0]}`);
  } catch (error) {
    // Directory might not exist
  }

  return media;
}

const DB_BASE_DIR = path.join(__dirname, '../../public/db/3ds');

async function getCategories() {
  try {
    const entries = await fs.readdir(DB_BASE_DIR, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort();
  } catch (error) {
    throw new Error('Failed to read categories directory');
  }
}

async function findTidPath(tid) {
  const categories = await getCategories();
  for (const category of categories) {
    const tidPath = path.join(DB_BASE_DIR, category, tid);
    try {
      await fs.access(tidPath);
      return tidPath;
    } catch (error) {
      continue;
    }
  }
  return null;
}

module.exports = {
  findTidPath,
  DB_BASE_DIR,
  getCategories,
  getMediaUrls
};