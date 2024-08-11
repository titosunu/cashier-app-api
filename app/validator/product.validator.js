const { check, param } = require('express-validator');
const Product = require('../model/product.model');
const Category = require('../model/category.model');

const store = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty!')
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters!')
    .custom(async (value) => {
      const existingProduct = await Product.query()
        .where({ name: value })
        .first();
      if (existingProduct) {
        throw new Error('Name already exists!');
      }
    }),

  check('category_id')
    .not()
    .isEmpty()
    .withMessage('Category cannot be empty!')
    .isInt()
    .withMessage('Category must be an integer!')
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error('Category not found!');
      }
    }),

  check('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be empty!')
    .isInt()
    .withMessage('Price must be an integer!')
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error('Price must be greater than 0!');
      }
    }),

  check('stock')
    .not()
    .isEmpty()
    .withMessage('Stock cannot be empty!')
    .isInt()
    .withMessage('Stock must be an integer!')
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error('Stock must be greater than 0!');
      }
    }),
];

const show = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const product = await Product.query().findById(value);
      if (!product) {
        throw new Error('Product not found!');
      }
    }),
];

const update = [
  param('id')
    .isInt()
    .withMessage('ID must be a number')
    .custom(async (value) => {
      const product = await Product.query().findById(value);
      if (!product) {
        throw new Error('Product not found!');
      }
    }),

  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty!')
    .bail()
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters!')
    .bail()
    .custom(async (value, { req }) => {
      const existingProduct = await Product.query()
        .where({ name: value })
        .whereNot({ id: req.params.id })
        .first();
      if (existingProduct) {
        throw new Error('Name already exists!');
      }
    }),

  check('category_id')
    .not()
    .isEmpty()
    .withMessage('Category cannot be empty!')
    .isInt()
    .withMessage('Category must be an integer!')
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error('Category not found!');
      }
    }),

  check('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be empty!')
    .isInt()
    .withMessage('Price must be an integer!')
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error('Price must be greater than 0!');
      }
    }),

  check('stock')
    .not()
    .isEmpty()
    .withMessage('Stock cannot be empty!')
    .isInt()
    .withMessage('Stock must be an integer!')
    .custom(async (value) => {
      if (value <= 0) {
        throw new Error('Stock must be greater than 0!');
      }
    }),
];

const destroy = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const product = await Product.query().findById(value);
      if (!product) {
        throw new Error('Product not found!');
      }
    }),
];

module.exports = {
  store,
  show,
  update,
  destroy,
};
