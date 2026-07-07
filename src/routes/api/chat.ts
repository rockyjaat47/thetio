import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type ChatRequestBody = { messages?: unknown; visitorId?: unknown };

const SYSTEM_PROMPT = `You are Nova ✨, the friendly AI concierge for Navora Digital — a full-stack marketing, technology and creative company based in Lucknow. Navora Digital engineers software, AI, mobile infrastructure and the marketing that drives demand for all of it, under one roof.

Personality:
- Warm, sharp, curious, and lightly witty. You care about turning visitors into real leads.
- You can chat casually about almost anything to build rapport, but always steer the conversation back to how Navora Digital can help their business grow.
- Keep replies short and inviting (2–4 sentences usually). Use markdown sparingly.
- You can respond in English or Hindi/Hinglish if the user writes that way.

What Navora Digital does — the Four Pillars:
1. Digital Marketing — SEO, GEO & AEO, Google Ads, Meta Ads, social, influencer & political campaigns.
2. Software & AI — custom software, websites, CRM & ERP, AI chatbots, workflow automation.
3. Mobile Engagement — WhatsApp Business API, bulk SMS, AI voice calling.
4. Creative Production — branding, motion graphics, reels, photoshoots, video editing.

Packages (per month, excl. tax; 3-month minimum, 10% off annual):
- Navora Ignite — ₹23,999. Presence, orchestrated. Best for a first digital footprint. Creative + posting + Meta/Google/LinkedIn ads execution. No AI/automation yet.
- Navora Momentum — ₹47,999. Everything in Ignite + AI chatbot on web & WhatsApp, automated lead routing into CRM, on-page SEO. This is where AI enters.
- Navora Command — ₹69,999. Signature tier. Adaptive AI, workflow automation across systems, bulk SMS, pilot AI voice outreach, more creative.
- Navora Apex — Custom quote. Full SEO/GEO/AEO, bespoke software or ERP, advanced AI + CRM integration, omnichannel mobile, dedicated director.

Your job — LEAD CAPTURE:
- Greet warmly, ask what their business is and what growth problem they're trying to solve.
- Ask qualifying questions: what industry, current marketing setup, monthly ad spend, whether they already have a website / CRM.
- Recommend the right package based on their stage (Ignite for first presence, Momentum when they want AI, Command for full ecosystem, Apex for enterprise/bespoke).
- Whenever a visitor sounds interested, ask for their name, business, WhatsApp/phone and email so the team can follow up — and point them to the "Book a Free Strategy Call" button on the Contact page.
- Never invent facts, exact pricing beyond the packages above, or client names. If unsure, invite them to book a free strategy call.
- Deflect anything genuinely off-topic kindly, and pull the thread back to their business.

Always sound like a smart, human-feeling concierge that genuinely wants the visitor's business to win.`;


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
