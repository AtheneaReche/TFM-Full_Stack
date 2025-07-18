import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import type {DbBook} from '../../types';
import styles from './BookCard.module.css';
import noCoverImage from '../../assets/images/no-cover.png';
import UpdateProgressModal from '../UpdateProgressModal/UpdateProgressModal';
import {Dropdown, ProgressBar} from 'react-bootstrap';
import {useUserData} from '../../hooks/useUserData';
import StarRating from '../StarRating/StarRating';

interface BookCardProps {
  book: DbBook;
}

const BookCard = ({book}: BookCardProps) => {
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem('token');

  const {favoriteBooks, userBooks, toggleFavorite, updateBookStatus, isLoading} = useUserData();

  const isFavorite = favoriteBooks.some(fav => fav.id === book.id);
  const bookUserData = userBooks.find(b => b.id === book.id);
  const status = bookUserData?.reading_status;
  const progress = bookUserData?.reading_progress || 0;
  const rating = bookUserData?.rating || 0;

  const handleFavoriteClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    toggleFavorite(book);
  };

  const handleStatusChange = (eventKey: string | null): void => {
    if (!isLoggedIn || !eventKey) return;
    const newProgress = eventKey === 'read' ? 100 : 0;
    updateBookStatus(book.id, eventKey === 'remove' ? 'none' : eventKey, newProgress);
  };

  const handleProgressSave = (newProgress: number): void => {
    const newStatus = newProgress === 100 ? 'read' : 'reading';
    updateBookStatus(book.id, newStatus, newProgress);
  };

  const coverUrl = book.book_cover || noCoverImage;
  const bookDetailUrl = `/book/${book.id}`;

  if (isLoading && isLoggedIn) {
    return <div className={styles.card}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.card}>
        <Link to={bookDetailUrl}><img src={coverUrl} alt={`Cover of ${book.name}`}/></Link>
        <div className={styles.cardInfo}>
          <div className={styles.titleContainer}>
            <h3 title={book.name}>{book.name}</h3>
            {isLoggedIn && (
              <button onClick={handleFavoriteClick}
                      className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`}>{isFavorite ? '❤️' : '♡'}</button>
            )}
          </div>
          <p className={styles.author} title={book.author}>{book.author}</p>

          <div className={styles.actionsContainer}>
            {isLoggedIn && status === 'reading' && (
              <div className={styles.progressContainer} onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setShowProgressModal(true);
              }}>
                <ProgressBar now={progress} label={`${progress}%`} className={styles.progressBar}/>
              </div>
            )}

            {isLoggedIn && <StarRating bookId={book.id} currentRating={rating}/>}

            {isLoggedIn && (
              <div onClick={(e: React.MouseEvent) => e.preventDefault()}>
                <Dropdown onSelect={handleStatusChange}>
                  <Dropdown.Toggle id={`dropdown-status-${book.id}`} className={styles.dropdownToggle}>
                    {status && status !== 'none' ? 'Cambiar estado' : 'Añadir a...'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="pending">Quiero leer</Dropdown.Item>
                    <Dropdown.Item eventKey="reading">Leyendo</Dropdown.Item>
                    <Dropdown.Item eventKey="finished">Leído</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="remove">Quitar de las listas</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
      <UpdateProgressModal show={showProgressModal} onHide={() => setShowProgressModal(false)}
                           currentProgress={progress} onSave={handleProgressSave}/>
    </>
  );
};

export default BookCard;