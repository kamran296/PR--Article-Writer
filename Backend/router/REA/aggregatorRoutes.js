const express = require('express');
const { getAggregatedSalary } = require('../../controllers/REA/aggregatorController');
const router = express.Router();

router.post('/get-aggregated-salary', getAggregatedSalary);

module.exports = router;
