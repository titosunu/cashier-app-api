const db = require('../../config/database');

const { Model } = require('objection');

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      required: ['username', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        password: { type: 'string' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static relationMappings = {
    transactions: {
      relation: Model.HasManyRelation,
      modelClass: () => require('./transaction.model'),
      join: {
        from: 'users.id',
        to: 'transactions.user_id',
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

module.exports = User;
