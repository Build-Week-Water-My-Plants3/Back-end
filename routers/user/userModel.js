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
  // return db("plants")
  //   .where({ id: plantId })
  //   .first();
  return (
    db("species as s")
      .join("plants as p", "p.species_id", "s.id")
      // p.id is plantId
      .select("s.species_name", "p.nickname", "p.frequency", "p.photo", "p.id ")
      .where({ "p.id": plantId })
      .first()
  );
}

function getPlant(id) {
  return db("plants")
    .where({ id })
    .first();
}

function removePlant(plantId) {
  return db("plants")
    .where({ id: plantId })
    .del();
}

function addPlant(plantData) {
  return db("plants")
    .insert(plantData)
    .then(ids => {
      const [id] = ids;
      return getPlantId(id);
    });
}

function addToUser(plantId, userId) {
  return db("user_plants").insert({ userId, plantId });
}

function updatePlant(plantId, plantData) {
  return db("plants")
    .where({ id: plantId })
    .update(plantData)
    .then(num => {
      return db("plants")
        .where({ id: plantId })
        .first();
    });
}

function updateUser(userId, data) {
  return db("user")
    .where({ id: userId })
    .update(data)
    .then(userP => {
      return db("user")
        .where({ id: userId })
        .first();
    });
}

module.exports = {
  getPlants,
  getPlant,
  getUserId,
  removePlant,
  getPlantId,
  addPlant,
  addToUser,
  updatePlant,
  updateUser
};
