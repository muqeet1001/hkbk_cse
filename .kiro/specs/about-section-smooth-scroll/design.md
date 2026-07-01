# About Section Design — Smooth Scroll Animations

## Architecture Overview

### Component Structure
```
App
├── Loader
├── Navigation
├── Hero (existing)
└── About (NEW)
    ├── SmoothScrollProvider (site-wide wrapper)
    ├── AboutMedia (image with mask)
    └── AboutContent (text, stats, CTA)
```

### Technology Stack
- **GSAP 3.x**: Core animation engine
- **ScrollTrigger**: Scroll-driven animation triggers
- **Lenis**: Smooth scroll library
- **React**: Component framework (existing)
- **CSS Grid**: Layout system

## Implementation Strategy

### Phase 1: Smooth Scroll Integration (Site-Wide)
Install and configure Lenis smooth scroll at the application root level, synchronized with GSAP ScrollTrigger.

**Location**: `src/App.jsx` or new `src/utils/smoothScroll.js`

**Key Integration Points**:
1. Initialize Lenis with premium settings (duration: 1.2, expo easing)
2. Sync Lenis with ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
3. Drive both through `gsap.ticker` (single event loop)
4. Disable smooth scroll on touch devices

### Phase 2: About Component Structure
Create semantic HTML structure with proper class hooks for animation targets.

**Component**: `src/components/About.jsx`

**DOM Structure**:
```html
<section class="about">
  <div class="about__inner">
    <div class="about__media">
      <div class="about__media-mask">
        <img class="about__image" src="..." />
      </div>
    </div>
    <div class="about__content">
      <span class="about__eyebrow">[ About the Department ]</span>
      <h2 class="about__heading">
        <span class="line">Engineering minds.</span>
        <span class="line">Building the <em>future.</em></span>
      </h2>
      <p class="about__body">...</p>
      <div class="about__stats">
        <div class="stat">
          <span class="stat__num" data-count="20">0</span>
          <span class="stat__label">Years of Excellence</span>
        </div>
        <!-- 2 more stats -->
      </div>
      <a class="about__cta">Explore Programs →</a>
    </div>
  </div>
</section>
```

### Phase 3: Visual Styling
Match hero's premium dark aesthetic exactly.

**Stylesheet**: `src/components/About.css`

**Design Tokens** (Pull from existing hero CSS):
- Background: `#0a0e1a` or hero's --bg-primary
- Text: `#f5f1e8` or hero's --text-primary  
- Accent: `#c9a468` or hero's --accent-gold
- Display font: `'Playfair Display', serif`
- Body font: `'Inter', sans-serif`

**Layout**:
- Desktop: 2-column grid, image left, content right
- Mobile: Single column, image then content
- Image aspect ratio: 4:5 desktop, 1:1 mobile
- Max-width: 1440px, centered

### Phase 4: Animation Implementation
Four layered animations, all scroll-triggered.

#### Animation 1: Image Scale-Down Reveal
**Trigger**: Section enters viewport  
**Effect**: Image scales from 1.35 → 1.0  
**Scrub**: 1:1 with scroll position

```javascript
gsap.fromTo('.about__image',
  { scale: 1.35, transformOrigin: 'center center' },
  {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    }
  }
);
```

#### Animation 2: Heading Line-by-Line Reveal
**Trigger**: Heading reaches 85% down viewport  
**Effect**: Lines slide up (yPercent: 110 → 0), staggered  
**Easing**: power4.out

```javascript
gsap.from('.about__heading .line', {
  yPercent: 110,
  duration: 1,
  ease: 'power4.out',
  stagger: 0.12,
  scrollTrigger: {
    trigger: '.about__heading',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  }
});
```

#### Animation 3: Content Fade-Up
**Trigger**: Content container reaches 80% down viewport  
**Effect**: Elements fade in + translate up, staggered  
**Easing**: power3.out

```javascript
gsap.from(['.about__eyebrow', '.about__body', '.about__stats', '.about__cta'], {
  y: 30,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  stagger: 0.1,
  delay: 0.15,
  scrollTrigger: {
    trigger: '.about__content',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  }
});
```

#### Animation 4: Stat Count-Up
**Trigger**: Each stat enters viewport (85% down)  
**Effect**: Numbers count from 0 to data-count  
**Duration**: 1.6s, power2.out, once only

```javascript
document.querySelectorAll('.stat__num').forEach((el) => {
  const target = +el.dataset.count;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 1.6,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() {
          el.innerText = Math.floor(el.innerText);
        }
      });
    }
  });
});
```

#### Optional Animation 5: Subtle Parallax
**Trigger**: Section in viewport  
**Effect**: Image drifts vertically (yPercent: 0 → 8)  
**Scrub**: 1:1 with scroll

```javascript
gsap.to('.about__image', {
  yPercent: 8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.about',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
```

## Accessibility Implementation

### Reduced Motion Support
Wrap all animations in motion preference check:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Register all ScrollTrigger animations
} else {
  // Set final states immediately
  gsap.set(['.about__image', '.about__heading .line', '.about__content > *'], {
    clearProps: 'all'
  });
}
```

### Semantic HTML
- Use `<section>` with proper ARIA label
- Heading hierarchy: `<h2>` for section heading
- Proper alt text for image
- Link has descriptive text (not "click here")

## Performance Optimizations

### Image Handling
- Serve image at rendered size × 1.5 (accounts for 1.35 initial scale)
- Use WebP with JPEG fallback
- Lazy load if not in initial viewport
- Suggested size: 800×1000px (4:5 ratio)

### Animation Performance
- Use `will-change: transform` only during active animation
- Call `ScrollTrigger.refresh()` on:
  - Window resize (debounced 300ms)
  - Web font load complete
- Clean up ScrollTriggers on component unmount:

```javascript
useEffect(() => {
  // Create animations
  const triggers = []; // store refs
  
  return () => {
    triggers.forEach(t => t.kill());
  };
}, []);
```

### Bundle Considerations
- GSAP and Lenis add ~60KB gzipped total
- Tree-shake unused GSAP plugins
- Consider code-splitting if About section is below fold

## Testing Strategy

### Visual Regression
- Screenshot tests at key scroll positions:
  - Section enters viewport (image at 1.35 scale)
  - Section half-scrolled (image at ~1.17 scale)
  - Section fully revealed (image at 1.0 scale)

### Animation QA Checklist
- [ ] Image zoom is smooth (60fps), no jank
- [ ] Heading lines reveal with visible stagger
- [ ] Content fade-up feels delayed after heading
- [ ] Stats count up once on first view only
- [ ] Animations reverse smoothly on scroll-up
- [ ] No animation/scroll desync
- [ ] Reduced motion disables all animations
- [ ] Works on Chrome, Safari, Firefox, Edge
- [ ] Touch scroll feels native on mobile

### Performance Benchmarks
- Lighthouse Performance score: >90
- First Contentful Paint: <2s
- Cumulative Layout Shift: <0.1
- No layout thrashing during scroll

## Edge Cases

### Scroll Direction Changes
Animations should reverse gracefully mid-play if user changes scroll direction (handled by `toggleActions: 'play none none reverse'`).

### Fast Scroll
Scrubbed animations (image scale, parallax) should remain in perfect sync regardless of scroll speed.

### Resize During Scroll
`ScrollTrigger.refresh()` must be called to recalculate trigger points after layout shift.

### Font Loading
If Playfair Display loads late, trigger positions shift. Call `ScrollTrigger.refresh()` on `document.fonts.ready`.

## Fallback Strategy

### No JavaScript
CSS ensures layout is readable:
- Image at scale(1) by default
- Text visible and positioned correctly
- Stats show final values

### JavaScript Error
Lenis initialization wrapped in try/catch. If fails, page scrolls with native behavior (no smooth scroll, but functional).

## File Structure
```
src/
├── App.jsx                    (integrate Lenis here)
├── utils/
│   └── smoothScroll.js       (Lenis + GSAP sync)
├── components/
│   ├── About.jsx             (main component)
│   └── About.css             (styles)
└── assets/
    └── about-cse-lab.jpg     (section image)
```

## Content Recommendations

### Image Selection
- High-quality photo of CSE lab, classroom, or HKBK building exterior
- Good contrast/detail (will be scaled 1.35× at start)
- Aspect ratio: 4:5 (portrait orientation)
- Subjects: Students collaborating, modern equipment, architectural detail

### Statistics
- **20** Years of Excellence (or actual founding year delta)
- **5000+** Alumni Worldwide
- **92%** Placement Rate

Adjust numbers to match actual HKBK CSE department data.

### Heading Copy
Keep brief, impactful, two-line structure with italic emphasis on second line:
- "Engineering minds. / Building the *future.*"
- "Innovation starts here. / Excellence is *our standard.*"

### Body Copy
2-3 sentences, 40-60 words. Focus on:
- Rigor + curiosity
- Real-world problem solving
- Faculty/lab quality
- Industry outcomes

## Dependencies Installation
```bash
npm install @studio-freight/lenis
```

GSAP already installed (existing dependency from Hero section).

## Correctness Properties

### Property 1: Smooth Scroll Synchronization
**Validates**: Requirements 1.1, 1.4, 1.5

**Property**: Lenis scroll position and GSAP ScrollTrigger progress must remain synchronized within 1px tolerance throughout scroll interaction.

**Test Strategy**:
```javascript
// Monitor both systems during scroll
let maxDesync = 0;
lenis.on('scroll', (e) => {
  ScrollTrigger.getAll().forEach(trigger => {
    const lenisProgress = e.progress;
    const gsapProgress = trigger.progress;
    const desync = Math.abs(lenisProgress - gsapProgress);
    maxDesync = Math.max(maxDesync, desync);
  });
});
// Assert maxDesync < 0.01 (1% tolerance)
```

### Property 2: Animation Reversibility
**Validates**: Requirements 3.5, 4.5

**Property**: For all reversible animations (heading, content fade), if scroll direction changes mid-animation, the animation must reverse smoothly without snapping.

**Test Strategy**:
```javascript
// Scroll forward 50%, then immediately backward
// Sample element positions every frame
// Verify no discontinuous jumps in transform/opacity values
```

### Property 3: Count-Up Idempotency
**Validates**: Requirement 5.6

**Property**: Stat count-up animations must trigger exactly once per page load, regardless of how many times the element enters/exits the viewport.

**Test Strategy**:
```javascript
// Monitor ScrollTrigger onEnter callback
// Scroll past stats 3 times
// Assert callback fires once only
```

### Property 4: Reduced Motion Compliance
**Validates**: Requirements 8.1, 8.2, 8.3

**Property**: When `prefers-reduced-motion: reduce` is set, all elements must render in their final state immediately with no animation.

**Test Strategy**:
```javascript
// Mock matchMedia to return prefers-reduced-motion: reduce
// Initialize component
// Assert no ScrollTriggers created
// Assert all elements have clearProps applied
```

### Property 5: Image Scale Bounds
**Validates**: Requirements 2.1, 2.2

**Property**: Image scale value must be clamped to [1.0, 1.35] range at all scroll positions. It must equal 1.35 when section first enters viewport and 1.0 when section top reaches viewport top.

**Test Strategy**:
```javascript
// Sample image transform scale at 10 scroll positions
// Assert all values >= 1.0 and <= 1.35
// Assert value === 1.35 at start: 'top bottom'
// Assert value === 1.0 at end: 'top top'
```

## Implementation Notes for Agent

1. **Color Extraction**: Read hero's CSS variables or computed styles for `--bg-primary`, `--text-primary`, `--accent-gold` instead of hardcoding new values.

2. **Lenis Integration**: Place Lenis initialization in `App.jsx` useEffect, NOT in About component. It must be site-wide.

3. **Font Loading**: Add this to ensure ScrollTrigger refreshes after Playfair Display loads:
```javascript
document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});
```

4. **React Cleanup**: Use GSAP Context for automatic cleanup:
```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP/ScrollTrigger code here
  }, componentRef);
  
  return () => ctx.revert();
}, []);
```

5. **Stat Suffixes**: Handle % vs + suffixes based on data-count value:
```javascript
const suffix = target >= 90 && target <= 100 ? '%' : '+';
// Append suffix in onUpdate
```

This design ensures the About section delivers an Awwards-tier scroll experience while maintaining perfect consistency with the existing hero section's aesthetic.
