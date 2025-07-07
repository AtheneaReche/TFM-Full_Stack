import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRole, AuthRequest } from '../../middlewares/authMiddleware';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';


jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    
    jest.clearAllMocks();

    
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any
    };
    nextFunction = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should call next() when token is valid', () => {
      const user = { id: 1, username: 'testuser', role: 'user' };
      mockRequest.headers = {
        'authorization': 'Bearer valid-token'
      };

      (jwt.verify as jest.Mock).mockReturnValue(user);

      process.env.JWT_SECRET = 'test-secret';

      authenticateToken(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
      expect(mockRequest.user).toEqual(user);
      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return 401 when no token is provided', () => {
      mockRequest.headers = {};

      authenticateToken(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Access denied. No token provided.' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 403 when token is invalid', () => {
      mockRequest.headers = {
        'authorization': 'Bearer invalid-token'
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticateToken(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });

  describe('authorizeRole', () => {
    it('should call next() when user has the required role', () => {
      mockRequest.user = { role: 'admin' };
      const middleware = authorizeRole('admin');

      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return 403 when user does not have the required role', () => {
      mockRequest.user = { role: 'user' };
      const middleware = authorizeRole('admin');

      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Insufficient permissions' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 403 when user object is not present', () => {
      mockRequest.user = undefined;
      const middleware = authorizeRole('admin');

      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Insufficient permissions' });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
});
