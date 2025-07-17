import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

interface LoginResponse {
  token: string;
  message: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const url = '/api/auth/login';
      const response = await axios.post<LoginResponse>(url, { email, password });

      localStorage.setItem('token', response.data.token);
      
      console.log('Successfull Login, token saved!');
      navigate('/dashboard');

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Login error. Please try again.');
      } else {
        setError('Unexpected error happened.');
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={`title c_Yellow ${styles.pageTitle}`}>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          Entrar
        </button>
      </form>
      <div className={styles.extraLinksContainer}>
                <Link to="/forgot-password" className={styles.extraLink}>
                    ¿Olvidaste tu contraseña?
                </Link>
                <p className={`${styles.extraLink} c_Brown`}>
                    ¿No tienes cuenta?{' '}
                    <Link to="/signup" className={styles.extraLink}>
                        Regístrate aquí
                    </Link>
                </p>
            </div>
    </div>
  );
};

export default LoginPage;