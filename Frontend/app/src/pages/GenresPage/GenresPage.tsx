import {useState} from 'react';
import type {DbBook} from '../../types';
import styles from './GenresPage.module.css';
import Loader from '../../components/Loader/Loader';
import BookList from '../../components/BookList/BookList';

import romanceImg from '../../assets/images/romance.png';
import historyImg from '../../assets/images/history.png';
import adventuresImg from '../../assets/images/adventures.png';
import biographyImg from '../../assets/images/bio.png';
import contemporaryImg from '../../assets/images/contem.png';
import cookingImg from '../../assets/images/cook.png';
import horrorImg from '../../assets/images/ghost.png';
import kidsImg from '../../assets/images/kids.png';
import poetryImg from '../../assets/images/poetry.png';
import SCFIImg from '../../assets/images/SCFI.png';
import thrillerImg from '../../assets/images/thriller.png';
import youngAdultImg from '../../assets/images/young-adult.png';

const categories = [
  {name: "Romance", img: romanceImg, genreKey: "romance", longName: false},
  {name: "Histórico", img: historyImg, genreKey: "history", longName: false},
  {name: "Aventuras", img: adventuresImg, genreKey: "adventures", longName: false},
  {name: "Biografías", img: biographyImg, genreKey: "biography", longName: false},
  {name: "Contemporáneo", img: contemporaryImg, genreKey: "contemporary", longName: true},
  {name: "Cocina", img: cookingImg, genreKey: "cooking", longName: false},
  {name: "Terror", img: horrorImg, genreKey: "horror", longName: false},
  {name: "Niños", img: kidsImg, genreKey: "kids", longName: false},
  {name: "Poesía", img: poetryImg, genreKey: "poetry", longName: false},
  {name: "SCFI", img: SCFIImg, genreKey: "SCFI", longName: false},
  {name: "Thriller", img: thrillerImg, genreKey: "thriller", longName: false},
  {name: "Joven Adulto", img: youngAdultImg, genreKey: "youngAdult", longName: false},
];

const GenresPage = () => {
  const [books, setBooks] = useState<DbBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreClick = async (genreKey: string, genreName: string) => {
    setIsLoading(true);
    setError(null);
    setBooks([]);
    setSelectedGenre(genreName);

    try {
      const response = await fetch(`/api/books?genre=${genreKey}&limit=12`);
      if (!response.ok) throw new Error('No se encontraron libros para este género.');

      const booksData: DbBook[] = await response.json();
      setBooks(booksData);
    } catch (err) {
      setError("No se pudieron cargar los libros. Por favor, inténtalo de nuevo más tarde.");
      console.error(err);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (isLoading) return <Loader/>;
    if (error) return <p className={styles.message}>{error}</p>;
    if (selectedGenre) {
      return (
        <BookList
          books={books}
          isLoading={isLoading}
          emptyMessage={`No se encontraron libros para el género "${selectedGenre}".`}
          className={styles.booksGrid}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className={`subtitle c_Brown ${styles.pageTitle}`}>Búsqueda por Géneros</h2>
      <div className={styles.genresContainer}>
        {categories.map((cat) => (
          <div
            key={cat.genreKey}
            className={styles.genreCircle}
            onClick={() => handleGenreClick(cat.genreKey, cat.name)}
          >
            <img src={cat.img} alt={cat.name} className={styles.genreIcon}/>
            <div className={`${styles.genreName} ${cat.longName ? styles.genreNameLong : ''}`}>
              {cat.name}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.resultsContainer}>
        {renderResults()}
      </div>
    </div>
  );
};

export default GenresPage;