"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorsController_1 = require("../../app/controllers/authorsController");
var authMiddleware_1 = require("../../app/middlewares/authMiddleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Fetches all authors from the database.
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: List of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The author's unique identifier
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The author's name
 *                     example: "Jane Austen"
 *                   author_picture:
 *                     type: string
 *                     description: URL of the author's picture
 *                     example: "http://example.com/jane.jpg"
 *                   biography:
 *                     type: string
 *                     description: A short biography of the author
 *                     example: "English novelist known for her six major novels..."
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     description: The author's birthdate
 *                     example: "1775-12-16"
 *                   decease_date:
 *                     type: string
 *                     format: date
 *                     description: The author's decease date
 *                     example: "1817-07-18"
 *       500:
 *         description: Error fetching authors
 */
router.get('/', authorsController_1.getAuthors);
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     description: Fetches an author from the database by their unique ID.
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Author data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The author's unique identifier
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The author's name
 *                   example: "Jane Austen"
 *                 author_picture:
 *                   type: string
 *                   description: URL of the author's picture
 *                   example: "http://example.com/jane.jpg"
 *                 biography:
 *                   type: string
 *                   description: A short biography of the author
 *                   example: "English novelist known for her six major novels..."
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   description: The author's birthdate
 *                   example: "1775-12-16"
 *                 decease_date:
 *                   type: string
 *                   format: date
 *                   description: The author's decease date
 *                   example: "1817-07-18"
 *       404:
 *         description: Author not found
 *       500:
 *         description: Error fetching author by ID
 */
router.get('/:id', authorsController_1.getAuthorsById);
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Adds a new author to the database with all their details.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: author
 *         description: Author details to create.
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             name:
 *               type: string
 *               description: The author's name
 *               example: "George Orwell"
 *             author_picture:
 *               type: string
 *               description: URL of the author's picture
 *               example: "http://example.com/orwell.jpg"
 *             biography:
 *               type: string
 *               description: A short biography of the author
 *               example: "English novelist, essayist, journalist, and critic..."
 *             birthdate:
 *               type: string
 *               format: date
 *               description: The author's birthdate
 *               example: "1903-06-25"
 *             decease_date:
 *               type: string
 *               format: date
 *               description: The author's decease date
 *               example: "1950-01-21"
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Error creating author
 */
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), authorsController_1.createAuthors);
/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     description: Deletes an author from the database by their unique ID.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Error deleting author
 */
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), authorsController_1.deleteAuthors);
/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author's information
 *     description: Updates the details of an author in the database by their unique ID.
 *     tags:
 *       - Authors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The author's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         name: author
 *         description: Author details to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The author's name
 *               example: "George Orwell"
 *             author_picture:
 *               type: string
 *               description: URL of the author's picture
 *               example: "http://example.com/orwell_updated.jpg"
 *             biography:
 *               type: string
 *               description: A short biography of the author
 *               example: "Updated biography..."
 *             birthdate:
 *               type: string
 *               format: date
 *               description: The author's birthdate
 *               example: "1903-06-25"
 *             decease_date:
 *               type: string
 *               format: date
 *               description: The author's decease date
 *               example: "1950-01-21"
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Error updating author
 */
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), authorsController_1.updateAuthors);
exports.default = router;
