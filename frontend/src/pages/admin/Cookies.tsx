import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Cookie, Trash2, Upload, Check, X } from 'lucide-react';

interface CookieFile {
  id: number;
  platform: string;
  filename: string;
  active: boolean;
  created_at: string;
}

const AdminCookies: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [cookies, setCookies] = useState<CookieFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadPlatform, setUploadPlatform] = useState('youtube');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchCookies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cookies/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(t('admin.cookies.fetchError'));
        }

        const data = await response.json();
        setCookies(data.cookies);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('admin.cookies.unknownError'));
      } finally {
        setLoading(false);
      }
    };

    fetchCookies();
  }, [navigate, t]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadCookie = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) return;
    
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('platform', uploadPlatform);
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cookies/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(t('admin.cookies.uploadError'));
      }

      const newCookie = await response.json();
      setCookies([newCookie, ...cookies]);
      setFile(null);
      
      const fileInput = document.getElementById('cookie-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.cookies.unknownError'));
    } finally {
      setUploading(false);
    }
  };

  const toggleCookieStatus = async (cookieId: number, active: boolean) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cookies/${cookieId}/toggle?active=${active}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(t('admin.cookies.toggleError'));
      }

      setCookies(cookies.map(cookie => 
        cookie.id === cookieId ? { ...cookie, active } : cookie
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.cookies.unknownError'));
    }
  };

  const deleteCookie = async (cookieId: number) => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;

    if (!confirm(t('admin.cookies.confirmDelete'))) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cookies/${cookieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(t('admin.cookies.deleteError'));
      }

      setCookies(cookies.filter(cookie => cookie.id !== cookieId));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.cookies.unknownError'));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'youtube': return 'YouTube';
      case 'tiktok': return 'TikTok';
      case 'facebook': return 'Facebook';
      case 'instagram': return 'Instagram';
      case 'twitter': return 'Twitter';
      case 'reddit': return 'Reddit';
      case 'pinterest': return 'Pinterest';
      default: return platform;
    }
  };

  return (
    <AdminLayout title={t('admin.cookies.title')}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('admin.cookies.uploadTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={uploadCookie} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">{t('admin.cookies.platform')}</Label>
                <Select 
                  value={uploadPlatform} 
                  onValueChange={setUploadPlatform}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.cookies.selectPlatform')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="reddit">Reddit</SelectItem>
                    <SelectItem value="pinterest">Pinterest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cookie-file">{t('admin.cookies.file')}</Label>
                <Input 
                  id="cookie-file" 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".txt,.json"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={!file || uploading}
              className="w-full md:w-auto"
            >
              {uploading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></span>
                  {t('admin.cookies.uploading')}
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  {t('admin.cookies.upload')}
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : cookies.length === 0 ? (
        <div className="text-center py-12">
          <Cookie className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t('admin.cookies.noCookies')}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('admin.cookies.noCookiesDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cookies.map((cookie) => (
            <Card key={cookie.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {getPlatformLabel(cookie.platform)}
                  </CardTitle>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cookie.filename}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(cookie.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={cookie.active ? "default" : "outline"}
                    className={cookie.active ? "bg-green-500" : ""}
                  >
                    {cookie.active ? t('admin.cookies.active') : t('admin.cookies.inactive')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cookie.active ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleCookieStatus(cookie.id, false)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t('admin.cookies.deactivate')}
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleCookieStatus(cookie.id, true)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {t('admin.cookies.activate')}
                    </Button>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => deleteCookie(cookie.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t('admin.cookies.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCookies;
