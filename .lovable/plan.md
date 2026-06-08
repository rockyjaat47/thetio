## Goal

Replace the airplane + clouds theme transition with a celestial swap:

- **Light → Dark**: the sun swipes out to the right with a "whoosh", then the moon glides in from the left with an owl hoot.
- **Dark → Light**: the moon swipes out to the right with a "whoosh", then the sun rises in from the left with morning bird chirps.
- The home page's existing centered sun/moon visually syncs with the overlay (fades to invisible during transition, fades back in once it ends), so it feels like a single moving celestial body.
- No clouds, no airplane.

## Sound: ElevenLabs (one-time generation, cached as static assets)

ElevenLabs isn't connected yet. I'll connect it via the standard connector. Then I'll generate three short SFX **once** (server-side, via a temporary script) and upload them as CDN-hosted Lovable Assets:

- `birds-morning.mp3` (~2.5s) — gentle morning bird chorus
- `owl-night.mp3` (~2.5s) — single owl hoot in a quiet night
- `whoosh.mp3` (~1.2s) — soft cinematic whoosh

This means:
- Sounds are **real, high-quality recordings** (not synthesized).
- They load instantly from the CDN on every toggle (no API call per click).
- No ongoing ElevenLabs cost or latency at runtime.

The client just plays them through `new Audio(url)` on toggle.

## Animation Architecture (overlay everywhere + hero sync on home)

### Overlay (`src/components/ThemeTransition.tsx` — rewritten)

A fullscreen, pointer-events-none overlay with two layers:

1. **Sky wash** — soft radial gradient (warm amber→sky for light, deep indigo→navy for dark) fading in over the first 250ms and out at the end.
2. **Celestial bodies** — two absolutely-positioned discs in the upper-center band of the screen:
   - **Outgoing body** (current theme's sun or moon) starts centered and animates out to the right with slight scale-down + fade.
   - **Incoming body** (new theme's sun or moon) starts off-screen left and arcs in to center with scale-up + fade-in.
   - Optional twinkling stars when transitioning to dark.

Timing (total ~1.6s):
- 0.00–0.10s: sky wash fades in, whoosh sound starts
- 0.05–0.70s: outgoing body slides right (ease-in cubic)
- 0.45–1.20s: incoming body slides in from left (ease-out cubic), bird/owl sound starts at 0.55s
- 1.20–1.60s: sky wash fades out

The sun is a layered radial gradient (warm core → corona → glow). The moon is a cool gradient disc with subtle crater shadows. Both rendered with pure CSS/SVG — no images.

### Hero sync (`src/components/home/sections/Hero.tsx`)

The hero already has a centered sun/moon driven by `dark:` classes. To make it feel continuous with the overlay:

- Add a `data-theme-transitioning` attribute (set by `ThemeProvider` while the overlay is active).
- When active, fade the hero's sun/moon to `opacity: 0` for the transition duration; restore to 1 when done.
- Result: the user perceives the hero sun being "picked up" by the overlay, swiped offscreen, and the new one dropped back into the hero. On non-home pages, only the overlay plays — looks correct everywhere.

### Sound trigger (`src/components/ThemeProvider.tsx`)

Replace the existing synthesized `playWhoosh` with a small audio cache:

```text
const sounds = {
  whoosh: new Audio(whooshAsset.url),
  birds:  new Audio(birdsAsset.url),
  owl:    new Audio(owlAsset.url),
}
```

On toggle:
1. Play `whoosh` immediately.
2. After 550ms, play `birds` (going to light) or `owl` (going to dark).
3. All sounds preloaded; volume set to ~0.55; gracefully no-op if browser blocks autoplay.

## Implementation Steps

1. **Connect ElevenLabs** via `standard_connectors--connect` (`elevenlabs`).
2. **Generate the 3 SFX once**: run a one-off node script (in `code--exec`) that calls ElevenLabs `/v1/sound-generation` with these prompts:
   - whoosh: "soft cinematic whoosh transition, smooth airy sweep, 1.2 seconds, no music"
   - birds-morning: "gentle peaceful morning birds chirping in a forest, no music, clean ambient"
   - owl-night: "single soft owl hoot at night with faint crickets, calm, no music"
3. **Upload via `lovable-assets`** → save `.asset.json` pointers in `src/assets/sfx/`.
4. **Rewrite `ThemeTransition.tsx`** with the sun/moon swap (no clouds, no plane).
5. **Update `ThemeProvider.tsx`**: remove WebAudio synth, add the 3-clip audio cache, set/clear `data-theme-transitioning` on `<html>`.
6. **Update `Hero.tsx`**: fade the centered sun/moon disc when `html[data-theme-transitioning]` is set (pure CSS, no JS prop drilling).
7. **Update `src/styles.css`**: new keyframes (`sunSwipeOut`, `sunRiseIn`, `moonSwipeOut`, `moonRiseIn`, `skyWash`, `starTwinkle`); remove the old `planeFly`/`cloudDrift`.

## Technical Notes

- ElevenLabs is called **only during plan implementation** (one time, by me, to generate the 3 mp3s). No runtime server function is needed; the app ships with static cached audio.
- Total transition duration: 1.6s. Toggle is debounced so users can't spam it mid-animation.
- All animations use CSS `@keyframes` + `transform` (GPU-accelerated, `will-change-transform`).
- Audio playback is wrapped in try/catch so a blocked autoplay never breaks the visual transition.
- Accessibility: overlay uses `aria-hidden`; respects `prefers-reduced-motion` by skipping the slide animation but still playing the cross-fade + (optional) sound.
