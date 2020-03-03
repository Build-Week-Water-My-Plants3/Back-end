// USER_PLANTS
exports.seed = function(knex) {
  return knex("user_plants").insert([
    { userId: 1, plantId: 2 },
    { userId: 1, plantId: 1 },
    { userId: 2, plantId: 1 },
    { userId: 2, plantId: 4 }
  ]);
};
