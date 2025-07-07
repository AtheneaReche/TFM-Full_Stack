import { Request, Response } from 'express';
import db from '../../../database/db';
import { getPublishers } from '../../controllers/publishersController';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';


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

describe('Publishers Controller', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPublishers', () => {
    it('should return all publishers', async () => {
      const mockPublishers = [
        { id: 1, name: 'Penguin Random House', country: 'USA' },
        { id: 2, name: 'HarperCollins', country: 'USA' }
      ];
      mockedDb.execute.mockResolvedValue([mockPublishers] as any);

      const req = mockRequest();
      const res = mockResponse();

      await getPublishers(req, res);

      expect(mockedDb.execute).toHaveBeenCalledWith('SELECT * FROM publishers');
      expect(res.json).toHaveBeenCalledWith(mockPublishers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Database error';
      mockedDb.execute.mockRejectedValue(new Error(errorMessage));

      const req = mockRequest();
      const res = mockResponse();

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      await getPublishers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching publishers' });

      consoleErrorSpy.mockRestore();
    });
  });
});