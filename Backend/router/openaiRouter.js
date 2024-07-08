const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openaiController");

router.route("/articlePrompt").post(openaiController.articlePrompt);
router.route("/articleForm").post(openaiController.articleForm);
router.route("/add-article").post(openaiController.addData);
router.route("/fine-tune").get(openaiController.fineTune);
module.exports = router;
