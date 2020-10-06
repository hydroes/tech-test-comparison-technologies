// npm packages
const { validate } = require("jsonschema");

// app imports
const { Message } = require("../models");
const { APIError } = require("../helpers");
const { messageNewSchema } = require("../schemas");

/**
 * Validate the POST request body and create a new Message
 */
async function createMessage(request, response, next) {
  const validation = validate(request.body, messageNewSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        "Bad Request",
        validation.errors.map(e => e.stack).join(". ")
      )
    );
  }

  try {
    const newMessage = await Message.createMessage(new Message(request.body));
    return response.status(201).json(newMessage);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single message
 * @param {String} name - the name of the Message to retrieve
 */
async function readMessage(request, response, next) {
  const { name } = request.params;
  try {
    const message = await Message.readMessage(name);
    return response.json(message);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createMessage,
  readMessage,
};
