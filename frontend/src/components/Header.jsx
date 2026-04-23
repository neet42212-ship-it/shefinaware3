"use client";
import React, { useState } from 'react';

export default function Header({ onLanguageChange, onProfileClick, userName = "Priya Devi" }) {
  const handleLangChange = (e) => {
    if (onLanguageChange) {
      onLanguageChange(e.target.value);
    }
  };

  return (
    <header>
      <a href="#" className="logo-wrap">
        <svg className="logo-symbol" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" stroke="#C9A245" strokeWidth="0.8" opacity="0.5"/>
          <circle cx="22" cy="22" r="13" stroke="#C9A245" strokeWidth="0.8" opacity="0.35"/>
          <path d="M8 26 Q22 8 36 26" stroke="#C9A245" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="22" cy="22" r="5" fill="#C9A245" opacity="0.9"/>
          <line x1="22" y1="4"  x2="22" y2="9"  stroke="#C9A245" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="32.5" y1="7.2" x2="29.8" y2="11.4" stroke="#C9A245" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
          <line x1="11.5" y1="7.2" x2="14.2" y2="11.4" stroke="#C9A245" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
          <line x1="39" y1="17" x2="34.5" y2="18.5" stroke="#C9A245" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
          <line x1="5"  y1="17" x2="9.5"  y2="18.5" stroke="#C9A245" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
          <line x1="22" y1="17" x2="22" y2="27" stroke="#DDB95A" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M19 21 L22 17 L25 21" fill="none" stroke="#DDB95A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 30 Q22 28 29 30" stroke="#C9A245" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
        </svg>

        <div className="logo-text-wrap">
          <div className="logo-name">SHEFINAWARE</div>
          <div className="logo-tagline">Financial Empowerment Initiative</div>
        </div>
      </a>

      <div className="header-right">
        <select className="lang-select" aria-label="Select Language" onChange={handleLangChange}>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
          <option value="bn">বাংলা</option>
          <option value="te">తెలుగు</option>
        </select>

        <div className="header-divider"></div>

        <div className="profile-btn" role="button" tabIndex="0" aria-label="My Profile" onClick={onProfileClick}>
          <div className="profile-avatar">👤</div>
          <div className="profile-name">{userName}</div>
        </div>
      </div>
    </header>
  );
}
