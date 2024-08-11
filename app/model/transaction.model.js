const db = require("../../config/database");

const { Model, AjvValidator } = require("objection");
const addFormats = require("ajv-formats");

Model.knex(db);

class Transaction extends Model {
  static get tableName() {
    return "transactions";
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
      required: ["total_amount", "user_id"],

      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        total_amount: { type: "number" },
        transaction_date: { type: "string", format: "date" },
      },
    };
  }

  static relationMappings = {
    details: {
      relation: Model.HasManyRelation,
      modelClass: () => require("./transaction.detail.model"),
      join: {
        from: "transactions.id",
        to: "transaction_details.transaction_id",
      },
    },

    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => require("./auth.model"),
      join: {
        from: "transactions.user_id",
        to: "users.id",
      },
    },
  };

  $beforeInsert() {
    this.transaction_date = new Date().toISOString();
  }
}

module.exports = Transaction;
