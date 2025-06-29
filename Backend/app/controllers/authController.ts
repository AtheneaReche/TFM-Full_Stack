import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../database/db';

export const register = async (req: Request, res: Response) => {
  const { name, password, email, role } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      'INSERT INTO users (name, password, email, role) VALUES (?, ?, ?, ?)',
      [name, hashedPassword, email, role || 'user']
    );

    const userId = result.insertId;

    const [collectionResult] = await connection.execute(
      'INSERT INTO books_collections (user, name) VALUES (?, ?)',
      [userId, 'Favourites']
    );

    await connection.commit();

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  } finally {
    connection.release();
  }
};

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE name = ?',
      [name]
    );

    const user = rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login error' });
  }
};
