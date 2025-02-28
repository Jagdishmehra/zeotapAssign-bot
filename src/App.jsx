import { useState, useEffect } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import { processDocs } from './services/docProcessor'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [docIndex, setDocIndex] = useState(null);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const index = await processDocs();
        setDocIndex(index);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load documentation:", error);
      }
    };
    
    loadDocs();
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>CDP Support Agent Chatbot</h1>
        <p>Ask how-to questions about Segment, mParticle, Lytics, and Zeotap</p>
      </header>
      
      <main>
        {isLoading ? (
          <div className="loading">Loading documentation data...</div>
        ) : (
          <ChatInterface docIndex={docIndex} />
        )}
      </main>
      
      <footer>
        <p>Documentation sources: Segment, mParticle, Lytics, and Zeotap</p>
      </footer>
    </div>
  )
}

export default App
