/**
 * a local Mongo DB is needed to run these tests
 */
const app = require("../app/app");
const request = require("supertest");
const mongoose = require("mongoose");

let { Message } = require("../app/models");
let exampleMessage = {
  message: "Example",
  number: 5,
  tags: ["cats", "dogs"],
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
      .send({ message: "A Message" });
    expect(response.body).toEqual({ message: "A Message", tags: [] });
  });
  test("Create a full new Message", async () => {
    const fullMessage = {
      message: "Other Message",
      tags: ["cats", "dogs"],
      number: 5,
      url: "http://google.com"
    };
    let response = await request(app)
      .post("/messages")
      .send(fullMessage);
    expect(response.body).toEqual(fullMessage);
  });
  test("Cannot Create Messages with the Same Message", async () => {
    let response = await request(app)
      .post("/messages")
      .send({ message: "Example" });
    expect(response.status).toEqual(409);
  });
});

