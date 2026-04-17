import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { retrieveContext } from "@/lib/knowledgeBase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Ask something." });
    }

    const context = retrieveContext(message);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a smart AI assistant.

Use the context below if relevant.
Otherwise answer normally.

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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Error occurred" }, { status: 500 });
  }
}
