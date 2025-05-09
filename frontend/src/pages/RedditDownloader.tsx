import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const RedditDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.reddit.title')}
        description={t('tools.reddit.description')}
        canonicalUrl="/reddit-downloader"
      />
      
      <VideoDownloader
        title={t('tools.reddit.title')}
        description={t('tools.reddit.description')}
        endpoint="/api/download/reddit"
      />
    </>
  );
};

export default RedditDownloader;
