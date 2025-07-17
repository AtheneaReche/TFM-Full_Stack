import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BestSellersPage from './pages/BestSellersPage/BestSellersPage';
import GenresPage from './pages/GenresPage/GenresPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';
import NewsPage from './pages/NewsPage/NewsPage';
import EventsPage from './pages/EventsPage/EventsPage';
import FAQPage from './pages/FAQPage/FAQPage';
import ContactPage from './pages/ContactPage/ContactPage';
import BooksSearchPage from './pages/BooksSearchPage/BooksSearchPage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage'; 
import Layout from './components/Layout/Layout';
import {UserDataProvider} from "./contexts/UserDataProvider.tsx";

const App = () => {
  return (
    <Router>
      <main>
        <Layout>
          <UserDataProvider>
            <Routes>
              {/* Public */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/books" element={<BooksSearchPage />} />
              <Route path="/book/:workId" element={<BookDetailPage />} />
              <Route path="/genres" element={<GenresPage />} />
              <Route path="/bestsellers" element={<BestSellersPage />} />
              <Route path="/news" element={<NewsPage/>} />
              <Route path="/events" element={<EventsPage/>} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage/>} />

              {/* Route for authors */}
              <Route path="/author/:authorKey" element={<AuthorPage />} />

              {/* Private */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
            </Routes>
          </UserDataProvider>
        </Layout>
      </main>
    </Router>
  );
}

export default App;