// routes/areaRoutes.js
const express = require('express');
const router = express.Router();
const { getAreaCodeAndSalary } =  require('../../controllers/REA/socController');

// Define the route for /getAreaCode
router.post('/socSalary', getAreaCodeAndSalary);

module.exports = router;
