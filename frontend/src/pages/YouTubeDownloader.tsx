import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import VideoDownloader from '../components/VideoDownloader';

const YouTubeDownloader: React.FC = () => {
  const { t } = useLanguage();
  
  const formats = [
    { value: 'mp4', label: t('tools.youtube.mp4') },
    { value: 'mp3', label: t('tools.youtube.mp3') }
  ];
  
  return (
    <>
      <SEO 
        title={t('tools.youtube.title')}
        description={t('tools.youtube.description')}
        canonicalUrl="/youtube-downloader"
      />
      
      <VideoDownloader
        title={t('tools.youtube.title')}
        description={t('tools.youtube.description')}
        endpoint="/api/downloads/youtube"
        formats={formats}
      />
    </>
  );
};

export default YouTubeDownloader;
