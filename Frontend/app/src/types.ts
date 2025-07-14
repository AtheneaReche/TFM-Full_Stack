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

  export type BookStatus = 'wantToRead' | 'reading' | 'read';

  export interface ReadingBook {
    key: string;
    progress: number;
  }

  export interface DbBook {
    id: number;
    name: string;
    author: string;
    book_cover: string;
    publishing_year: number;
    description: string;
    publisher: string;
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