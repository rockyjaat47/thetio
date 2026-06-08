import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { UIMessage } from "ai";

const Schema = z.object({
  visitorId: z.string().min(1).max(128),
});

export const loadChatHistory = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Schema.parse(input))
  .handler(async ({ data }): Promise<UIMessage[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("visitor_id", data.visitorId)
      .order("created_at", { ascending: true })
      .limit(200);

    if (error) {
      console.error("[chat-history] load failed", error);
      return [];
    }

    return (rows ?? [])
      .filter((r) => r.role === "user" || r.role === "assistant")
      .map((r) => ({
        id: r.id,
        role: r.role as "user" | "assistant",
        parts: [{ type: "text", text: r.content }],
      })) as UIMessage[];
  });
