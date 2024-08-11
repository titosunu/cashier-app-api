const bcrypt = require('bcryptjs/dist/bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../../library/responseHelper');

const User = require('../model/auth.model');

// generate token
const generateToken = (user_data) => {
  const expiresIn = 60 * 60 * 6;
  return jsonwebtoken.sign(user_data, process.env.APP_KEY, { expiresIn });
};

// login controller cashier
const login = async (req, res) => {
  try {
    const user = await User.query()
      .select(['users.id', 'users.username', 'users.password'])
      .where('username', req.body.username)
      .first();

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return sendErrorResponse(res, 401, 'Invalid Credentials!');
    }

    const user_data = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(user_data);

    sendSuccessResponse(res, 200, 'Login success!', { data: user_data, token });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, 'Internal Server Error!');
  }
};

module.exports = {
  login,
};
