const { check } = require('express-validator');

const User = require('../model/auth.model');

const login = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username cannot be empty!')
    .bail()
    .custom(async (value) => {
      const user = await User.query().where({ username: value }).first();
      if (!user) {
        throw new Error('User not found!');
      }
    }),

  check('password').not().isEmpty().withMessage('Password cannot be empty!'),
];

module.exports = {
  login,
};
