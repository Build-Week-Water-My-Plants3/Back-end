const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

// RESTRICTICTED
const restricted = require("./middleware/resMiddleware");
// CLOUDINARY WEBSITE CONFIG
const { cloudConfig } = require("./config/cloudConfig");
// ROUTERS
const authRouter = require("../routers/auth/authRouter");
const userRouter = require("../routers/user/userRouter");
//
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("*", cloudConfig);
server.use("/api/auth", authRouter);
server.use("/api/user", restricted, userRouter);
//
server.get("/", (req, res) => {
  return res.send({ message: "Start watering your plants on time" });
});

module.exports = server;
