import React, { useEffect, useRef } from 'react';

function Chat({ messages, isLoading, currentView }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.type}`}>
          <div className="message-content">
            {message.type === 'assistant' && currentView === 'image' ? (
              <img src={message.content} alt="Generated" className="generated-image" />
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>생성 중입니다...</p>
        </div>
      )}
    </div>
  );
}

export default Chat;
