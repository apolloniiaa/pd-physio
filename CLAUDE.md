@AGENTS.md

# PD Physio Studio — Project Guidelines

## Project

PD Physio Studio is a premium physiotherapy website built with Next.js, React and TypeScript.

## Tech Stack

- Next.js
- React
- TypeScript
- App Router
- SCSS / Sass
- ESLint

Do NOT use Tailwind CSS unless explicitly requested.

## Styling

Use SCSS as the primary styling system.

Keep styling:

- modular
- readable
- easy to edit
- reusable
- responsive

Use centralized SCSS variables, mixins and breakpoints.

Avoid:

- unnecessary inline styles
- duplicated CSS
- excessive one-off values
- unnecessary styling libraries

## Architecture

Use reusable React components.

Keep the project organized into logical sections such as:

- components
- data
- lib
- styles

Do not put the entire website into one large page component.

Keep content/data separate from presentation whenever practical.

## Figma Implementation

When the client approves the Figma design, Figma becomes the source of truth.

Do NOT redesign, reinterpret or simplify the visual concept unless explicitly requested.

Follow the approved Figma design closely:

- layout
- spacing
- typography
- colors
- imagery
- cards
- buttons
- decorative elements
- responsive behavior

Do not invent a different design system.

IMPORTANT:
Do not implement the Figma design before client approval unless explicitly instructed.

## Responsive Design

The site must work properly on:

- desktop
- tablet
- mobile

Do not simply scale down the desktop layout.
Create appropriate responsive behavior for each breakpoint.

## SEO

The final website should be technically SEO-ready for physiotherapy-related and relevant local searches.

Consider:

- semantic HTML
- correct heading hierarchy
- one primary H1
- metadata
- canonical URL
- Open Graph metadata
- sitemap
- robots.txt
- descriptive image alt text
- LocalBusiness structured data
- performance and Core Web Vitals

Never claim or guarantee specific Google rankings.

## Google Reviews

The Reviews section should be prepared for real Google reviews.

Do NOT invent or fabricate customer reviews.

The final implementation should support Google Places data such as:

- reviewer name
- profile image
- rating
- review text
- review date
- required Google attribution

Keep the Google Reviews integration separated from the visual presentation.

## Pricing

Pricing content should remain data-driven and easy to update.

Current pricing information:

- Állapotfelmérés — 55 perc — 20.000 Ft
- Gyógytorna, manuálterápia — 55 perc — 18.000 Ft
- Komplex 6 alkalmas bérlet — 55 perc — 102.000 Ft
- Komplex 10 alkalmas bérlet — 55 perc — 165.000 Ft

Do not add booking/purchase buttons to the pricing cards unless explicitly requested.

## Code Quality

Before considering a change complete:

- run ESLint when appropriate
- run `npm run build`
- fix TypeScript errors
- avoid unrelated changes
- keep the working tree understandable
- do not remove existing project configuration without a reason

## Development Workflow

Make small, logical changes.

Do not modify unrelated files.

Before implementing major visual or architectural changes, inspect the existing project structure and relevant files first.

## Git

Keep commits logical and descriptive.

Do not commit secrets, API keys or environment credentials.

Use environment variables for sensitive configuration.

## Important Rule

The client's approved design and project requirements take priority over assumptions.

When something is unclear, inspect the existing project and relevant documentation before making a large architectural decision.
