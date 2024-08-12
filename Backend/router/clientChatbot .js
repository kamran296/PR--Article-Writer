const express = require("express");
const router = express.Router();
const clientChatbotController = require("../controllers/clientChatbot");

router.route("/chat").post(clientChatbotController.clientChat);
router.route("/add-data").post(clientChatbotController.addData);
router.route("/fine-tune").post(clientChatbotController.fineTune);
module.exports = router;
