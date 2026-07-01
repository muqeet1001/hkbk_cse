qq# About Section — Smooth Scroll Animations

## Feature Overview
Build a premium, cinematic About section for the HKBK College of Engineering CSE Department landing page with Awwards-tier smooth scroll animations. The section will feature GSAP ScrollTrigger-driven reveals, Lenis smooth scroll, and a dark editorial aesthetic matching the existing hero section.

## User Stories

### US-1: Smooth Scroll Experience
**As a** visitor  
**I want** buttery-smooth scrolling throughout the entire page  
**So that** the experience feels premium and professional

**Acceptance Criteria:**
- [ ] 1.1 Lenis smooth scroll is implemented site-wide (not just About section)
- [ ] 1.2 Scroll duration is 1.2s with expo-out easing for heavy, confident glide
- [ ] 1.3 Smooth scroll is disabled on touch devices (native iOS/Android momentum preserved)
- [ ] 1.4 Lenis is synced with GSAP ScrollTrigger via single event loop (no jitter)
- [ ] 1.5 No desync between smooth scroll position and animation triggers

### US-2: Image Scale-Down Reveal
**As a** visitor  
**I want** the section image to dramatically zoom out/resolve as I scroll  
**So that** I experience a cinematic reveal effect

**Acceptance Criteria:**
- [ ] 2.1 Image starts at scale(1.35) when section enters viewport from bottom
- [ ] 2.2 Image scales down to scale(1.0) by the time section reaches top of viewport
- [ ] 2.3 Scale animation is scrubbed 1:1 with scroll position (no auto-play)
- [ ] 2.4 Transform origin is center center
- [ ] 2.5 Image container uses aspect-ratio: 4/5 on desktop, 1/1 on mobile
- [ ] 2.6 Container has overflow: hidden to create proper crop effect

### US-3: Heading Line-by-Line Reveal
**As a** visitor  
**I want** the heading to reveal line by line as I scroll  
**So that** the content feels deliberately paced and premium

**Acceptance Criteria:**
- [ ] 3.1 Each heading line starts translated down (yPercent: 110) and clipped
- [ ] 3.2 Lines slide up into place with 0.12s stagger between them
- [ ] 3.3 Animation uses power4.out easing
- [ ] 3.4 Animation triggers when heading reaches 85% down the viewport
- [ ] 3.5 Animation reverses smoothly when scrolling back up
- [ ] 3.6 Parent heading has overflow: hidden to clip initial state

### US-4: Content Fade-Up Sequence
**As a** visitor  
**I want** body text, stats, and CTA to fade up after the heading  
**So that** content reveals feel like distinct "beats" not simultaneous

**Acceptance Criteria:**
- [ ] 4.1 Eyebrow, body, stats, and CTA start at y: 30, opacity: 0
- [ ] 4.2 Elements fade up with 0.1s stagger and 0.15s initial delay
- [ ] 4.3 Animation uses power3.out easing
- [ ] 4.4 Animation triggers when content container reaches 80% down viewport
- [ ] 4.5 Animation reverses on scroll-up

### US-5: Stat Counter Animation
**As a** visitor  
**I want** statistics numbers to count up from 0  
**So that** the numbers feel dynamic and earn my attention

**Acceptance Criteria:**
- [ ] 5.1 Each stat starts at 0 and counts to its data-count value
- [ ] 5.2 Count-up duration is 1.6s with power2.out easing
- [ ] 5.3 Numbers snap to whole integers (no decimals mid-count)
- [ ] 5.4 Animation triggers once when stat enters viewport (85% down)
- [ ] 5.5 Suffixes (%, +) are appended correctly after count completes
- [ ] 5.6 Count-up does NOT re-trigger on subsequent scroll passes

### US-6: Visual Design Consistency
**As a** visitor  
**I want** the About section to match the hero's premium aesthetic  
**So that** the page feels cohesive and professionally designed

**Acceptance Criteria:**
- [ ] 6.1 Background color matches hero's deep navy-black (#0a0e1a or hero value)
- [ ] 6.2 Text uses warm cream (#f5f1e8 or hero value), not pure white
- [ ] 6.3 Gold accent color (#c9a468 or hero value) used for eyebrow and italic text
- [ ] 6.4 Heading uses 'Playfair Display' serif (same as hero HKBK)
- [ ] 6.5 Body text uses 'Inter' sans-serif (same as hero)
- [ ] 6.6 No new arbitrary colors introduced

### US-7: Responsive Layout
**As a** visitor on mobile  
**I want** the About section to reflow elegantly  
**So that** I can read and appreciate the content on any device

**Acceptance Criteria:**
- [ ] 7.1 Desktop: 2-column grid (image | content) with 40-100px gap
- [ ] 7.2 Mobile (<900px): single column, image then content
- [ ] 7.3 Image aspect-ratio changes from 4/5 to 1/1 on mobile
- [ ] 7.4 Typography scales responsively with clamp() functions
- [ ] 7.5 Stats layout adjusts from horizontal flex to vertical/wrapped on small screens

### US-8: Performance & Accessibility
**As a** visitor with reduced motion preferences  
**I want** animations to be disabled when I've set that preference  
**So that** the site respects my accessibility needs

**Acceptance Criteria:**
- [ ] 8.1 prefers-reduced-motion is detected via matchMedia
- [ ] 8.2 If reduced motion is set, all animations are skipped
- [ ] 8.3 Elements render in final state immediately when animations disabled
- [ ] 8.4 Image is served at rendered size × 1.5 (accounts for initial 1.35 scale)
- [ ] 8.5 will-change: transform is only applied during active animation
- [ ] 8.6 ScrollTrigger.refresh() called on window resize (debounced)
- [ ] 8.7 ScrollTrigger.refresh() called on web font load complete
- [ ] 8.8 All ScrollTriggers are killed on component unmount (React)

## Technical Constraints

### Required Dependencies
- GSAP 3.x (already installed)
- GSAP ScrollTrigger plugin (already available)
- @studio-freight/lenis for smooth scroll (NEW - must install)

### Animation Principles
- **Ease families**: power3/power4/expo only — no bounce, elastic, or back eases
- **Stagger timing**: 0.08–0.15s between elements — subtle, not dramatic
- **Reversibility**: All animations use `toggleActions: 'play none none reverse'` (except one-time count-up)
- **Scrub animations**: Image scale and parallax tied 1:1 to scroll (ease: 'none')
- **No autoplay**: All animations triggered by scroll position, not time-based

### Integration Requirements
- Lenis must drive ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Use `gsap.ticker` as single source of truth, NOT separate requestAnimationFrame loops
- Smooth scroll must be site-wide (initialized in App/Layout, not just About component)

## Content Structure

### Section Elements
1. **Media container** with mask/crop
2. **Eyebrow text**: "[ About the Department ]"
3. **Heading**: Multi-line with italic emphasis
4. **Body paragraph**: 2-3 sentences about CSE department
5. **Statistics**: 3 stat blocks with count-up numbers
6. **CTA link**: "Explore Programs →"

### Suggested Content
- **Heading**: "Engineering minds. / Building the *future.*"
- **Stats**: 
  - 20 Years of Excellence
  - 5000+ Alumni Worldwide  
  - 92% Placement Rate
- **Body**: Focus on rigor, labs, faculty, real-world problem solving

## Out of Scope
- Additional sections beyond About
- Navigation menu changes
- Form interactions
- Mobile menu implementation
- Video backgrounds in About section

## Success Metrics
- Image zoom reveal is perfectly smooth with no jitter
- Heading lines cascade with visible stagger (not simultaneous)
- Content fade-up feels like distinct second "beat" after heading
- Stat numbers count up once on first view
- Scroll-up reverses animations gracefully
- Whole page scroll feels weighted and continuous via Lenis
- Colors and typography match hero exactly

## References
- Motion language: elyse-residence-dev.webflow.io About section
- Aesthetic: Awwards-tier institutional/editorial dark premium
- Existing hero: HKBK landing page hero section (for color/type matching)
