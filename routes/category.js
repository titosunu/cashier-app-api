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
 *  get:
 *     tags:
 *     - Category
 *     summary: Get all categories
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: List of categories
 *      500:
 *        description: Internal Server Error!
 */
router.get('/categories', AuthMiddleware, CategoryController.index);

// Get category by ID
/**
 * @openapi
 * /categories/{id}:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get category by ID
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Category data
 *      404:
 *        description: Category not found
 *      500:
 *        description: Internal Server Error!
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
 *  post:
 *     tags:
 *     - Category
 *     summary: Add a new category
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *               example: minuman
 *     responses:
 *      200:
 *        description: Success create!
 *      500:
 *        description: Internal Server Error!
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
 *  put:
 *     tags:
 *     - Category
 *     summary: Update a category by ID
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *               type: string
 *               example: minuman
 *     responses:
 *      200:
 *        description: Success update!
 *      404:
 *        description: Category not found
 *      500:
 *        description: Internal Server Error!
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
 *  delete:
 *     tags:
 *     - Category
 *     summary: Delete a category by ID
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: Success delete!
 *      404:
 *        description: Category not found
 *      500:
 *        description: Internal Server Error!
 */
router.delete(
  '/categories/:id',
  AuthMiddleware,
  CategoryValidator.destroy,
  handleValidation,
  CategoryController.destroy
);

module.exports = router;
