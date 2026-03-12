import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const { language } = useLanguage();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock AI reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Thank you for contacting Time Craft Concierge. One of our specialists will be with you shortly.", 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '30px', 
      right: language === 'ar' ? 'auto' : '30px',
      left: language === 'ar' ? '30px' : 'auto', 
      zIndex: 1000 
    }}>
      {isOpen ? (
        <div className="card shadow-lg animate-scaleIn" style={{ 
          width: '320px', 
          height: '450px', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--color-border-light)'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px', 
            background: 'var(--color-bg-tertiary)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50' }}></div>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Concierge Chat</span>
            </div>
            <button className="btn-icon" onClick={() => setIsOpen(false)} style={{ padding: '4px' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                lineHeight: 1.4,
                background: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
                color: msg.sender === 'user' ? '#fff' : 'var(--color-text)',
                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                borderBottomLeftRadius: msg.sender === 'ai' ? '2px' : '12px',
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid var(--color-border-light)', display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: '1px solid var(--color-border)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                background: 'var(--color-bg)',
                color: 'var(--color-text)'
              }}
            />
            <button type="submit" className="btn-icon" style={{ background: 'var(--color-primary)', color: '#fff' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          className="btn-icon shadow-lg animate-badgeGlow" 
          onClick={() => setIsOpen(true)}
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'var(--color-primary)', 
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
