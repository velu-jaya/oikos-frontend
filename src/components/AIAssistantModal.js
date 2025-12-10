'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistantModal.module.css';

export default function AIAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: "Hello! I'm your AI assistant. Tell me what kind of property you're looking for, and I'll help you find the perfect match. You can describe your preferences like location, budget, property type, amenities, etc."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        text: `Based on your preferences for "${inputValue}", I found several great options. I'm filtering properties that match your criteria. Would you like me to refine the search further?`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <div className={styles.headerText}>
              <h2 className={styles.title}>AI Assistant - Find Property</h2>
              <p className={styles.subtitle}>Get personalized help with AI-powered assistance</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.type]}`}
            >
              {message.type === 'assistant' && (
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              )}
              <p>{message.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className={styles.message + ' ' + styles.assistant}>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading || !inputValue.trim()}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
