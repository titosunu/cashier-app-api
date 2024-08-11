const { check, param } = require('express-validator');
const Product = require('../model/product.model');
const User = require('../model/auth.model');
const Transaction = require('../model/transaction.model');

const store = [
  check('user_id')
    .not()
    .isEmpty()
    .withMessage('User ID cannot be empty!')
    .isInt()
    .withMessage('User ID must be an integer!')
    .custom(async (value) => {
      const user = await User.query().findById(value);
      if (!user) {
        throw new Error('User not found!');
      }
    }),

  check('products')
    .isArray({ min: 1 })
    .withMessage('Products cannot be empty!')
    .custom(async (value) => {
      for (const item of value) {
        const product = await Product.query().findById(item.product_id);
        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found!`);
        } else if (item.quantity <= 0) {
          throw new Error(
            `Quantity for product ID ${item.product_id} must be greater than 0!`
          );
        } else if (product.stock < item.quantity) {
          throw new Error(
            `Not enough stock for product ID ${item.product_id}, available stock: ${product.stock}`
          );
        }
      }
    }),
];

const show = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const transaction = await Transaction.query().findById(value);
      if (!transaction) {
        throw new Error('Transaction not found!');
      }
    }),
];

const destroy = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const transaction = await Transaction.query().findById(value);
      if (!transaction) {
        throw new Error('Transaction not found!');
      }
    }),
];

module.exports = {
  store,
  show,
  destroy,
};
