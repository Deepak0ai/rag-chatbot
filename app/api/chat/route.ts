import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const knowledgeBase = [
  {
    title: "Services",
    content:
      "We provide AI automation services, lead generation, workflow automation, and CRM integrations.",
  },
  {
    title: "Company",
    content:
      "This chatbot is built with Next.js, TypeScript, and deployed on Vercel.",
  },
  {
    title: "Support",
    content:
      "The chatbot should answer based on the provided company knowledge base.",
  },
];

function retrieveContext(query: string) {
  const q = query.toLowerCase();
  const qWords = q.split(/[^a-z0-9]+/).filter(Boolean);

  const scored = knowledgeBase.map((doc) => {
    const docText = doc.content.toLowerCase();
    let score = 0;

    for (const word of qWords) {
      if (docText.includes(word)) score += 1;
    }

    return { ...doc, score };
  });

  const matches = scored
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score);

  const selected = (matches.length ? matches : scored).slice(0, 3);

  return selected.map((d) => `- ${d.title}: ${d.content}`).join("\n");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    const userMessage = messages[messages.length - 1]?.content?.trim() || "";

    if (!userMessage) {
      return Response.json({ content: "Please ask a question." });
    }

    const context = retrieveContext(userMessage);

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY!
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are a helpful chatbot.

Use ONLY the context below to answer.
If the answer is not in the context, say: "I don't know based on the available information."

Context:
${context}

User question:
${userMessage}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    return Response.json({ content: text || "No response" });
  } catch (error) {
    console.error("CHAT API ERROR:", error);
    return Response.json({ content: "Error getting response." });
  }
}
