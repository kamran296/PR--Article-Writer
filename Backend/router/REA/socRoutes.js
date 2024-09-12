const express = require('express');
const { getWageData } = require('../../controllers/REA/socConroller');

const router = express.Router();

// Define the route and associate it with the controller method
router.post('/getWageData', getWageData);

module.exports = router;
