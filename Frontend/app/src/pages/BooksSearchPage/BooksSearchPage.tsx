import { useState, useEffect } from 'react';
import type { Book, DbBook } from '../../types';
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
                const response = await fetch(`http://localhost:3000/books/random`);
                const booksData = await response.json();
    
                if (booksData && booksData.length > 0) {
                    const bookData = booksData[0];
                    const formattedSuggestion: Book = {
                        key: bookData.id.toString(),
                        title: bookData.name,
                        author_name: [bookData.author],
                        cover_i:  bookData.book_cover,
                        first_publish_year: bookData.publishing_year
                    };
                    setSuggestion(formattedSuggestion);
                }
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
    
            const response = await fetch(`http://localhost:3000/books/search?${queryParams.toString()}`);
                if (!response.ok) throw new Error('Search request failed');
            const booksData: DbBook[] = await response.json();
    
            const formattedBooks: Book[] = booksData.map((bookData: DbBook) => ({
                key: bookData.id.toString(),
                title: bookData.name,
                author_name: [bookData.author],
                cover_i:  bookData.book_cover,
                first_publish_year: bookData.publishing_year
            }));
            
            setSearchResults(formattedBooks);
    
        } catch (error) {
            console.error("Search failed:", error);
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
