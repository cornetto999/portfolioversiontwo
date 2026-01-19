import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { getPortfolioSystemPrompt } from "./portfolio-knowledge";

function localChatApi() {
  return {
    name: "local-chat-api",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url !== "/api/chat" || req.method !== "POST") return next();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Missing OPENAI_API_KEY" }));
          return;
        }

        try {
          const chunks: Buffer[] = [];
          req.on("data", (c: Buffer) => chunks.push(c));
          req.on("end", async () => {
            const rawBody = Buffer.concat(chunks).toString("utf-8");
            const body = safeJsonParse(rawBody) || {};
            const userMessage = body?.message;

            if (typeof userMessage !== "string" || !userMessage.trim()) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Missing 'message' in request body" }));
              return;
            }

            const model = normalizeModel(process.env.OPENAI_MODEL) || "gpt-4o-mini";
            const systemPrompt = getPortfolioSystemPrompt();

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

            const upstreamText = await upstream.text();
            const upstreamJson = safeJsonParse(upstreamText);

            if (!upstream.ok) {
              const errFromApi =
                typeof upstreamJson?.error === "string"
                  ? upstreamJson.error
                  : typeof upstreamJson?.error?.message === "string"
                    ? upstreamJson.error.message
                    : upstreamText || "OpenAI request failed";

              res.statusCode = upstream.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: `OpenAI error (${upstream.status}) [model=${model}]: ${errFromApi}` }));
              return;
            }

            const reply = upstreamJson?.choices?.[0]?.message?.content;
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ reply: typeof reply === "string" ? reply : "" }));
          });
        } catch (e: any) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: e?.message || "Unexpected server error" }));
        }
      });
    },
  };
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), mode === "development" && localChatApi()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
