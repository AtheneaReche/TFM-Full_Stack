export type BookStatus = 'wantToRead' | 'reading' | 'read';

export interface NavLinkInfo {
    text: string;
    to: string; 
    icon?: string;
    subLinks?: SubLinkInfo[];
  }

  export interface SubLinkInfo {
    text: string;
    to: string;
  }

  export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: string;
    first_publish_year?: number;
  }

  export interface BookListProps {
    books: DbBook[];
    isLoading?: boolean;
    emptyMessage?: string;
    title?: string;
    titleClassName?: string;
    cardType?: 'search' | 'grid';
    className?: string;
  }

  export interface ReadingBook {
    key: string;
    progress: number;
  }

  export interface DbBook {
    id: number;
    name: string;
    book_cover: string | null;
    author: string;
    genre: string;
    publishing_year: number;
    publisher: string;
    ISBN: string;
    description: string;
  }

  export interface ReadingListItem {
    id: number;
    name: string;
    reading_progress: number;
    reading_status: string;
  }

  export interface Collection {
    id: number;
    name: string;
    user: number;
  }

export interface UserBook extends DbBook {
  reading_progress: number;
  reading_status: string;
  rating: number | null;
}

  export interface SubjectApiAuthor {
    key: string;
    name: string;
  }

  export interface SubjectApiWork {
    key: string;
    title: string;
    cover_id: number;
    authors: SubjectApiAuthor[];
  }

  export interface SubjectApiResponse {
    works: SubjectApiWork[];
  }

  export interface AuthorDetails {
    name: string;
    birth_date?: string;
    death_date?: string;
    bio?: string | { value: string };
  }