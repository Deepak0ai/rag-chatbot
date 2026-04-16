import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const userQuery =
    messages[messages.length - 1]?.content?.toString() || "";

  // Simple RAG data
  const docs = [
    "We provide AI automation services.",
    "We help businesses with lead generation and workflows.",
    "Our platform integrates with CRM tools."
  ];

  const context = docs
    .filter(d => d.toLowerCase().includes(userQuery.toLowerCase()))
    .join('\n');

  const result = streamText({
  model: google('gemini-1.5-flash'),
  messages,
  system: "You are a helpful assistant.",
});

  return result.toTextStreamResponse(); // ✅ FIXED
}
