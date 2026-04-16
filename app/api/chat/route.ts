import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const docs = [
    "Our company provides AI automation services.",
    "We help businesses with lead generation and workflows.",
    "Our platform integrates with CRM tools."
  ];

  const context = docs.join('\n');

  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages,
    system: `You are a helpful AI assistant.
Answer ONLY using this context:
${context}`
  });

  return result.toTextStreamResponse();
}
