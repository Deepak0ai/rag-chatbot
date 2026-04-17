"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.content || "No response",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Error getting response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0f172a 45%, #020617 100%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        padding: "24px",
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>
            🚀 RAG Chatbot
          </h1>
          <p style={{ margin: "8px 0 0", color: "#cbd5e1" }}>
            Ask about the company, services, or tech stack
          </p>
        </div>

        <section
          style={{
            flex: 1,
            background: "rgba(15, 23, 42, 0.78)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "24px",
            padding: "20px",
            minHeight: "68vh",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", paddingRight: "4px" }}>
            {messages.length === 0 ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  textAlign: "center",
                  padding: "40px 20px",
                }}
              >
                Start chatting. Try: “What services do you provide?”
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      m.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "12px 16px",
                      borderRadius: "18px",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      background:
                        m.role === "user"
                          ? "linear-gradient(135deg, #2563eb, #3b82f6)"
                          : "rgba(30, 41, 59, 0.95)",
                      border:
                        m.role === "assistant"
                          ? "1px solid rgba(148, 163, 184, 0.18)"
                          : "none",
                      color: "white",
                      boxShadow:
                        m.role === "user"
                          ? "0 12px 25px rgba(37, 99, 235, 0.35)"
                          : "none",
                    }}
                  >
                    <b style={{ display: "block", marginBottom: "6px" }}>
                      {m.role === "user" ? "You" : "Assistant"}
                    </b>
                    {m.content}
                  </div>
                </div>
              ))
            )}

            {loading && (
              <div style={{ color: "#94a3b8", paddingLeft: "6px" }}>
                Assistant is typing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{
              display: "flex",
              gap: "12px",
              paddingTop: "8px",
              borderTop: "1px solid rgba(148, 163, 184, 0.14)",
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              style={{
                flex: 1,
                resize: "none",
                borderRadius: "16px",
                border: "1px solid rgba(148, 163, 184, 0.18)",
                background: "rgba(2, 6, 23, 0.75)",
                color: "white",
                padding: "14px 16px",
                outline: "none",
                fontSize: "16px",
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                border: "none",
                borderRadius: "16px",
                padding: "14px 22px",
                background: loading
                  ? "linear-gradient(135deg, #475569, #64748b)"
                  : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 12px 25px rgba(37, 99, 235, 0.25)",
              }}
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
