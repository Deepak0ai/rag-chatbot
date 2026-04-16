'use client';

import { useChat } from 'ai/react';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>RAG Chatbot</h1>

      {messages.map((m) => (
        <div key={m.id}>
          <b>{m.role === 'user' ? 'You' : 'AI'}:</b> {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          style={{ width: '100%', padding: 10 }}
        />
      </form>
    </div>
  );
}
