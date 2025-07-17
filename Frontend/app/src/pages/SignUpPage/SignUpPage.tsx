import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './SignUpPage.module.css';


const SignUpPage = () => {
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const url = '/api/auth/register';
      await axios.post(url, { name, email, password });
      
      console.log('User successfully registed.');
      navigate('/login');

    }catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.error || 'Error on register.');
        } else {
            setError('Unexpected error happened.');
            console.error(err);
        }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={`title c_Yellow ${styles.pageTitle}`}>Crear Cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Nombre"
          className="form_input" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="form_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit" className="general_button">
          Crear cuenta
        </button>
      </form>

      <div className={styles.extraLinksContainer}>
        <p className={`${styles.extraLink} c_Brown`}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className={styles.extraLink}>
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;