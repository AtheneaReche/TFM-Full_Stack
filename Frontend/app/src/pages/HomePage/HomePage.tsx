import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

// Import images from assets
import heroImage from '../../assets/images/hero_event_image.png';
import bestSellersImage from '../../assets/images/best-sellers.png';
import brandonSandersonImage from '../../assets/images/best-fantasy.png';
import agathaChristieImage from '../../assets/images/best-thriller.png';
import newsImage1 from '../../assets/images/novedades.jpg';
import newsImage2 from '../../assets/images/confirmados.jpg';

const heroData = {
    name: "Evento de lectura",
    date: "11 de Agosto ~ 15 de Septiembre",
    buttonAttentionCall: "¡Apúntate!",
    url: "/events",
};

const recommendedsData = [
    { name: "Best <br> Sellers", img: bestSellersImage, to: "/bestsellers" },
    { name: "Brandon <br>Sanderson", img: brandonSandersonImage, to: "/author/sanderson" },
    { name: "Agatha <br>Christie", img: agathaChristieImage, to: "/author/christie" },
];

const newsData = [
    { title: "Nuevos títulos que están arrasando este Julio 2025", img: newsImage1, to: "/news" },
    { title: "Títulos confirmados para Agosto 2025", img: newsImage2, to: "/news" },
];


const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className={styles.heroContent}>
                <div>
                    <h1 className="title c_Yellow">{heroData.name}</h1>
                    <h2 className={`subtitle c_Orange ${styles.subtitlePadding}`}>{heroData.date}</h2>
                    <Link to={heroData.url}>
                        <button className="general_button">{heroData.buttonAttentionCall}</button>
                    </Link>
                </div>
                <div className={styles.heroImage}>
                    <img src={heroImage} alt={heroData.name} />
                </div>
            </section>

            {/* Recommended Section */}
            <section className={styles.recommendeds}>
                <h2 className={`subtitle c_Brown ${styles.subtitlePadding}`}>Recomendados</h2>
                <div className={styles.recommendedsContainer}>
                    {recommendedsData.map(item => (
                        <Link to={item.to} className={styles.recommendedsOptions} key={item.to}>
                            <h3 className={styles.recommendedsTitle} dangerouslySetInnerHTML={{ __html: item.name }} />
                            <div className={styles.recommendedsImage}>
                                <img src={item.img} alt="" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* News Section */}
            <section>
                <div className={styles.newsHeading}>
                    <h3 className="subtitle c_Brown">Novedades</h3>
                    <Link to="/news" className={`c_Orange ${styles.newsHeadingMore}`}>Ver más</Link>
                </div>
                <div className={styles.newsContainer}>
                    {newsData.map(item => (
                        <Link to={item.to} className={styles.newsOption} key={item.title}>
                            <div className={styles.newsImage} style={{ backgroundImage: `url(${item.img})` }}>
                                <div className={styles.newsOverlay}>
                                    <h3 className={styles.newsTitle}>{item.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;