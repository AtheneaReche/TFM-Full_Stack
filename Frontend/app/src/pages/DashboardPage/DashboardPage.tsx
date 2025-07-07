import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('User logged out.');
    navigate('/login');
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={`title c_Yellow ${styles.welcomeTitle}`}>Mi Perfil</h1>
      <p className="text c_Brown">
        ¡Bienvenido a tu dashboard! Aquí podrás ver tus libros favoritos y mucho más.
      </p>

      <button 
        onClick={handleLogout} 
        className={`general_button ${styles.logoutButton}`}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardPage;