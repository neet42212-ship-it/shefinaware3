"use client";
import React, { useEffect, useState } from 'react';

export default function VoiceNavigator({ isListening, setIsListening, onToolClick, onSchemesClick, toggleChat, lang }) {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!isListening) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser does not support Voice Navigation. Please use Google Chrome or Edge.");
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Configure based on selected language
    let langCode = 'en-IN';
    if (lang === 'hi') langCode = 'hi-IN';
    if (lang === 'pa') langCode = 'pa-IN';
    if (lang === 'bn') langCode = 'bn-IN';
    if (lang === 'te') langCode = 'te-IN';
    recognition.lang = langCode;
    
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
      
      const text = currentTranscript.toLowerCase();
      
      // Intent Mapping
      if (text.includes("scheme") || text.includes("योजना") || text.includes("ਸਕੀਮ") || text.includes("স্কিম") || text.includes("పథకం")) {
        onSchemesClick();
        setIsListening(false);
      } else if (text.includes("calc") || text.includes("loan") || text.includes("ऋण") || text.includes("ਕਰਜ਼ਾ") || text.includes("ঋণ") || text.includes("రుణం")) {
        onToolClick('loan_calc');
        setIsListening(false);
      } else if (text.includes("learn") || text.includes("education") || text.includes("शिक्षा") || text.includes("ਸਿੱਖਿਆ") || text.includes("শিক্ষা") || text.includes("చదువు")) {
        onToolClick('learning');
        setIsListening(false);
      } else if (text.includes("scam") || text.includes("fraud") || text.includes("धोखा") || text.includes("ਧੋਖਾ") || text.includes("প্রতারণা") || text.includes("మోసం")) {
        onToolClick('scam_detect');
        setIsListening(false);
      } else if (text.includes("close") || text.includes("stop") || text.includes("बंद") || text.includes("ਬੰਦ") || text.includes("বন্ধ") || text.includes("మూసివేయి")) {
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice Error: ", event.error);
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      recognition.stop();
      setTranscript('');
    };
  }, [isListening, lang, onSchemesClick, onToolClick, setIsListening, toggleChat]);

  if (!isListening) return null;

  return (
    <div style={{
      position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(30, 10, 14, 0.9)', color: '#fff', padding: '12px 24px',
      borderRadius: '30px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)', minWidth: '300px', justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="fab-pulse" style={{ width: '12px', height: '12px', background: 'red', position: 'relative', top: 0, left: 0 }}></div>
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Listening...</span>
      </div>
      <div style={{ fontStyle: 'italic', color: '#ffd28c', fontSize: '13px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '200px' }}>
        "{transcript || 'Say schemes, calculator, learn...'}"
      </div>
      <button onClick={() => setIsListening(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>✕</button>
    </div>
  );
}
