import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Book } from '../../types';
import styles from './SearchResultCard.module.css';
import noCoverImage from '../../assets/images/no-cover.png';

interface SearchResultCardProps {
    book: Book;
}

const SearchResultCard = ({ book }: SearchResultCardProps) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(book.key)) {
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
            alert(`"${book.title}" ha sido eliminado de tus favoritos.`);
        } else {
            favorites.push(book.key);
            setIsFavorite(true);
            alert(`"${book.title}" ha sido añadido a tus favoritos.`);
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const title = book.title.length > 50 ? `${book.title.slice(0, 50)}...` : book.title;
    const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : noCoverImage;
    const urlParams = new URLSearchParams({
        title: book.title,
        author: book.author_name?.join(', ') || 'Desconocido',
        coverUrl: coverUrl,
    }).toString();

    return (
        <article className={styles.card}>
            <div className={styles.info}>
                <div className={styles.titleContainer}>
                    <h3 className="c_Brown">{title}</h3>
                    <button 
                        onClick={handleFavoriteClick} 
                        className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}
                    >
                        {isFavorite ? '❤️' : '♡'}
                    </button>
                </div>
                <p><strong>Autor(es):</strong> {book.author_name?.join(', ') || 'Desconocido'}</p>
                <p><strong>Año de publicación:</strong> {book.first_publish_year || 'N/A'}</p>
                <Link to={`/book/${book.key.replace("/works/", "")}?${urlParams}`} className={styles.button}>
                    Ver libro
                </Link>
            </div>
            <div className={styles.imageContainer}>
                <img src={coverUrl} alt={`Portada de ${book.title}`} />
            </div>
        </article>
    );
};

export default SearchResultCard;