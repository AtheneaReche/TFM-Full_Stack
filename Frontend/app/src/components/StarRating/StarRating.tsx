import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './StarRating.module.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface StarRatingProps {
  bookKey: string;
}

const StarRating = ({ bookKey }: StarRatingProps) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) return;
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    if (ratings[bookKey]) {
      setRating(ratings[bookKey]);
    }
  }, [bookKey, isLoggedIn]);

  const handleRating = (newRating: number) => {
    if (!isLoggedIn) {
      toast.error('Debes iniciar sesión para valorar libros.');
      navigate('/login');
      return;
    }
    
    const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
    ratings[bookKey] = newRating;
    localStorage.setItem('userRatings', JSON.stringify(ratings));
    setRating(newRating);
    toast.success(`Has valorado este libro con ${newRating} estrellas.`);
  };

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={starValue}
            className={styles.star}
            color={starValue <= (hover || rating) ? '#F2C379' : '#e4e5e9'}
            size={24}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => isLoggedIn && setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;