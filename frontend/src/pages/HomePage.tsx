import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { Download, Facebook, Instagram, Twitter, Youtube, FileVideo, Image } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t, dir } = useLanguage();

  const tools = [
    {
      id: 'youtube',
      title: t('tools.youtube.title'),
      description: t('tools.youtube.description'),
      icon: <Youtube className="h-10 w-10 text-red-600" />,
      path: '/youtube-downloader'
    },
    {
      id: 'facebook',
      title: t('tools.facebook.title'),
      description: t('tools.facebook.description'),
      icon: <Facebook className="h-10 w-10 text-blue-600" />,
      path: '/facebook-downloader'
    },
    {
      id: 'tiktok',
      title: t('tools.tiktok.title'),
      description: t('tools.tiktok.description'),
      icon: <FileVideo className="h-10 w-10 text-black" />,
      path: '/tiktok-downloader'
    },
    {
      id: 'instagram',
      title: t('tools.instagram.title'),
      description: t('tools.instagram.description'),
      icon: <Instagram className="h-10 w-10 text-pink-600" />,
      path: '/instagram-downloader'
    },
    {
      id: 'twitter',
      title: t('tools.twitter.title'),
      description: t('tools.twitter.description'),
      icon: <Twitter className="h-10 w-10 text-blue-400" />,
      path: '/twitter-downloader'
    },
    {
      id: 'reddit',
      title: t('tools.reddit.title'),
      description: t('tools.reddit.description'),
      icon: <Download className="h-10 w-10 text-orange-600" />,
      path: '/reddit-downloader'
    },
    {
      id: 'pinterest',
      title: t('tools.pinterest.title'),
      description: t('tools.pinterest.description'),
      icon: <Image className="h-10 w-10 text-red-500" />,
      path: '/pinterest-downloader'
    }
  ];

  return (
    <>
      <SEO 
        title={t('pages.home.title')}
        description={t('pages.home.description')}
        canonicalUrl="/"
      />
      
      {/* Ad placeholder - Top */}
      <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mb-8 flex items-center justify-center text-gray-400">
        Ad Placeholder
      </div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('pages.home.welcome')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('pages.home.subtitle')}
        </p>
      </div>
      
      {/* Quick Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {tool.title}
          </Link>
        ))}
      </div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
          >
            <div className="mb-4">
              {tool.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tool.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
      
      {/* Ad placeholder - Bottom */}
      <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mt-8 flex items-center justify-center text-gray-400">
        Ad Placeholder
      </div>
    </>
  );
};

export default HomePage;
