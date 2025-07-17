import { createContext } from 'react';
import type { DbBook, UserBook } from '../types';

export interface UserDataContextType {
    favoriteBooks: DbBook[];
    userBooks: UserBook[];
    favoritesCollectionId: number | null;
    isLoading: boolean;
    toggleFavorite: (book: DbBook) => Promise<void>;
    updateBookStatus: (bookId: number, status: string, progress?: number) => Promise<void>;
    updateBookRating: (bookId: number, rating: number) => Promise<void>;
}

export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);