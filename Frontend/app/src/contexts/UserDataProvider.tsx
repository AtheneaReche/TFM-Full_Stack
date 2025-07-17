import {useState, useEffect, useCallback, type ReactNode} from 'react';
import toast from 'react-hot-toast';
import type {DbBook, UserBook, Collection} from '../types';
import {UserDataContext, type UserDataContextType} from './UserDataContext';

const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  }
  return response.json();
};

const apiService = {
  getAuthHeaders: (): Record<string, string> => {
    const token = localStorage.getItem('token');
    if (!token) return {'Content-Type': 'application/json'};
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },
  getUserFavorites: (): Promise<DbBook[]> => fetch('/api/favorites', {headers: apiService.getAuthHeaders()}).then(handleApiResponse),
  getUserBooks: (): Promise<UserBook[]> => fetch('/api/reading', {headers: apiService.getAuthHeaders()}).then(handleApiResponse),
  getUserCollections: (): Promise<Collection[]> => fetch('/api/collections', {headers: apiService.getAuthHeaders()}).then(handleApiResponse),

  startReadingBook: (bookId: number): Promise<Response> => fetch('/api/reading/start', {
    method: 'POST',
    headers: apiService.getAuthHeaders(),
    body: JSON.stringify({bookId})
  }),
  updateBookProgress: (bookId: number, progress: number, status: string): Promise<Response> => fetch('/api/reading/update', {
    method: 'PUT',
    headers: apiService.getAuthHeaders(),
    body: JSON.stringify({bookId, progress, status})
  }),
  rateBook: (bookId: number, rating: number): Promise<Response> => fetch('/api/reading/rate', {
    method: 'PUT',
    headers: apiService.getAuthHeaders(),
    body: JSON.stringify({bookId, rating})
  }),
  addBookToCollection: (collectionId: number, bookId: number): Promise<Response> => fetch('/api/collections/add-book', {
    method: 'POST',
    headers: apiService.getAuthHeaders(),
    body: JSON.stringify({collectionId, bookId})
  }),
  removeBookFromCollection: (collectionId: number, bookId: number): Promise<Response> => fetch('/api/collections/remove-book', {
    method: 'POST',
    headers: apiService.getAuthHeaders(),
    body: JSON.stringify({collectionId, bookId})
  }),
};

export const UserDataProvider = ({children}: { children: ReactNode }) => {
  const [favoriteBooks, setFavoriteBooks] = useState<DbBook[]>([]);
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [favoritesCollectionId, setFavoritesCollectionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoggedIn = !!localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const [favs, uBooks, collections] = await Promise.all([
        apiService.getUserFavorites(),
        apiService.getUserBooks(),
        apiService.getUserCollections(),
      ]);
      setFavoriteBooks(favs);
      setUserBooks(uBooks);
      const favCollection = collections.find((c: Collection) => c.name === 'Favourites');
      if (favCollection) {
        setFavoritesCollectionId(favCollection.id);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Could not load your library data.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleFavorite = async (book: DbBook): Promise<void> => {
    if (!favoritesCollectionId) return;
    const isCurrentlyFavorite = favoriteBooks.some(fav => fav.id === book.id);
    const optimisticFavorites = isCurrentlyFavorite
      ? favoriteBooks.filter(fav => fav.id !== book.id)
      : [...favoriteBooks, book];
    setFavoriteBooks(optimisticFavorites);
    try {
      if (isCurrentlyFavorite) {
        await apiService.removeBookFromCollection(favoritesCollectionId, book.id);
      } else {
        await apiService.addBookToCollection(favoritesCollectionId, book.id);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      setFavoriteBooks(favoriteBooks);
    }
  };

  const updateBookStatus = async (bookId: number, status: string, progress: number = 0): Promise<void> => {
    const optimisticBooks = userBooks.map(b =>
      b.id === bookId ? {...b, reading_status: status, reading_progress: progress} : b
    );
    setUserBooks(optimisticBooks);
    try {
      await apiService.updateBookProgress(bookId, progress, status);
    } catch (error) {
      console.error("Failed to update book status:", error);
      setUserBooks(userBooks);
    }
  };

  const updateBookRating = async (bookId: number, rating: number): Promise<void> => {
    const optimisticBooks = userBooks.map(b =>
      b.id === bookId ? { ...b, rating } : b
    );
    setUserBooks(optimisticBooks);

    try {
      await apiService.rateBook(bookId, rating);
      toast.success(`Rated with ${rating} stars!`);
      await fetchData();
    } catch (error) {
      console.error("Failed to update rating:", error);
      setUserBooks(userBooks);
      toast.error("Could not save rating.");
    }
  };


  const value: UserDataContextType = {
    favoriteBooks,
    userBooks,
    favoritesCollectionId,
    isLoading,
    toggleFavorite,
    updateBookStatus,
    updateBookRating
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};