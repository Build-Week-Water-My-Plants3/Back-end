const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

// routers
const restricted = require("./middleware/resMiddleware");
const authRouter = require("../routers/auth/authRouter");
const userRouter = require("../routers/user/userRouter");
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/user", restricted, userRouter);
server.get("/", (req, res) => {
  return res.send("Welcome to the API");
});

module.exports = server;
