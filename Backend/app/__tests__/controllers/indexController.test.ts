import { Request, Response } from 'express';
import { index } from '../../controllers/indexController';
import { jest, describe, it, expect } from '@jest/globals';


const mockRequest = () => {
  const req: Partial<Request> = {};
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.sendStatus = jest.fn().mockReturnThis() as any;
  return res as Response;
};

describe('Index Controller', () => {
  describe('index', () => {
    it('should return 200 status code', () => {
      const req = mockRequest();
      const res = mockResponse();

      index(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});