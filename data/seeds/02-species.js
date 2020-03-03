//SPECIES
exports.seed = function(knex) {
  return knex("species").insert([
    { species_name: "common fig" },
    { species_name: "araceae" },
    { species_name: "weed" }
  ]);
};
