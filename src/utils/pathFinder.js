const path = require('path');
const fs = require('fs').promises;

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

module.exports = { findTidPath, DB_BASE_DIR, getCategories };