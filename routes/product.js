const express = require('express');
const router = express.Router();

const ProductController = require('../app/controller/product.controller');
const ProductValidator = require('../app/validator/product.validator');

const handleValidation = require('../middleware/error.handler.middleware');
const AuthMiddleware = require('../middleware/auth.middleware');

// Get all Products
/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of products
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
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       category_id:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 99.99
 *                       stock:
 *                         type: integer
 *                         example: 100
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-10T12:00:00Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-10T12:00:00Z"
 *       '404':
 *         description: Products not found
 *       '500':
 *         description: Internal Server Error
 */

router.get('/products', AuthMiddleware, ProductController.index);

// Get product by ID
/**
 * @openapi
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product data
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
 *                     name:
 *                       type: string
 *                       example: "Product Name"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 99.99
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error!
 */
router.get(
  '/products/:id',
  AuthMiddleware,
  ProductValidator.show,
  handleValidation,
  ProductController.show
);

// Add new Product
/**
 * @openapi
 * /products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add a new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category_id
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"
 *               category_id:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 99.99
 *               stock:
 *                 type: integer
 *                 example: 100
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
 *                     name:
 *                       type: string
 *                       example: "Product Name"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 99.99
 *                     stock:
 *                       type: integer
 *                       example: 100
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error!
 */
router.post(
  '/products',
  AuthMiddleware,
  ProductValidator.store,
  handleValidation,
  ProductController.store
);

// Update a Product
/**
 * @openapi
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               category_id:
 *                 type: integer
 *                 example: 2
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 79.99
 *               stock:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Success update!
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
 *                   example: "Success update!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Updated Product Name"
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 79.99
 *                     stock:
 *                       type: integer
 *                       example: 150
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-10T12:00:00Z"
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error!
 */
router.put(
  '/products/:id',
  AuthMiddleware,
  ProductValidator.update,
  handleValidation,
  ProductController.update
);

// Delete a Product
/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Success delete!
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
 *                   example: Success delete!
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error
 */
router.delete(
  '/products/:id',
  AuthMiddleware,
  ProductValidator.destroy,
  handleValidation,
  ProductController.destroy
);

module.exports = router;
