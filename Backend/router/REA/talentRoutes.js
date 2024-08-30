const express = require('express');
const { getSalaryTalent } = require('../../controllers/REA/talentController');
const router = express.Router();

router.post('/search-salary-talent', getSalaryTalent);

module.exports = router;
