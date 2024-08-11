const express = require('express');
const router = express.Router();

const AuthController = require('../app/controller/auth.controller');
const AuthValidator = require('../app/validator/auth.validator');

const handleValidation = require('../middleware/error.handler.middleware');
const AuthMiddleware = require('../middleware/auth.middleware');

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Cashier login
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: warmad01
 *               password:
 *                 type: string
 *                 example: 2001warmad
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login success!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: warmad01
 *                   required:
 *                     - id
 *                     - username
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *               required:
 *                 - message
 *                 - data
 *                 - token
 *       '401':
 *         description: Invalid Credentials
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  '/login',
  AuthValidator.login,
  handleValidation,
  AuthController.login
);

router.get('/logout', AuthMiddleware, AuthController.logout);

module.exports = router;
