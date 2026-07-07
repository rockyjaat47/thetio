# Prompt to add the same 3D chatbot in another Lovable project

Copy-paste this into the chat of your other project. It assumes that project is also on Lovable (TanStack Start + Lovable Cloud + Lovable AI). If it's a different stack, tell me and I'll adapt.

---

**PROMPT START**

Add a floating 3D AI concierge chatbot named **Nova** to my website, exactly like the one in my Navora Digital project. Build it end-to-end:

### 1. 3D Mascot (bottom-left, walks around)
- Install `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`.
- Create `src/components/agent/TeoModel.tsx` — a cute stylized 3D character built from primitive geometries (sphere head, rounded body, eyes, waving arm). Supports poses: `"idle" | "walk" | "wave"`, a `facing: 1 | -1` prop, and a `lookTarget: {x, y}` prop so eyes track the cursor. Animate with `useFrame`.
- Create `src/components/agent/TeoCanvas.tsx` — wraps `TeoModel` in a transparent `@react-three/fiber` Canvas (alpha: true, no background, soft lights).
- Create `src/components/agent/SiteAgent.tsx` — fixed bottom-left, size ~140px, hidden on mobile (`hidden sm:block`). Behaviors:
  - Wanders horizontally across viewport with `framer-motion` spring animation.
  - Randomly waves and shows tip bubbles ("Hi 👋", "Need help?", etc.).
  - Tracks cursor via `mousemove` → passes normalized `lookTarget`.
  - Shows tip bubbles on large scroll deltas.
  - Click toggles the chat panel.

### 2. Chat Panel (glassmorphism)
- Install AI Elements: `bun x ai-elements@latest add conversation message prompt-input shimmer`.
- Create `src/components/agent/ChatPanel.tsx`:
  - Floating card bottom-right, glass effect (`backdrop-blur-2xl`, translucent white/dark bg).
  - Header with avatar 🤖, name "Nova", green online dot, close button.
  - Uses `useChat` from `@ai-sdk/react` with `DefaultChatTransport({ api: "/api/chat" })`.
  - Renders `message.parts` via `MessageResponse` (assistant) and `MessageContent` (user bubble).
  - Shimmer "Nova is thinking…" while `status === "submitted"`.
  - `PromptInput` composer with textarea + submit inside `PromptInputFooter`.
  - Auto-focus textarea on open and after each response.

### 3. Backend
- Enable Lovable Cloud.
- Create table `chat_messages` (id uuid pk, visitor_id text, role text, content text, created_at timestamptz default now()) with proper GRANTs + RLS (service_role full access).
- Persist a `visitor_id` in `localStorage` (key `nova:visitor_id`, generated with `crypto.randomUUID()`).
- Create `src/lib/chat-history.functions.ts` — `createServerFn` that loads last 200 messages for a `visitorId` via `supabaseAdmin`.
- Load history in ChatPanel via `useQuery` + `useServerFn`, seed `useChat` with it; if empty, show a friendly greeting message from Nova.

### 4. Streaming AI route
- Create `src/lib/ai-gateway.server.ts` — Lovable AI Gateway provider using `@ai-sdk/openai-compatible`, baseURL `https://ai.gateway.lovable.dev/v1`, header `Lovable-API-Key: process.env.LOVABLE_API_KEY`.
- Create `src/routes/api/chat.ts` — TanStack server route:
  - POST reads `{ messages, visitorId }`.
  - Model: `google/gemini-3-flash-preview` (or `openai/gpt-5.5`).
  - System prompt: warm concierge personality for **[MY COMPANY NAME]** — describe what the company does, its packages/services, and instruct Nova to build rapport, qualify leads (name, business, phone, email, budget) and steer toward a strategy call. Keep replies 2–4 sentences, English/Hinglish friendly.
  - Before streaming, insert the last user message into `chat_messages`.
  - Use `streamText(...).toUIMessageStreamResponse({ originalMessages, onFinish })` and in `onFinish` insert the final assistant message.
  - Import `supabaseAdmin` **inside** the handler: `const { supabaseAdmin } = await import("@/integrations/supabase/client.server")`.

### 5. Mount it
- Add `<SiteAgent />` once inside the root layout (`src/routes/__root.tsx`) so it appears on every page.

### Customize for this project
Replace the Navora system prompt with a concierge prompt for **[describe your company, services, packages, tone]**. Keep everything else the same.

**PROMPT END**

---

Tell me:
1. Is the other project also on **Lovable (TanStack Start)**, or a different stack (Next.js, Vite+React Router, etc.)? I'll adjust the prompt if needed.
2. Do you want me to also include the **exact company/system-prompt text** for that other project (share the name + services), so the prompt is fully plug-and-play?
