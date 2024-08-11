const { check, param } = require('express-validator');
const Category = require('../model/category.model');

const store = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty!')
    .isLength({ max: 255 })
    .withMessage('Name cannot be longer than 255 characters!')
    .custom(async (value) => {
      const existingCategory = await Category.query()
        .where({ name: value })
        .first();
      if (existingCategory) {
        throw new Error('Name already exist!');
      }
    }),
];

const show = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error('Category not found!');
      }
    }),
];

const update = [
  param('id')
    .isInt()
    .withMessage('ID must be a number')
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error('Category not found!');
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
      const existingCategory = await Category.query()
        .where({ name: value })
        .whereNot({ id: req.params.id })
        .first();
      if (existingCategory) {
        throw new Error('Name already exists!');
      }
    }),
];

const destroy = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer!')
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error('Category not found!');
      }
    }),
];

module.exports = {
  store,
  show,
  update,
  destroy,
};
