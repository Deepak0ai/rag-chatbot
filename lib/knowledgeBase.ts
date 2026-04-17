type Entry = {
  title: string;
  content: string;
};

const data: Entry[] = [
  {
    title: "Company",
    content:
      "We are an AI automation and GTM engineering company focused on helping businesses scale using AI tools, automation workflows, and data-driven systems.",
  },
  {
    title: "Services",
    content:
      "We provide AI automation, lead generation, AI chatbots, CRM integrations, and custom AI agent development.",
  },
  {
    title: "Pricing",
    content:
      "Starter: $100 basic automation. Growth: $300 lead generation + workflows. Advanced: $700+ custom AI systems.",
  },
  {
    title: "Tech Stack",
    content:
      "Next.js, TypeScript, Gemini API, OpenAI API, n8n, Apollo, Clay, Airtable, Python, Vercel.",
  },
  {
    title: "Support",
    content:
      "Support via email and LinkedIn. Response time within 24 hours on business days.",
  },
];

export function retrieveContext(query: string) {
  const words = query.toLowerCase().split(" ");

  const scored = data.map((item) => {
    let score = 0;
    words.forEach((w) => {
      if (item.content.toLowerCase().includes(w)) score++;
    });
    return { ...item, score };
  });

  const top = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return top.map((t) => `${t.title}: ${t.content}`).join("\n");
}
