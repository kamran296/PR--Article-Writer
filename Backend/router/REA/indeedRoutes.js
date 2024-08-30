const express = require('express');
const { getSalaryIndeed } = require('../../controllers/REA/indeedController');
const router = express.Router();

router.post('/get-salary-indeed', getSalaryIndeed);

module.exports = router;
