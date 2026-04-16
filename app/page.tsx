'use client';

import { useChat } from 'ai/react';

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  } = useChat({
    api: '/api/chat'
  });

  return (
    <div style={{
      maxWidth: 600,
      margin: '50px auto',
      fontFamily: 'Arial'
    }}>
      <h2 style={{ textAlign: 'center' }}>RAG Chatbot</h2>

      <div style={{
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 20,
        height: 400,
        overflowY: 'auto',
        marginBottom: 10
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.role === 'user' ? 'right' : 'left',
            margin: '10px 0'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 15px',
              borderRadius: 10,
              background: m.role === 'user' ? '#0070f3' : '#eee',
              color: m.role === 'user' ? '#fff' : '#000'
            }}>
              {m.content}
            </span>
          </div>
        ))}

        {isLoading && (
          <p style={{ color: 'gray' }}>AI is typing...</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: '1px solid #ccc'
          }}
        />
      </form>
    </div>
  );
}
