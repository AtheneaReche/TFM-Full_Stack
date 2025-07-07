import styles from './LegalModal.module.css';

interface LegalModalProps {
    onClose: () => void;
}

const LegalModal = ({ onClose }: LegalModalProps) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2 className={`${styles.modalTitle} c_Brown`}>Aviso de Privacidad y Uso de Cookies</h2>
                <p>Bienvenido a Book Worms Club... (Aquí va todo el texto legal)</p>
                <div className={styles.modalButtonContainer}>
                    <button className={`${styles.modalButton} c_Brown`} onClick={onClose}>
                        ACEPTAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;