import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import type { NavLinkInfo } from '../../types';
import styles from './Navbar.module.css';

import logo from '../../assets/images/BWC_prim.png';
import booksIcon from '../../assets/images/collapsableMenu-books.png';
import eventsIcon from '../../assets/images/collapsableMenu-Event.png';
import mailIcon from '../../assets/images/collapsableMenu-mail.png';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSubmenuVisible, setSubmenuVisible] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        if (isMobileMenuOpen) setSubmenuVisible(false);
    };

    const closeAllMenus = () => {
        setMobileMenuOpen(false);
        setSubmenuVisible(false);
    };

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        localStorage.removeItem('token');
        closeAllMenus();
        navigate('/');
    };

    const baseLinks: NavLinkInfo[] = [
        {
            text: 'Libros',
            to: '#',
            icon: booksIcon,
            subLinks: [
                { text: 'Búsqueda avanzada', to: '/books' },
                { text: 'Búsqueda por géneros', to: '/genres' },
            ],
        },
        { text: 'Eventos', to: '/events', icon: eventsIcon },
        { text: 'Contacto', to: '/contact', icon: mailIcon },
    ];

    const guestLinks: NavLinkInfo[] = [
        { text: 'Iniciar Sesión', to: '/login' },
        { text: 'Registrarse', to: '/signup' },
    ];

    const userLinks: NavLinkInfo[] = [
        { text: 'Mi Perfil', to: '/dashboard' },
        { text: 'Cerrar Sesión', to: '/' },
    ];

    const navLinks: NavLinkInfo[] = [...baseLinks, ...(isAuthenticated ? userLinks : guestLinks)];

    return (
        <header>
            <nav className={styles.navBar}>
                <div className={styles.logoContainer}>
                    <Link to="/"><img src={logo} alt="Book Worms Club Logo" /></Link>
                </div>

                <button className={styles.menuToggle} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? '✖' : '☰'}
                </button>

                {/* --- Desktop menu --- */}
                <ul className={styles.desktopNav}>
                    {navLinks.map((link) => (
                        <li key={link.text} className={link.subLinks ? styles.dropdown : ''}>
                            {link.text === 'Cerrar Sesión' ? (
                                <a href="/" onClick={handleLogout}>{link.text}</a>
                            ) : (
                                <NavLink to={link.to} className={({ isActive }) => (isActive && link.to !== '#' ? styles.active : '')}>
                                    {link.text}
                                </NavLink>
                            )}
                            {link.subLinks && (
                                <ul className={styles.dropdownSubmenu}>
                                    {link.subLinks.map((subLink) => (
                                        <li key={subLink.text}>
                                            <Link to={subLink.to}>{subLink.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {/* --- Mobile menu --- */}
                <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.show : ''} ${isSubmenuVisible ? styles.submenuActive : ''}`}>
                    <ul className={styles.menuPanel}>
                        {navLinks.map((link) => (
                            <li key={link.text}>
                                {link.subLinks ? (
                                    <button onClick={() => setSubmenuVisible(true)}>
                                        <img src={link.icon} alt="" className={styles.navIcon} />
                                        <span>{link.text}</span>
                                        <span className= "arrow backButton">›</span>
                                    </button>
                                ) : link.text === 'Cerrar Sesión' ? (
                                    <a href="/" onClick={handleLogout}>
                                        {link.icon && <img src={link.icon} alt="" className={styles.navIcon} />}
                                        {link.text}
                                    </a>
                                ) : (
                                    <Link to={link.to} onClick={closeAllMenus}>
                                        {link.icon && <img src={link.icon} alt="" className={styles.navIcon} />}
                                        {link.text}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <ul className={`${styles.menuPanel} ${styles.submenu}`}>
                        <li>
                            <button className={styles.backButton} onClick={() => setSubmenuVisible(false)}>
                                ‹ Volver
                            </button>
                        </li>
                        <li><Link to="/books" onClick={closeAllMenus}>Búsqueda avanzada</Link></li>
                        <li><Link to="/genres" onClick={closeAllMenus}>Búsqueda por géneros</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;