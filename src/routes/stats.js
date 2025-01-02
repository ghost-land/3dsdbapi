const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { DB_BASE_DIR, getCategories } = require('../utils/pathFinder');
const { NotFoundError, ValidationError, ServerError } = require('../utils/errors');

const router = express.Router();

// Get stats for all categories
router.get('/stats', async (req, res, next) => {
  try {
    const stats = {
      total: 0,
      categories: {}
    };

    const categories = await getCategories();

    for (const category of categories) {
      const categoryPath = path.join(DB_BASE_DIR, category);
      try {
        const titles = await fs.readdir(categoryPath);
        const count = titles.length;
        stats.categories[category] = count;
        stats.total += count;
      } catch (error) {
        stats.categories[category] = 0;
      }
    }

    res.json(stats);
  } catch (error) {
    next(new ServerError('Failed to retrieve stats', { error: error.message }));
  }
});

// Get all TIDs for a specific category
router.get('/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    const categories = await getCategories();
    
    if (!categories.includes(category)) {
      throw new ValidationError('Invalid category', {
        category,
        validCategories: categories
      });
    }

    const categoryPath = path.join(DB_BASE_DIR, category);
    const titles = await fs.readdir(categoryPath);
    
    if (!titles.length) {
      throw new NotFoundError('No titles found in category', {
        category
      });
    }

    res.json({
      category,
      count: titles.length,
      titles: titles.sort()
    });
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      next(error);
    } else {
      next(new ServerError(`Failed to retrieve titles for category: ${req.params.category}`, {
        error: error.message
      }));
    }
  }
});

module.exports = router;