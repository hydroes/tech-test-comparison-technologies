// npm packages
const mongoose = require("mongoose");

// app imports
const { APIError } = require("../helpers");

// globals
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  number: Number,
  tags: [String],
  url: String
});

messageSchema.statics = {
  /**
   * Create a Single New Message
   * @param {object} newMessage - an instance of Message
   * @returns {Promise<Message, APIError>}
   */
  async createMessage(newMessage) {
    const duplicate = await this.findOne({ message: newMessage.message });
    if (duplicate) {
      throw new APIError(
        409,
        "Message Already Exists",
        `There is already a message with name '${newMessage.message}'.`
      );
    }
    const message = await newMessage.save();
    return message.toObject();
  },

  /**
   * Get a single Message by name
   * @param {String} name - the Message's name
   * @returns {Promise<Message, APIError>}
   */
  async readMessage(name) {
    const message = await this.findOne({ name });

    if (!message) {
      throw new APIError(404, "Message Not Found", `No message '${name}' found.`);
    }
    return message.toObject();
  },
  /**
   * Get a list of Messages
   * @param {Object} query - pre-formatted query to retrieve messages.
   * @param {Object} fields - a list of fields to select or not in object form
   * @param {String} skip - number of docs to skip (for pagination)
   * @param {String} limit - number of docs to limit by (for pagination)
   * @returns {Promise<Messages, APIError>}
   */
  async readMessages(query, fields, skip, limit) {
    const messages = await this.find(query, fields)
      .skip(skip)
      .limit(limit)
      .sort({ message: 1 })
      .exec();
    if (!messages.length) {
      return [];
    }
    return messages.map(message => message.toObject());
  }
};

/* Transform with .toObject to remove __v and _id from response */
if (!messageSchema.options.toObject) messageSchema.options.toObject = {};
messageSchema.options.toObject.transform = (doc, ret) => {
  const transformed = ret;
  delete transformed._id;
  delete transformed.__v;
  return transformed;
};

/** Ensure MongoDB Indices **/
messageSchema.index({ message: 1, number: 1 }, { unique: true }); // example compound idx

module.exports = mongoose.model("Messages", messageSchema);
