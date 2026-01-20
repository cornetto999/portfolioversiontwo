import * as React from "react";

import robotGif from "@/assets/Robot says hello.gif";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

const STORAGE_KEY = "portfolio_chat_v1";
const TTL_MS = 5 * 60 * 1000;
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

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const clearTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  React.useEffect(() => {
    document.body.classList.toggle("chatbot-open", open);
    return () => {
      document.body.classList.remove("chatbot-open");
    };
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

      if (!resp.ok) {
        const errText =
          typeof data?.error === "string"
            ? data.error
            : raw
              ? raw.slice(0, 300)
              : "Request failed";

        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-bot-error`,
            from: "bot",
            text: `Request failed (${resp.status}): ${errText}`,
          },
        ]);
        return;
      }

      const reply = typeof data?.reply === "string" ? data.reply : "";
      setMessages((prev) => [...prev, { id: `${Date.now()}-bot`, from: "bot", text: reply || "" }]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-bot-error`,
          from: "bot",
          text: e?.message || "Network error",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:right-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="h-auto w-auto rounded-none bg-transparent p-0 shadow-none hover:bg-transparent animate-float"
            aria-label="Open portfolio assistant"
          >
            <img
              src={robotGif}
              alt="Robot assistant"
              className="h-24 w-24 object-contain sm:h-40 sm:w-40"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-none cursor-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Portfolio Assistant</DialogTitle>
            <DialogDescription>
             Hi! I’m Jake’s portfolio assistant.
            </DialogDescription>
          </DialogHeader>

          <div className="flex h-[70vh] flex-col gap-3 cursor-auto sm:h-[60vh]">
            <div className="flex-1 overflow-y-auto rounded-lg border bg-muted/10 p-4">
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
                <div ref={messagesEndRef} />
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingAvatarBot;
