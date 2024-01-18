const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openaiController");

router.route("/articlePrompt").post(openaiController.articlePrompt);
module.exports = router;
