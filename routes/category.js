const express = require('express');
const router = express.Router();

const CategoryController = require('../app/controller/category.controller');
const CategoryValidator = require('../app/validator/category.validator');

const handleValidation = require('../middleware/error.handler.middleware');
const AuthMiddleware = require('../middleware/auth.middleware');

// Get list of categories
/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of categories
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
 *                         example: Makanan
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-11T14:23:02.000Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-08-11T14:23:02.000Z
 *       '500':
 *         description: Internal Server Error
 *       '404':
 *         description: No categories found!
 */
router.get('/categories', AuthMiddleware, CategoryController.index);

// Get category by ID
/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Category data
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
 *                       example: Makanan
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:23:02.000Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:23:02.000Z
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  '/categories/:id',
  AuthMiddleware,
  CategoryValidator.show,
  handleValidation,
  CategoryController.show
);

// Add new category
/**
 * @openapi
 * /categories:
 *   post:
 *     tags:
 *       - Category
 *     summary: Add a new category
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bumbu
 *     responses:
 *       '200':
 *         description: Success create!
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
 *                   example: Category created successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Bumbu
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:23:02.000Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:23:02.000Z
 *       '500':
 *         description: Internal Server Error
 *       '422':
 *         description: Validation error
 */

router.post(
  '/categories',
  AuthMiddleware,
  CategoryValidator.store,
  handleValidation,
  CategoryController.store
);

// Update a category
/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
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
 *                 example: Rokok
 *     responses:
 *       '200':
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
 *                   example: Category updated successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Rokok
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:23:02.000Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-08-11T14:30:45.000Z
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error
 */
router.put(
  '/categories/:id',
  AuthMiddleware,
  CategoryValidator.update,
  handleValidation,
  CategoryController.update
);

// Delete a category
/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
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
 *                   example: Category deleted successfully!
 *       '422':
 *         description: Validation error
 *       '500':
 *         description: Internal Server Error
 */
router.delete(
  '/categories/:id',
  AuthMiddleware,
  CategoryValidator.destroy,
  handleValidation,
  CategoryController.destroy
);

module.exports = router;
