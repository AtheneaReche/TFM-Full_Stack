import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './UpdateProgressModal.module.css';

interface UpdateProgressModalProps {
    show: boolean;
    onHide: () => void;
    currentProgress: number;
    onSave: (newProgress: number) => void;
}

const UpdateProgressModal = ({ show, onHide, currentProgress, onSave }: UpdateProgressModalProps) => {
    const [progress, setProgress] = useState(currentProgress);

    const handleSave = () => {
        onSave(progress);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Actualizar Progreso</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                <p className={styles.progressLabel}>{progress}%</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className={`form-range ${styles.rangeInput}`}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave} style={{backgroundColor: 'var(--c-Orange)', borderColor: 'var(--c-Orange)'}}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateProgressModal;