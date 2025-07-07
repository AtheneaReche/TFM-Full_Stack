import { Response } from 'express';
import db from '../../../database/db';
import { getFavorites } from '../../controllers/favoritesController';
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

describe('Favorites Controller', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFavorites', () => {
    it('should return all favorite books for a user', async () => {
      const mockFavorites = [
        { id: 1, title: 'Harry Potter', author: 1 },
        { id: 2, title: 'Game of Thrones', author: 2 }
      ];
      mockedDb.execute.mockResolvedValue([mockFavorites] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getFavorites(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith(
        expect.stringContaining('SELECT b.* FROM books AS b'),
        [1]
      );
      expect(res.json).toHaveBeenCalledWith(mockFavorites);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getFavorites(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching favorites' });

      consoleErrorSpy.mockRestore();
    });
  });
});