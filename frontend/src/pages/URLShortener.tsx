import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Copy, Link as LinkIcon, ExternalLink } from 'lucide-react';

const URLShortener: React.FC = () => {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setCopied(false);
    
    if (!url) {
      setError(t('urlShortener.errors.emptyUrl'));
      return;
    }
    
    try {
      new URL(url);
    } catch (err) {
      setError(t('urlShortener.errors.invalidUrl'));
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: url,
          custom_alias: customAlias || undefined,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || t('urlShortener.errors.generic'));
      }
      
      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('urlShortener.errors.generic'));
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <SEO 
        title={t('urlShortener.title')}
        description={t('urlShortener.description')}
        canonicalUrl="/url-shortener"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('urlShortener.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('urlShortener.description')}
            </p>
          </div>
          
          {/* Ad placeholder - Top */}
          <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mb-8 flex items-center justify-center text-gray-400">
            Ad Placeholder
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('urlShortener.formTitle')}</CardTitle>
              <CardDescription>{t('urlShortener.formDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm font-medium">
                    {t('urlShortener.urlLabel')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="url"
                      type="text"
                      placeholder={t('urlShortener.urlPlaceholder')}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="custom-alias" className="text-sm font-medium">
                    {t('urlShortener.customAliasLabel')} <span className="text-gray-500">({t('urlShortener.optional')})</span>
                  </label>
                  <Input
                    id="custom-alias"
                    type="text"
                    placeholder={t('urlShortener.customAliasPlaceholder')}
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t('urlShortener.shortening') : t('urlShortener.shortenButton')}
                </Button>
              </form>
              
              {shortUrl && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
                    {t('urlShortener.success')}
                  </h3>
                  <div className="flex items-center">
                    <Input
                      value={shortUrl}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={copyToClipboard}
                      title={t('urlShortener.copyToClipboard')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => window.open(shortUrl, '_blank')}
                      title={t('urlShortener.openInNewTab')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
                      {t('urlShortener.copied')}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Ad placeholder - Bottom */}
          <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 mt-8 flex items-center justify-center text-gray-400">
            Ad Placeholder
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('urlShortener.howItWorksTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-blue-600 dark:text-blue-400 text-xl font-bold mb-2">1</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('urlShortener.step1Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('urlShortener.step1Description')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-blue-600 dark:text-blue-400 text-xl font-bold mb-2">2</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('urlShortener.step2Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('urlShortener.step2Description')}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="text-blue-600 dark:text-blue-400 text-xl font-bold mb-2">3</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('urlShortener.step3Title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('urlShortener.step3Description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default URLShortener;
