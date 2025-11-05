
// components/patient/AIChatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { sendMessageToGroq } from '../../services/groqService';
import '../../styles/patient.css';

function AIChatbot({ user }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste ${user.name}! I'm your Ayurvedic health assistant. I can help you with:\n\n• Ayurvedic diet advice\n• Nutrition guidance\n• Dosha balancing tips\n• Healthy lifestyle recommendations\n• Understanding your diet chart\n\nHow can I assist you today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
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
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const aiResponse = await sendMessageToGroq(userMessage, conversationHistory);
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or contact your dietitian for personalized advice.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What should I eat for better digestion?",
    "How can I balance my Pitta dosha?",
    "What foods are good for weight loss?",
    "Can you explain my diet chart?",
    "What are Ayurvedic superfoods?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Health Assistant</h1>
        <p className="page-subtitle">Get instant Ayurvedic health guidance</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h2>Ayurvedic AI Assistant</h2>
          <p>Ask me anything about Ayurvedic diet and wellness</p>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              <div className="chat-message-avatar">
                {message.role === 'assistant' ? '🤖' : user.name.charAt(0)}
              </div>
              <div className="chat-message-content">
                <div className="chat-message-text">{message.content}</div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-message assistant">
              <div className="chat-message-avatar">🤖</div>
              <div className="chat-message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <p className="quick-questions-title">Quick questions to get started:</p>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-container">
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <textarea
              className="chat-input"
              placeholder="Type your question here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              rows="1"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="chat-send-btn"
              disabled={isLoading || !inputMessage.trim()}
            >
              ➤
            </button>
          </form>
        </div>
      </div>

      <div className="chat-disclaimer">
        <p>⚠️ This AI assistant provides general Ayurvedic guidance. For personalized medical advice, please consult with your dietitian or healthcare provider.</p>
      </div>
    </div>
  );
}

export default AIChatbot;
