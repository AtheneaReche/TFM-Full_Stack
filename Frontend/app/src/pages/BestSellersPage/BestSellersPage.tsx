import {useState, useEffect} from 'react';
import type {DbBook} from '../../types';
import styles from './BestSellersPage.module.css';
import BookList from '../../components/BookList/BookList';

const BestSellersPage = () => {
  const [books, setBooks] = useState<DbBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllBooks = async () => {
      setIsLoading(true);

      try {
        const bookIds = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58];
        const bookPromises = bookIds.map(id =>
          fetch(`/api/books/${id}`)
            .then(res => res.ok ? res.json() : null)
        );

        const booksData = await Promise.all(bookPromises);
        const validBooks = booksData.filter((book): book is DbBook => book !== null);
        setBooks(validBooks);

      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div>
      <h1 className={`${styles.title} c_Brown`}>Best Sellers</h1>
      <BookList
        books={books}
        isLoading={isLoading}
        cardType="grid"
        emptyMessage="No se encontraron libros best sellers."
      />
    </div>
  );
};

export default BestSellersPage;