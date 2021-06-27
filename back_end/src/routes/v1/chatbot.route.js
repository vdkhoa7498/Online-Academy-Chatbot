const express = require('express');
const chatbotController = require('../../controllers/chatbot.controller');
const router = express.Router();

router
  .route('/webhook')
  .get(chatbotController.getWebhook)
  .post(chatbotController.postWebhook);

module.exports = router;