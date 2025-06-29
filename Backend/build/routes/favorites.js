"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authMiddleware_1 = require("../../app/middlewares/authMiddleware");
var favoritesController_1 = require("../../app/controllers/favoritesController");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get the user's favorite books
 *     description: Retrieves the list of books in the user's "Favourites" collection.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's favorite books
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
 *                   description:
 *                     type: string
 *                     description: A short description of the book
 *                     example: "A novel about the American dream."
 *       500:
 *         description: Error fetching favorites
 */
router.get('/', authMiddleware_1.authenticateToken, favoritesController_1.getFavorites);
exports.default = router;
