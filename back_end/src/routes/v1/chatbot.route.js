const express = require('express');
const chatbotController = require('../../controllers/chatbot.controller');
const router = express.Router();

//router.get('/',  chatbotController.getHomePage);

router
  .route('/webhook')
  .get(chatbotController.getWebhook)
  .post(chatbotController.postWebhook);

module.exports = router;