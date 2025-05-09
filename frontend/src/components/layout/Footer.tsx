import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Ad placeholder */}
        <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mb-6 flex items-center justify-center text-gray-400">
          Ad Placeholder
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('common.poweredBy')}
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              {t('pages.privacy.title')}
            </Link>
            <Link to="/terms-of-service" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              {t('pages.terms.title')}
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
              {t('pages.contact.title')}
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Online Tools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
