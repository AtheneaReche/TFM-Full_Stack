import request from 'supertest';
import app from '../../../app/app';
import db from '../../../database/db';
import {
  describe,
  it,
  expect,
  jest,
  afterEach,
} from '@jest/globals';


jest.mock('../../../database/db');


const mockedDb = db as jest.Mocked<typeof db>;

describe('Authors API', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /authors', () => {
    it('should return a 200 status and a list of authors', async () => {
      const mockAuthors = [
        { id: 1, name: 'J.K. Rowling' },
        { id: 2, name: 'George R.R. Martin' },
      ];

      mockedDb.execute.mockResolvedValue([mockAuthors] as any);

      const response = await request(app).get('/authors');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAuthors);
      expect(mockedDb.execute).toHaveBeenCalledWith('SELECT * FROM authors');
    });

    it('should return a 500 status on a database error', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockedDb.execute.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/authors');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error fetching authors' });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('GET /authors/:id', () => {
    it('should return a 200 status and a single author if found', async () => {
      const mockAuthor = { id: 1, name: 'J.K. Rowling' };
      mockedDb.execute.mockResolvedValue([[mockAuthor]] as any);

      const response = await request(app).get('/authors/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockAuthor);
      expect(mockedDb.execute).toHaveBeenCalledWith(
        'SELECT * FROM authors WHERE id = ?',
        ['1']
      );
    });

    it('should return a 404 status if the author is not found', async () => {
      mockedDb.execute.mockResolvedValue([[]] as any);

      const response = await request(app).get('/authors/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Author not found' });
    });
  });
});