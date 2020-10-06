// app imports
const { Message } = require("../models");
const { APIError, parseSkipLimit } = require("../helpers");

/**
 * List all the messages. Query params ?skip=0&limit=1000 by default
 */
async function readMessages(request, response, next) {
  /* pagination validation */
  let skip = parseSkipLimit(request.query.skip) || 0;
  let limit = parseSkipLimit(request.query.limit, 1000) || 1000;
  if (skip instanceof APIError) {
    return next(skip);
  } else if (limit instanceof APIError) {
    return next(limit);
  }
  try {
    const messages = await Message.readMessages({}, {}, skip, limit);
    return response.json(messages);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  readMessages
};
