/**
 * These tests currently only work if you have a local MongoDB database
 */
const app = require("../app/app");
const request = require("supertest");
const mongoose = require("mongoose");

let { Message } = require("../app/models");
let exampleMessage = {
  name: "Example",
  number: 5,
  stuff: ["cats", "dogs"],
  url: "https://google.com"
};

beforeEach(async () => {
  const testMessage = new Message(exampleMessage);
  await testMessage.save();
});

afterEach(async () => {
  await mongoose.connection.dropCollection("messages");
});

afterAll(async () => {
  // CLEAN UP
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("GET /messages", () => {
  test("Get a list of messages", async () => {
    let response = await request(app).get("/messages");
    expect(response.body).toEqual([exampleMessage]);
  });
});

describe("POST /messages", () => {
  test("Create a mini new Message", async () => {
    let response = await request(app)
      .post("/messages")
      .send({ name: "A Message" });
    expect(response.body).toEqual({ name: "A Message", stuff: [] });
  });
  test("Create a full new Message", async () => {
    const fullMessage = {
      name: "Other Message",
      stuff: ["cats", "dogs"],
      number: 5,
      url: "http://google.com"
    };
    let response = await request(app)
      .post("/messages")
      .send(fullMessage);
    expect(response.body).toEqual(fullMessage);
  });
  test("Cannot Create Messages with the Same Name", async () => {
    let response = await request(app)
      .post("/messages")
      .send({ name: "Example" });
    expect(response.status).toEqual(409);
  });
});

