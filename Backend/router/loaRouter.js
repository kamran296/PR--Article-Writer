const express = require("express");
const router = express.Router();
const loaPromptController = require("../controllers/loaController");
const loaOriginalController = require("../controllers/loaOriginalController");
const loaResearchController = require("../controllers/loaResearchController");
const loaCriticalController = require("../controllers/loaCriticalController");

// loa prompt routes
router.route("/loa-prompt").post(loaPromptController.loaPrompt);

// loa original contribution routes
router.route("/loa-original").post(loaOriginalController.loaFormOriginal);
router.route("/original-data").post(loaOriginalController.loaOrgAddData);
// router.route("/original-finetune").get(loaOriginalController.fineTune);

// loa critical routes
router.route("/loa-critical").post(loaCriticalController.loaFormCritical);
router.route("/critical-data").post(loaCriticalController.loaCriticalAddData);
router.route("/critical-finetune").get(loaCriticalController.fineTune);

// loa research routes
router.route("/loa-research").post(loaResearchController.loaFormResearch);
router.route("/research-data").post(loaResearchController.loaResearchAddData);
// router.route("/research-finetune").get(loaResearchController.fineTune);

module.exports = router;
