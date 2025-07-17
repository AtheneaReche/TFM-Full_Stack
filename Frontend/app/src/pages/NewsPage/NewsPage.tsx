import {useState, useEffect} from 'react';
import type {DbBook} from '../../types';
import styles from './NewsPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

const NewsPage = () => {
  const [books, setBooks] = useState<DbBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/books/latest?limit=10`);
        if (!response.ok) throw new Error('No se pudieron cargar las novedades.');

        const booksData: DbBook[] = await response.json();
        setBooks(booksData);

      } catch (err) {
        setError("Ocurrió un problema al obtener los libros.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  const renderContent = () => {
    if (isLoading) return <Loader/>;
    if (error) return <p style={{textAlign: 'center'}}>{error}</p>;
    return (
      <div className={styles.booksGrid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className={`subtitle c_Brown ${styles.pageTitle}`}>Novedades</h2>
      {renderContent()}
    </div>
  );
};

export default NewsPage;