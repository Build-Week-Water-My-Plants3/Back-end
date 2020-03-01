exports.up = function(knex) {
  return knex.schema
    .createTable("user", user => {
      user.increments();
      user
        .text("username", 128)
        .notNullable()
        .unique()
        .index();
      user.text("password").notNullable();
      user.integer("phonenumber", 256).notNullable();
    })
    .createTable("species", species => {
      species.increments();
      species
        .text("species_name", 255)
        .notNullable()
        .unique()
        .index();
    })
    .createTable("plants", plants => {
      plants.increments();
      plants
        .text("nickname", 255)
        .notNullable()
        .unique()
        .index();
      plants.text("frequency").notNullable();
      plants.text("photo");
      plants
        .integer("species_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("species")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("user_plants", up => {
      up.primary(["userId", "plantId"]);
      up.integer("userId")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      up.integer("plantId")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("plants")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_plants")
    .dropTableIfExists("plants")
    .dropTableIfExists("species")
    .dropTableIfExists("user");
};
