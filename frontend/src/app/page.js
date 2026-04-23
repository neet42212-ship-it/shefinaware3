"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import Dashboard from "@/components/Dashboard";
import Chatbot from "@/components/Chatbot";
import VoiceFAB from "@/components/VoiceFAB";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import SchemeModal from "@/components/SchemeModal";
import ToolsModal from "@/components/ToolsModal";
import VoiceNavigator from "@/components/VoiceNavigator";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [userProfile, setUserProfile] = useState(null);

  // Modal States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSchemesOpen, setIsSchemesOpen] = useState(false);
  const [toolType, setToolType] = useState(null);
  
  // Voice State
  const [isListening, setIsListening] = useState(false);

  // Fetch me on mount if token exists
  const fetchMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setUserProfile(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleLoginSuccess = () => {
    fetchMe(); // fetch comprehensive user metrics
  };

  return (
    <>
      <Header 
        onLanguageChange={setLang} 
        onProfileClick={() => setIsAuthOpen(true)}
        userName={userProfile ? userProfile.name : "Sign In"}
      />
      <main>
        <HeroBanner lang={lang} />
        <Dashboard 
          lang={lang} 
          userProfile={userProfile}
          onSchemesClick={() => setIsSchemesOpen(true)}
          onToolClick={(type) => setToolType(type)}
          onAccessibilityClick={() => setIsChatOpen(true)}
          onVoiceNavClick={() => setIsListening(true)}
        />
      </main>
      <VoiceFAB toggleChat={() => setIsChatOpen(!isChatOpen)} />
      <Chatbot isOpen={isChatOpen} toggleChat={() => setIsChatOpen(!isChatOpen)} />
      
      <VoiceNavigator 
        isListening={isListening} 
        setIsListening={setIsListening}
        onToolClick={(type) => setToolType(type)}
        onSchemesClick={() => setIsSchemesOpen(true)}
        toggleChat={() => setIsChatOpen(true)}
        lang={lang}
      />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLoginSuccess}
      />
      <SchemeModal 
        isOpen={isSchemesOpen} 
        onClose={() => setIsSchemesOpen(false)} 
        userProfile={userProfile}
      />
      <ToolsModal
        isOpen={!!toolType}
        onClose={() => setToolType(null)}
        toolType={toolType}
        userProfile={userProfile}
        onProfileUpdate={fetchMe}
        lang={lang}
      />
      
      <Footer />
    </>
  );
}
