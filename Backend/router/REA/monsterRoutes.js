// routes/monsterRoutes.js
const express = require('express');
const { searchMonsterSalary } = require('../../controllers/REA/monsterController');

const router = express.Router();

router.post('/monster-search', searchMonsterSalary);

module.exports = router;
