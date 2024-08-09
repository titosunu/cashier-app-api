const { check, validationResult, param } = require("express-validator");
const Category = require("../model/category.model");

const index = [
  async (req, res, next) => {
    const categories = await Category.query();

    if (categories.length === 0) {
      return res.status(404).json({
        errors: [{ item_name: "categories", message: "No categories found!" }],
      });
    }

    req.categories = categories;
    next();
  },

  (req, res) => {
    return res.json(req.categories);
  },
];

const store = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty!")
    .isLength({ max: 255 })
    .withMessage("Name cannot be longer than 255 characters!")
    .custom(async (value) => {
      const existingCategory = await Category.query()
        .where({ name: value })
        .first();
      if (existingCategory) {
        throw new Error("Name already exist!");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error_data = errors.array().map((error) => {
        return {
          item_name: error.param,
          message: error.msg,
        };
      });

      return res.status(422).json({
        errors: error_data,
      });
    }

    next();
  },
];

const show = [
  param("id")
    .isInt()
    .withMessage("ID must be an integer!")
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error("Category not found!");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error_data = errors.array().map((error) => {
        return {
          item_name: error.param,
          message: error.msg,
        };
      });

      return res.status(422).json({
        errors: error_data,
      });
    }

    next();
  },
];

const update = [
  param("id")
    .isInt()
    .withMessage("ID must be a number")
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error("Category not found!");
      }
    }),

  check("name")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Name cannot be longer than 255 characters!")
    .bail()
    .custom(async (value, { req }) => {
      const existingCategory = await Category.query()
        .where({ name: value })
        .whereNot({ id: req.params.id })
        .first();
      if (existingCategory) {
        throw new Error("Name already exists!");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error_data = errors.array().map((error) => {
        return {
          item_name: error.param,
          message: error.msg,
        };
      });

      return res.status(422).json({
        errors: error_data,
      });
    }

    next();
  },
];

const destroy = [
  param("id")
    .isInt()
    .withMessage("ID must be an integer!")
    .custom(async (value) => {
      const category = await Category.query().findById(value);
      if (!category) {
        throw new Error("Category not found!");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error_data = errors.array().map((error) => {
        return {
          item_name: error.param,
          message: error.msg,
        };
      });

      return res.status(422).json({
        errors: error_data,
      });
    }

    next();
  },
];

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
