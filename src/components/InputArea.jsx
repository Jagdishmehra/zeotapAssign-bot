import { useState } from 'react';
import '../styles/InputArea.css';

const InputArea = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question about CDPs..."
        disabled={disabled}
      />
      <button type="submit" disabled={!input.trim() || disabled}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
        </svg>
      </button>
    </form>
  );
};

export default InputArea;
