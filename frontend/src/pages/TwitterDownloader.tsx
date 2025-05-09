import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const TwitterDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.twitter.title')}
        description={t('tools.twitter.description')}
        canonicalUrl="/twitter-downloader"
      />
      
      <VideoDownloader
        title={t('tools.twitter.title')}
        description={t('tools.twitter.description')}
        endpoint="/api/download/twitter"
      />
    </>
  );
};

export default TwitterDownloader;
