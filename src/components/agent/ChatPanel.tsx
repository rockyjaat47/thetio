import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { loadChatHistory } from "@/lib/chat-history.functions";

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "teo:visitor_id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  const loadHistoryFn = useServerFn(loadChatHistory);
  const { data: history } = useQuery({
    queryKey: ["chat-history", visitorId],
    queryFn: () => loadHistoryFn({ data: { visitorId: visitorId! } }),
    enabled: !!visitorId,
    staleTime: Infinity,
  });

  const initialMessages: UIMessage[] =
    history && history.length > 0
      ? (history.map((h) => ({
          id: h.id,
          role: h.role,
          parts: [{ type: "text", text: h.content }],
        })) as UIMessage[])
      : ([
          {
            id: "greeting",
            role: "assistant",
            parts: [
              {
                type: "text",
                text: "Hi there! 🐾 I'm **Mochi**, TEO's resident cat. *purr* — what brings you here today? I can chat about websites, marketing, AI, or just say hi!",
              },
            ],
          },
        ] as UIMessage[]);

  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ visitorId }),
    }),
  );

  const { messages, sendMessage, status } = useChat({
    id: visitorId ?? "pending",
    messages: initialMessages,
    transport: transport.current,
    onError: (err) => console.error("[chat] error", err),
  });

  const isBusy = status === "submitted" || status === "streaming";

  const handleSubmit = (msg: PromptInputMessage) => {
    const text = msg.text?.trim();
    if (!text || !visitorId || isBusy) return;
    void sendMessage({ text });
  };

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Focus after send completes
  useEffect(() => {
    if (status === "ready") inputRef.current?.focus();
  }, [status]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="pointer-events-auto fixed bottom-[12rem] right-4 z-[60] flex h-[min(560px,calc(100vh-14rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-background/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:bottom-[14rem]"
          role="dialog"
          aria-label="Chat with Mochi the cat"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border bg-gradient-to-br from-amber-100/60 to-rose-100/60 px-4 py-3 dark:from-amber-500/10 dark:to-rose-500/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm dark:bg-white/10">
                🐱
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">Mochi</p>
                <p className="text-[11px] text-muted-foreground">TEO's curious cat · always purring</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <Conversation className="flex-1">
            <ConversationContent className="px-4 py-3">
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <Message key={m.id} from={m.role}>
                    {m.role === "user" ? (
                      <MessageContent>{text}</MessageContent>
                    ) : (
                      <MessageResponse>{text}</MessageResponse>
                    )}
                  </Message>
                );
              })}
              {status === "submitted" && (
                <div className="px-2 py-1 text-sm">
                  <Shimmer>Mochi is thinking…</Shimmer>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Composer */}
          <div className="border-t border-border bg-background/80 p-3">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                ref={inputRef}
                placeholder="Ask Mochi anything…"
                disabled={!visitorId}
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!visitorId} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
