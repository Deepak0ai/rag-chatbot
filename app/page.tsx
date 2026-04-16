'use client';

import { useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e: any) => {
    e.preventDefault();

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [...messages, userMsg],
      }),
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: data.text },
    ]);

    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto' }}>
      <h2>RAG Chatbot</h2>

      <div style={{ minHeight: 300 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
