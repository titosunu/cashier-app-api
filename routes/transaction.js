const express = require("express");
const router = express.Router();

const TransactionController = require("../app/controller/transaction.controller");
const TransactionValidator = require("../app/validator/transaction.validator");

const AuthMiddleware = require("../middleware/auth.middleware");

// Get all Transactions
/**
 * @openapi
 * /transactions:
 *   get:
 *     tags:
 *       - Transaction
 *     summary: Get all transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 3
 *                       total_amount:
 *                         type: number
 *                         format: float
 *                         example: 199.99
 *                       transaction_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-10T12:00:00Z"
 *                       transaction_details:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 1
 *                             transaction_id:
 *                               type: integer
 *                               example: 1
 *                             product_id:
 *                               type: integer
 *                               example: 2
 *                             quantity:
 *                               type: integer
 *                               example: 3
 *                             subtotal:
 *                               type: number
 *                               format: float
 *                               example: 59.97
 *       500:
 *         description: Internal Server Error!
 */
router.get(
  "/transactions",
  AuthMiddleware,
  TransactionValidator.index,
  TransactionController.index
);

// Get transaction by ID
/**
 * @openapi
 * /transactions/{id}:
 *   get:
 *     tags:
 *       - Transaction
 *     summary: Get transaction by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the transaction
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Transaction data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OK!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 3
 *                     total_amount:
 *                       type: number
 *                       format: float
 *                       example: 199.99
 *                     transaction_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *                     transaction_details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           transaction_id:
 *                             type: integer
 *                             example: 1
 *                           product_id:
 *                             type: integer
 *                             example: 2
 *                           quantity:
 *                             type: integer
 *                             example: 3
 *                           subtotal:
 *                             type: number
 *                             format: float
 *                             example: 59.97
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error!
 */
router.get(
  "/transactions/:id",
  AuthMiddleware,
  TransactionValidator.show,
  TransactionController.show
);

// Add new Transaction
/**
 * @openapi
 * /transactions:
 *   post:
 *     tags:
 *       - Transaction
 *     summary: Add a new transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - total_amount
 *               - transaction_details
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 3
 *               total_amount:
 *                 type: number
 *                 format: float
 *                 example: 199.99
 *               transaction_details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                     - subtotal
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 2
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *                     subtotal:
 *                       type: number
 *                       format: float
 *                       example: 59.97
 *     responses:
 *       201:
 *         description: Success create!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Success create!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 3
 *                     total_amount:
 *                       type: number
 *                       format: float
 *                       example: 199.99
 *                     transaction_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *                     transaction_details:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           transaction_id:
 *                             type: integer
 *                             example: 1
 *                           product_id:
 *                             type: integer
 *                             example: 2
 *                           quantity:
 *                             type: integer
 *                             example: 3
 *                           subtotal:
 *                             type: number
 *                             format: float
 *                             example: 59.97
 *       500:
 *         description: Internal Server Error!
 */
router.post(
  "/transactions",
  AuthMiddleware,
  TransactionValidator.store,
  TransactionController.store
);

// Delete a Transaction
/**
 * @openapi
 * /transactions/{id}:
 *   delete:
 *     tags:
 *       - Transaction
 *     summary: Delete a transaction by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the transaction
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Success delete!
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal Server Error!
 */
router.delete(
  "/transactions/:id",
  AuthMiddleware,
  TransactionValidator.destroy,
  TransactionController.destroy
);

module.exports = router;
