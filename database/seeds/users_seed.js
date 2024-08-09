const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    { username: "warmad01", password: await bcrypt.hash("2001warmad", 10) },
    { username: "warmad02", password: await bcrypt.hash("2001warmad", 10) },
  ]);
};
