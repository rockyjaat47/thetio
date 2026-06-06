## Goal
Recreate the reference navbar (rounded pill, white card on a soft blue page, dark CTA with arrow) using the user's "+co" logo, and add a dark mode toggle.

## Steps

1. **Upload logos as Lovable Assets**
   - `IMG_8420-removebg-preview.png` → light-mode logo (black mark on light bg)
   - `IMG_8421-removebg-preview.png` → dark-mode logo (white mark on dark bg)
   - Store pointers at `src/assets/logo-light.png.asset.json` and `src/assets/logo-dark.png.asset.json`.

2. **Theme tokens & dark mode**
   - Keep existing `oklch` tokens in `src/styles.css`.
   - Add a `ThemeProvider` (simple React context + `localStorage`) that toggles the `.dark` class on `<html>`.
   - Wrap the app in `src/routes/__root.tsx` `RootComponent`.

3. **Navbar component** (`src/components/Navbar.tsx`)
   - Fixed/top floating pill: rounded-full, white bg in light / `card` bg in dark, subtle border, soft shadow, centered, max-width container with horizontal padding.
   - Left: logo `<img>` swapping between light/dark asset based on theme, ~32–36px tall.
   - Center: links — Products, Features, Use Cases, Pricing (muted-foreground, hover foreground).
   - Right: dark mode toggle (sun/moon Lucide icon button, ghost) + "Try it free" CTA — dark pill button with circular white arrow badge (ArrowRight icon).
   - Mobile: collapse links into a sheet/menu trigger (hamburger), keep toggle + CTA visible.

4. **Page background**
   - Update `src/routes/index.tsx` to render the Navbar on a soft blue page background (light) / dark background (dark) so the navbar reads like the reference. Keep the rest of the page minimal placeholder for now.

## Technical notes
- Use semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`) — no raw colors.
- Theme toggle persists in `localStorage` and reads `prefers-color-scheme` on first load.
- Logos referenced via `import logoLight from "@/assets/logo-light.png.asset.json"` then `src={logoLight.url}`.
- Icons from `lucide-react` (`Sun`, `Moon`, `ArrowRight`, `Menu`).