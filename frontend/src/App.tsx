import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from './i18n/LanguageContext'
import Layout from './components/layout/Layout'

import HomePage from './pages/HomePage'
import YouTubeDownloader from './pages/YouTubeDownloader'
import FacebookDownloader from './pages/FacebookDownloader'
import TikTokDownloader from './pages/TikTokDownloader'
import InstagramDownloader from './pages/InstagramDownloader'
import TwitterDownloader from './pages/TwitterDownloader'
import RedditDownloader from './pages/RedditDownloader'
import PinterestDownloader from './pages/PinterestDownloader'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import './index.css'

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
              <Route path="/facebook-downloader" element={<FacebookDownloader />} />
              <Route path="/tiktok-downloader" element={<TikTokDownloader />} />
              <Route path="/instagram-downloader" element={<InstagramDownloader />} />
              <Route path="/twitter-downloader" element={<TwitterDownloader />} />
              <Route path="/reddit-downloader" element={<RedditDownloader />} />
              <Route path="/pinterest-downloader" element={<PinterestDownloader />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  )
}

export default App
