import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import styles from './BookDetailPage.module.css';
import Loader from '../../components/Loader/Loader';

interface BookDetails {
    coverUrl?: string;
    title: string;
    author: string;
    description?: string | { value: string };
    subjects?: string[];
}

const BookDetailPage = () => {
    const { workId } = useParams<{ workId: string }>();
    const [searchParams] = useSearchParams();

    const [details, setDetails] = useState<BookDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const title = searchParams.get('title') || 'Título no disponible';
    const author = searchParams.get('author') || 'Autor desconocido';
    const coverUrl = searchParams.get('coverUrl') || '';

    useEffect(() => {
        const fetchDetails = async () => {
            if (!workId) return;
            setIsLoading(true);
            try {
                const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Failed to fetch book details", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, [workId]);

    const getDescription = () => {
        if (!details?.description) return "No disponible.";
        if (typeof details.description === 'string') return details.description;
        return details.description.value;
    };

    return (
        <div>
            <div className={styles.backLinkContainer}>
                <Link to="/books" className={`${styles.backLink} c_Brown`}>Volver a la búsqueda</Link>
            </div>

            <h1 className={`subtitle c_Brown ${styles.pageTitle}`}>Información sobre el libro</h1>
            
            {isLoading ? <Loader /> : (
                <section className={styles.detailsContainer}>
                    <div className={styles.imageContainer}>
                        <img src={coverUrl} alt={`Portada de ${title}`} />
                    </div>
                    <div className={`${styles.textContainer} c_Brown`}>
                        <h2 className={`${styles.bookTitle} c_Orange`}>{title}</h2>
                        <p><strong>Autor(es):</strong> {author}</p>
                        <p><strong>Descripción:</strong> {getDescription()}</p>
                        <p><strong>Géneros:</strong> {details?.subjects?.slice(0, 5).join(', ') || 'No disponibles'}</p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BookDetailPage;