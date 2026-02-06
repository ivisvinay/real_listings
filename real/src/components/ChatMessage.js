import React from 'react';

const ChatMessage = ({ message }) => {
  const formatMessage = (text) => {
    // Convert markdown-style bold to HTML
    const boldText = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    return { __html: boldText };
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
      <div 
        className="message-content"
        dangerouslySetInnerHTML={formatMessage(message.text)}
      />
      <div className="message-time">
        {formatTime(message.timestamp)}
        {message.sender === 'user' && (
          <span className="message-status">✓✓</span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
