"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var collectionsController_1 = require("../../app/controllers/collectionsController");
var authMiddleware_1 = require("../../app/middlewares/authMiddleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     description: Retrieves all collections created by the authenticated user.
 *     tags:
 *       - Collections
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all collections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The collection's unique identifier
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the collection
 *                     example: "My Favorite Books"
 *       500:
 *         description: Error fetching collections
 */
router.get('/', authMiddleware_1.authenticateToken, collectionsController_1.getCollections);
/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     description: Creates a new book collection for the authenticated user.
 *     tags:
 *       - Collections
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
 *                 description: The name of the collection
 *                 example: "My Favorite Books"
 *     responses:
 *       201:
 *         description: Collection created successfully
 *       400:
 *         description: Collection already exists
 *       500:
 *         description: Error creating collection
 */
router.post('/', authMiddleware_1.authenticateToken, collectionsController_1.createCollection);
/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Delete a collection
 *     description: Deletes a collection created by the authenticated user.
 *     tags:
 *       - Collections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The collection's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       404:
 *         description: Collection not found or not yours
 *       500:
 *         description: Error deleting collection
 */
router.delete('/:id', authMiddleware_1.authenticateToken, collectionsController_1.deleteCollection);
/**
 * @swagger
 * /collections/add-book:
 *   post:
 *     summary: Add a book to a collection
 *     description: Adds a book to a specified collection for the authenticated user.
 *     tags:
 *       - Collections
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collectionId
 *               - bookId
 *             properties:
 *               collectionId:
 *                 type: integer
 *                 description: The collection's unique identifier
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: The book's unique identifier
 *                 example: 123
 *     responses:
 *       201:
 *         description: Book added to the collection
 *       403:
 *         description: No access to this collection
 *       500:
 *         description: Error adding book to collection
 */
router.post('/add-book', authMiddleware_1.authenticateToken, collectionsController_1.addBookToCollection);
/**
 * @swagger
 * /collections/remove-book:
 *   post:
 *     summary: Remove a book from a collection
 *     description: Removes a book from a specified collection for the authenticated user.
 *     tags:
 *       - Collections
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collectionId
 *               - bookId
 *             properties:
 *               collectionId:
 *                 type: integer
 *                 description: The collection's unique identifier
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 description: The book's unique identifier
 *                 example: 123
 *     responses:
 *       200:
 *         description: Book removed from the collection
 *       403:
 *         description: No access to this collection
 *       500:
 *         description: Error removing book from collection
 */
router.post('/remove-book', authMiddleware_1.authenticateToken, collectionsController_1.removeBookFromCollection);
exports.default = router;
