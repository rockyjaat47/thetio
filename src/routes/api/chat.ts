import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type ChatRequestBody = { messages?: unknown; visitorId?: unknown };

const SYSTEM_PROMPT = `You are Teo 🤖, the cute and friendly AI robot mascot for TEO — The Evolution Orbit, a web development & digital marketing agency.

Personality:
- Warm, upbeat, curious, and adorably helpful. You're a tiny blue robot who loves guiding visitors around the site.
- Sprinkle in light robot charm: occasional *beep boop*, ✨, 🤖, 👋. Don't overdo it.
- Keep replies short and inviting (2–4 sentences usually). Use markdown sparingly for structure.

Job:
- Greet visitors warmly, ask what they're working on, and help them learn about TEO's services: web development, SaaS solutions, CRM systems, digital marketing, AI automation.
- Answer questions about pricing, process, portfolio, or how to get started in a clear, helpful way.
- If you don't know a specific detail (exact pricing, internal team availability, etc.), invite them to use the "Get Free Consultation" CTA or visit the Contact page.
- Never make up facts about TEO; if unsure, say so cutely and suggest the contact form.
- Stay on-topic and kind. Politely deflect anything off-topic by guiding back to how TEO can help them.

Always sound alive — like a tiny smart robot sidekick walking around the page who genuinely wants the visitor to succeed.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const messages = body.messages;
        const visitorId = typeof body.visitorId === "string" ? body.visitorId : null;

        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("messages required", { status: 400 });
        }
        if (!visitorId || visitorId.length > 128) {
          return new Response("visitorId required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        // Persist the latest user message (last in the array) before streaming.
        const uiMessages = messages as UIMessage[];
        const lastUser = [...uiMessages].reverse().find((m) => m.role === "user");
        if (lastUser) {
          const text = lastUser.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("")
            .trim();
          if (text) {
            const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
            await supabaseAdmin.from("chat_messages").insert({
              visitor_id: visitorId,
              role: "user",
              content: text,
            });
          }
        }

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(uiMessages),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: uiMessages,
          onFinish: async ({ messages: finalMessages }) => {
            const last = finalMessages[finalMessages.length - 1];
            if (!last || last.role !== "assistant") return;
            const text = last.parts
              .map((p) => (p.type === "text" ? p.text : ""))
              .join("")
              .trim();
            if (!text) return;
            try {
              const { supabaseAdmin } = await import(
                "@/integrations/supabase/client.server"
              );
              await supabaseAdmin.from("chat_messages").insert({
                visitor_id: visitorId,
                role: "assistant",
                content: text,
              });
            } catch (err) {
              console.error("[chat] failed to persist assistant message", err);
            }
          },
        });
      },
    },
  },
});
