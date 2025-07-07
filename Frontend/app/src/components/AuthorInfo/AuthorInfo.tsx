import type { AuthorDetails } from '../../types';
import styles from './AuthorInfo.module.css';

interface AuthorInfoProps {
    author: AuthorDetails;
    customImage?: string;
    customBio?: string;
}

const AuthorInfo = ({ author, customImage, customBio }: AuthorInfoProps) => {
    
    const getBio = () => {
        if (customBio) return customBio;
        if (typeof author.bio === 'string') return author.bio;
        if (typeof author.bio?.value === 'string') return author.bio.value;
        return "Biografía no disponible.";
    }

    return (
        <div className={styles.container}>
            {customImage && <img src={customImage} alt={author.name} className={styles.image} />}
            <div className={styles.infoContainer}>
                <p className={styles.date}>
                    {author.birth_date} - {author.death_date || 'Presente'}
                </p>
                <p className={styles.bio}>
                    <strong>Biografía:</strong> {getBio()}
                </p>
            </div>
        </div>
    );
};

export default AuthorInfo;