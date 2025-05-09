import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const InstagramDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.instagram.title')}
        description={t('tools.instagram.description')}
        canonicalUrl="/instagram-downloader"
      />
      
      <VideoDownloader
        title={t('tools.instagram.title')}
        description={t('tools.instagram.description')}
        endpoint="/api/downloads/instagram"
      />
    </>
  );
};

export default InstagramDownloader;
