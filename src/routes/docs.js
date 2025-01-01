const express = require('express');
const { getApiDocsHtml } = require('../views/templates');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(getApiDocsHtml());
});

module.exports = router;