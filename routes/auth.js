const express = require("express");
const router = express.Router();

const AuthController = require("../app/controller/auth.controller");
const AuthValidator = require("../app/validator/auth.validator");

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Login
 *     summary: Login Cashier
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *               type: string
 *               example: admin
 *              password:
 *               type: string
 *               example: password
 *     responses:
 *      200:
 *        description: Login success!
 *      401:
 *        description: Invalid Credentials!
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal Server Error!
 */
router.post("/login", AuthValidator.login, AuthController.login);

module.exports = router;
