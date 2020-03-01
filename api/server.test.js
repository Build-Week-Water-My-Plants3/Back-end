const ask = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

describe("server", () => {
  it("test running", () => {
    expect(true).toBe(true);
  });
});

describe("POST /register", () => {
  beforeEach(async () => {
    await db("user").truncate();
  });
  it("should make a user", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "hi", password: "bye", phonenumber: 123456789 })
      .then(user => {
        expect(user.body.username).toBe("hi");
      });
  });
  it("returns status 201", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "testing", phonenumber: 12345 })
      .then(response => {
        expect(response.status).toBe(201);
      });
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    await db("user").truncate();
  });

  it("return 200 status", async () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "skyes", password: "skye", phonenumber: 12345 })
      .then(res => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "skyes", password: "skye", phonenumber: 12345 })
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
  });
  it("return token", () => {
    return ask(server)
      .post("/api/auth/register")
      .send({ username: "hi", password: "bye", phonenumber: 12345 })
      .then(user => {
        return ask(server)
          .post("/api/auth/login")
          .send({ username: "hi", password: "bye" })
          .then(response => {
            expect(response.body).toEqual({ token: response.body.token });
          });
      });
  });
});
