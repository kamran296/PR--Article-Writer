const express = require("express");
const router = express.Router();
const lorController = require("../controllers/lorController");

router.route("/lor-prompt").post(lorController.lorPrompt);
router.route("/lor-form").post(lorController.lorForm);
router.route("/add-data").post(lorController.addData);
router.route("/fine-tune").get(lorController.fineTune);
module.exports = router;
