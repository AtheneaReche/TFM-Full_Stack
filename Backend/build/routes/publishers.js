"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var publishersController_1 = require("../../app/controllers/publishersController");
var authMiddleware_1 = require("../../app/middlewares/authMiddleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * /publishers:
 *   get:
 *     summary: Get all publishers
 *     description: Retrieve a list of all publishers in the database.
 *     tags:
 *       - Publishers
 *     responses:
 *       200:
 *         description: A list of publishers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   country:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/', publishersController_1.getPublishers);
/**
 * @swagger
 * /publishers/{id}:
 *   get:
 *     summary: Get publisher by ID
 *     description: Retrieve a specific publisher based on their ID.
 *     tags:
 *       - Publishers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the publisher to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A publisher object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 country:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', publishersController_1.getPublishersById);
/**
 * @swagger
 * /publishers:
 *   post:
 *     summary: Create a new publisher
 *     description: Add a new publisher to the database.
 *     tags:
 *       - Publishers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publisher successfully created.
 *       500:
 *         description: Internal server error.
 */
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), publishersController_1.createPublishers);
/**
 * @swagger
 * /publishers/{id}:
 *   delete:
 *     summary: Delete publisher by ID
 *     description: Remove a specific publisher from the database based on their ID.
 *     tags:
 *       - Publishers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the publisher to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publisher successfully deleted.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), publishersController_1.deletePublishers);
/**
 * @swagger
 * /publishers/{id}:
 *   put:
 *     summary: Update publisher by ID
 *     description: Update the details of a specific publisher based on their ID.
 *     tags:
 *       - Publishers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the publisher to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publisher successfully updated.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)('admin'), publishersController_1.updatePublishers);
exports.default = router;
