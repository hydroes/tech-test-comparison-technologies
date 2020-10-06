// npm packages
const express = require("express");

// app imports
const { messageHandler, messagesHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readMessages } = messagesHandler;
const { createMessage, readMessage } = messageHandler;

/* All the Messages Route */
router
  .route("")
  .get(readMessages)
  .post(createMessage);

/* Single Message by Name Route */
router
  .route("/:name")
  .get(readMessage)

module.exports = router;
