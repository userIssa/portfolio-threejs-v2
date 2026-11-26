# ISSA.dev — Software Engineer & Ethical Hacker Portfolio

Interactive 3D developer and cybersecurity portfolio for **Toluwanimi Oderinde (Issa)**, built with **Next.js 16**, **React 19**, **Three.js / React Three Fiber**, and **Tailwind CSS**.

## Highlights

- **Fullscreen *The Starry Night* Preloader** ([`AsciiPreloader.tsx`](components/AsciiPreloader.tsx), [`starryNightData.ts`](components/starryNightData.ts)) — Decodes embedded `288×228` RGB and brushstroke-orientation data via native `DecompressionStream("deflate")` onto a full-viewport HTML5 Canvas with clumped half-block paint-in reveal, directional brushstroke shimmer, twinkling stars/moon, terminal block progress bar, `Skip` / `Esc` dismissal, and `prefers-reduced-motion` support.
- **Dual Theme Engine** ([`app/layout.tsx`](app/layout.tsx), [`app/globals.css`](app/globals.css), [`ThemeToggle.tsx`](components/ThemeToggle.tsx)) — Defaults to **Tokyo Blueprint Paper** (light mode) and switches cleanly to **Neo-Tokyo Obsidian** (dark mode) using a View Transitions API radial wipe, persisted under `issa-theme` in `localStorage`.
- **Interactive Background & Sakura Canvas** ([`BackgroundCanvas.tsx`](components/BackgroundCanvas.tsx)) — Renders fluttering notched cherry-blossom petals with cursor breeze interaction in Paper mode, atmospheric motes in Obsidian mode, and pointer/click ripple waves across both themes.
- **3D WebGL Scenes** ([`SwordHero.jsx`](components/SwordHero.jsx), [`Contact.tsx`](components/Contact.tsx)) — Interactive Three.js hero scene (`@react-three/fiber` + `@react-three/drei`) alongside a 3D globe in the contact section.
- **Interactive CLI Dock & Easter Eggs** ([`TerminalCLI.tsx`](components/TerminalCLI.tsx), [`HackerLog.tsx`](components/HackerLog.tsx), [`MatrixOverlay.tsx`](components/MatrixOverlay.tsx)) — Press `` ` `` or `~` anywhere to toggle the floating terminal console (`help`, `about`, `skills`, `projects`, `experience`, `logs`, `hack`, `clear`, `exit`) or trigger the Katakana matrix overlay.
- **Editorial Portfolio Sections**:
  - **Overview & Skill Vectors** ([`About.tsx`](components/About.tsx), [`SkillsRadar.tsx`](components/SkillsRadar.tsx))
  - **Collapsible Career Timeline** ([`Experience.tsx`](components/Experience.tsx)) — Compact by default; expands on hover/focus (desktop) or tap (mobile).
  - **Projects Showcase** ([`Projects.tsx`](components/Projects.tsx)) — Responsive project accordion.
  - **Secure Dossier Bypass** ([`DecryptionGame.tsx`](components/DecryptionGame.tsx)) — Interactive handshake mini-game unlocking direct CV download ([`/assets/resume.pdf`](public/assets/resume.pdf)).
  - **Contact Relay** ([`Contact.tsx`](components/Contact.tsx), [`app/api/contact/route.ts`](app/api/contact/route.ts)) — Input-validated, HTML-escaped, in-memory rate-limited SMTP mail handler (5 requests per 15 minutes per IP).

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js `16.2.9` (App Router, Turbopack) |
| UI & Language | React `19.2.4`, TypeScript `^5` |
| 3D / Graphics | Three.js `^0.184.0`, `@react-three/fiber`, `@react-three/drei`, HTML5 Canvas |
| Styling & Icons | Tailwind CSS `^3.4.17`, `lucide-react` |
| Mail Relay | `nodemailer` `^9.0.1` |
| Fonts | `Inter` & `Fira Code` via `next/font/google` |

## Project Structure

```text
.
├── app/
│   ├── api/contact/route.ts   # Rate-limited SMTP contact endpoint
│   ├── globals.css            # Paper/Obsidian CSS tokens, scanlines, transitions
│   ├── layout.tsx             # Metadata, Google fonts, initial theme script
│   └── page.tsx               # Main portfolio page composition
├── components/
│   ├── AsciiPreloader.tsx     # Fullscreen Starry Night canvas preloader
│   ├── starryNightData.ts     # Embedded 288×228 Starry Night painting payload
│   ├── BackgroundCanvas.tsx   # Sakura petals, motes, and cursor ripples
│   ├── CustomCursor.tsx       # Fine-pointer custom cursor
│   ├── Navbar.tsx             # Navigation + theme toggle
│   ├── Hero.tsx               # Typing hero & 3D sword canvas
│   ├── About.tsx              # Bio dossier & overview
│   ├── SkillsRadar.tsx        # Interactive skill axes & stack manifest
│   ├── Experience.tsx         # Hover/tap expandable career timeline
│   ├── Projects.tsx           # Accordion project showcase
│   ├── DecryptionGame.tsx     # Firewall bypass mini-game
│   ├── Testimonials.tsx       # Peer feedback slider
│   ├── Contact.tsx            # Contact form & 3D globe
│   ├── TerminalCLI.tsx        # Floating interactive terminal & system log dock
│   ├── MatrixOverlay.tsx      # Katakana matrix animation overlay
│   └── PortfolioOverlays.tsx  # Footer, cursor, CLI dock, and preloader wrapper
└── public/assets/
    ├── cyber_surgery.png      # Ambient background artwork layer
    └── resume.pdf             # Downloadable CV
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

To enable email delivery through [`app/api/contact/route.ts`](app/api/contact/route.ts), create `.env.local` in the project root:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_TO_EMAIL=recipient@example.com
```

> Without SMTP credentials configured, the site runs normally and `POST /api/contact` responds with `503`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run lint` | Run ESLint (`eslint-config-next`) |
| `npm run build` | Build the optimized production bundle |
| `npm run start` | Serve the production build |
