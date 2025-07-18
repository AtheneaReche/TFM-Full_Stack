import { http, HttpResponse } from 'msw';
import type { DbBook, UserBook } from '../types';

const mockFavoriteBooks: DbBook[] = [
  { id: 1, name: 'Favorite Book 1', author: 'Author A', book_cover: '', genre: 'Fantasy', publishing_year: 2020, publisher: 'Pub A', ISBN: '1', description: 'desc' },
];

const mockUserBooks: UserBook[] = [
  { id: 2, name: 'Reading Book 1', author: 'Author B', book_cover: '', genre: 'SCFI', publishing_year: 2021, publisher: 'Pub B', ISBN: '2', description: 'desc', reading_status: 'reading', reading_progress: 50, rating: null },
  { id: 3, name: 'Finished Book 1', author: 'Author C', book_cover: '', genre: 'Fantasy', publishing_year: 2022, publisher: 'Pub C', ISBN: '3', description: 'desc', reading_status: 'finished', reading_progress: 100, rating: 5 },
];

export const handlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json(mockFavoriteBooks);
  }),
  http.get('/api/reading', () => {
    return HttpResponse.json(mockUserBooks);
  }),
  http.get('/api/collections', () => {
    return HttpResponse.json([{ id: 1, name: 'Favourites' }]);
  }),
];
