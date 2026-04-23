import React from 'react';

export default function VoiceFAB({ toggleChat }) {
  return (
    <button className="voice-fab" id="voiceButton" aria-label="Voice Assistant" onClick={toggleChat}>
      <div className="fab-pulse"></div>
      🎙️ &nbsp;Chat with ArthSakhi
    </button>
  );
}
