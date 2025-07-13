import type { FormEvent } from 'react';
import { useState } from 'react';
import styles from './ContactPage.module.css';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event: FormEvent) => {
        // prevent reload
        event.preventDefault();

        const formData = { name, email, message };
        console.log("Datos del formulario enviados:", formData);
        toast.success("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");

        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div>
            <h1 className={`title c_Yellow ${styles.pageTitle}`}>Contacta con nosotros</h1>
            
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit" className={styles.button}>
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default ContactPage;