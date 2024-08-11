const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../model/auth.model");

// login cashier
const login = async (req, res) => {
  try {
    const user = await User.query()
      .select(["users.id", "users.username", "users.password"])
      .where("username", req.body.username)
      .first();

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials!",
      });
    } else {
      const user_data = await User.query()
        .select(["users.id", "users.username"])
        .where("id", user.id)
        .first();

      const expiresIn = 60 * 60 * 6;
      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: expiresIn,
      });

      res.status(200).json({
        message: "Login success!",
        data: user_data,
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
};
