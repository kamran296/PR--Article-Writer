const express = require("express");
const router = express.Router();
const bioController = require("../controllers/bioController");

router.route("/bio-writer").post(bioController.bioWriterForm);
router.route("/bio-writer-prompt").post(bioController.bioWriterPrompt);
router.route("/add-data").post(bioController.addData);
router.route("/fine-tune").post(bioController.fineTune);
module.exports = router;
