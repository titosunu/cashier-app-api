const { check, validationResult } = require("express-validator");

const User = require("../model/auth.model");

const login = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty!")
    .bail()
    .custom(async (value) => {
      const user = await User.query().where({ username: value }).first();
      if (!user) {
        throw new Error("User not found!");
      }
    }),

  check("password").not().isEmpty().withMessage("Password cannot be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  login,
};
