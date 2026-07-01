# About Section Implementation Tasks

## 1. Setup & Dependencies
- [ ] 1.1 Install Lenis smooth scroll library (`npm install @studio-freight/lenis`)
- [ ] 1.2 Verify GSAP and ScrollTrigger are available (already installed)
- [ ] 1.3 Create `src/utils/smoothScroll.js` utility file

## 2. Smooth Scroll Integration (Site-Wide)
- [ ] 2.1 Implement Lenis initialization in App.jsx or smoothScroll.js
  - [ ] 2.1.1 Set duration: 1.2, expo-out easing
  - [ ] 2.1.2 Enable smoothWheel: true
  - [ ] 2.1.3 Disable smoothTouch (keep native mobile scroll)
- [ ] 2.2 Sync Lenis with GSAP ScrollTrigger
  - [ ] 2.2.1 Connect via `lenis.on('scroll', ScrollTrigger.update)`
  - [ ] 2.2.2 Drive through `gsap.ticker.add()`
  - [ ] 2.2.3 Set `gsap.ticker.lagSmoothing(0)`
- [ ] 2.3 Test smooth scroll works on hero section

## 3. About Component Structure
- [ ] 3.1 Create `src/components/About.jsx` component file
- [ ] 3.2 Create `src/components/About.css` stylesheet
- [ ] 3.3 Build semantic HTML structure
  - [ ] 3.3.1 Add section wrapper with `.about` class
  - [ ] 3.3.2 Add `.about__media` with `.about__media-mask` container
  - [ ] 3.3.3 Add image element with `.about__image` class
  - [ ] 3.3.4 Add `.about__content` container
  - [ ] 3.3.5 Add eyebrow text with `.about__eyebrow` class
  - [ ] 3.3.6 Add heading with `.about__heading` class, split into `.line` spans
  - [ ] 3.3.7 Add body paragraph with `.about__body` class
  - [ ] 3.3.8 Add stats container with 3 stat blocks
  - [ ] 3.3.9 Add CTA link with `.about__cta` class
- [ ] 3.4 Add refs for animation targets (heroRef, imageRef, headingRef, etc.)

## 4. Visual Styling
- [ ] 4.1 Extract color values from existing hero section
  - [ ] 4.1.1 Get background color (--bg-primary or #0a0e1a)
  - [ ] 4.1.2 Get text color (--text-primary or #f5f1e8)
  - [ ] 4.1.3 Get accent color (--accent-gold or #c9a468)
- [ ] 4.2 Implement base section styles
  - [ ] 4.2.1 Set dark background matching hero
  - [ ] 4.2.2 Add responsive padding (clamp 80-180px vertical)
  - [ ] 4.2.3 Set overflow: hidden for crop effects
- [ ] 4.3 Implement grid layout
  - [ ] 4.3.1 Desktop: 2-column grid (1fr 1fr)
  - [ ] 4.3.2 Mobile (<900px): 1-column layout
  - [ ] 4.3.3 Add responsive gap (clamp 40-100px)
  - [ ] 4.3.4 Max-width 1440px, centered
- [ ] 4.4 Style image container
  - [ ] 4.4.1 Set aspect-ratio: 4/5 desktop
  - [ ] 4.4.2 Set aspect-ratio: 1/1 mobile
  - [ ] 4.4.3 Add overflow: hidden
  - [ ] 4.4.4 Add subtle border-radius (4px)
  - [ ] 4.4.5 Set will-change: transform on image
- [ ] 4.5 Style typography
  - [ ] 4.5.1 Eyebrow: Inter, 13px, 0.2em letter-spacing, uppercase, gold color
  - [ ] 4.5.2 Heading: Playfair Display, clamp(36-64px), overflow: hidden
  - [ ] 4.5.3 Heading italic emphasis in gold accent color
  - [ ] 4.5.4 Body: Inter, clamp(16-18px), 1.7 line-height, 72% opacity
  - [ ] 4.5.5 Stat numbers: Playfair Display, clamp(28-40px)
  - [ ] 4.5.6 Stat labels: Inter, 12px, uppercase, 50% opacity
- [ ] 4.6 Style CTA link
  - [ ] 4.6.1 Add bottom border with transition
  - [ ] 4.6.2 Add hover state (gold color + border)

## 5. Animation 1: Image Scale-Down Reveal
- [ ] 5.1 Implement GSAP fromTo animation for image scale
- [ ] 5.2 Set initial scale: 1.35, transform-origin: center center
- [ ] 5.3 Animate to scale: 1.0
- [ ] 5.4 Configure ScrollTrigger
  - [ ] 5.4.1 Set trigger: '.about'
  - [ ] 5.4.2 Set start: 'top bottom'
  - [ ] 5.4.3 Set end: 'top top'
  - [ ] 5.4.4 Set scrub: true (1:1 with scroll)
  - [ ] 5.4.5 Set ease: 'none'
- [ ] 5.5 Test zoom-out effect is smooth and synced to scroll

## 6. Animation 2: Heading Line-by-Line Reveal
- [ ] 6.1 Ensure heading lines are wrapped in `.line` spans
- [ ] 6.2 Ensure parent heading has overflow: hidden
- [ ] 6.3 Implement GSAP from animation for each line
  - [ ] 6.3.1 Set initial yPercent: 110
  - [ ] 6.3.2 Animate to yPercent: 0
  - [ ] 6.3.3 Set duration: 1s
  - [ ] 6.3.4 Set ease: 'power4.out'
  - [ ] 6.3.5 Set stagger: 0.12s
- [ ] 6.4 Configure ScrollTrigger
  - [ ] 6.4.1 Set trigger: '.about__heading'
  - [ ] 6.4.2 Set start: 'top 85%'
  - [ ] 6.4.3 Set toggleActions: 'play none none reverse'
- [ ] 6.5 Test line-by-line reveal with visible stagger

## 7. Animation 3: Content Fade-Up Sequence
- [ ] 7.1 Implement GSAP from animation for content elements
  - [ ] 7.1.1 Target: eyebrow, body, stats, CTA
  - [ ] 7.1.2 Set initial y: 30, opacity: 0
  - [ ] 7.1.3 Animate to y: 0, opacity: 1
  - [ ] 7.1.4 Set duration: 0.9s
  - [ ] 7.1.5 Set ease: 'power3.out'
  - [ ] 7.1.6 Set stagger: 0.1s
  - [ ] 7.1.7 Set delay: 0.15s
- [ ] 7.2 Configure ScrollTrigger
  - [ ] 7.2.1 Set trigger: '.about__content'
  - [ ] 7.2.2 Set start: 'top 80%'
  - [ ] 7.2.3 Set toggleActions: 'play none none reverse'
- [ ] 7.3 Test fade-up feels like second "beat" after heading

## 8. Animation 4: Stat Count-Up
- [ ] 8.1 Add data-count attribute to each stat number span
- [ ] 8.2 Set initial innerHTML to "0" for each stat
- [ ] 8.3 Implement ScrollTrigger.create for each stat
  - [ ] 8.3.1 Set trigger: stat element
  - [ ] 8.3.2 Set start: 'top 85%'
  - [ ] 8.3.3 Set once: true (no re-trigger)
- [ ] 8.4 Implement GSAP count-up animation in onEnter
  - [ ] 8.4.1 Animate innerHTML from 0 to data-count value
  - [ ] 8.4.2 Set duration: 1.6s
  - [ ] 8.4.3 Set ease: 'power2.out'
  - [ ] 8.4.4 Set snap: { innerHTML: 1 } for whole numbers
  - [ ] 8.4.5 Append correct suffix (+ or %) in onUpdate
- [ ] 8.5 Test count-up triggers once only

## 9. Optional Animation: Subtle Parallax
- [ ] 9.1 Implement GSAP to animation for image vertical drift
  - [ ] 9.1.1 Animate yPercent from 0 to 8
  - [ ] 9.1.2 Set ease: 'none'
- [ ] 9.2 Configure ScrollTrigger
  - [ ] 9.2.1 Set trigger: '.about'
  - [ ] 9.2.2 Set start: 'top bottom'
  - [ ] 9.2.3 Set end: 'bottom top'
  - [ ] 9.2.4 Set scrub: true
- [ ] 9.3 Test parallax is subtle (not excessive)

## 10. Accessibility Implementation
- [ ] 10.1 Detect prefers-reduced-motion preference
  - [ ] 10.1.1 Use window.matchMedia('(prefers-reduced-motion: reduce)')
- [ ] 10.2 Conditionally register animations
  - [ ] 10.2.1 If reduced motion, skip all ScrollTrigger registrations
  - [ ] 10.2.2 If reduced motion, use gsap.set() to apply final states
  - [ ] 10.2.3 Clear transform/opacity props with clearProps: 'all'
- [ ] 10.3 Add proper semantic HTML
  - [ ] 10.3.1 Use <section> with aria-label
  - [ ] 10.3.2 Use <h2> for section heading
  - [ ] 10.3.3 Add descriptive alt text for image
  - [ ] 10.3.4 Ensure CTA link has descriptive text

## 11. Performance Optimizations
- [ ] 11.1 Optimize image asset
  - [ ] 11.1.1 Source image at rendered size × 1.5
  - [ ] 11.1.2 Use WebP format with JPEG fallback
  - [ ] 11.1.3 Add loading="lazy" if below fold
- [ ] 11.2 Add will-change: transform to image (only during animation)
- [ ] 11.3 Implement ScrollTrigger.refresh() on window resize
  - [ ] 11.3.1 Debounce resize handler (300ms)
  - [ ] 11.3.2 Call ScrollTrigger.refresh()
- [ ] 11.4 Implement ScrollTrigger.refresh() on font load
  - [ ] 11.4.1 Listen to document.fonts.ready promise
  - [ ] 11.4.2 Call ScrollTrigger.refresh() when resolved
- [ ] 11.5 Clean up ScrollTriggers on component unmount
  - [ ] 11.5.1 Use GSAP context wrapper
  - [ ] 11.5.2 Call context.revert() in useEffect cleanup

## 12. Content Integration
- [ ] 12.1 Add section image to public/assets folder
  - [ ] 12.1.1 Suggested: CSE lab or HKBK building photo
  - [ ] 12.1.2 Aspect ratio: 4:5 (portrait)
  - [ ] 12.1.3 Resolution: 800×1000px minimum
- [ ] 12.2 Add final content text
  - [ ] 12.2.1 Eyebrow: "[ About the Department ]"
  - [ ] 12.2.2 Heading: "Engineering minds. / Building the future."
  - [ ] 12.2.3 Body: 2-3 sentences about HKBK CSE department
  - [ ] 12.2.4 Stats: 20 Years, 5000+ Alumni, 92% Placement
  - [ ] 12.2.5 CTA: "Explore Programs →" with href

## 13. Integration & Testing
- [ ] 13.1 Import About component in App.jsx
- [ ] 13.2 Add About component below Hero in render tree
- [ ] 13.3 Test smooth scroll works site-wide (Hero → About transition)
- [ ] 13.4 Test image zoom is smooth (60fps)
- [ ] 13.5 Test heading lines stagger visibly
- [ ] 13.6 Test content fade-up feels delayed after heading
- [ ] 13.7 Test stats count up once on first view
- [ ] 13.8 Test animations reverse on scroll-up
- [ ] 13.9 Test no animation/scroll desync
- [ ] 13.10 Test reduced motion disables animations
- [ ] 13.11 Test responsive layout on mobile (<900px)
- [ ] 13.12 Test in Chrome, Safari, Firefox, Edge
- [ ] 13.13 Test touch scroll feels native on mobile

## 14. Final Polish
- [ ] 14.1 Verify colors exactly match hero section
- [ ] 14.2 Verify typography matches hero (Playfair + Inter)
- [ ] 14.3 Verify all animations use correct easing (power3/4/expo, no bounce)
- [ ] 14.4 Verify stagger timing is subtle (0.08-0.15s range)
- [ ] 14.5 Remove debug console.logs
- [ ] 14.6 Add JSDoc comments for complex animation logic
- [ ] 14.7 Run Lighthouse Performance audit (target >90 score)
- [ ] 14.8 Check Cumulative Layout Shift (<0.1)
