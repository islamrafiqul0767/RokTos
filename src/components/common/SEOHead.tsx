import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SITE_CONFIG } from '../../config/siteConfig.ts';

interface SEOHeadProps {
  title: string;
  description: string;
  noindex?: boolean;
  canonicalPath?: string;
  jsonLd?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  noindex = false,
  canonicalPath = '',
  jsonLd,
}) => {
  const { language } = useLanguage();
  const fullTitle = `${title} | ${language === 'bn' ? SITE_CONFIG.nameBn : SITE_CONFIG.nameEn}`;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const currentOrigin = window.location.origin;
    linkCanonical.setAttribute('href', `${currentOrigin}${canonicalPath}`);

    // Update JSON-LD structured data
    let scriptJsonLd = document.querySelector('script[data-schema="roktobondhu-schema"]');
    if (jsonLd) {
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        scriptJsonLd.setAttribute('data-schema', 'roktobondhu-schema');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(jsonLd);
    } else if (scriptJsonLd) {
      scriptJsonLd.remove();
    }
  }, [fullTitle, description, noindex, canonicalPath, jsonLd]);

  return null;
};
