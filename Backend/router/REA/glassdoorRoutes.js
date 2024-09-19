const express = require('express');
const { getSalaryByJobTitle } = require('../../controllers/REA/glassdoorConroller'); // Import the controller
const router = express.Router();

// POST request to query basePayMax and basePayMin by job title
router.post('/get-salary-glassdoor', getSalaryByJobTitle); // Use controller function

module.exports = router;
