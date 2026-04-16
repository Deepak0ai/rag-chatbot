'use client';

import { useChat } from 'ai/react';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useChat();

  return (
    <div style={{
      maxWidth: 700,
      margin: 'auto',
      padding: 20,
      fontFamily: 'Arial'
    }}>
      <h1 style={{ textAlign: 'center' }}>RAG Chatbot</h1>

      <div style={{
        minHeight: 400,
        border: '1px solid #ddd',
        padding: 10,
        marginBottom: 10
      }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              margin: '10px 0',
              textAlign: m.role === 'user' ? 'right' : 'left'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: 10,
                borderRadius: 10,
                background:
                  m.role === 'user' ? '#0070f3' : '#e5e5ea',
                color: m.role === 'user' ? 'white' : 'black'
              }}
            >
              {m.content}
            </span>
          </div>
        ))}

        {isLoading && <p>AI is typing...</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          style={{
            width: '100%',
            padding: 12,
            borderRadius: 8,
            border: '1px solid #ccc'
          }}
        />
      </form>
    </div>
  );
}
