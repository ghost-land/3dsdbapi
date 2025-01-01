const path = require('path');
const fs = require('fs').promises;

const DB_BASE_DIR = path.join(__dirname, '../../public/db/3ds');

const CATEGORIES = [
  'base',
  'dlc',
  'dsiware',
  'extras',
  'themes',
  'updates',
  'videos',
  'virtual-console'
];

async function findTidPath(tid) {
  for (const category of CATEGORIES) {
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

module.exports = { findTidPath, DB_BASE_DIR };