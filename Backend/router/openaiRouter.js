const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openaiController");

router.route("/articlePrompt").post(openaiController.articlePrompt);
router.route("/articleForm").post(openaiController.articleForm);
router.route("/loaPrompt").post(openaiController.loaPrompt);
router.route("/loa-research").post(openaiController.loaFormResearch);
router.route("/loa-original").post(openaiController.loaFormOriginal);
router.route("/loa-critical").post(openaiController.loaFormCritical);

module.exports = router;
