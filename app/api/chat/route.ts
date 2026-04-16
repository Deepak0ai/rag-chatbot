import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const userMessage =
      messages?.[messages.length - 1]?.content || "Hello";

    console.log("User:", userMessage);

    const result = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: userMessage,
    });

    console.log("AI:", result.text);

    return new Response(
      JSON.stringify({ text: result.text }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Something broke"
      }),
      { status: 500 }
    );
  }
}
