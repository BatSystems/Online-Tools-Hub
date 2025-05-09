import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Cookie, Link as LinkIcon, LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [messageCount, setMessageCount] = useState(0);
  const [cookieCount, setCookieCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const messagesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/contact/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (messagesResponse.ok) {
          const messagesData = await messagesResponse.json();
          setMessageCount(messagesData.total);
        }

        const cookiesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/cookies/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (cookiesResponse.ok) {
          const cookiesData = await cookiesResponse.json();
          setCookieCount(cookiesData.total);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <AdminLayout title={t('admin.dashboard.title')}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.dashboard.messages')}
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : messageCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('admin.dashboard.totalMessages')}
            </p>
            <Link 
              to="/admin/messages" 
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block"
            >
              {t('admin.dashboard.viewMessages')}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.dashboard.cookies')}
            </CardTitle>
            <Cookie className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : cookieCount}</div>
            <p className="text-xs text-muted-foreground">
              {t('admin.dashboard.totalCookies')}
            </p>
            <Link 
              to="/admin/cookies" 
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block"
            >
              {t('admin.dashboard.manageCookies')}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('admin.dashboard.urlShortener')}
            </CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t('admin.dashboard.urlShortenerDescription')}
            </p>
            <Link 
              to="/url-shortener" 
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block"
            >
              {t('admin.dashboard.goToUrlShortener')}
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('admin.dashboard.logout')}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
