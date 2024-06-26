const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

router.route("/chat").post(chatbotController.chatbot);
router.route("/add-chat").post(chatbotController.addData);
router.route("/get-data").get(chatbotController.getData);
router.route("/downloadDatabase").get(chatbotController.downloadDatabase);
module.exports = router;
