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
                text: "Hi! 🤖 I'm Nova — your Navora Digital concierge. What can I help with?",
              },
            ],
          },
        ] as UIMessage[]);

  const visitorIdRef = useRef<string | null>(null);
  visitorIdRef.current = visitorId;

  const transport = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ visitorId: visitorIdRef.current }),
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

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (status === "ready") inputRef.current?.focus();
  }, [status]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="pointer-events-auto fixed bottom-24 right-4 z-[60] flex h-[min(420px,calc(100vh-10rem))] w-[min(340px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.6)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
          role="dialog"
          aria-label="Chat with Nova"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.25) 100%)",
          }}
        >
          {/* Glass header */}
          <div className="relative flex items-center justify-between gap-2 border-b border-white/30 px-3.5 py-2.5 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/60 text-sm shadow-inner backdrop-blur dark:bg-white/15">
                🤖
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white/80 dark:ring-black/50" />
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-semibold text-foreground">Nova</p>
                <p className="text-[10px] text-foreground/60">online & ready to help</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="rounded-full p-1 text-foreground/60 transition hover:bg-white/40 hover:text-foreground dark:hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages */}
          <Conversation className="flex-1">
            <ConversationContent className="px-3 py-2.5">
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <Message key={m.id} from={m.role}>
                    {m.role === "user" ? (
                      <MessageContent className="bg-white/50 backdrop-blur dark:bg-white/15">
                        {text}
                      </MessageContent>
                    ) : (
                      <MessageResponse>{text}</MessageResponse>
                    )}
                  </Message>
                );
              })}
              {status === "submitted" && (
                <div className="px-1.5 py-0.5 text-xs">
                  <Shimmer>Nova is thinking…</Shimmer>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Glass composer */}
          <div className="border-t border-white/30 p-2.5 dark:border-white/10">
            <PromptInput
              onSubmit={handleSubmit}
              className="rounded-2xl border-white/40 bg-white/30 backdrop-blur dark:border-white/15 dark:bg-white/10"
            >
              <PromptInputTextarea
                ref={inputRef}
                placeholder="Ask Nova anything…"
                disabled={!visitorId}
                className="bg-transparent text-sm"
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
