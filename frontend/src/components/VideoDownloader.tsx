import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Clipboard, Download, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';

interface VideoDownloaderProps {
  title: string;
  description: string;
  endpoint: string;
  formats?: { value: string; label: string }[];
}

const VideoDownloader: React.FC<VideoDownloaderProps> = ({
  title,
  description,
  endpoint,
  formats = [],
}) => {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState(formats.length > 0 ? formats[0].value : 'mp4');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const apiUrl = 'http://localhost:8000';
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError(t('common.invalidUrl'));
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format,
        }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setResult(data);
      } else {
        setError(data.message || t('common.downloadFailed'));
      }
    } catch (err) {
      console.error('Error downloading video:', err);
      setError(t('common.downloadFailed'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (result && result.download_url) {
      window.location.href = `${apiUrl}${result.download_url}`;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Ad placeholder - Top */}
      <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mb-8 flex items-center justify-center text-gray-400">
        Ad Placeholder
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-grow relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('common.paste')}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handlePaste}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Clipboard className="h-5 w-5" />
                <span className="sr-only">{t('common.paste')}</span>
              </Button>
            </div>
            
            {formats.length > 0 && (
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {formats.map((fmt) => (
                  <option key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </option>
                ))}
              </select>
            )}
            
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {t('common.loading')}
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  {t('common.download')}
                </>
              )}
            </Button>
          </div>
        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            <p>{error}</p>
            <p className="text-sm mt-1">{t('common.tryAgain')}</p>
          </div>
        )}
        
        {result && result.status === 'success' && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
            <h3 className="font-semibold mb-2">{t('common.success')}</h3>
            <p className="mb-4">{result.title}</p>
            
            <Button
              onClick={handleDownload}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              {t('common.downloadNow')}
            </Button>
          </div>
        )}
      </div>
      
      {/* Ad placeholder - Bottom */}
      <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mt-8 flex items-center justify-center text-gray-400">
        Ad Placeholder
      </div>
    </div>
  );
};

export default VideoDownloader;
