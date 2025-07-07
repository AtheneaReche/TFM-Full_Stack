import type{ ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg_c_Beige" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="max-width" style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;