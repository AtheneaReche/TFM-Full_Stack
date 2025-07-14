import { useState, useEffect } from 'react';
import type { Book } from '../../types';
import styles from './BooksSearchPage.module.css';
import BookList from '../../components/BookList/BookList';

const BooksSearchPage = () => {
    const [titleQuery, setTitleQuery] = useState('');
    const [authorQuery, setAuthorQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [suggestion, setSuggestion] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const response = await fetch(`https://openlibrary.org/search.json?q=the+lord+of+the+rings&limit=1`);
                const data = await response.json();
                setSuggestion(data.docs[0]);
            } catch (error) {
                console.error("Failed to fetch suggestion", error);
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

        let url = "https://openlibrary.org/search.json?";
        if (titleQuery) url += `title=${encodeURIComponent(titleQuery)}`;
        if (authorQuery) url += `${titleQuery ? '&' : ''}author=${encodeURIComponent(authorQuery)}`;

        try {
            const response = await fetch(`${url}&limit=20`);
            const data = await response.json();
            setSearchResults(data.docs);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setIsLoading(false);
        }
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
            {!hasSearched && suggestion ? (
                <BookList 
                    books={[suggestion]} 
                    isLoading={isLoading}
                    title="Nuestra sugerencia"
                    titleClassName="c_Orange"
                />
            ) : (
                <BookList 
                    books={searchResults} 
                    isLoading={isLoading}
                    emptyMessage="No se encontraron libros para tu búsqueda."
                />
            )}
        </div>
    );
};

export default BooksSearchPage;
