const express = require("express");
const router = express.Router();
const nicheController = require("../controllers/nicheController");

router.route("/prompt").post(nicheController.nichePrompt);
router.route("/add-data").post(nicheController.addData);
router.route("/fine-tune").post(nicheController.fineTune);
module.exports = router;
