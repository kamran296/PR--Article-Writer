const express = require("express");
const router = express.Router();
const openaiController = require("../controllers/openaiController");

router.route("/articlePrompt").post(openaiController.articlePrompt);
router.route("/articleForm").post(openaiController.articleForm);
router.route("/add-article").post(openaiController.addData);
// router.route("/loaPrompt").post(openaiController.loaPrompt);
// router.route("/loa-research").post(openaiController.loaFormResearch);
// router.route("/loa-original").post(openaiController.loaFormOriginal);
// router.route("/loa-critical").post(openaiController.loaFormCritical);
// router.route("/bio-writer").post(openaiController.bioWriterForm);
// router.route("/bio-writer-prompt").post(openaiController.bioWriterPrompt);
module.exports = router;
