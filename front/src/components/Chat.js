import React from 'react';

function Chat({ messages, isLoading, currentView }) {
  return (
    <div className="chat-container">
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
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>생성 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
