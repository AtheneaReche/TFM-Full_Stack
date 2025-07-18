import {useNavigate} from 'react-router-dom';
import styles from './DashboardPage.module.css';
import BookList from '../../components/BookList/BookList';
import Loader from '../../components/Loader/Loader';
import {Tabs, Tab} from 'react-bootstrap';
import {useUserData} from '../../hooks/useUserData';
import type {DbBook, UserBook} from '../../types';

const DashboardPage = () => {
  const navigate = useNavigate();
  const {favoriteBooks, userBooks, isLoading} = useUserData();

  const handleLogout = (): void => {
    localStorage.clear();
    navigate('/login');
  };

  const readBooks: UserBook[] = userBooks.filter(book => book.reading_status === 'finished');
  const readingBooks: UserBook[] = userBooks.filter(book => book.reading_status === 'reading');
  const wantToReadBooks: UserBook[] = userBooks.filter(book => book.reading_status === 'pending');

  return (
    <div className={styles.pageContainer}>
      <h1 className={`title c_Yellow ${styles.welcomeTitle}`}>Mi Biblioteca</h1>

      {isLoading ? <Loader/> : (
        <Tabs defaultActiveKey="favorites" id="dashboard-tabs" className={`mb-3 ${styles.tabs}`}>
          <Tab eventKey="favorites" title={`Favoritos (${favoriteBooks.length})`}>
            <BookList
              books={favoriteBooks as DbBook[]}
              cardType="grid"
              emptyMessage="No tienes libros favoritos."
              className={styles.booksGrid}
            />
          </Tab>
          <Tab eventKey="read" title={`Leídos (${readBooks.length})`}>
            <BookList
              books={readBooks as DbBook[]}
              cardType="grid"
              emptyMessage="No hay libros leídos."
              className={styles.booksGrid}
            />
          </Tab>
          <Tab eventKey="reading" title={`Leyendo (${readingBooks.length})`}>
            <BookList
              books={readingBooks as DbBook[]}
              cardType="grid"
              emptyMessage="No hay libros leyendo."
              className={styles.booksGrid}
            />
          </Tab>
          <Tab eventKey="wantToRead" title={`Quiero leer (${wantToReadBooks.length})`}>
            <BookList
              books={wantToReadBooks as DbBook[]}
              cardType="grid"
              emptyMessage="No hay libros que quieras leer."
              className={styles.booksGrid}
            />
          </Tab>
        </Tabs>
      )}

      <button onClick={handleLogout} className={`general_button ${styles.logoutButton}`}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default DashboardPage;