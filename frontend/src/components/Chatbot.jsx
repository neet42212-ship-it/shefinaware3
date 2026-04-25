"use client";
import React, { useState } from 'react';

export default function Chatbot({ isOpen, toggleChat }) {
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello 👋 Ask me about loans, savings or schemes.' }
  ]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    
    const msg = inputVal.trim();
    setMessages(prev => [...prev, { type: 'user', text: msg }]);
    setInputVal("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: "Sorry, the AI assistant is currently unavailable." }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chatbot-popup" style={{ display: isOpen ? 'flex' : 'none' }}>
      <div className="chatbot-header">
        <span>ArthSakhi Assistant</span>
        <span style={{ cursor: 'pointer' }} onClick={toggleChat}>✕</span>
      </div>

      <div className="chatbot-body" id="chatBody">
        {messages.map((m, idx) => (
          <div key={idx} className={m.type === 'bot' ? 'bot-msg' : 'user-msg'}>
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', padding: '12px', borderTop: '1px solid #EDE4D0' }}>
        <input 
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question..."
          style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #EDE4D0', outline: 'none' }}
        />
        <button 
          onClick={handleSend}
          style={{ marginLeft: '8px', background: '#5C1A28', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
