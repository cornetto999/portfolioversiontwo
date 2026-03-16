import * as React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X } from "lucide-react";
import robotGif from "@/assets/Robot says hello.gif";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function buildClientFallbackReply(userMessage: string) {
  const normalized = userMessage.trim().toLowerCase();

  if (normalized === "hi" || normalized === "hello" || normalized === "hey") {
    return "Hi! I can help you explore Jake's projects, skills, resume, and contact details. What would you like to know first?";
  }

  if (normalized.includes("contact") || normalized.includes("email") || normalized.includes("hire")) {
    return "You can contact Jake at **roayafrancisjake@gmail.com**. You can also use the **Get In Touch** form in this portfolio.";
  }

  if (normalized.includes("project")) {
    return "You can check the **Projects** section for live demos and tech stacks, including Chat with E-boy, Luxera, DTR Attendance System, and more.";
  }

  if (normalized.includes("resume") || normalized.includes("cv")) {
    return "You can download Jake's resume from **/resume.pdf** or from the resume button in the portfolio.";
  }

  if (normalized.includes("skill") || normalized.includes("tech")) {
    return "Jake works with React, TypeScript, Next.js, Tailwind CSS, Node.js, PHP, MySQL, Supabase, and more. I can break these down by frontend/backend if you want.";
  }

  return "I’m having trouble reaching the live assistant right now, but I can still help with projects, skills, resume, and contact info.";
}

const STORAGE_KEY = "portfolio_chat_v1";
const TTL_MS = 5 * 60 * 1000;
const BOT_SIZE_CLASS = "h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32";
const initialMessages: { id: string; from: "bot" | "user"; text: string }[] = [
  {
    id: "welcome",
    from: "bot",
    text: "Hi! I’m your portfolio assistant. How can I help?",
  },
];

const FloatingAvatarBot = () => {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [messages, setMessages] = React.useState<{ id: string; from: "bot" | "user"; text: string }[]>(initialMessages);

  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);
  const clearTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, open]);

  React.useEffect(() => {
    document.body.classList.toggle("chatbot-open", open);
    return () => {
      document.body.classList.remove("chatbot-open");
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const scheduleAutoClear = React.useCallback((expiresAt: number) => {
    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
    }
    const delay = Math.max(0, expiresAt - Date.now());
    clearTimerRef.current = window.setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      setMessages(initialMessages);
    }, delay);
  }, []);

  React.useEffect(() => {
    const stored = safeJsonParse(localStorage.getItem(STORAGE_KEY) || "");
    const expiresAt = stored?.expiresAt;
    const storedMessages = stored?.messages;

    if (typeof expiresAt === "number" && Date.now() < expiresAt && Array.isArray(storedMessages)) {
      setMessages(storedMessages);
      scheduleAutoClear(expiresAt);
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
  }, [scheduleAutoClear]);

  React.useEffect(() => {
    const expiresAt = Date.now() + TTL_MS;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        expiresAt,
        messages,
      })
    );
    scheduleAutoClear(expiresAt);
  }, [messages, scheduleAutoClear]);

  const onSend = async () => {
    const text = message.trim();
    if (!text) return;

    const userId = `${Date.now()}-user`;
    setMessages((prev) => [...prev, { id: userId, from: "user", text }]);
    setMessage("");
    setIsSending(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const raw = await resp.text();
      const data = raw ? safeJsonParse(raw) : null;
      const reply = typeof data?.reply === "string" ? data.reply : "";

      if (reply) {
        setMessages((prev) => [...prev, { id: `${Date.now()}-bot`, from: "bot", text: reply }]);
        return;
      }

      if (!resp.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-bot-error`,
            from: "bot",
            text: buildClientFallbackReply(text),
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot-empty`,
          from: "bot",
          text: "I couldn't generate a response just now. Please try again.",
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot-error`,
          from: "bot",
          text: buildClientFallbackReply(text),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center pb-[env(safe-area-inset-bottom)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:block">
      <button
        type="button"
        className="h-auto w-auto rounded-none border-0 !bg-transparent p-0 shadow-none ring-0 hover:!bg-transparent active:!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Open portfolio assistant"
        onClick={() => setOpen(true)}
      >
        <img
          src={robotGif}
          alt="Robot assistant"
          className={`${BOT_SIZE_CLASS} mx-auto block bg-transparent object-contain object-center`}
        />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[120]">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio Assistant"
            className="glass-card absolute left-1/2 top-1/2 z-[121] grid w-[calc(100vw-1.25rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border-white/20 bg-background/90 p-4 backdrop-blur-xl sm:w-[calc(100vw-2rem)] sm:rounded-3xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold leading-none tracking-tight">Portfolio Assistant</h2>
                <p className="mt-1 text-sm text-muted-foreground">Hi! I’m Jake’s portfolio assistant.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[min(70vh,calc(100dvh-7rem))] flex-col gap-3 cursor-auto sm:h-[60vh]">
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto rounded-2xl border border-white/20 bg-transparent p-4 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
                    >
                      <div
                        className={
                          m.from === "user"
                            ? "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-primary px-4 py-2 text-sm leading-relaxed text-primary-foreground shadow-sm"
                            : "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-secondary/30 px-4 py-2 text-sm leading-relaxed text-foreground shadow-sm"
                        }
                      >
                        {m.from === "bot" ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ children, href }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="underline underline-offset-2"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {m.text}
                          </ReactMarkdown>
                        ) : (
                          m.text
                        )}
                      </div>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl bg-secondary/30 px-4 py-2 text-sm leading-relaxed text-foreground shadow-sm">
                        Typing...
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message…"
                  className="cursor-text"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isSending) onSend();
                  }}
                />
                <Button type="button" onClick={onSend} disabled={!message.trim() || isSending}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FloatingAvatarBot;
