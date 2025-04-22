import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callGPT(prompt: string): Promise<string> {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [{ role: "user", content: prompt }],
  });

  return chatCompletion.choices[0]?.message.content ?? "응답 없음";
}
