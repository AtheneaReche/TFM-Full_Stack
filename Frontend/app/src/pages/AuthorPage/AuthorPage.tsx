import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { AuthorDetails, Book, DbBook } from '../../types';
import styles from './AuthorPage.module.css';

import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';

// Custom images and bio
import sandersonImage from '../../assets/images/brandon.png';
import christieImage from '../../assets/images/agatha.jpg';

const sandersonBio = `Brandon Sanderson es un aclamado autor estadounidense de fantasía épica y ciencia ficción, conocido principalmente por crear el **Cosmere**, un universo compartido para muchas de sus sagas más populares como *Nacidos de la Bruma* (Mistborn) y *El Archivo de las Tormentas* (The Stormlight Archive). Es célebre por sus meticulosos y detallados "sistemas de magia dura", que operan bajo reglas claras y consistentes. Sanderson alcanzó la fama mundial tras ser elegido para completar la icónica saga de Robert Jordan, *La Rueda del Tiempo*, y también es conocido por su increíble productividad y su interacción transparente con su comunidad de fans.`;
const agathaBio = `Tuve una infancia feliz rodeada de imaginación. Aprendí en casa, entre libros y cuentos. Durante la guerra, trabajé como enfermera y descubrí mi fascinación por los venenos, que luego usé en mis historias. Mi primera novela, "El misterioso caso de Styles", dio vida a Poirot y marcó el inicio de mi carrera. La escritura siempre fue mi refugio. Con Max, mi segundo esposo, viajé por Oriente Medio, encontrando inspiración en cada rincón. He vivido entre palabras y misterios, y no podría haber pedido una vida mejor.`;

const authorDataMap: { [key: string]: { id: string; name: string; image: string; bio?: string } } = {
    sanderson: { id: '41', name: 'Brandon Sanderson', image: sandersonImage, bio: sandersonBio },
    christie: { id: '42', name: 'Agatha Christie', image: christieImage, bio: agathaBio },
};


const AuthorPage = () => {
    const { authorKey } = useParams<{ authorKey: string }>();
    
    const [author, setAuthor] = useState<AuthorDetails | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const authorConfig = authorKey ? authorDataMap[authorKey] : null;

    useEffect(() => {
        if (!authorConfig) {
            setError("Autor no encontrado.");
            setIsLoading(false);
            return;
        }

        const fetchAuthorData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                console.log(`Buscando autor con key ${authorConfig.id}`)
                const [authorRes, worksRes] = await Promise.all([
                    fetch(`http://localhost:3000/authors/${authorConfig.id}`),
                    fetch(`http://localhost:3000/books?author=${authorConfig.id}&limit=12`)
                ]);

                if (!authorRes.ok){
                    throw new Error('No se ha encontrado el autor');
                }
                if (!worksRes.ok) {
                    throw new Error('No se pudieron obtener los libros del autor.');
                }
                
                const authorDetails: AuthorDetails = await authorRes.json();
                const worksData: DbBook[] = await worksRes.json();

                const formattedBooks: Book[] = worksData.map(bookData => ({
                    key: bookData.id.toString(),
                    title: bookData.name,
                    author_name: [bookData.author],
                    cover_i:  bookData.book_cover,
                    first_publish_year: bookData.publishing_year
                }));

                setAuthor(authorDetails);
                setBooks(formattedBooks);

            } catch (err) {
                setError("Error al cargar la página del autor.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthorData();

    }, [authorKey, authorConfig]);

    if (isLoading) return <Loader />;
    if (error) return <p className="c_Brown" style={{ textAlign: 'center', padding: '2rem' }}>{error}</p>;
    if (!author || !authorConfig) return null;

    return (
        <div className={styles.pageContainer}>
            <h2 className={`subtitle c_Brown ${styles.pageTitle}`}>{author.name}</h2>
            <AuthorInfo 
                author={author}
                customImage={authorConfig.image}
                customBio={authorConfig.bio}
            />
            <div className={styles.booksGrid}>
                {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
};

export default AuthorPage;