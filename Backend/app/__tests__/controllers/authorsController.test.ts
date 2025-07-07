import { Request, Response } from 'express';
import db from '../../../database/db';
import {
  getAuthors,
  getAuthorsById,
  createAuthors,
  deleteAuthors,
  updateAuthors
} from '../../controllers/authorsController';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

jest.mock('../../../database/db');

const mockRequest = () => {
  const req: Partial<Request> = {};
  req.body = {};
  req.params = {};
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis() as any;
  res.json = jest.fn().mockReturnThis() as any;
  return res as Response;
};


const mockedDb = db as jest.Mocked<typeof db>;

describe('Authors Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAuthors', () => {
    it('should return all authors', async () => {
      const mockAuthors = [
        { id: 1, name: 'J.K. Rowling' },
        { id: 2, name: 'George R.R. Martin' }
      ];
      mockedDb.execute.mockResolvedValue([mockAuthors] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getAuthors(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith('SELECT * FROM authors');
      expect(res.json).toHaveBeenCalledWith(mockAuthors);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching authors' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getAuthorsById', () => {
    it('should return an author when found', async () => {
      const mockAuthor = { id: 1, name: 'J.K. Rowling' };
      mockedDb.execute.mockResolvedValue([[mockAuthor]] as any);

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      await getAuthorsById(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith('SELECT * FROM authors WHERE id = ?', ['1']);
      expect(res.json).toHaveBeenCalledWith(mockAuthor);
    });

    it('should return 404 when author not found', async () => {
      mockedDb.execute.mockResolvedValue([[]] as any);

      const req = mockRequest();
      req.params.id = '999';
      const res = mockResponse();

      await getAuthorsById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      await getAuthorsById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching author' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('createAuthors', () => {
    it('should create a new author', async () => {
      const mockResult = { insertId: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.body = {
        name: 'New Author',
        authorPicture: 'picture.jpg',
        biography: 'Bio',
        birthdate: '1990-01-01',
        deceaseDate: null
      };
      const res = mockResponse();

      await createAuthors(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO authors'),
        [
          'New Author',
          'picture.jpg',
          'Bio',
          '1990-01-01',
          null
        ]
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author created', authorId: 1 });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.body = { name: 'New Author' };
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await createAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating author' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('deleteAuthors', () => {
    it('should delete an author when found', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      await deleteAuthors(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith('DELETE FROM authors WHERE id = ?', ['1']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author deleted' });
    });

    it('should return 404 when author not found', async () => {
      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '999';
      const res = mockResponse();

      await deleteAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await deleteAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting author' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateAuthors', () => {
    it('should update an author when found', async () => {
      const mockResult = { affectedRows: 1 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '1';
      req.body = {
        name: 'Updated Author',
        authorPicture: 'updated.jpg',
        biography: 'Updated Bio',
        birthdate: '1990-01-01',
        deceaseDate: null
      };
      const res = mockResponse();

      await updateAuthors(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE authors SET'),
        [
          'Updated Author',
          'updated.jpg',
          'Updated Bio',
          '1990-01-01',
          null,
          '1'
        ]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author updated' });
    });

    it('should return 404 when author not found', async () => {

      const mockResult = { affectedRows: 0 };
      mockedDb.execute.mockResolvedValue([mockResult] as any);

      const req = mockRequest();
      req.params.id = '999';
      req.body = { name: 'Updated Author' };
      const res = mockResponse();

      await updateAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Author not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      req.params.id = '1';
      req.body = { name: 'Updated Author' };
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await updateAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating author' });

      consoleErrorSpy.mockRestore();
    });
  });
});
