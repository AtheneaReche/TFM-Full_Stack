import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import db from '../../database/db';

export const startReading = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    await db.execute(
      `INSERT INTO \`users-books\` (user, book, reading_status, reading_progress)
       VALUES (?, ?, 'reading', 0)
       ON DUPLICATE KEY UPDATE reading_status = 'reading'`
    , [userId, bookId]);

    res.status(200).json({ message: 'Started reading' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error starting book' });
  }
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { bookId, progress, status } = req.body;

  try {
    await db.execute(
      `UPDATE \`users-books\`
       SET reading_progress = ?, reading_status = ?
       WHERE user = ? AND book = ?`,
      [progress, status, userId, bookId]
    );

    res.status(200).json({ message: 'Progress updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating progress' });
  }
};

export const getUserBooks = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(`
      SELECT
        books.id,
        books.name,
        \`users-books\`.reading_progress,
        \`users-books\`.reading_status
      FROM \`users-books\`
      JOIN books ON \`users-books\`.book = books.id
      WHERE \`users-books\`.user = ?
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reading list' });
  }
};
