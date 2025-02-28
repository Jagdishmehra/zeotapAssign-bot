import React from 'react';
import '../styles/Message.css';
import { marked } from 'marked';

const BotMessage = ({ content }) => {
  // Parse markdown in the bot's messages
  const createMarkup = () => {
    return { __html: marked(content) };
  };

  return (
    <div className="message bot-message">
      <div className="avatar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C7.61 16.73 9.14 15.8 11 15.8C11.01 15.8 11.01 15.8 11.02 15.8C11.35 15.8 11.69 15.85 12 15.85C12.31 15.85 12.65 15.81 12.98 15.8C12.99 15.8 12.99 15.8 13 15.8C14.86 15.8 16.39 16.73 17.34 18.12C15.9 19.33 14.03 20 12 20Z" fill="#2A6BC1" />
        </svg>
      </div>
      <div className="content" dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

export default BotMessage;
