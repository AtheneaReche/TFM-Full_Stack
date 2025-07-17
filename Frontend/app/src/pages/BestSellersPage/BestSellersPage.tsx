import { useState, useEffect } from 'react';
import type { Book, DbBook } from '../../types';
import styles from './BestSellersPage.module.css';
import BookList from '../../components/BookList/BookList';

const BestSellersPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllBooks = async () => {
            setIsLoading(true);
            try {
                const bookIds = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58];

                const bookPromises = bookIds.map(id =>
                    fetch(`http://localhost:3000/books/${id}`)
                        .then(res => {
                            if (!res.ok) {
                                console.warn(`No se encontró el libro con id: ${id}`);
                                return null;
                            }
                            return res.json();
                        })
                );

                const booksData: (DbBook | null)[] = await Promise.all(bookPromises);

                const formattedBooks: Book[] = booksData
                    .filter((bookData): bookData is DbBook => bookData !== null)
                    .map(bookData => ({
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
