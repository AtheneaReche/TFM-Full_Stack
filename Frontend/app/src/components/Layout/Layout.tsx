import type{ ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg_c_Beige" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#59380D', // c-Brown
                            color: '#F5ECD7', // c-Beige
                        },
                    },
                    error: {
                        style: {
                            background: '#E1A8A8', // c-Pink
                            color: '#59380D', // c-Brown
                        },
                    },
                }}
            />
            <Navbar />
            <main className="max-width" style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;