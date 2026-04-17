import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const lastMessage = messages[messages.length - 1]?.content;

    const result = await model.generateContent(lastMessage);

    const text = result.response.text();

    return Response.json({
      content: text,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ content: "Error" });
  }
}
