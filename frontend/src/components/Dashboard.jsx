"use client";
import React, { useState } from 'react';
import { locales } from '../utils/locales';

export default function Dashboard({ lang = "en", onSchemesClick, onToolClick, onAccessibilityClick, onVoiceNavClick, userProfile }) {
  const [openCard, setOpenCard] = useState('c1');
  
  // Real-time Live Stats Simulator
  const [liveUsers, setLiveUsers] = React.useState(3204592);
  const [liveDisbursed, setLiveDisbursed] = React.useState(840.12);
  const [repaymentRate, setRepaymentRate] = React.useState(94.2);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live network activity every few seconds
      setLiveUsers(prev => prev + Math.floor(Math.random() * 4) + 1);
      setLiveDisbursed(prev => prev + (Math.random() * 0.02));
      setRepaymentRate(prev => {
        const change = (Math.random() * 0.02) - 0.01;
        return Math.min(99.9, Math.max(90.0, prev + change));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  
  const t = (key) => locales[lang]?.[key] || locales['en'][key];

  const toggleCard = (id) => setOpenCard(openCard === id ? null : id);

  const userName = userProfile?.name || "Sign In";
  const streak = userProfile?.progress?.streak || 0;
  const profileStr = userProfile?.progress?.profileStrength || 0;
  const modules = userProfile?.progress?.modulesCompleted || 0;
  const goalSavings = parseFloat(userProfile?.savingsGoal) || 0;
  const currentSavings = parseFloat(userProfile?.currentSavings) || 0;
  const schemesMatched = userProfile?.schemesMatched || 0;
  const savingsPercent = goalSavings > 0 ? Math.min(100, Math.round((currentSavings / goalSavings) * 100)) : 0;

  return (
    <div className="page-wrap">
      <div className="welcome-row">
        <div className="welcome-left">
          <h2>{t('greeting')}, <span>{userName}</span></h2>
          <p>{t('modules_done').replace('{count}', modules)}</p>
        </div>
        <div className="streak-pill">
          <div>
            <div className="streak-num">{streak}</div>
            <div className="streak-label">{t('day_streak')}</div>
            <div className="streak-info">{t('active_learner')}</div>
          </div>
        </div>
      </div>

      <div className="progress-strip">
        <div className="prog-tile t1">
          <div className="pt-val">{profileStr}%</div>
          <div className="pt-label">{t('profile_strength')}</div>
          <div className="pt-bar"><div className="pt-fill" style={{ width: `${profileStr}%` }}></div></div>
        </div>
        <div className="prog-tile t2">
          <div className="pt-val">{modules} / 6</div>
          <div className="pt-label">{t('modules_completed')}</div>
          <div className="pt-bar"><div className="pt-fill" style={{ width: `${(modules/6)*100}%` }}></div></div>
        </div>
        <div className="prog-tile t3">
          <div className="pt-val">₹{currentSavings} / ₹{goalSavings}</div>
          <div className="pt-label">{t('goal_savings')}</div>
          <div className="pt-bar"><div className="pt-fill" style={{ width: `${savingsPercent}%` }}></div></div>
        </div>
        <div className="prog-tile t4">
          <div className="pt-val">{schemesMatched}</div>
          <div className="pt-label">{t('schemes_matched')}</div>
          <div className="pt-bar"><div className="pt-fill" style={{ width: '100%' }}></div></div>
        </div>
      </div>

      <div className="section-heading">
        <div className="sh-line"></div>
        <div className="sh-text">{t('your_dashboard')}</div>
        <div className="sh-line"></div>
      </div>

      <div className="cards-grid">
        
        {/* CARD 1 — Accessibility */}
        <div className={`card ${openCard === 'c1' ? 'open' : ''}`} onClick={() => toggleCard('c1')}>
          <div className="card-bar bar-maroon"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-maroon">🎙️</div>
            <div className="card-title-area">
              <div className="card-name">{t('c1_title')}</div>
              <div className="card-desc">{t('c1_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-maroon" onClick={(e) => { e.preventDefault(); if (onVoiceNavClick) onVoiceNavClick(); }}>
                <div className="si-icon-box">🎤</div>
                <div className="si-text">
                  <div className="si-name">{t('c1_i1')}</div>
                  <div className="si-note">{t('c1_i1_d')}</div>
                </div>
                <div className="si-chevron"></div>
              </a>
              <a href="#" className="sub-item si-maroon" onClick={(e) => { e.preventDefault(); if (onAccessibilityClick) onAccessibilityClick(); }}>
                <div className="si-icon-box">🤖</div>
                <div className="si-text">
                  <div className="si-name">{t('c1_i2')}</div>
                  <div className="si-note">{t('c1_i2_d')}</div>
                </div>
                <div className="si-chevron"></div>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 2 — Learning & Development */}
        <div className={`card ${openCard === 'c2' ? 'open' : ''}`} onClick={() => toggleCard('c2')}>
          <div className="card-bar bar-saffron"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-saffron">📖</div>
            <div className="card-title-area">
              <div className="card-name">{t('c2_title')}</div>
              <div className="card-desc">{t('c2_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-saffron" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('learning'); }}>
                <div className="si-icon-box">💡</div>
                <div className="si-text"><div className="si-name">{t('c2_i1')}</div><div className="si-note">{t('c2_i1_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
              <a href="#" className="sub-item si-saffron" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('learning'); }}>
                <div className="si-icon-box">🏛️</div>
                <div className="si-text"><div className="si-name">{t('c2_i2')}</div><div className="si-note">{t('c2_i2_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 3 — Smart Advisory */}
        <div className={`card ${openCard === 'c3' ? 'open' : ''}`} onClick={() => toggleCard('c3')}>
          <div className="card-bar bar-gold"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-gold">✦</div>
            <div className="card-title-area">
              <div className="card-name">{t('c3_title')}</div>
              <div className="card-desc">{t('c3_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-gold" onClick={(e) => { e.preventDefault(); if (onSchemesClick) onSchemesClick(); }}>
                <div className="si-icon-box">🎯</div>
                <div className="si-text"><div className="si-name">{t('c3_i1')}</div><div className="si-note">{t('c3_i1_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
            </div>
            <div className="card-cta-wrap">
              <button className="card-cta cta-gold" onClick={(e) => { e.stopPropagation(); if (onSchemesClick) onSchemesClick(); }}>{t('c3_btn')}</button>
            </div>
          </div>
        </div>

        {/* CARD 4 — Financial Tools */}
        <div className={`card ${openCard === 'c4' ? 'open' : ''}`} onClick={() => toggleCard('c4')}>
          <div className="card-bar bar-maroon"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-maroon">⚖️</div>
            <div className="card-title-area">
              <div className="card-name">{t('c4_title')}</div>
              <div className="card-desc">{t('c4_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-maroon" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('budget'); }}>
                <div className="si-icon-box">📋</div>
                <div className="si-text"><div className="si-name">{t('c4_i1')}</div><div className="si-note">{t('c4_i1_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
              <a href="#" className="sub-item si-maroon" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('savings'); }}>
                <div className="si-icon-box">🏦</div>
                <div className="si-text"><div className="si-name">{t('c4_i2')}</div><div className="si-note">{t('c4_i2_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
              <a href="#" className="sub-item si-maroon" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('loan_calc'); }}>
                <div className="si-icon-box">🧮</div>
                <div className="si-text"><div className="si-name">{t('c4_i3')}</div><div className="si-note">{t('c4_i3_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 5 — Protection & Security */}
        <div className={`card ${openCard === 'c5' ? 'open' : ''}`} onClick={() => toggleCard('c5')}>
          <div className="card-bar bar-saffron"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-saffron">🛡️</div>
            <div className="card-title-area">
              <div className="card-name">{t('c5_title')}</div>
              <div className="card-desc">{t('c5_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-saffron" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('fraud_awareness'); }}>
                <div className="si-icon-box">⚠️</div>
                <div className="si-text"><div className="si-name">{t('c5_i1')}</div><div className="si-note">{t('c5_i1_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
              <a href="#" className="sub-item si-saffron" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('scam_detect'); }}>
                <div className="si-icon-box">📱</div>
                <div className="si-text"><div className="si-name">{t('c5_i2')}</div><div className="si-note">{t('c5_i2_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
            </div>
          </div>
        </div>

        {/* CARD 6 — Growth Tracker */}
        <div className={`card ${openCard === 'c6' ? 'open' : ''}`} onClick={() => toggleCard('c6')}>
          <div className="card-bar bar-gold"></div>
          <div className="card-head">
            <div className="card-icon-wrap ci-gold">🌅</div>
            <div className="card-title-area">
              <div className="card-name">{t('c6_title')}</div>
              <div className="card-desc">{t('c6_desc')}</div>
            </div>
            <div className="card-toggle"><div className="toggle-icon"></div></div>
          </div>
          <div className="card-separator"></div>
          <div className="card-body">
            <div className="sub-items">
              <a href="#" className="sub-item si-gold" onClick={(e) => { e.preventDefault(); if (onToolClick) onToolClick('growth'); }}>
                <div className="si-icon-box">🎯</div>
                <div className="si-text"><div className="si-name">{t('c6_i1')}</div><div className="si-note">{t('c6_i1_d')}</div></div>
                <div className="si-chevron"></div>
              </a>
            </div>
          </div>
        </div>

      </div>{/* /cards-grid */}
      
      {/* INSIGHT BAND (Now Real-Time) */}
      <div className="insight-band">
        <div className="ib-item">
          <div className="ib-val">{liveUsers.toLocaleString()}</div>
          <div className="ib-label">Women on Platform</div>
          <div className="ib-bar"><div className="ib-fill" style={{ width: '82%' }}></div></div>
        </div>
        <div className="ib-divider"></div>
        <div className="ib-item">
          <div className="ib-val">₹{liveDisbursed.toFixed(2)}Cr</div>
          <div className="ib-label">Total Disbursed</div>
          <div className="ib-bar"><div className="ib-fill" style={{ width: '68%' }}></div></div>
        </div>
        <div className="ib-divider"></div>
        <div className="ib-item">
          <div className="ib-val">{repaymentRate.toFixed(1)}%</div>
          <div className="ib-label">Repayment Rate</div>
          <div className="ib-bar"><div className="ib-fill" style={{ width: `${repaymentRate}%` }}></div></div>
        </div>
        <div className="ib-divider"></div>
        <div className="ib-item">
          <div className="ib-val">28</div>
          <div className="ib-label">States Active</div>
          <div className="ib-bar"><div className="ib-fill" style={{ width: '100%' }}></div></div>
        </div>
      </div>
    </div>
  );
}
