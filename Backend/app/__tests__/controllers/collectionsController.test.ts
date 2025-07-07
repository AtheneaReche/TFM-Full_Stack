import { Response } from 'express';
import db from '../../../database/db';
import { getCollections } from '../../controllers/collectionsController';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { AuthRequest } from '../../middlewares/authMiddleware';

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

describe('Collections Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCollections', () => {
    it('should return all collections for a user', async () => {
      const mockCollections = [
        { id: 1, user: 1, name: 'Favourites' },
        { id: 2, user: 1, name: 'To Read' }
      ];
      mockedDb.execute.mockResolvedValue([mockCollections] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getCollections(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        'SELECT * FROM books_collections WHERE user = ?',
        [1]
      );
      expect(res.json).toHaveBeenCalledWith(mockCollections);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getCollections(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching collections' });

      consoleErrorSpy.mockRestore();
    });
  });
});