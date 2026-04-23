"use client";
import React, { useEffect, useState } from 'react';

export default function SchemeModal({ isOpen, onClose, userProfile }) {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch('http://localhost:5000/api/schemes')
        .then(res => res.json())
        .then(data => { 
          let tailoredSchemes = data;
          if (userProfile && userProfile.schemesMatched) {
            tailoredSchemes = data.slice(0, userProfile.schemesMatched);
          }
          setSchemes(tailoredSchemes); 
          setLoading(false); 
        })
        .catch(err => { console.error(err); setLoading(false); });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(30, 10, 14, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'var(--off-white)', padding: '32px', borderRadius: 'var(--card-r)', 
        width: '600px', maxHeight: '80vh', overflowY: 'auto', border: '1px solid var(--cream-dark)', boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garant', color: 'var(--maroon)', fontSize: '26px' }}>
            Recommended Govt. Schemes
          </h2>
          <span style={{ cursor: 'pointer', fontSize: '18px', color: 'var(--text-muted)' }} onClick={onClose}>✕</span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Loading recommendations...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {schemes.map((scheme, idx) => (
              <div key={idx} style={{
                background: 'var(--cream)', border: '1px solid var(--cream-deeper)', 
                borderRadius: '12px', padding: '16px'
              }}>
                <h3 style={{ color: 'var(--text-dark)', fontSize: '16px', marginBottom: '6px' }}>{scheme.name}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '13px', marginBottom: '12px' }}>{scheme.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 'bold' }}>
                    Benefit: ₹{scheme.benefitAmount?.toLocaleString() || 'Variable'}
                  </span>
                  <a href={scheme.url} target="_blank" rel="noreferrer" style={{
                    background: 'var(--gold)', color: 'var(--maroon-deep)', padding: '6px 12px', 
                    borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none'
                  }}>
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
            {schemes.length === 0 && <p>No schemes available currently.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
