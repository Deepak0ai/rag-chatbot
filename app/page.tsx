"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const bottomRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen bg-[#0f172a] text-white flex flex-col">
      {/* HEADER */}
      <div className="p-4 border-b border-gray-700 text-center text-lg font-semibold">
        🚀 RAG Chatbot
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-400 text-sm">Typing...</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT BAR */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-700 flex gap-2"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
