import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO 
        title={t('pages.terms.title')}
        description={t('pages.terms.description')}
        canonicalUrl="/terms-of-service"
      />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t('pages.terms.title')}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Please read these terms of service carefully before using Online Tools Hub.
          </p>
          
          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily use the materials (information or software) on Online Tools Hub for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Online Tools Hub;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          
          <h2>Disclaimer</h2>
          <p>
            The materials on Online Tools Hub are provided on an 'as is' basis. Online Tools Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          
          <h2>Limitations</h2>
          <p>
            In no event shall Online Tools Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Online Tools Hub, even if Online Tools Hub or a Online Tools Hub authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          
          <h2>Accuracy of materials</h2>
          <p>
            The materials appearing on Online Tools Hub could include technical, typographical, or photographic errors. Online Tools Hub does not warrant that any of the materials on its website are accurate, complete or current. Online Tools Hub may make changes to the materials contained on its website at any time without notice. However Online Tools Hub does not make any commitment to update the materials.
          </p>
          
          <h2>Links</h2>
          <p>
            Online Tools Hub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Online Tools Hub of the site. Use of any such linked website is at the user's own risk.
          </p>
          
          <h2>Modifications</h2>
          <p>
            Online Tools Hub may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
