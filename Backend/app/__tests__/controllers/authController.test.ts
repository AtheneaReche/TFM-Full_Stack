import { Request, Response } from 'express';
import db from '../../../database/db';
import { login, register } from '../../controllers/authController';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../../database/db');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

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

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const mockUser = { id: 1, name: 'testuser', password: 'hashedpassword', role: 'user' };
      mockedDb.execute.mockResolvedValue([[mockUser]] as any);
      
      (bcrypt.compare as jest.Mock).mockImplementation(() => Promise.resolve(true));
      (jwt.sign as jest.Mock).mockReturnValue('mocked-token');
      
      const req = mockRequest();
      req.body = { name: 'testuser', password: 'password' };
      const res = mockResponse();
      
      process.env.JWT_SECRET = 'test-secret';
      
      await login(req, res);
      
      expect(mockedDb.execute).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE name = ?',
        ['testuser']
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, role: 'user' },
        'test-secret',
        { expiresIn: '2h' }
      );
      expect(res.json).toHaveBeenCalledWith({ token: 'mocked-token' });
    });
  });
});