import React from 'react';
import type { Book } from '../../types';
import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.css';
import Loader from '../Loader/Loader';

interface BookListProps {
  books: Book[];
  isLoading?: boolean;
  emptyMessage?: string;
  title?: string;
  titleClassName?: string;
  cardType?: 'search' | 'grid';
  className?: string;
}

const BookList: React.FC<BookListProps> = ({
  books,
  isLoading = false,
  emptyMessage = "No se encontraron libros.",
  title,
  titleClassName,
  className,
}) => {
  if (isLoading) return <Loader />;

  return (
    <div className={`${styles.bookListContainer} ${className || ''}`}>
      {title && (
        <h2 className={`${styles.title} ${titleClassName || ''}`}>{title}</h2>
      )}

      {books.length > 0 ? (
        <div className={`${styles.bookList} ${styles.gridLayout}`}>
          {books.map(book => (
            <BookCard key={book.key} book={book} />  
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      )}
    </div>
  );
};

export default BookList;
