import { useState, useEffect } from 'react';
import type { Book, DbBook } from '../../types';
import styles from './BestSellersPage.module.css';
import BookList from '../../components/BookList/BookList';

const BestSellersPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/bestsellers`);
                if (!response.ok) throw new Error('No se pudieron obtener los best sellers.');
            
                const booksData: DbBook[] = await response.json();

                const formattedBooks: Book[] = booksData.map(bookData => ({
                    key: bookData.id.toString(),
                    title: bookData.name,
                    author_name: [bookData.author],
                    cover_i:  bookData.book_cover,
                    first_publish_year: bookData.publishing_year
                }));
                setBooks(formattedBooks);
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
