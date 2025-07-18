import { Response } from 'express';
import db from '../../../database/db';
import {
  startReading,
  updateProgress,
  getUserBooks
} from '../../controllers/readingController';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';


jest.mock('../../../database/db');


const mockRequest = () => {
  const req: Partial<AuthRequest> = {};
  req.body = {};
  req.params = {};
  req.user = { id: 1, role: 'user' }; 
  return req as AuthRequest;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnThis() as any;
  res.json = jest.fn().mockReturnThis() as any;
  return res as Response;
};


const mockedDb = db as jest.Mocked<typeof db>;

describe('Reading Controller', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('startReading', () => {
    it('should start reading a book', async () => {
      const req = mockRequest();
      req.body = { bookId: 1 };
      const res = mockResponse();
      mockedDb.execute.mockResolvedValue([{ affectedRows: 1 }] as any);

      await startReading(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO `users-books`'),
        [req.user.id, req.body.bookId]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Started reading' });
    });

    it('should handle errors', async () => {
      const req = mockRequest();
      req.body = { bookId: 1 };
      const res = mockResponse();
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await startReading(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error starting book' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateProgress', () => {
    it('should update reading progress', async () => {
      const req = mockRequest();
      req.body = { bookId: 1, progress: 50, status: 'reading' };
      const res = mockResponse();
      mockedDb.execute.mockResolvedValue([{ affectedRows: 1 }] as any);

      await updateProgress(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO `users-books`'),
        [req.user.id, req.body.bookId, req.body.status, req.body.progress]
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Progress updated' });
    });

    it('should handle errors', async () => {
      const req = mockRequest();
      req.body = { bookId: 1, progress: 50, status: 'reading' };
      const res = mockResponse();
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await updateProgress(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating progress' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('getUserBooks', () => {
    it('should return all user books with reading status', async () => {
      const mockUserBooks = [
        { id: 1, name: 'Book 1', reading_progress: 25, reading_status: 'reading' },
        { id: 2, name: 'Book 2', reading_progress: 100, reading_status: 'completed' }
      ];
      mockedDb.execute.mockResolvedValue([mockUserBooks] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getUserBooks(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'),
        [req.user.id]
      );
      expect(res.json).toHaveBeenCalledWith(mockUserBooks);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getUserBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching reading list' });

      consoleErrorSpy.mockRestore();
    });
  });
});