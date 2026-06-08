## Plan: Real 3D Teo mascot with react-three-fiber

Replace the current 2D PNG mascot with an actual 3D Teo sculpted procedurally in Three.js — same friendly shape as the uploaded image (rounded blue blob body, two stubby arms, four little feet, simple smiley face). It walks across the bottom of the site, looks at the cursor, waves with speech bubbles, reacts to scroll, and opens the existing glass chat panel on click.

### Dependencies
- Add `three`, `@react-three/fiber`, `@react-three/drei` via `bun add`.

### 3D model (procedural, no external GLB)
New file `src/components/agent/TeoModel.tsx`:
- Group with soft pastel-blue material (`meshStandardMaterial`, light blue, slight roughness, subtle subsurface-feel via emissive tint).
- Body: squashed sphere (slightly taller than wide), rounded.
- Two arm nubs: small spheres on the sides, gently animated (idle sway, wave on demand).
- Four foot bumps: tiny spheres at the base, alternately offset on the Y axis to simulate walking.
- Face (front-facing decal group):
  - Two dark oval eyes (small flattened spheres / circles via `Circle` from drei).
  - Smile: a thin curved tube/line (TorusGeometry arc or `<Line>` from drei).
  - Optional cheek blush: two faint pink discs (toggleable).
- Soft contact shadow under the body (`<ContactShadows>` from drei).
- Lighting: `<ambientLight>` + a warm key `<directionalLight>` + cool rim light.
- Animation state via `useFrame`:
  - `idle`: gentle bob + breathing scale.
  - `walk`: vertical bob synced to feet alternation, slight tilt forward.
  - `wave`: one arm raises & oscillates.
  - `look`: head/body yaw + pitch tracking a target vector (cursor position, normalized).
- Props: `pose: "idle" | "walk" | "wave"`, `facing: 1 | -1`, `lookTarget: {x,y}`.

### Scene wrapper
New file `src/components/agent/TeoCanvas.tsx`:
- `<Canvas>` from `@react-three/fiber` with `dpr={[1, 2]}`, `gl={{ alpha: true, antialias: true }}`, transparent background, `camera={{ position: [0, 0.4, 3.2], fov: 32 }}`.
- Mounts `<TeoModel />` and contact shadows.
- Pointer-events on the canvas only over the model area; the outer wrapper handles click → open chat.

### Site-wide agent rewrite
Update `src/components/agent/SiteAgent.tsx`:
- Replace `<img>` mascot with `<TeoCanvas>` inside the existing framer-motion gliding wrapper (keep current spring-physics walk loop across `x`).
- Track cursor with a `mousemove` listener; normalize to `[-1, 1]` relative to mascot center and pass as `lookTarget` to the model.
- Sync `pose`:
  - `walk` while `isWalking`.
  - `wave` for ~1.4s when arriving at a destination or on scroll trigger.
  - `idle` otherwise.
- Keep speech-bubble tip system (greetings + scroll tips) and click-to-open `ChatPanel`.
- Remove `facing` CSS `scaleX` flip (the 3D model rotates on its Y axis instead — pass `facing` to the model and let it yaw 180°).

### Cleanup
- Delete the now-unused `src/components/agent/RobotMascot.tsx` and `src/assets/robot/robot-*.png` asset pointer files.
- Keep `teo-mascot.asset.json` for now (used as a fallback / favicon if needed) — or remove if unreferenced.

### Performance
- Render the Canvas only on `sm:` and up (already the case for the wrapper).
- `frameloop="demand"` when idle and no cursor movement; switch to `"always"` while walking/waving.
- Lazy-load `TeoCanvas` with `React.lazy` + Suspense fallback (the current PNG) to avoid blocking initial paint.

### Out of scope
- No real image→GLB conversion (not available in-environment); the 3D is a stylized procedural sculpt matching the uploaded reference, not a photogrammetric copy.
- No sound effects.
- No changes to chat backend or `ChatPanel` UI.

### Files changed
- add: `src/components/agent/TeoModel.tsx`
- add: `src/components/agent/TeoCanvas.tsx`
- edit: `src/components/agent/SiteAgent.tsx`
- remove: `src/components/agent/RobotMascot.tsx`, `src/assets/robot/robot-*.png.asset.json`
- edit: `package.json` (+ three / @react-three/fiber / @react-three/drei)
