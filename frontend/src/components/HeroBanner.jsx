import React from 'react';
import { locales } from '../utils/locales';

export default function HeroBanner({ lang = "en" }) {
  const t = (key) => locales[lang]?.[key] || locales['en'][key];

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <div className="hero-badges">
          <span className="badge">✓ RBI Registered Partners</span>
          <span className="badge">✓ Rural & Urban Support</span>
          <span className="badge">✓ ISO 27001 Secure</span>
        </div>
      </div>
    </div>
  );
}
