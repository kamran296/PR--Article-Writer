const express = require("express");
const router = express.Router();
const loaController = require("../controllers/loaController");

router.route("/loa-prompt").post(loaController.loaPrompt);
router.route("/loa-research").post(loaController.loaFormResearch);
router.route("/loa-original").post(loaController.loaFormOriginal);
router.route("/loa-critical").post(loaController.loaFormCritical);

module.exports = router;
