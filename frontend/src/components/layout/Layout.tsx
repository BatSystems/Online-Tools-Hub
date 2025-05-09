import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '../../i18n/LanguageContext';

const Layout: React.FC = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={`flex flex-col min-h-screen ${dir === 'rtl' ? 'rtl' : ''}`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
