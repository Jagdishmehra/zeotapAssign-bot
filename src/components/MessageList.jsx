import React from 'react';
import '../styles/MessageList.css';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        message.type === 'bot' ? 
          <BotMessage key={message.id} content={message.content} /> : 
          <UserMessage key={message.id} content={message.content} />
      ))}
      
      {isTyping && (
        <div className="typing-indicator">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
