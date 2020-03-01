const db = require("../../data/dbConfig.js");
// grab all plants user created
function getPlants(id) {
  return db("user_plants as up")
    .join("plants as p", "up.plantId", "p.id")
    .join("user as u", "up.userId", "u.id")
    .select("p.nickname", "p.frequency", "p.photo", "up.*")
    .where({ "up.userId": id });
}
function getUserId(id) {
  return db("user")
    .select("id", "username")
    .where({ id })
    .first();
}
function getPlantId(plantId) {
  return db("plants")
    .where({ id: plantId })
    .first();
}
function removePlant(plantId) {
  return db("plants")
    .where({ id: plantId })
    .del();
}
module.exports = {
  getPlants,
  getUserId,
  removePlant,
  getPlantId
};
