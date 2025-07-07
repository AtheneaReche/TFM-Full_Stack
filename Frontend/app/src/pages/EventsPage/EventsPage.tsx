import { Link } from 'react-router-dom';
import styles from './EventsPage.module.css';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import heroImage from '../../assets/images/hero_event_image.png';

// Content
const heroData = {
    name: "Evento de lectura",
    date: "21 de Enero ~ 21 de Febrero",
    buttonText: "¡Apúntate!",
};

const whatIsData = {
    title: "¿En qué consiste?",
    text: "En este evento literario online deberás retarte a ti mismo para leer <b>al menos 5 libros</b> en el periodo de tiempo establecido. Cada participante elige títulos dentro de distintas categorías y comparte su experiencia en el canal de discord del evento. Al finalizar el desafío, se organizará un debate virtual y sorteos exclusivos para los participantes. Este evento busca motivar la lectura y conectar a entusiastas de los libros en un espacio dinámico y enriquecedor.",
};

// FAQs
const faqItems = [
    { eventKey: '0', question: '¿Me puedo apuntar si ha empezado?', answer: '¡Por supuesto! Siempre y cuando tengas en cuenta que deberás leer al menos 5 libros para clasificarte y poder acceder a la categoría de premios.' },
    { eventKey: '1', question: '¿Debo terminar un libro para empezar el siguiente o puedo llevar dos a la vez?', answer: 'Depende de ti. Si te sientes cómodo/a llevando dos títulos a la vez, ¡adelante! ¡Tú pones tus propias reglas!' }
];

const EventsPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className={styles.heroContent}>
                <div>
                    <h1 className="title c_Yellow">{heroData.name}</h1>
                    <h2 className="subtitle c_Orange" style={{ paddingBottom: '2rem' }}>{heroData.date}</h2>
                    <button className="general_button">{heroData.buttonText}</button>
                </div>
                <div className={styles.heroImage}>
                    <img src={heroImage} alt={heroData.name} />
                </div>
            </section>

            {/* What Is Section */}
            <section className={styles.whatIsSection}>
                <h3 className="subtitle c_Orange" style={{ paddingBottom: '2rem' }}>{whatIsData.title}</h3>
                <p className="text c_Brown" dangerouslySetInnerHTML={{ __html: whatIsData.text }} />
            </section>

            {/* FAQ Section */}
            <section className={styles.faqSection}>
                <div className={styles.faqHeader}>
                    <h3 className="subtitle c_Orange">F.A.Q</h3>
                    <Link to="/faq" className={`c_Orange ${styles.faqMoreLink}`}>Ver más</Link>
                </div>
                <FaqAccordion items={faqItems} />
            </section>
        </div>
    );
};

export default EventsPage;