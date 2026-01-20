import { getPortfolioSystemPrompt } from "../portfolio-knowledge";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    return;
  }

  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
  const userMessage = body?.message;

  if (typeof userMessage !== "string" || !userMessage.trim()) {
    res.status(400).json({ error: "Missing 'message' in request body" });
    return;
  }

  const model = normalizeModel(process.env.OPENAI_MODEL) || "gpt-4o-mini";

  const systemPrompt = getPortfolioSystemPrompt();

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const rawText = await upstream.text();
    const data = safeJsonParse(rawText);

    if (!upstream.ok) {
      const errFromApi =
        typeof data?.error === "string"
          ? data.error
          : typeof data?.error?.message === "string"
            ? data.error.message
            : typeof data?.message === "string"
              ? data.message
              : rawText || "OpenAI request failed";

      res.status(upstream.status).json({
        error: `OpenAI error (${upstream.status}) [model=${model}]: ${errFromApi}`,
      });
      return;
    }

    const reply = data?.choices?.[0]?.message?.content;
    res.status(200).json({ reply: typeof reply === "string" ? reply : "" });
  } catch (err: any) {
    console.error("/api/chat invocation failed", {
      message: err?.message,
      name: err?.name,
      stack: err?.stack,
    });
    res.status(500).json({ error: err?.message || "Unexpected server error" });
  }
}

function normalizeModel(value: string | undefined) {
  if (!value) return "";
  let v = value.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
