'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>RAG Chatbot</h1>

      {messages.map(m => (
        <div key={m.id}>
          <b>{m.role}:</b> {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask..."
        />
      </form>
    </div>
  );
}