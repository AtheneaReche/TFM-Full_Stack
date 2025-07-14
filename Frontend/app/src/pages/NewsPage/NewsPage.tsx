import { useState, useEffect } from 'react';
import type { Book, DbBook } from '../../types';
import styles from './NewsPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

const NewsPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRandomBooks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/books/latest?limit=10`);
                if (!response.ok) throw new Error('No se pudieron cargar las novedades.');
    
                const booksData: DbBook[] = await response.json();

                const formattedBooks: Book[] = booksData.map(bookData => ({
                    key: bookData.id.toString(),
                    title: bookData.name,
                    author_name: [bookData.author],
                    cover_i:  bookData.book_cover,
                    first_publish_year: bookData.publishing_year
                }));
                setBooks(formattedBooks);
    
            } catch (err) {
                setError("Ocurrió un problema al obtener los libros.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRandomBooks();
    }, []); //Empty array ensures that this runs only once.

    const renderContent = () => {
        if (isLoading) return <Loader />;
        if (error) return <p style={{ textAlign: 'center' }}>{error}</p>;
        return (
            <div className={styles.booksGrid}>
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
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