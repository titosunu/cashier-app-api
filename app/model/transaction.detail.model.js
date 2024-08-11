const db = require("../../config/database");

const { Model, AjvValidator } = require("objection");
const addFormats = require("ajv-formats");

Model.knex(db);

class TransactionDetail extends Model {
  static get tableName() {
    return "transaction_details";
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        addFormats(ajv);
      },
      options: {
        allErrors: true,
        validateSchema: true,
        ownProperties: true,
      },
    });
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        transaction_id: { type: "integer" },
        product_id: { type: "integer" },
        quantity: { type: "integer" },
        subtotal: { type: "number" },
      },
    };
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: () => require("./product.model"),
        join: {
          from: "transaction_details.product_id",
          to: "products.id",
        },
      },

      transaction: {
        relation: Model.BelongsToOneRelation,
        modelClass: () => require("./transaction.model"),
        join: {
          from: "transaction_details.transaction_id",
          to: "transactions.id",
        },
      },
    };
  }
}

module.exports = TransactionDetail;
