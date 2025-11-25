
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import CategoriesPage from './pages/CategoriesPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AutomationsPage from './pages/AutomationsPage';
import AutomationDetailPage from './pages/AutomationDetailPage';
import BoilerplatesPage from './pages/BoilerplatesPage';
import { ThemeProvider } from './context/ThemeContext';

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/boilerplates" element={<BoilerplatesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/boilerplate/:id" element={<DetailPage />} />
              <Route path="/automations" element={<AutomationsPage />} />
              <Route path="/automation/:id" element={<AutomationDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
