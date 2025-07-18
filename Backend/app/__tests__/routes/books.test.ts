import request from 'supertest';
import app from '../../app';
import db from '../../../database/db';
import { authenticateToken, authorizeRole } from '../../middlewares/authMiddleware';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';


jest.mock('../../../database/db');


jest.mock('../../middlewares/authMiddleware', () => {
  const authorizeRoleMock = jest.fn(() => (req: any, res: any, next: any) => next());
  return {
    authenticateToken: jest.fn((req: any, res: any, next: any) => next()),
    authorizeRole: authorizeRoleMock
  };
});


const mockedDb = db as jest.Mocked<typeof db>;

describe('Books API', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /books', () => {
    it('should return a 200 status and a list of books', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
        { id: 2, name: 'Game of Thrones', author: 'George R.R. Martin', genre: 'Fantasy' }
      ];

      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const response = await request(app).get('/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBooks);
    });

    it('should filter books by author', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' }
      ];

      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const response = await request(app).get('/books?author=1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBooks);
      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('WHERE'),
        expect.arrayContaining([1])
      );
    });

    it('should return a 500 status on a database error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockedDb.execute.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/books');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error fetching books' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('GET /books/:id', () => {
    it('should return a 200 status and a single book if found', async () => {
      const mockBook = { id: 1, name: 'Harry Potter', author: 'J.K. Rowling' };
      mockedDb.execute.mockResolvedValue([[mockBook]] as any);

      const response = await request(app).get('/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBook);
      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        ['1']
      );
    });

    it('should return a 404 status if the book is not found', async () => {
      mockedDb.execute.mockResolvedValue([[]] as any);

      const response = await request(app).get('/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Book not found' });
    });
  });

  describe('POST /books', () => {
    it('should create a new book and return 201 status', async () => {
      const mockResult = { insertId: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const newBook = {
        name: 'New Book',
        book_cover: 'cover.jpg',
        author: 1,
        genre: 'Fantasy',
        publishing_year: 2023,
        publisher: 1,
        ISBN: '1234567890',
        description: 'A new book'
      };

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Book created', bookId: 1 });
    });

    it('should return 500 status on database error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockedDb.execute.mockRejectedValue(new Error('Database error'));

      const newBook = {
        name: 'New Book',
        author: 1
      };

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error creating book' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book and return 200 status', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const response = await request(app).delete('/books/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Book deleted' });
    });

    it('should return 404 status when book not found', async () => {
      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const response = await request(app).delete('/books/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Book not found' });
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book and return 200 status', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const updatedBook = {
        name: 'Updated Book',
        book_cover: 'updated.jpg',
        author: 1,
        genre: 'Fantasy',
        publishing_year: 2023,
        publisher: 1,
        ISBN: '1234567890',
        description: 'An updated book'
      };

      const response = await request(app)
        .put('/books/1')
        .send(updatedBook);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Book updated' });
    });

    it('should return 404 status when book not found', async () => {
      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const updatedBook = {
        name: 'Updated Book'
      };

      const response = await request(app)
        .put('/books/999')
        .send(updatedBook);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Book not found' });
    });
  });
});
