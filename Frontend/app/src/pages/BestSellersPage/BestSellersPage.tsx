import { useState, useEffect } from 'react';
import type { Book } from '../../types';
import styles from './BestSellersPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

const bestSellerTitles = [
    "Cien años de soledad", "Don Quijote de la Mancha", "Orgullo y prejuicio",
    "1984", "Matar a un ruiseñor", "El gran Gatsby", "Los juegos del hambre",
    "El código Da Vinci", "Crimen y castigo", "La Odisea"
];

const BestSellersPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const bookPromises = bestSellerTitles.map(async (title) => {
                    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=1`);
                    const data = await response.json();
                    return data.docs[0];
                });

                const fetchedBooks = await Promise.all(bookPromises);
                setBooks(fetchedBooks.filter(book => book));
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
            {isLoading ? (
                <Loader />
            ) : (
                <div className={styles.booksGrid}>
                    {books.map((book) => (
                        <BookCard key={book.key} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSellersPage;