import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Book, BookStatus, ReadingBook } from '../../types';
import styles from './BookCard.module.css';
import noCoverImage from '../../assets/images/no-cover.png';
import toast from 'react-hot-toast';
import StarRating from '../StarRating/StarRating';
import UpdateProgressModal from '../UpdateProgressModal/UpdateProgressModal';
import { Dropdown, ProgressBar } from 'react-bootstrap';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [status, setStatus] = useState<BookStatus | null>(null);
    const [progress, setProgress] = useState(0);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn || !book.key) return;

        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(book.key));

        const userBookLists = JSON.parse(localStorage.getItem('userBookLists') || '{}');
        
        const readingList: ReadingBook[] = userBookLists.reading || [];
        const readList: string[] = userBookLists.read || [];
        const wantToReadList: string[] = userBookLists.wantToRead || [];

        const readingBook = readingList.find(item => item.key === book.key);

        if (readingBook) {
            setStatus('reading');
            setProgress(readingBook.progress);
        } else if (readList.includes(book.key)) {
            setStatus('read');
        } else if (wantToReadList.includes(book.key)) {
            setStatus('wantToRead');
        } else {
            setStatus(null);
        }
    }, [book.key, isLoggedIn]);

    // HANDLERS 
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!localStorage.getItem('token')) {
            toast.error('Debes iniciar sesión para añadir favoritos.');
            navigate('/login');
            return;
        }

        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const bookIndex = favorites.indexOf(book.key);

        if (bookIndex > -1) {
            favorites.splice(bookIndex, 1);
            setIsFavorite(false);
        } else {
            favorites.push(book.key);
            setIsFavorite(true);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const handleStatusChange = (newStatus: BookStatus | 'remove') => {
        if (!isLoggedIn) return;
    
        const bookLists = JSON.parse(localStorage.getItem('userBookLists') || '{}');
        const lists = {
            wantToRead: (bookLists.wantToRead || []).filter((k: string) => k !== book.key),
            reading: (bookLists.reading || []).filter((item: ReadingBook) => item.key !== book.key),
            read: (bookLists.read || []).filter((k: string) => k !== book.key),
        };
    
        let toastMessage = 'Estado del libro actualizado.';
    
        if (newStatus === 'wantToRead' || newStatus === 'read') {
            lists[newStatus].push(book.key);
            setStatus(newStatus);
            setProgress(0);
        } else if (newStatus === 'reading') {
            lists.reading.push({ key: book.key, progress: 0 });
            setStatus('reading');
            setProgress(0);
        } else { // 'remove'
            setStatus(null);
            setProgress(0);
            toastMessage = 'Libro eliminado de tus listas.';
        }
        
        localStorage.setItem('userBookLists', JSON.stringify({ ...bookLists, ...lists }));
        toast.success(toastMessage);
    };
    const handleProgressSave = (newProgress: number) => {
        setProgress(newProgress);
        
        const userBookLists = JSON.parse(localStorage.getItem('userBookLists') || '{}');
        const readingList: ReadingBook[] = userBookLists.reading || [];
        const bookIndex = readingList.findIndex((item: ReadingBook) => item.key === book.key);
    
        if (newProgress === 100) {
            if (bookIndex > -1) readingList.splice(bookIndex, 1);
            
            const readList: string[] = userBookLists.read || [];
            if (!readList.includes(book.key)) readList.push(book.key);
            
            userBookLists.read = readList;
            toast.success(`¡Felicidades! Has terminado "${book.title}".`);
            setStatus('read');
        } else {
            if (bookIndex > -1) {
                readingList[bookIndex].progress = newProgress;
            }
        }
        
        userBookLists.reading = readingList;
        localStorage.setItem('userBookLists', JSON.stringify(userBookLists));
    };

    const coverUrl = book.cover_i ? book.cover_i : noCoverImage;
    const urlParams = new URLSearchParams({
        title: book.title,
        author: book.author_name?.join(', ') || 'Desconocido',
        coverUrl: coverUrl,
    }).toString();
    const bookDetailUrl = book.key ? `/book/${book.key.replace("/works/", "")}?${urlParams}` : '#';
    return (
        <>
            <div className={styles.card}>
                <Link to={bookDetailUrl}><img src={coverUrl} alt={`Portada de ${book.title}`} /></Link>
                <div className={styles.cardInfo}>
                    <div className={styles.titleContainer}>
                        <h3 title={book.title}>{book.title}</h3>
                        <button onClick={handleFavoriteClick} className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}>{isFavorite ? '❤️' : '♡'}</button>
                    </div>
                    <p className={styles.author} title={book.author_name?.join(', ')}>{book.author_name?.join(', ')}</p>
                    
                    {/* --- JSX CORREGIDO Y ESTRUCTURADO --- */}
                    <div className={styles.actionsContainer}>
                        {isLoggedIn && status === 'reading' && (
                            <div className={styles.progressContainer} onClick={(e) => { e.preventDefault(); setShowProgressModal(true); }}>
                                <ProgressBar now={progress} label={`${progress}%`} className={styles.progressBar} />
                            </div>
                        )}

                        {isLoggedIn && book.key && <StarRating bookKey={book.key} />}

                        {isLoggedIn && (
                            <div onClick={(e) => e.preventDefault()}> 
                                <Dropdown onSelect={(key) => { if (key) handleStatusChange(key as BookStatus | 'remove')}}>
                                    <Dropdown.Toggle id="dropdown-status" className={styles.dropdownToggle}>
                                        {status ? 'Cambiar estado' : 'Añadir a...'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="wantToRead">Quiero Leer</Dropdown.Item>
                                        <Dropdown.Item eventKey="reading">Leyendo</Dropdown.Item>
                                        <Dropdown.Item eventKey="read">Leído</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="remove">Quitar de las listas</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <UpdateProgressModal show={showProgressModal} onHide={() => setShowProgressModal(false)} currentProgress={progress} onSave={handleProgressSave} />
        </>
    );
};

export default BookCard;