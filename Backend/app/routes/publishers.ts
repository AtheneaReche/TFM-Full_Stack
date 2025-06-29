import { Router } from 'express';
import { 
    getPublishers, 
    getPublishersById, 
    createPublishers, 
    deletePublishers, 
    updatePublishers 
    } 
from '../controllers/publishersController';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

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
router.get('/', getPublishers);

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
router.get('/:id', getPublishersById);

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
router.post('/', authenticateToken, authorizeRole('admin'), createPublishers);

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
router.delete('/:id', authenticateToken, authorizeRole('admin'), deletePublishers);

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
router.put('/:id', authenticateToken, authorizeRole('admin'), updatePublishers);

export default router;