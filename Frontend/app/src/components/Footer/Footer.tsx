import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import LegalModal from '../LegalModal/LegalModal';

const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <nav>
                        <ul className={styles.footerNavList}>
                            <li>
                                <button className={styles.footerNavItem} onClick={() => setModalOpen(true)}>
                                    Aviso legal de privacidad y cookies
                                </button>
                            </li>
                            <li>
                                <Link to="/books" className={styles.footerNavItem}>
                                    Libros
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={styles.footerNavItem}>
                                    ¡Contacta con nosotros!
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={`${styles.footerCopyright} c_Beige`}>
                        <p>@Copyright Book Worms Club</p>
                        <p>Todos los derechos reservados</p>
                    </div>
                </div>
            </footer>
            {isModalOpen && <LegalModal onClose={() => setModalOpen(false)} />}
        </>
    );
};

export default Footer;