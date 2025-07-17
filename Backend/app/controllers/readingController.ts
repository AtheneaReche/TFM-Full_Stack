import {type Response} from 'express';
import {type AuthRequest} from '../middlewares/authMiddleware';
import db from '../../database/db';

export const startReading = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const {bookId} = req.body;

  try {
    const sql = `
        INSERT INTO \`users-books\` (user, book, reading_status, reading_progress, rating)
        VALUES (?, ?, 'reading', 0, NULL) ON DUPLICATE KEY
        UPDATE
            reading_status =
        VALUES (reading_status), reading_progress =
        VALUES (reading_progress)
    `;
    await db.execute(sql, [userId, bookId]);

    res.status(200).json({message: 'Started reading'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error starting book'});
  }
};

export const updateProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { bookId, progress, status } = req.body;

  try {
    const sql = `
      INSERT INTO \`users-books\` (user, book, reading_status, reading_progress, rating)
      VALUES (?, ?, ?, ?, NULL)
      ON DUPLICATE KEY UPDATE
        reading_status = VALUES(reading_status),
        reading_progress = VALUES(reading_progress)
    `;
    await db.execute(sql, [userId, bookId, status, progress]);

    res.status(200).json({ message: 'Progress updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating progress' });
  }
};


export const getUserBooks = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;

  try {
    const sql = `
        SELECT b.id,
               b.name,
               b.book_cover,
               b.author,
               b.genre,
               b.publishing_year,
               b.publisher,
               b.ISBN,
               b.description,
               ub.reading_progress,
               ub.reading_status,
               ub.rating
        FROM books AS b
                 JOIN \`users-books\` AS ub ON b.id = ub.book
        WHERE ub.user = ?
    `;
    const [rows] = await db.execute(sql, [userId]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error fetching reading list'});
  }
};

export const rateBook = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const {bookId, rating} = req.body;

  try {
    const sql = `
        INSERT INTO \`users-books\` (user, book, rating, reading_status, reading_progress)
        VALUES (?, ?, ?, 'pending', 0) ON DUPLICATE KEY
        UPDATE rating = ?
    `;
    await db.execute(sql, [userId, bookId, rating, rating]);

    res.status(200).json({message: 'Rating updated'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error updating rating'});
  }
};