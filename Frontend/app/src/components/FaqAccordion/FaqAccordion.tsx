import Accordion from 'react-bootstrap/Accordion';
import styles from './FaqAccordion.module.css';

interface FaqItem {
  eventKey: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

const FaqAccordion = ({ items }: FaqAccordionProps) => {
  return (
    <Accordion defaultActiveKey="0" className={styles.accordion}>
      {items.map((item) => (
        <Accordion.Item key={item.eventKey} eventKey={item.eventKey} className={styles.accordionItem}>
          <Accordion.Header className={styles.accordionButton}>{item.question}</Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
            {item.answer}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;