# Design Brief: FaceOff

## Direction

FaceOff — A bold, energetic social voting app where users upload group photos and the public judges attractiveness through a TikTok-style vertical swipe feed.

## Tone

Playful yet confident; high-energy and unapologetic about judging. Not corporate, not minimal — this is fun social entertainment with a punch.

## Differentiation

Large, bold numbered badges (1–4) overlaid on faces combined with vibrant magenta-to-cyan gradient accents create an unmistakable visual identity distinct from generic social apps.

## Color Palette

| Token              | OKLCH           | Role                               |
| ------------------ | --------------- | ---------------------------------- |
| background         | 0.14 0.01 280   | Deep charcoal — main surface       |
| foreground         | 0.95 0.01 280   | Near-white text on dark            |
| card               | 0.18 0.015 280  | Slightly elevated poll cards       |
| primary            | 0.68 0.28 310   | Hot magenta — vote buttons, badges |
| accent             | 0.7 0.26 200    | Electric cyan — highlights, rings  |
| muted              | 0.25 0.03 280   | Secondary backgrounds              |
| destructive        | 0.55 0.22 25    | Warning/danger actions             |

## Typography

- Display: Space Grotesk — bold, chunky, modern. Used for poll categories, vote badges, hero text.
- Body: Plus Jakarta Sans — clean, friendly. Used for descriptions, labels, UI text.
- Scale: `text-4xl font-bold` (hero) → `text-xl font-semibold` (section heads) → `text-sm font-body` (labels).

## Elevation & Depth

Layered card surfaces with soft shadows (0.2–0.3 opacity black) create depth. Poll cards float slightly above the background; badges use accent ring borders for visual pop.

## Structural Zones

| Zone    | Background              | Border       | Notes                                    |
| ------- | ----------------------- | ------------ | ---------------------------------------- |
| Header  | bg-card border-b        | border-muted | Nav + user profile; subtle elevation    |
| Feed    | bg-background           | —            | Main voting area; card alternation      |
| Card    | bg-card rounded-2xl     | border       | Poll card; shadow-lg for prominence     |
| Footer  | bg-muted/20 border-t    | border-muted | Creator dashboard; reserved for stats   |

## Spacing & Rhythm

Generous gap between cards (gap-4 → gap-6) creates breathing room on mobile swipe feed. Internal card padding: 1.5rem–2rem. Vote badges positioned absolutely with 12px margin from corners.

## Component Patterns

- Buttons: Rounded-lg, bg-primary, hover:opacity-90, font-semibold. Primary CTA only — one per card.
- Cards: rounded-2xl, bg-card, border border-border, shadow-lg. Poll photo fills card width; vote UI below.
- Badges: inline-flex, w-12 h-12, rounded-full, bg-primary, ring-2 ring-accent. Font: display, bold, text-lg.
- Vote result overlay: Large percentage text (text-5xl) in primary color; animated slide-up entrance.

## Motion

- Entrance: Cards fade-in + slide-up on page load (0.4s ease-out). Poll results pulse-scale (0.6s ease-in-out).
- Hover: Vote buttons shift opacity smoothly (transition-smooth, 0.3s).
- Swipe: Vertical card transitions (native swipe library or CSS translate).

## Constraints

- No gradients on text (badges use solid primary only; gradients reserved for technical highlights if needed).
- Shadow hierarchy: shadow-sm (subtle), shadow-md (cards), shadow-lg (badges), shadow-xl (modals) — never neon/glow.
- Border-radius consistency: rounded-full (badges), rounded-2xl (cards), rounded-lg (buttons), rounded-md (inputs).

## Signature Detail

Bold numbered face badges (1–4) rendered in Space Grotesk with primary fill and accent ring border; combined with hot-magenta vote buttons and instant cyan percentage reveals create a distinctive, high-energy interaction loop.
