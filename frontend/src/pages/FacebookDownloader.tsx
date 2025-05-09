import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const FacebookDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.facebook.title')}
        description={t('tools.facebook.description')}
        canonicalUrl="/facebook-downloader"
      />
      
      <VideoDownloader
        title={t('tools.facebook.title')}
        description={t('tools.facebook.description')}
        endpoint="/api/download/facebook"
      />
    </>
  );
};

export default FacebookDownloader;
