import {useState, useEffect} from 'react';
import type {DbBook} from '../../types';
import styles from './BooksSearchPage.module.css';
import BookList from '../../components/BookList/BookList';
import Loader from '../../components/Loader/Loader';

const BooksSearchPage = () => {
  const [titleQuery, setTitleQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DbBook[]>([]);
  const [suggestion, setSuggestion] = useState<DbBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = await fetch(`/api/books/random`);
        if (!response.ok) throw new Error('Suggestion fetch failed');

        const bookData: DbBook = await response.json();
        setSuggestion(bookData);
      } catch (error) {
        console.error("Failed to fetch suggestion from your API", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestion();
  }, []);

  const handleSearch = async () => {
    if (!titleQuery && !authorQuery) return;
    setHasSearched(true);
    setIsLoading(true);
    setSearchResults([]);

    try {
      const queryParams = new URLSearchParams();
      if (titleQuery) queryParams.append('title', titleQuery);
      if (authorQuery) queryParams.append('author', authorQuery);

      const response = await fetch(`/api/books/search?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Search request failed');

      const booksData: DbBook[] = await response.json();
      setSearchResults(booksData);

    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (!hasSearched) {
      if (isLoading) return <Loader/>;
      if (suggestion) {
        return (
          <BookList
            books={[suggestion]}
            isLoading={isLoading}
            title="Nuestra sugerencia"
            titleClassName="c_Orange"
          />
        );
      }
      return <p className={styles.message}>No se pudo cargar una sugerencia.</p>;
    }
    return (
      <BookList
        books={searchResults}
        isLoading={isLoading}
        emptyMessage="No se encontraron libros para tu búsqueda."
      />
    );
  };

  return (
    <div>
      <section className={styles.searchSection}>
        <h1 className={`c_Brown ${styles.title}`}>Busca un libro</h1>
        <div className={styles.searchContainer}>
          <div className={styles.inputsContainer}>
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre del libro"
              value={titleQuery}
              onChange={e => setTitleQuery(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre del autor"
              value={authorQuery}
              onChange={e => setAuthorQuery(e.target.value)}
            />
          </div>
          <button className="search_button" onClick={handleSearch}>Buscar</button>
        </div>
      </section>
      {renderContent()}
    </div>
  );
};

export default BooksSearchPage;