exports.up = function(knex) {
  return knex.schema.createTable("user", user => {
    user.increments();

    user
      .text("username", 128)
      .notNullable()
      .unique()
      .index();
    user.text("password").notNullable();

    user.integer("phonenumber", 256).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
