import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const TikTokDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('tools.tiktok.title')}
        description={t('tools.tiktok.description')}
        canonicalUrl="/tiktok-downloader"
      />
      
      <VideoDownloader
        title={t('tools.tiktok.title')}
        description={t('tools.tiktok.description')}
        endpoint="/api/downloads/tiktok"
      />
    </>
  );
};

export default TikTokDownloader;
