import {useState, useEffect} from 'react';
import type {DbBook} from '../../types';
import styles from './NewsPage.module.css';
import BookCard from '../../components/BookCard/BookCard';
import Loader from '../../components/Loader/Loader';


const NewsPage = () => {
 const [books, setBooks] = useState<DbBook[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);


 useEffect(() => {
   const fetchRandomBooks = async () => {
     setIsLoading(true);
     setError(null);
     try {
       const bookPromises = Array.from({length: 10}, () =>
         fetch(`/api/books/random`).then(res => {
           if (!res.ok) return null;
           return res.json();
         })
       );


       const booksData = await Promise.all(bookPromises);
       const validBooks = booksData.filter((book): book is DbBook => book !== null);
       const uniqueBooks = Array.from(new Map(validBooks.map(book => [book.id, book])).values());


       setBooks(uniqueBooks);


     } catch (err) {
       setError("Ocurrió un problema al obtener los libros.");
       console.error(err);
     } finally {
       setIsLoading(false);
     }
   };


   fetchRandomBooks();
 }, []);


 const renderContent = () => {
   if (isLoading) return <Loader/>;
   if (error) return <p style={{textAlign: 'center'}}>{error}</p>;
   return (
     <div className={styles.booksGrid}>
       {books.map((book) => (
         <BookCard key={book.id} book={book}/>
       ))}
     </div>
   );
 };


 return (
   <div>
     <h2 className={`subtitle c_Brown ${styles.pageTitle}`}>Libros Recomendados</h2>
     {renderContent()}
   </div>
 );
};


export default NewsPage;

