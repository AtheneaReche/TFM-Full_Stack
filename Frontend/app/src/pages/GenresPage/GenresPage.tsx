import { useState } from 'react';
import type { Book, SubjectApiWork, SubjectApiAuthor } from '../../types';
import styles from './GenresPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

// Genres Images
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
    { name: "Romance", img: romanceImg, genreKey: "romance", longName: false },
    { name: "Histórico", img: historyImg, genreKey: "history", longName: false },
    { name: "Aventuras", img: adventuresImg, genreKey: "adventures", longName: false },
    { name: "Biografías", img: biographyImg, genreKey: "biography", longName: false },
    { name: "Contemporáneo", img: contemporaryImg, genreKey: "contemporary", longName: true },
    { name: "Cocina", img: cookingImg, genreKey: "cooking", longName: false },
    { name: "Terror", img: horrorImg, genreKey: "horror", longName: false },
    { name: "Niños", img: kidsImg, genreKey: "kids", longName: false },
    { name: "Poesía", img: poetryImg, genreKey: "poetry", longName: false },
    { name: "SCFI", img: SCFIImg, genreKey: "SCFI", longName: false },
    { name: "Thriller", img: thrillerImg, genreKey: "thriller", longName: false },
    { name: "Joven Adulto", img: youngAdultImg, genreKey: "youngAdult", longName: false },
];

const GenresPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const handleGenreClick = async (genreKey: string, genreName: string) => {
        setIsLoading(true);
        setError(null);
        setBooks([]);
        setSelectedGenre(genreName);

        try {
            const response = await fetch(`https://openlibrary.org/subjects/${genreKey}.json?limit=12`);
            const data = await response.json();
            if (data.works && data.works.length > 0) {
                const formattedBooks = data.works.map((work: SubjectApiWork) => ({
                    key: work.key,
                    title: work.title,
                    author_name: work.authors?.map((author: SubjectApiAuthor) => author.name),
                    cover_i: work.cover_id,
                }));
                setBooks(formattedBooks);
            } else {
                setBooks([]);
            }
        } catch (err) {
            setError("No se pudieron cargar los libros. Por favor, inténtalo de nuevo más tarde.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
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
                        <img src={cat.img} alt={cat.name} className={styles.genreIcon} />
                        <div className={`${styles.genreName} ${cat.longName ? styles.genreNameLong : ''}`}>
                            {cat.name}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.resultsContainer}>
                {isLoading && <Loader />}
                {error && <p className={styles.message}>{error}</p>}
                {!isLoading && !error && selectedGenre && books.length === 0 && (
                     <p className={styles.message}>No se encontraron libros para el género "{selectedGenre}".</p>
                )}
                {!isLoading && books.length > 0 && (
                    <div className={styles.booksGrid}>
                        {books.map((book) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenresPage;