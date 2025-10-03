import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAI } from '../hooks/useAI';
import '../styles/AIChat.css';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      'Hi! I\'m your FocusMate assistant. Ask me anything about studying smarter, building strong habits, or staying productive.',
    createdAt: new Date().toISOString()
  }
];

export function AIChat() {
  const { messages, sendMessage, isLoading, error, resetChat } = useAI(INITIAL_MESSAGES);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className={`ai-chat ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="ai-chat__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="ai-chat-panel"
      >
        <span className="ai-chat__toggle-label">FocusMate AI</span>
      </button>

      <section id="ai-chat-panel" className="ai-chat__panel" aria-hidden={!isOpen}>
        <header className="ai-chat__header">
          <div>
            <h2>FocusMate Assistant</h2>
            <p>Your guide to smarter study and productivity habits.</p>
          </div>
          <div className="ai-chat__header-actions">
            <button type="button" onClick={resetChat} className="ai-chat__ghost-button">
              Reset
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ai-chat__ghost-button"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
        </header>

        <div className="ai-chat__body">
          <div className="ai-chat__messages" role="log" aria-live="polite">
            {hasMessages &&
              messages.map((message) => (
                <article
                  key={message.id}
                  className={`ai-chat__message ai-chat__message--${message.role}`}
                >
                  <div className="ai-chat__message-meta">
                    {message.role === 'assistant' ? 'FocusMate AI' : 'You'}
                  </div>
                  <div className="ai-chat__bubble">
                    {message.content.split('\n').map((segment, index) => (
                      <p key={index}>{segment}</p>
                    ))}
                  </div>
                </article>
              ))}
            {isLoading && (
              <article className="ai-chat__message ai-chat__message--assistant">
                <div className="ai-chat__message-meta">FocusMate AI</div>
                <div className="ai-chat__bubble ai-chat__bubble--typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </article>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <footer className="ai-chat__footer">
          <form onSubmit={handleSubmit} className="ai-chat__form">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about focus routines, study strategies, or habit-building..."
              rows={1}
              maxLength={1000}
              disabled={isLoading}
              className="ai-chat__input"
            />
            <button type="submit" className="ai-chat__send" disabled={isLoading || !inputValue.trim()}>
              Send
            </button>
          </form>
          {error && <p className="ai-chat__error" role="alert">{error}</p>}
        </footer>
      </section>
    </div>
  );
}