const express = require('express');
const { getSalary } = require('../../controllers/REA/salaryController');
const router = express.Router();

router.post('/salary', getSalary);

module.exports = router;
