import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';
import type { Book, ReadingBook } from '../../types';
import BookList from '../../components/BookList/BookList';
import Loader from '../../components/Loader/Loader';
import { Tabs, Tab } from 'react-bootstrap';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
    const [readBooks, setReadBooks] = useState<Book[]>([]);
    const [readingBooks, setReadingBooks] = useState<Book[]>([]);
    const [wantToReadBooks, setWantToReadBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchAllBookLists = async () => {
            const favoriteKeys = JSON.parse(localStorage.getItem('favorites') || '[]');
            const userBookLists = JSON.parse(localStorage.getItem('userBookLists') || '{}');

            const readKeys: string[] = userBookLists.read || [];
            const wantToReadKeys: string[] = userBookLists.wantToRead || [];
            const readingList: ReadingBook[] = userBookLists.reading || [];
            const readingKeys = readingList.map(item => item.key);
            
            const allKeys = [...new Set([
                ...favoriteKeys, 
                ...readKeys, 
                ...readingKeys, 
                ...wantToReadKeys
            ])];

            if (allKeys.length === 0) {
                setIsLoading(false);
                return;
            }

            try {
                const bookPromises = allKeys.map(key =>
                  fetch(`http://localhost:3000/books/${key}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Error al obtener el libro con id: ${key}`);
                        }
                        return res.json();
                  })
                );
                const responses = await Promise.all(bookPromises);

                const allBooks:Book[] = responses.map(bookData => {
                    return {
                        key: bookData.id.toString(),
                        title: bookData.name,
                        author_name: [bookData.author],
                        cover_i:  bookData.book_cover,
                        first_publish_year: bookData.publishing_year
                    };
                });

                const bookMap = new Map(allBooks.map(book => [book.key, book]));

                setFavoriteBooks(favoriteKeys.map((key: string) => bookMap.get(key)).filter(Boolean) as Book[]);
                setReadBooks((userBookLists.read || []).map((key: string) => bookMap.get(key)).filter(Boolean) as Book[]);
                setReadingBooks((userBookLists.reading || []).map((key: string) => bookMap.get(key)).filter(Boolean) as Book[]);
                setWantToReadBooks((userBookLists.wantToRead || []).map((key: string) => bookMap.get(key)).filter(Boolean) as Book[]);
            } catch (error) {
                console.error("Error fetching book lists:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllBookLists();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={`title c_Yellow ${styles.welcomeTitle}`}>Mi Biblioteca</h1>

            {isLoading ? <Loader /> : (
                <Tabs defaultActiveKey="favorites" id="dashboard-tabs" className={`mb-3 ${styles.tabs}`}>
                    <Tab eventKey="favorites" title="Favoritos">
                        <BookList 
                            books={favoriteBooks} 
                            cardType="grid" 
                            emptyMessage="No hay libros en favoritos." 
                            className={styles.booksGrid}
                        />
                    </Tab>
                    <Tab eventKey="read" title="Leídos">
                        <BookList 
                            books={readBooks} 
                            cardType="grid" 
                            emptyMessage="No hay libros leídos." 
                            className={styles.booksGrid}
                        />
                    </Tab>
                    <Tab eventKey="reading" title="Leyendo">
                        <BookList 
                            books={readingBooks} 
                            cardType="grid" 
                            emptyMessage="No hay libros en lectura." 
                            className={styles.booksGrid}
                        />
                    </Tab>
                    <Tab eventKey="wantToRead" title="Quiero Leer">
                        <BookList 
                            books={wantToReadBooks} 
                            cardType="grid" 
                            emptyMessage="No hay libros en la lista de deseos." 
                            className={styles.booksGrid}
                        />
                    </Tab>
                </Tabs>
            )}

            <button onClick={handleLogout} className={`general_button ${styles.logoutButton}`}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default DashboardPage;
