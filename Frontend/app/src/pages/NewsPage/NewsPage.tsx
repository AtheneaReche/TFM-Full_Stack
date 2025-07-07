import { useState, useEffect } from 'react';
import type { Book, SubjectApiWork } from '../../types';
import styles from './NewsPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

const genres = [
    "fiction", "non-fiction", "fantasy", "science-fiction", "mystery", 
    "romance", "horror", "biography", "history", "poetry", "adventure", 
    "children", "young-adult", "crime", "thriller", "classics", "humor"
];

const NewsPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRandomBooks = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const randomGenre = genres[Math.floor(Math.random() * genres.length)];
                const response = await fetch(`https://openlibrary.org/subjects/${randomGenre}.json?limit=10`);

                if (!response.ok) {
                    throw new Error('No se pudieron cargar las novedades.');
                }

                const data = await response.json();

                if (data.works && data.works.length > 0) {
                    const formattedBooks: Book[] = data.works.map((work: SubjectApiWork) => ({
                        key: work.key,
                        title: work.title,
                        author_name: work.authors?.map(a => a.name),
                        cover_i: work.cover_id,
                    }));
                    setBooks(formattedBooks);
                }
            } catch (err) {
                setError("Ocurrió un problema al obtener los libros. Intenta de nuevo más tarde.");
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