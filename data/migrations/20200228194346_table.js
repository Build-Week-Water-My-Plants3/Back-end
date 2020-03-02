exports.up = function(knex) {
  return (
    knex.schema

      // USERS:
      // REGISER- username, password,phonenumber
      // LOGIN- username,password
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

      // PLANT SPECIES: species_name
      .createTable("species", species => {
        species.increments();
        species
          .text("species_name", 255)
          .notNullable()
          .unique()
          .index();
      })
      // PLANTS: nickname,frequency,species_id,photo
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

      // USERS PLANTS: userId, plantId
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
      })
  );
};
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_plants")
    .dropTableIfExists("plants")
    .dropTableIfExists("species")
    .dropTableIfExists("user");
};
