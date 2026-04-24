"use client";
import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', mobile: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await fetch(`https://shefinaware3.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        onLogin(data.user.name || 'User');
        onClose();
      } else {
        alert(data.error || 'Authentication Failed');
      }
    } catch (err) {
      alert('Error connecting to backend.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(30, 10, 14, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'var(--off-white)', padding: '32px', borderRadius: 'var(--card-r)', 
        width: '400px', border: '1px solid var(--cream-dark)', boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Cormorant Garant', color: 'var(--maroon)', fontSize: '24px' }}>
            {isLogin ? "Welcome Back" : "Join ArthSakhi"}
          </h2>
          <span style={{ cursor: 'pointer', fontSize: '18px', color: 'var(--text-muted)' }} onClick={onClose}>✕</span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" required
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ padding: '12px', border: '1px solid #E4D8C0', borderRadius: '8px', background: 'var(--cream)', fontSize: '14px' }}
            />
          )}
          <input type="text" placeholder="Mobile Number" required
            value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            style={{ padding: '12px', border: '1px solid #E4D8C0', borderRadius: '8px', background: 'var(--cream)', fontSize: '14px' }}
          />
          <input type="password" placeholder="Password" required
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ padding: '12px', border: '1px solid #E4D8C0', borderRadius: '8px', background: 'var(--cream)', fontSize: '14px' }}
          />

          <button type="submit" style={{
            background: 'var(--maroon)', color: 'var(--off-white)', padding: '14px', borderRadius: '8px', 
            border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px'
          }}>
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-light)' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: 'bold', marginLeft: '6px' }} 
            onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}
// update