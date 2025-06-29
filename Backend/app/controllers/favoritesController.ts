import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import db from '../../database/db';

export const getFavorites = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(
      `SELECT b.* FROM books AS b
       JOIN \`books_collections-book\` AS bcb ON b.id = bcb.book
       JOIN books_collections AS bc ON bcb.collection = bc.id
       WHERE bc.user = ? AND bc.name = 'Favourites'`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};
