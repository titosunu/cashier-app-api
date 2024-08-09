const db = require("../../config/database");

const Product = require("./product.model");

const { Model, AjvValidator } = require("objection");
const addFormats = require("ajv-formats");

Model.knex(db);

class Category extends Model {
  static get tableName() {
    return "categories";
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

      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        created_at: { type: "string", format: "date" },
        updated_at: { type: "string", format: "date" },
      },
    };
  }

  static relationMappings = {
    products: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "categories.id",
        to: "products.category_id",
      },
    },
  };

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Category;
