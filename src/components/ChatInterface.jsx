import { useState, useRef, useEffect, useCallback } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';
import { processQuery } from '../services/queryProcessor';
import '../styles/ChatInterface.css';

// Helper function to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const ChatInterface = ({ docIndex }) => {
  const [messages, setMessages] = useState([
    { 
      id: generateId(), 
      type: 'bot', 
      content: 'Hello! I\'m your CDP Support Assistant. Ask me how-to questions about Segment, mParticle, Lytics, or Zeotap.'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive - improved scrolling logic
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling after DOM update
      requestAnimationFrame(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim()) return; // Prevent empty messages

    const userMsgId = generateId();
    const botMsgId = generateId();

    // Add user message
    setMessages(prev => [...prev, { id: userMsgId, type: 'user', content: text }]);
    setIsTyping(true);

    try {
      const response = await processQuery(text, docIndex);

      // Simulate bot typing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setMessages(prev => [...prev, { id: botMsgId, type: 'bot', content: response }]);
    } catch (error) {
      console.error("Error processing query:", error);
      setMessages(prev => [...prev, { id: botMsgId, type: 'bot', content: 'Sorry, I encountered an error processing your request.' }]);
    } finally {
      setIsTyping(false);
    }
  }, [docIndex]);

  return (
    <div className="chat-interface">
      <div className="message-list-container">
        <MessageList messages={messages} isTyping={isTyping} />
        <div ref={messagesEndRef} style={{ height: "1px", width: "100%" }} />
      </div>
      <InputArea onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatInterface;
