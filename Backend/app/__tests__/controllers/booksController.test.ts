import { Request, Response } from 'express';
import db from '../../../database/db';
import {
  getBooks,
  getBooksById,
  createBooks,
  deleteBooks,
  updateBooks
} from '../../controllers/booksController';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

jest.mock('../../../database/db');

const mockRequest = () => {
  const req: Partial<Request> = {};
  req.body = {};
  req.params = {};
  req.query = {};
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis() as any;
  res.json = jest.fn().mockReturnThis() as any;
  return res as Response;
};

const mockedDb = db as jest.Mocked<typeof db>;

describe('Books Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
        { id: 2, name: 'Game of Thrones', author: 'George R.R. Martin', genre: 'Fantasy' }
      ];
      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT'), []);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should filter books by author', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' }
      ];
      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const req = mockRequest();
      req.query = { author: '1' };
      const res = mockResponse();

      await getBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('WHERE'),
        [1]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should filter books by publisher', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', publisher: 'Bloomsbury' }
      ];
      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const req = mockRequest();
      req.query = { publisher: '1' };
      const res = mockResponse();

      await getBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('WHERE'),
        [1]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should filter books by genre', async () => {
      const mockBooks = [
        { id: 1, name: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' }
      ];
      mockedDb.execute.mockResolvedValue([mockBooks] as any);

      const req = mockRequest();
      req.query = { genre: 'Fantasy' };
      const res = mockResponse();

      await getBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('WHERE'),
        ['Fantasy']
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching books' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getBooksById', () => {
    it('should return a book when found', async () => {
      const mockBook = { id: 1, name: 'Harry Potter', author: 'J.K. Rowling' };
      mockedDb.execute.mockResolvedValue([[mockBook]] as any);

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      await getBooksById(req, res);
      
      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        ['1']
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });

    it('should return 404 when book not found', async () => {
      mockedDb.execute.mockResolvedValue([[]] as any);

      const req = mockRequest();
      req.params.id = '999';
      const res = mockResponse();

      await getBooksById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getBooksById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching Book' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('createBooks', () => {
    it('should create a new book', async () => {
      const mockResult = { insertId: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.body = {
        name: 'New Book',
        book_cover: 'cover.jpg',
        author: 1,
        genre: 'Fantasy',
        publishing_year: 2023,
        publisher: 1,
        ISBN: '1234567890',
        description: 'A new book'
      };
      const res = mockResponse();

      await createBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO books'),
        [
          'New Book',
          'cover.jpg',
          1,
          'Fantasy',
          2023,
          1,
          '1234567890',
          'A new book'
        ]
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book created', bookId: 1 });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.body = { name: 'New Book', author: 1 };
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await createBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating book' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('deleteBooks', () => {
    it('should delete a book when found', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      await deleteBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith('DELETE FROM books WHERE id = ?', ['1']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted' });
    });

    it('should return 404 when book not found', async () => {
      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '999';
      const res = mockResponse();

      await deleteBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await deleteBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting book' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateBooks', () => {
    it('should update a book when found', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '1';
      req.body = {
        name: 'Updated Book',
        book_cover: 'updated.jpg',
        author: 1,
        genre: 'Fantasy',
        publishing_year: 2023,
        publisher: 1,
        ISBN: '1234567890',
        description: 'An updated book'
      };
      const res = mockResponse();

      await updateBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE books SET'),
        [
          'Updated Book',
          'updated.jpg',
          1,
          'Fantasy',
          2023,
          1,
          '1234567890',
          'An updated book',
          '1'
        ]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book updated' });
    });

    it('should return 404 when book not found', async () => {
      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '999';
      req.body = { name: 'Updated Book' };
      const res = mockResponse();

      await updateBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      req.body = { name: 'Updated Book' };
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await updateBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating book' });

      consoleErrorSpy.mockRestore();
    });
  });
});
