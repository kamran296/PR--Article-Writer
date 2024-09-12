const express = require('express');
const { searchLevels } = require('../../controllers/REA/levelsController');
const router = express.Router();

router.post('/search-Levels', searchLevels);

module.exports = router;