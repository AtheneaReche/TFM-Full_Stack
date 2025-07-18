import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import db from '../../database/db'

export const createCollection = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const [existing]: any = await db.execute(
      'SELECT * FROM books_collections WHERE user = ? AND name = ?',
      [userId, name]
    );

    if (existing.length > 0) {
      res.status(400).json({ message: 'Collection already exists' });
      return;
    }

    await db.execute(
      'INSERT INTO books_collections (user, name) VALUES (?, ?)',
      [userId, name]
    );

    res.status(201).json({ message: 'Collection created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating collection' });
  }
};
  
export const getCollections = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM books_collections WHERE user = ?',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching collections' });
  }
};
  
export const deleteCollection = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const [collections]: any = await db.execute(
      'SELECT * FROM books_collections WHERE id = ? AND user = ?',
      [id, userId]
    );

    if (collections.length === 0) {
      res.status(404).json({ message: 'Collection not found or not yours' });
      return;
    }

    await db.execute(
      'DELETE FROM `books_collections-book` WHERE collection = ?',
      [id]
    );

    await db.execute(
      'DELETE FROM books_collections WHERE id = ?',
      [id]
    );

    res.json({ message: 'Collection deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting collection' });
  }
};

export const addBookToCollection = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { collectionId, bookId } = req.body;

  try {
    const [collections]: any = await db.execute(
      'SELECT * FROM books_collections WHERE id = ? AND user = ?',
      [collectionId, userId]
    );

    if (collections.length === 0) {
      res.status(403).json({ message: 'No access to this collection' });
      return;
    }

    await db.execute(
      'INSERT INTO `books_collections-book` (collection, book) VALUES (?, ?)',
      [collectionId, bookId]
    );

    res.status(201).json({ message: 'Book added to collection' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding book to collection' });
  }
};

export const removeBookFromCollection = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user.id;
  const { collectionId, bookId } = req.body;

  try {
    const [collections]: any = await db.execute(
      'SELECT * FROM books_collections WHERE id = ? AND user = ?',
      [collectionId, userId]
    );

    if (collections.length === 0) {
      res.status(403).json({ message: 'No access to this collection' });
      return;
    }

    await db.execute(
      'DELETE FROM `books_collections-book` WHERE collection = ? AND book = ?',
      [collectionId, bookId]
    );

    res.json({ message: 'Book removed from collection' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing book' });
  }
};