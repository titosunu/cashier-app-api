const db = require('../../config/database');

const { Model, AjvValidator } = require('objection');
const addFormats = require('ajv-formats');

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return 'products';
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
      type: 'object',

      required: ['name', 'category_id', 'price', 'stock'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        category_id: { type: 'integer' },
        price: { type: 'number' },
        stock: { type: 'integer' },
        created_at: { type: 'string', format: 'date' },
        updated_at: { type: 'string', format: 'date' },
      },
    };
  }

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: () => require('./category.model'),
      join: {
        from: 'products.category_id',
        to: 'categories.id',
      },
    },

    transactions: {
      relation: Model.HasManyRelation,
      modelClass: () => require('./transaction.detail.model'),
      join: {
        from: 'products.id',
        to: 'transaction_details.product_id',
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

module.exports = Product;
