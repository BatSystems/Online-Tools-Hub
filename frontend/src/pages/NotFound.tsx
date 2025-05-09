import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title="404 - Not Found"
        description="The page you are looking for does not exist."
      />
      
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {t('pages.error.notFound')}
        </p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('pages.error.backHome')}
        </Link>
      </div>
    </>
  );
};

export default NotFound;
