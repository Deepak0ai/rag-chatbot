import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const body: any = await req.json();
  const messages = body.messages || [];

  const userQuery =
    messages[messages.length - 1]?.content?.toString() || "";

  const docs = [
    "Our company provides AI automation services.",
    "We help businesses with lead generation and workflows.",
    "Our platform integrates with CRM tools."
  ];

  const context = docs
    .filter((d: string) =>
      d.toLowerCase().includes(userQuery.toLowerCase())
    )
    .join('\n');

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    messages: messages,
    system: "Answer ONLY using this:\n" + context,
  });

  return result.toTextStreamResponse();
}
