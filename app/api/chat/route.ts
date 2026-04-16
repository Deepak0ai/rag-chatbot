import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const docs = [
    "Our company provides AI automation services.",
    "We help businesses with lead generation and workflows.",
    "Our platform integrates with CRM tools."
  ];

  const context = docs.join('\n');

  const userMessage = messages[messages.length - 1]?.content || "";

  const result = await generateText({
    model: google('gemini-1.5-flash'),
    prompt: `
You are a helpful AI assistant.

Answer ONLY using this context:
${context}

User question: ${userMessage}
`
  });

  return new Response(
    JSON.stringify({
      role: "assistant",
      content: result.text
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
