const cleaner = require("knex-cleaner");

// CLEANER
exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"]
  });
};
