import React from 'react';
import type { BookListProps } from '../../types';
import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.css';
import Loader from '../Loader/Loader';


const BookList: React.FC<BookListProps> = (
  {
    books,
    isLoading = false,
    emptyMessage = "No books found.",
    title,
    titleClassName,
    cardType = 'grid',
    className,
  }) => {
  if (isLoading) {
    return <Loader/>;
  }

  const layoutClass = cardType === 'grid' ? styles.gridLayout : styles.searchLayout;

  return (
    <div className={`${styles.bookListContainer} ${className || ''}`}>
      {title && (
        <h2 className={`${styles.title} ${titleClassName || ''}`}>{title}</h2>
      )}

      {books.length > 0 ? (
        <div className={`${styles.bookList} ${layoutClass}`}>
          {books.map((book) => (
            <BookCard key={book.id} book={book}/>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>{emptyMessage}</p>
      )}
    </div>
  );
};

export default BookList;