import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Book, BookStatus } from '../../types';
import styles from './BookCard.module.css';
import noCoverImage from '../../assets/images/no-cover.png';
import toast from 'react-hot-toast';
import { Dropdown } from 'react-bootstrap';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (book.key && favorites.includes(book.key)) {
            setIsFavorite(true);
        }
    }, [book.key]);

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
    const handleStatusChange = (status: BookStatus) => {
        if (!isLoggedIn) return;

        const bookLists = JSON.parse(localStorage.getItem('userBookLists') || '{}');
        const lists = {
            wantToRead: bookLists.wantToRead || [],
            reading: bookLists.reading || [],
            read: bookLists.read || [],
        };

        Object.keys(lists).forEach(key => {
            const listKey = key as keyof typeof lists;
            const index = lists[listKey].indexOf(book.key);
            if (index > -1) lists[listKey].splice(index, 1);
        });

        lists[status].push(book.key);
        
        localStorage.setItem('userBookLists', JSON.stringify({ ...bookLists, ...lists }));
        toast.success(`Libro movido a "${status}"`);
    };

    const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : noCoverImage;
    const urlParams = new URLSearchParams({
        title: book.title,
        author: book.author_name?.join(', ') || 'Desconocido',
        coverUrl: coverUrl,
    }).toString();
    const bookDetailUrl = book.key ? `/book/${book.key.replace("/works/", "")}?${urlParams}` : '#';

    return (
        <Link to={bookDetailUrl} className={styles.card}>
            <img src={coverUrl} alt={`Portada de ${book.title}`} />
            <div className={styles.cardInfo}>
                <div className={styles.titleContainer}>
                    <h3>{book.title}</h3>
                    <button 
                        onClick={handleFavoriteClick} 
                        className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
                    >
                        {isFavorite ? '❤️' : '♡'}
                    </button>
                </div>
            
                <p className={styles.author}>{book.author_name?.join(', ')}</p>

                {isLoggedIn && (
                    <div onClick={(e) => e.preventDefault()}> 
                    <Dropdown onSelect={(eventKey) => {
                            if (eventKey){
                                handleStatusChange(eventKey as BookStatus)
                            }
                        }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.dropdownToggle}>
                            Añadir a...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="wantToRead">Quiero Leer</Dropdown.Item>
                            <Dropdown.Item eventKey="reading">Leyendo</Dropdown.Item>
                            <Dropdown.Item eventKey="read">Leído</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                )}
            </div>
        </Link>
    );
};

export default BookCard;