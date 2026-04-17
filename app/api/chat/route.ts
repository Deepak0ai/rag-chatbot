import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = await streamText({
      model: google("gemini-1.5-flash"),
      system: "You are a helpful assistant.",
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("API ERROR:", error);
    return new Response("Error", { status: 500 });
  }
}
