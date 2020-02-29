const db = require("../../data/dbConfig");

function add(user) {
  return db("user")
    .insert(user, "id")
    .then(log => {
      const [id] = log;
      return db("user")
        .where({ id })
        .first();
    });
}
function findBy(filter) {
  return db("user")
    .where(filter)
    .first();
}

module.exports = {
  findBy,
  add
};
