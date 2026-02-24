import { getPortfolioSystemPrompt } from "../portfolio-knowledge.js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
  const userMessage = body?.message;

  if (typeof userMessage !== "string" || !userMessage.trim()) {
    res.status(400).json({ error: "Missing 'message' in request body" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(200).json({
      reply: buildFallbackReply(userMessage, "assistant_unavailable"),
      degraded: true,
    });
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

      if (upstream.status === 429) {
        res.status(200).json({
          reply: buildFallbackReply(userMessage, "quota_exceeded"),
          degraded: true,
        });
        return;
      }

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
    res.status(200).json({
      reply: buildFallbackReply(userMessage, "network_error"),
      degraded: true,
    });
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

function buildFallbackReply(userMessage: string, reason: "quota_exceeded" | "assistant_unavailable" | "network_error") {
  const normalized = userMessage.toLowerCase();

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("hire")) {
    return "You can contact Jake directly at **roayafrancisjake@gmail.com**. You can also use the **Get In Touch** form on this page.";
  }

  if (normalized.includes("project")) {
    return "You can view all featured projects in the **Projects** section. Each card has **Live Demo** and GitHub links (if available).";
  }

  if (normalized.includes("resume") || normalized.includes("cv")) {
    return "You can download Jake's latest resume from the **Download Resume** button in the Contact section.";
  }

  if (reason === "quota_exceeded") {
    return "The AI assistant is temporarily at usage limit. You can still browse projects, skills, and contact details on this portfolio.";
  }

  return "The AI assistant is temporarily unavailable. You can still explore the portfolio sections for projects, skills, resume, and contact info.";
}
