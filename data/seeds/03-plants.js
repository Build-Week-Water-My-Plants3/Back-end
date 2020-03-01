// plants
exports.seed = function(knex) {
  return knex("plants").insert([
    // plant 1
    {
      nickname: "rosy",
      species_id: 1,
      frequency: "twice a day",
      photo: null
    },
    // plants 2
    {
      nickname: "cockatus",
      species_id: 2,
      frequency: "maybe never",
      photo: null
    },
    // plant id 3
    {
      nickname: "lilybette",
      species_id: 2,
      frequency: "it's already on water",
      photo: null
    },
    // plant id 4
    {
      nickname: "weed",
      species_id: 2,
      frequency: "it's already on water",
      photo: null
    }
  ]);
};
