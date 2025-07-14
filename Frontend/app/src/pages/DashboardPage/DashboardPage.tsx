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
                    fetch(`https://openlibrary.org${key}.json`).then(res => res.json())
                );
                const results = await Promise.all(bookPromises);
                const allBooks = results.map(data => ({
                    key: data.key,
                    title: data.title,
                    cover_i: data.covers?.[0],
                }));

                setFavoriteBooks(allBooks.filter(book => favoriteKeys.includes(book.key)));
                setReadBooks(allBooks.filter(book => readKeys.includes(book.key)));
                setWantToReadBooks(allBooks.filter(book => wantToReadKeys.includes(book.key)));
                setReadingBooks(allBooks.filter(book => readingKeys.includes(book.key)));
                
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
