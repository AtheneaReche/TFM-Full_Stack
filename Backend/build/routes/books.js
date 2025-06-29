"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var booksController_1 = require("../../app/controllers/booksController");
var authMiddleware_1 = require("../../app/middlewares/authMiddleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get a list of books
 *     description: Retrieves a list of books filtered by author, publisher, or genre.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: author
 *         description: Filter books by author id
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: publisher
 *         description: Filter books by publisher id
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: genre
 *         description: Filter books by genre
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The book's unique identifier
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the book
 *                     example: "The Great Gatsby"
 *                   genre:
 *                     type: string
 *                     description: The genre of the book
 *                     example: "Fiction"
 *                   publisher:
 *                     type: string
 *                     description: The publisher of the book
 *                     example: "Scribner"
 *                   ISBN:
 *                     type: string
 *                     description: The ISBN of the book
 *                     example: "978-0743273565"
 *       500:
 *         description: Error fetching books
 */
router.get('/', booksController_1.getBooks);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by its ID
 *     description: Retrieves a specific book by its ID.
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The book's unique identifier
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the book
 *                   example: "The Great Gatsby"
 *                 genre:
 *                   type: string
 *                   description: The genre of the book
 *                   example: "Fiction"
 *                 publisher:
 *                   type: string
 *                   description: The publisher of the book
 *                   example: "Scribner"
 *                 ISBN:
 *                   type: string
 *                   description: The ISBN of the book
 *                   example: "978-0743273565"
 *       500:
 *         description: Error fetching book
 */
router.get('/:id', booksController_1.getBooksById);
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Adds a new book to the database.
 *     tags:
 *       - Books
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
 *               - author
 *               - genre
 *               - publishing_year
 *               - ISBN
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book
 *                 example: "The Great Gatsby"
 *               book_cover:
 *                 type: string
 *                 description: The cover image of the book
 *               author:
 *                 type: integer
 *                 description: The author's unique identifier
 *                 example: 1
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Fiction"
 *               publishing_year:
 *                 type: integer
 *                 description: The year the book was published
 *                 example: 1925
 *               publisher:
 *                 type: integer
 *                 description: The publisher's unique identifier
 *               ISBN:
 *                 type: string
 *                 description: The ISBN of the book
 *                 example: "978-0743273565"
 *               description:
 *                 type: string
 *                 description: A short description of the book
 *                 example: "A novel about the American dream."
 *     responses:
 *       200:
 *         description: Book added successfully
 *       500:
 *         description: Error adding book
 */
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), booksController_1.createBooks);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by its ID
 *     description: Deletes a book by its unique identifier.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's unique identifier
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       500:
 *         description: Error deleting book
 */
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), booksController_1.deleteBooks);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by its ID
 *     description: Updates a book's details by its unique identifier.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book's unique identifier
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
 *                 description: The name of the book
 *                 example: "The Great Gatsby"
 *               book_cover:
 *                 type: string
 *                 description: The cover image of the book
 *               author:
 *                 type: integer
 *                 description: The author's unique identifier
 *                 example: 1
 *               genre:
 *                 type: string
 *                 description: The genre of the book
 *                 example: "Fiction"
 *               publishing_year:
 *                 type: integer
 *                 description: The year the book was published
 *                 example: 1925
 *               publisher:
 *                 type: integer
 *                 description: The publisher's unique identifier
 *               ISBN:
 *                 type: string
 *                 description: The ISBN of the book
 *                 example: "978-0743273565"
 *               description:
 *                 type: string
 *                 description: A short description of the book
 *                 example: "A novel about the American dream."
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       500:
 *         description: Error updating book
 */
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), booksController_1.updateBooks);
exports.default = router;
