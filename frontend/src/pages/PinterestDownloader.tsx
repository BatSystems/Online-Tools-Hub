import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const PinterestDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.pinterest.title')}
        description={t('tools.pinterest.description')}
        canonicalUrl="/pinterest-downloader"
      />
      
      <VideoDownloader
        title={t('tools.pinterest.title')}
        description={t('tools.pinterest.description')}
        endpoint="/api/downloads/pinterest"
      />
    </>
  );
};

export default PinterestDownloader;
