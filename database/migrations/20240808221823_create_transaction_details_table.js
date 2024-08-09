exports.up = function (knex) {
  return knex.schema.createTable("transaction_details", (table) => {
    table.increments("id").primary();
    table
      .integer("transaction_id")
      .unsigned()
      .references("id")
      .inTable("transactions")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .unsigned()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table.integer("quantity").notNullable();
    table.decimal("subtotal", 10, 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transaction_details");
};
