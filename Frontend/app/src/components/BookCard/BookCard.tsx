import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Book } from '../../types';
import styles from './BookCard.module.css';
import noCoverImage from '../../assets/images/no-cover.png';

interface BookCardProps {
    book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (book.key && favorites.includes(book.key)) {
            setIsFavorite(true);
        }
    }, [book.key]);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!localStorage.getItem('token')) {
            alert('Debes iniciar sesión para añadir libros a favoritos.');
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
            </div>
        </Link>
    );
};

export default BookCard;