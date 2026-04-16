'use client';

import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text },
      ]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Error getting response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0f172a',
      color: 'white'
    }}>
      
      <h2 style={{ textAlign: 'center', padding: 20 }}>
        🚀 RAG Chatbot
      </h2>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 20
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: 10
          }}>
            <div style={{
              padding: '10px 15px',
              borderRadius: 12,
              background: m.role === 'user' ? '#2563eb' : '#1e293b',
              maxWidth: '70%'
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <p style={{ opacity: 0.6 }}>AI is typing...</p>
        )}
      </div>

      <form onSubmit={sendMessage} style={{
        display: 'flex',
        padding: 10,
        borderTop: '1px solid #333'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: 'none',
            outline: 'none',
            marginRight: 10
          }}
        />
        <button type="submit" style={{
          padding: '12px 20px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 8
        }}>
          Send
        </button>
      </form>
    </div>
  );
}
