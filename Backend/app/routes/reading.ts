import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  startReading,
  updateProgress,
  getUserBooks, rateBook
} from '../controllers/readingController';

const router = Router();

/**
 * @swagger
 * /reading:
 *   get:
 *     summary: Get user's reading list
 *     description: Retrieve all books that the user is reading, along with their progress and status.
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books the user is reading, with their progress and status.
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
 *                   reading_progress:
 *                     type: integer
 *                     description: The reading progress in percentage.
 *                   reading_status:
 *                     type: string
 *                     description: The reading status of the book (e.g., 'reading', 'finished').
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticateToken, getUserBooks);

/**
 * @swagger
 * /reading/start:
 *   post:
 *     summary: Start reading a book
 *     description: Mark a book as started by the user with a "reading" status and initial progress of 0%.
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
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book to start reading.
 *     responses:
 *       200:
 *         description: The book has been marked as started.
 *       500:
 *         description: Internal server error.
 */
router.post('/start', authenticateToken, startReading);

/**
 * @swagger
 * /reading/update:
 *   put:
 *     summary: Update reading progress of a book
 *     description: Update the progress and status of a book for the user.
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
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: The ID of the book whose progress is being updated.
 *               progress:
 *                 type: integer
 *                 description: The new reading progress in percentage.
 *               status:
 *                 type: string
 *                 description: The new reading status (e.g., 'reading', 'finished').
 *     responses:
 *       200:
 *         description: The progress of the book has been updated.
 *       500:
 *         description: Internal server error.
 */
router.put('/update', authenticateToken, updateProgress);

router.put('/rate', authenticateToken, rateBook);

export default router;
