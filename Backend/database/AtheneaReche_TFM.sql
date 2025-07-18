-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 18, 2025 at 03:11 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AtheneaReche_TFM`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `author_picture` varchar(100) DEFAULT NULL,
  `biography` varchar(500) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `decease_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `author_picture`, `biography`, `birthdate`, `decease_date`) VALUES
(3, 'Lewis Carroll', NULL, 'English author and poet', '1832-01-27', NULL),
(4, 'Frank Herbert', NULL, NULL, NULL, NULL),
(5, 'Jane Austen', NULL, NULL, NULL, NULL),
(6, 'Nicholas Sparks', NULL, NULL, NULL, NULL),
(7, 'Dulce Chacón', NULL, NULL, NULL, NULL),
(8, 'Ken Follett', NULL, NULL, NULL, NULL),
(9, 'Umberto Eco', NULL, NULL, NULL, NULL),
(10, 'Graham Greene', NULL, NULL, NULL, NULL),
(11, 'Robert Louis Stevenson', NULL, NULL, NULL, NULL),
(12, 'Alexandre Dumas', NULL, NULL, NULL, NULL),
(13, 'Jules Verne', NULL, NULL, NULL, NULL),
(14, 'Walter Isaacson', NULL, NULL, NULL, NULL),
(15, 'Ana Frank', NULL, NULL, NULL, NULL),
(16, 'Nelson Mandela', NULL, NULL, NULL, NULL),
(17, 'Carlos Ruiz Zafón', NULL, NULL, NULL, NULL),
(18, 'Celeste Ng', NULL, NULL, NULL, NULL),
(19, 'María Dueñas', NULL, NULL, NULL, NULL),
(20, 'Nadia Santini', NULL, NULL, NULL, NULL),
(21, 'David Lebovitz', NULL, NULL, NULL, NULL),
(22, 'Samin Nosrat', NULL, NULL, NULL, NULL),
(23, 'Stephen King', NULL, NULL, NULL, NULL),
(24, 'J.K. Rowling', NULL, NULL, NULL, NULL),
(25, 'Roald Dahl', NULL, NULL, NULL, NULL),
(26, 'Pablo Neruda', NULL, NULL, NULL, NULL),
(27, 'Gustavo Adolfo Bécquer', NULL, NULL, NULL, NULL),
(28, 'Federico García Lorca', NULL, NULL, NULL, NULL),
(29, 'William Gibson', NULL, NULL, NULL, NULL),
(30, 'Isaac Asimov', NULL, NULL, NULL, NULL),
(31, 'Paula Hawkins', NULL, NULL, NULL, NULL),
(32, 'Gillian Flynn', NULL, NULL, NULL, NULL),
(33, 'Thomas Harris', NULL, NULL, NULL, NULL),
(34, 'Suzanne Collins', NULL, NULL, NULL, NULL),
(35, 'John Green', NULL, NULL, NULL, NULL),
(36, 'Angie Thomas', NULL, NULL, NULL, NULL),
(37, 'Javier Castillo', NULL, NULL, NULL, NULL),
(38, 'Ildefonso Falcones', NULL, NULL, NULL, NULL),
(39, 'Blanca Andreu', NULL, NULL, NULL, NULL),
(40, 'Anthony Bourdain', NULL, NULL, NULL, NULL),
(41, 'Brandon Sanderson', NULL, 'American author of epic fantasy and science fiction.', '1975-12-19', NULL),
(42, 'Agatha Christie', NULL, 'English writer known for her detective novels.', '1890-09-15', '1976-01-12'),
(43, 'Gabriel García Márquez', NULL, 'Escritor colombiano, figura clave del realismo mágico.', '1927-03-06', '2014-04-17'),
(44, 'Miguel de Cervantes', NULL, 'El más grande escritor en lengua española de todos los tiempos.', '1547-09-29', '1616-04-22'),
(45, 'George Orwell', NULL, 'Novelista y ensayista británico, conocido por sus obras distópicas.', '1903-06-25', '1950-01-21'),
(46, 'Harper Lee', NULL, 'Escritora estadounidense, famosa por su novela \"Matar a un ruiseñor\".', '1926-04-28', '2016-02-19'),
(47, 'F. Scott Fitzgerald', NULL, 'Novelista estadounidense, uno de los grandes de la \"Generación Perdida\".', '1896-09-24', '1940-12-21'),
(48, 'Dan Brown', NULL, 'Autor estadounidense de novelas de misterio y suspense.', '1964-06-22', NULL),
(49, 'Fyodor Dostoevsky', NULL, 'Uno de los principales escritores de la Rusia zarista.', '1821-11-11', '1881-02-09'),
(50, 'Homer', NULL, 'Poeta épico de la Antigua Grecia, autor de la Ilíada y la Odisea.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `book_cover` varchar(255) DEFAULT NULL,
  `genre` enum('romance','history','adventures','biography','contemporary','cooking','horror','kids','poetry','SCFI','thriller','youngAdult','fantasy') DEFAULT NULL,
  `publishing_year` date DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `author` bigint(20) UNSIGNED NOT NULL,
  `publisher` bigint(20) UNSIGNED DEFAULT NULL,
  `ISBN` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `book_cover`, `genre`, `publishing_year`, `description`, `author`, `publisher`, `ISBN`) VALUES
(3, 'Dune', 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg', 'SCFI', '1965-01-01', 'Poder, política y ecología en un planeta desértico', 4, 28, '978-0441013593'),
(4, 'Pride and Prejudice', 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', 'romance', '1813-01-01', 'Una clásica historia de amor y malentendidos sociales entre Elizabeth Bennet y Mr. Darcy', 5, 2, '978-0141439518'),
(5, 'El cuaderno de Noah', 'https://covers.openlibrary.org/b/isbn/9780552143883-L.jpg', 'romance', '1996-01-01', 'Amor eterno frente a la adversidad', 6, 3, '978-0552143883'),
(6, 'La voz dormida', 'https://covers.openlibrary.org/b/isbn/9788408065913-L.jpg', 'romance', '2002-01-01', 'Amor y resistencia durante posguerra española', 7, 4, '978-8408065913'),
(7, 'Los pilares de la Tierra', 'https://covers.openlibrary.org/b/isbn/9780451225245-L.jpg', 'history', '1989-01-01', 'Construcción de una catedral en la Edad Media y el trasfondo político y social', 8, 5, '978-0451225245'),
(8, 'El nombre de la rosa', 'https://covers.openlibrary.org/b/isbn/9780151446476-L.jpg', 'history', '1980-01-01', 'Misterio y herejía en una abadía medieval', 9, 6, '978-0151446476'),
(9, 'En el país de los ciegos', 'https://covers.openlibrary.org/b/isbn/9780099478379-L.jpg', 'history', '1961-01-01', 'Retrato de la España franquista a través de un viaje', 10, 7, '978-0099478379'),
(10, 'La isla del tesoro', 'https://covers.openlibrary.org/b/isbn/9780141439914-L.jpg', 'adventures', '1883-01-01', 'Búsqueda de un tesoro pirata con giros emocionantes', 11, 8, '978-0141439914'),
(11, 'Los tres mosqueteros', 'https://covers.openlibrary.org/b/isbn/9780199538462-L.jpg', 'adventures', '1844-01-01', 'Honor, amistad y duelos en la Francia del siglo XVII', 12, 9, '978-0199538462'),
(12, 'La vuelta al mundo en ochenta días', 'https://covers.openlibrary.org/b/isbn/9780140449277-L.jpg', 'adventures', '1873-01-01', 'Aventura épica con desafíos por todo el planeta', 13, 10, '978-0140449277'),
(13, 'Steve Jobs', 'https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg', 'biography', '2011-01-01', 'La vida del cofundador de Apple', 14, 11, '978-1451648539'),
(14, 'El diario de Ana Frank', 'https://covers.openlibrary.org/b/isbn/9780553296983-L.jpg', 'biography', '1947-01-01', 'Testimonio viviente de una niña judía durante el Holocausto', 15, 12, '978-0553296983'),
(15, 'Long Walk to Freedom', 'https://covers.openlibrary.org/b/isbn/9780316548182-L.jpg', 'biography', '1994-01-01', 'Autobiografía de Nelson Mandela y su lucha contra el apartheid', 16, 4, '978-0316548182'),
(16, 'La sombra del viento', 'https://covers.openlibrary.org/b/isbn/9780143126393-L.jpg', 'contemporary', '2001-01-01', 'Misterio literario en la Barcelona de posguerra', 17, 4, '978-0143126393'),
(17, 'Pequeños fuegos por todas partes', 'https://covers.openlibrary.org/b/isbn/9780735224292-L.jpg', 'contemporary', '2017-01-01', 'Secretos familiares y conflictos sociales', 18, 3, '978-0735224292'),
(18, 'La caricia de la lluvia', 'https://covers.openlibrary.org/b/isbn/9788408199532-L.jpg', 'contemporary', '2019-01-01', 'Pasiones modernas en ciudades cosmopolitas', 19, 4, '978-8408199532'),
(19, 'La cocina de la memoria', 'https://covers.openlibrary.org/b/isbn/9788467058252-L.jpg', 'cooking', '2020-01-01', 'Recetas vinculadas a la tradición', 20, 13, '978-8467058252'),
(20, 'My Paris Kitchen', 'https://covers.openlibrary.org/b/isbn/9781607742678-L.jpg', 'cooking', '2014-01-01', 'Recetas clásicas con un toque moderno', 21, 14, '978-1607742678'),
(21, 'Salt, Fat, Acid, Heat', 'https://covers.openlibrary.org/b/isbn/9781476753836-L.jpg', 'cooking', '2017-01-01', 'Enfoque científico y sensorial de la cocina', 22, 14, '978-1476753836'),
(22, 'It', 'https://covers.openlibrary.org/b/isbn/9781501142970-L.jpg', 'horror', '1986-01-01', 'Un mal aterrador acecha a un pueblo cada 27 años', 23, 5, '978-1501142970'),
(23, 'El resplandor', 'https://covers.openlibrary.org/b/isbn/9780385121675-L.jpg', 'horror', '1977-01-01', 'Aislamiento, locura y fenómenos inexplicables en un hotel', 23, 10, '978-0385121675'),
(24, 'Cementerio de animales', 'https://covers.openlibrary.org/b/isbn/9780385182447-L.jpg', 'horror', '1983-01-01', 'Isla rural, ritual y muerte', 23, 4, '978-0385182447'),
(25, 'Harry Potter y la piedra filosofal', 'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg', 'fantasy', '1997-01-01', 'Un niño descubre su poder mágico y un mundo fantástico', 24, 15, '978-0747532699'),
(26, 'Matilda', 'https://covers.openlibrary.org/b/isbn/9780142410381-L.jpg', 'fantasy', '1988-01-01', 'Una niña superdotada con poderes especiales y una directora aterradora', 25, 16, '978-0142410381'),
(27, 'Charlie y la fábrica de chocolate', 'https://covers.openlibrary.org/b/isbn/9780142410312-L.jpg', 'fantasy', '1964-01-01', 'Aventura dulce con moraleja', 25, 16, '978-0142410312'),
(28, 'Veinte poemas de amor y una canción desesperada', 'https://covers.openlibrary.org/b/isbn/9780143039969-L.jpg', 'poetry', '1924-01-01', 'Pasión y melancolía en versos cortos', 26, 17, '978-0143039969'),
(29, 'Rimas y leyendas', 'https://covers.openlibrary.org/b/isbn/9788437600647-L.jpg', 'poetry', '1871-01-01', 'La mirada romántica de Bécquer', 27, 18, '978-8437600647'),
(30, 'Poeta en Nueva York', 'https://covers.openlibrary.org/b/isbn/9780393326242-L.jpg', 'poetry', '1940-01-01', 'Visión surrealista del viaje y la alienación', 28, 9, '978-0393326242'),
(31, 'Neuromante', 'https://covers.openlibrary.org/b/isbn/9780441569595-L.jpg', 'SCFI', '1984-01-01', 'Ciberespacio, inteligencia artificial y hackers', 29, 1, '978-0441569595'),
(32, 'Fundación', 'https://covers.openlibrary.org/b/isbn/9780553803716-L.jpg', 'SCFI', '1951-01-01', 'La psicohistoria y el futuro de la humanidad', 30, 20, '978-0553803716'),
(33, 'La chica del tren', 'https://covers.openlibrary.org/b/isbn/9781594633669-L.jpg', 'thriller', '2015-01-01', 'Obsesión, engaños y un crimen por resolver', 31, 21, '978-1594633669'),
(34, 'Perdida', 'https://covers.openlibrary.org/b/isbn/9780307588364-L.jpg', 'thriller', '2012-01-01', 'La desaparición de una mujer y el espectáculo mediático', 32, 3, '978-0307588364'),
(35, 'El silencio de los corderos', 'https://covers.openlibrary.org/b/isbn/9780312924584-L.jpg', 'thriller', '1988-01-01', 'Crimen, psiquiatría y un asesino en serie', 33, 22, '978-0312924584'),
(36, 'Los Juegos del Hambre', 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg', 'adventures', '2008-01-01', 'Revolución, sacrificio y supervivencia', 34, 23, '978-0439023528'),
(37, 'Bajo la misma estrella', 'https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg', 'romance', '2012-01-01', 'Amor, enfermedad y literatura adolescente', 35, 24, '978-0525478812'),
(38, 'El odio que das', 'https://covers.openlibrary.org/b/isbn/9780062498533-L.jpg', 'contemporary', '2017-01-01', 'Justicia social desde la mirada de una chica afroamericana', 36, 25, '978-0062498533'),
(39, 'El día que se perdió la cordura', 'https://covers.openlibrary.org/b/isbn/9788466343793-L.jpg', 'romance', '2012-01-01', 'Encuentro mágico y realismos urbanos', 37, 4, '978-8466343793'),
(40, 'La catedral del mar', 'https://covers.openlibrary.org/b/isbn/9780525950484-L.jpg', 'history', '2006-01-01', 'Historia, injusticia social y lealtad en la Barcelona medieval', 38, 22, '978-0525950484'),
(41, 'Cada uno su noche', 'https://covers.openlibrary.org/b/isbn/9788498957434-L.jpg', 'poetry', '2019-01-01', 'Poesía íntima y luz interior', 39, 26, '978-8498957434'),
(42, 'Kitchen Confidential', 'https://covers.openlibrary.org/b/isbn/9780060899226-L.jpg', 'biography', '2000-01-01', 'Crónica reveladora del mundo tras bastidores de la alta cocina', 40, 7, '978-0060899226'),
(43, 'Mistborn: The Final Empire', 'https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg', 'fantasy', '2006-07-17', 'In a world where ash falls from the sky, a young thief discovers magical abilities and joins a rebellion to overthrow a god-king.', 41, NULL, '9780765311788'),
(44, 'The Way of Kings', 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg', 'fantasy', '2010-08-31', 'First in The Stormlight Archive, set in a world of storms and stone, following the paths of a slave, a highprince, and a scholar.', 41, NULL, '9780765326355'),
(45, 'Skyward', 'https://covers.openlibrary.org/b/isbn/9780399555770-L.jpg', 'youngAdult', '2018-11-06', 'A girl dreams of being a pilot in a desperate war against alien invaders, despite her father being branded a coward.', 41, NULL, '9780399555770'),
(46, 'And Then There Were None', 'https://covers.openlibrary.org/b/isbn/9780312330873-L.jpg', 'thriller', '1939-11-06', 'Ten strangers are lured to an isolated island and are killed off one by one. Who is the murderer?', 42, NULL, '9780312330873'),
(47, 'Murder on the Orient Express', 'https://covers.openlibrary.org/b/isbn/9780062073501-L.jpg', 'thriller', '1934-01-01', 'Hercule Poirot must solve a murder on a snowbound train where every passenger is a suspect.', 42, NULL, '9780062073501'),
(48, 'The Murder of Roger Ackroyd', 'https://covers.openlibrary.org/b/isbn/9780062073563-L.jpg', 'thriller', '1926-06-01', 'A classic Hercule Poirot mystery involving a wealthy widower\'s death, a blackmail plot, and a shocking final twist.', 42, NULL, '9780062073563'),
(49, 'Cien años de soledad', 'https://covers.openlibrary.org/b/isbn/9780307350438-L.jpg', 'fantasy', '1967-05-30', 'La historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.', 43, NULL, '9780307350438'),
(50, 'Don Quijote de la Mancha', 'https://covers.openlibrary.org/b/isbn/9788424116365-L.jpg', 'adventures', '1605-01-16', 'Las aventuras de un hidalgo que enloquece leyendo libros de caballerías y decide convertirse en caballero andante.', 44, NULL, '9788424116365'),
(51, 'Orgullo y prejuicio', 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', 'romance', '1813-01-28', 'Una clásica historia de amor y malentendidos sociales entre Elizabeth Bennet y Mr. Darcy.', 5, NULL, '9780141439518'),
(52, '1984', 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg', 'SCFI', '1949-06-08', 'Una novela distópica sobre el totalitarismo y la vigilancia masiva en una sociedad controlada por el Gran Hermano.', 45, NULL, '9780451524935'),
(53, 'Matar a un ruiseñor', 'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg', 'contemporary', '1960-07-11', 'Una historia sobre la injusticia racial en el sur de Estados Unidos, vista a través de los ojos de una niña.', 46, NULL, '9780061120084'),
(54, 'El gran Gatsby', 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', 'contemporary', '1925-04-10', 'Una crítica de la superficialidad de la alta sociedad estadounidense en los años 20.', 47, NULL, '9780743273565'),
(55, 'Los juegos del hambre', 'https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg', 'adventures', '2008-09-14', 'En una sociedad distópica, una joven se ofrece como voluntaria para participar en un brutal juego de supervivencia.', 34, NULL, '9780439023528'),
(56, 'El código Da Vinci', 'https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg', 'thriller', '2003-03-18', 'Un simbologista de Harvard desentraña una conspiración oculta en las obras de Leonardo da Vinci.', 48, NULL, '9780307474278'),
(57, 'Crimen y castigo', 'https://covers.openlibrary.org/b/isbn/9780140449130-L.jpg', 'contemporary', '1866-01-01', 'Un joven estudiante empobrecido comete un asesinato y lidia con las consecuencias morales y psicológicas.', 49, NULL, '9780140449130'),
(58, 'La Odisea', 'https://covers.openlibrary.org/b/isbn/9780140268867-L.jpg', 'adventures', NULL, 'El épico viaje de regreso a casa de Odiseo, rey de Ítaca, después de la Guerra de Troya.', 50, NULL, '9780140268867');

-- --------------------------------------------------------

--
-- Table structure for table `books_collections`
--

CREATE TABLE `books_collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books_collections`
--

INSERT INTO `books_collections` (`id`, `user`, `name`) VALUES
(1, 2, 'Favourites'),
(2, 3, 'Favourites'),
(3, 4, 'Favourites'),
(4, 6, 'Favourites');

-- --------------------------------------------------------

--
-- Table structure for table `books_collections-book`
--

CREATE TABLE `books_collections-book` (
  `book` bigint(20) UNSIGNED NOT NULL,
  `collection` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books_collections-book`
--

INSERT INTO `books_collections-book` (`book`, `collection`) VALUES
(4, 4),
(5, 4),
(11, 4),
(15, 4),
(53, 4);

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `country` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `country`) VALUES
(1, 'Minotauro', 'ES'),
(2, 'Penguin Clásicos', NULL),
(3, 'Roca Editorial', NULL),
(4, 'Planeta', 'ES'),
(5, 'Plaza & Janés', 'ES'),
(6, 'Lumen', 'ES'),
(7, 'Anagrama', 'ES'),
(8, 'Oxford World Classics', NULL),
(9, 'Alianza Editorial', 'ES'),
(10, 'Debolsillo', 'ES'),
(11, 'Debate', 'ES'),
(12, 'Destino', 'ES'),
(13, 'Taurus', 'ES'),
(14, 'Phaidon', NULL),
(15, 'Salamandra', 'ES'),
(16, 'Alfaguara', 'ES'),
(17, 'Losada', NULL),
(18, 'Cátedra', 'ES'),
(19, 'Gigamesh', 'ES'),
(20, 'Edhasa', 'ES'),
(21, 'Penguin Barcelona', 'ES'),
(22, 'Grijalbo', 'ES'),
(23, 'Molino', 'ES'),
(24, 'Nube de Tinta', 'ES'),
(25, 'Océano Gran Travesía', NULL),
(26, 'Visor', 'ES'),
(28, 'Gigamesh', 'ES');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `favourites` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `favourites`) VALUES
(2, 'usuario test', 'usuario@example.com', '$2b$10$r.QapXwfrIRMabjRYGrpzuRvkAM3f3NcsaZl3JEPQBdT0cNB.q1JS', 'user', NULL),
(3, 'usuario admin', 'admin@example.com', '$2b$10$Yxv3SXiukZ8C.5HGcnMgYOT.vY6cMbGNJKpzkEchQaIBLsykXFno2', 'admin', NULL),
(4, 'Athenea', 'atheneareche@gmail.com', '$2b$10$xsh0TuvYJBBa84Q12uiReO6LrOe0xPSJWsrFhw0d5jWXAsXreaDGm', 'user', NULL),
(6, 'Hola', 'hola@gmail.com', '$2b$10$Qtur8pf3zsSD.kjW.o7vIOC7tJJh3bSCWq1s76LTmNJ/YJ3Op7GHm', 'user', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users-books`
--

CREATE TABLE `users-books` (
  `user` bigint(20) UNSIGNED NOT NULL,
  `book` bigint(20) UNSIGNED NOT NULL,
  `reading_progress` bigint(20) NOT NULL,
  `reading_status` enum('pending','reading','finished') NOT NULL,
  `rating` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users-books`
--

INSERT INTO `users-books` (`user`, `book`, `reading_progress`, `reading_status`, `rating`) VALUES
(3, 3, 0, 'reading', NULL),
(6, 4, 45, 'reading', 4),
(6, 5, 0, 'reading', 2),
(6, 11, 0, 'pending', 3),
(6, 15, 0, 'pending', 3),
(6, 16, 0, 'pending', NULL),
(6, 17, 0, 'reading', NULL),
(6, 18, 0, 'finished', NULL),
(6, 38, 0, 'pending', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publisher` (`publisher`),
  ADD KEY `author` (`author`);

--
-- Indexes for table `books_collections`
--
ALTER TABLE `books_collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `books_collections-book`
--
ALTER TABLE `books_collections-book`
  ADD PRIMARY KEY (`book`,`collection`),
  ADD KEY `collection` (`collection`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `users_ibfk_1` (`favourites`);

--
-- Indexes for table `users-books`
--
ALTER TABLE `users-books`
  ADD PRIMARY KEY (`user`,`book`),
  ADD KEY `book` (`book`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `books_collections`
--
ALTER TABLE `books_collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `publishers` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`author`) REFERENCES `authors` (`id`);

--
-- Constraints for table `books_collections`
--
ALTER TABLE `books_collections`
  ADD CONSTRAINT `books_collections_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`);

--
-- Constraints for table `books_collections-book`
--
ALTER TABLE `books_collections-book`
  ADD CONSTRAINT `books_collections-book_ibfk_1` FOREIGN KEY (`collection`) REFERENCES `books_collections` (`id`),
  ADD CONSTRAINT `books_collections-book_ibfk_2` FOREIGN KEY (`book`) REFERENCES `books` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`favourites`) REFERENCES `books_collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users-books`
--
ALTER TABLE `users-books`
  ADD CONSTRAINT `users-books_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users-books_ibfk_2` FOREIGN KEY (`book`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
