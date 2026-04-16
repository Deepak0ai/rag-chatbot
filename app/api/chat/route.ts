import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const userMessage =
      messages[messages.length - 1]?.content || "";

    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: userMessage,
    });

    return new Response(
      JSON.stringify({ text: result.text }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
