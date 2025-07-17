import {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import styles from './StarRating.module.css';
import {useUserData} from '../../hooks/useUserData';

interface StarRatingProps {
  bookId: number;
  currentRating: number;
}

const StarRating = ({bookId, currentRating}: StarRatingProps) => {
  const [hover, setHover] = useState<number>(0);
  const {updateBookRating} = useUserData();

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={starValue}
            className={styles.star}
            color={starValue <= (hover || currentRating) ? '#F2C379' : '#e4e5e9'}
            size={24}
            onClick={() => updateBookRating(bookId, starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;