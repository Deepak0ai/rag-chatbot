import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const userMessage =
      messages?.[messages.length - 1]?.content || "Hello";

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(userMessage);
    const text = result.response.text();

    return new Response(
      JSON.stringify({ text }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ text: "Error 😢" }),
      { status: 200 }
    );
  }
}
