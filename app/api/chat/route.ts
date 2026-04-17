import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieveContext } from "@/lib/knowledgeBase";
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({
        reply: "Missing API key. Add it in Vercel settings.",
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const context = retrieveContext(message);

    const prompt = `
You are a helpful AI assistant.

- If the question is about the business → use the context.
- If the question is general → answer normally.
- Keep answers clear and helpful.

Context:
${context}

User:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return NextResponse.json({
      reply: response.text(),
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      reply: "Error: Something went wrong.",
    });
  }
}
