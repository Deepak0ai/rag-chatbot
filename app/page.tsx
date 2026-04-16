"use client";

import { useState } from "react";

export default function Page() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.text || "No response" },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error getting response." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      color: "white"
    }}>
      <h1>🚀 RAG Chatbot</h1>

      <div style={{
        border: "1px solid #444",
        padding: 20,
        minHeight: 300,
        borderRadius: 10
      }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything..."
        style={{ width: "80%", marginTop: 10 }}
      />

      <button onClick={sendMessage}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
