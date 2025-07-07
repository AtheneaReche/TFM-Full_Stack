import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import styles from './FaqPage.module.css';

// FAQs
const fullFaqItems = [
    { eventKey: '0', question: '¿Me puedo apuntar si ha empezado?', answer: '¡Por supuesto! Siempre y cuando tengas en cuenta que deberás leer al menos 5 libros para clasificarte y poder acceder a la categoría de premios.' },
    { eventKey: '1', question: '¿Debo terminar un libro para empezar el siguiente o puedo llevar dos a la vez?', answer: 'Depende de ti. Si te sientes cómodo/a llevando dos títulos a la vez, ¡adelante! ¡Tú pones tus propias reglas!' },
    { eventKey: '2', question: '¿Deben ser todos los títulos de un mismo género?', answer: '¡Para nada! Puedes elegir los géneros que quieras, solo cuenta el número de títulos leídos en este evento. Pero ten presente que cuando termines el título deberás hacer la correspondiente reseña en el canal de discord adecuado.' },
    { eventKey: '3', question: '¿Cuenta el libro si lo he leído fuera de plazo?', answer: 'No en este caso. Queremos que con este evento los participantes se desafíen así mismos y logren alcanzar sus objetivos de lectura dentro de un entorno colectivo que anime y promueva a conseguirlo.' },
];

const FaqPage = () => {
    return (
        <div>
            <h1 className={`title c_Yellow ${styles.pageTitle}`}>F.A.Q</h1>
            <FaqAccordion items={fullFaqItems} />
        </div>
    );
};

export default FaqPage;