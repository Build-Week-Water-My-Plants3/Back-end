//users
const crypt = require("bcryptjs");
exports.seed = function(knex) {
  return knex("user").insert([
    {
      username: "skye",
      password: crypt.hashSync("thatGirl", 8),
      phonenumber: 0000000000
    },
    {
      username: "test",
      password: crypt.hashSync("thatTest", 8),
      phonenumber: 0000000000
    }
  ]);
};
