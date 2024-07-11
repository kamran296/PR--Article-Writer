const express = require("express");
const router = express.Router();
const allInfoController = require("../controllers/allInfoController.js");

router.route("/get-all").get(allInfoController.getAll);
router.route("/add-info").post(allInfoController.createEntry);

module.exports = router;
