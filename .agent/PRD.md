# Dark-UI Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** February 9, 2026  
**Project:** Dark-UI Component Library  
**Repository:** Amarprasad33/Dark-UI

---

## Executive Summary

**Dark-UI** is a premium, dark-themed UI component library built for modern web applications. It provides highly animated, visually stunning components optimized for dark mode interfaces with a focus on performance, accessibility, and developer experience.

### Vision

To become the go-to component library for developers building sophisticated, dark-themed web applications that demand premium aesthetics and smooth animations without compromising performance.

### Target Audience

- Frontend developers building dark-mode-first applications
- Design-conscious developers who value premium UI/UX
- Teams working on modern SaaS products, dashboards, and creative portfolios
- Developers familiar with React, Next.js, and Framer Motion

---

## Product Overview

### Core Value Propositions

1. **Premium Dark Aesthetics**
   - Carefully crafted dark color palettes
   - Sophisticated animations and micro-interactions
   - Visual polish that creates a "wow" factor

2. **Performance-Optimized**
   - Tree-shakeable exports for minimal bundle size
   - Memoized components to prevent unnecessary re-renders
   - Hoisted constants and SVG icons
   - Optimized animation configurations

3. **Developer Experience**
   - Named exports for composition flexibility
   - TypeScript-first with comprehensive type definitions
   - Consistent API patterns across components
   - Extensive documentation with live examples

4. **Production-Ready**
   - Accessibility-compliant (ARIA attributes, keyboard navigation)
   - Responsive and mobile-friendly
   - Battle-tested animation patterns
   - Compatible with Next.js App Router and React 19

---

## Technical Architecture

### Technology Stack

| Category      | Technology    | Version   | Purpose                       |
| ------------- | ------------- | --------- | ----------------------------- |
| Framework     | Next.js       | 16.1.4+   | App framework with App Router |
| Runtime       | React         | 19.2.3+   | UI library                    |
| Animation     | Framer Motion | 12.23.13+ | Animation engine              |
| Styling       | Tailwind CSS  | 4.x       | Utility-first CSS             |
| Type Safety   | TypeScript    | 5.x       | Static typing                 |
| Documentation | Fumadocs      | 16.4.7+   | Documentation framework       |
| Registry      | shadcn/ui     | 2.9.3+    | Component registry system     |

### Project Structure

```
Dark-UI/
├── .agent/                    # Agent configuration and documentation
│   ├── skills/               # Development skills and best practices
│   │   └── vercel-react-best-practices/
│   ├── workflows/            # Automated workflows
│   └── PRD.md               # This document
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── docs/            # Documentation pages
│   │   └── page.tsx         # Landing page
│   ├── registry/            # Component registry
│   │   └── iris/            # Component collection
│   │       ├── tubelight-accordion/
│   │       ├── luminated-checkbox/
│   │       ├── smooth-accordion/
│   │       └── vertical-nav/
│   └── lib/                 # Shared utilities
├── content/                  # MDX documentation content
│   └── docs/
│       └── components/
├── public/                   # Static assets
│   ├── logo/
│   └── r/                   # Built registry files
└── registry.json            # Component registry manifest
```

### Design Principles

1. **Composition Over Configuration**
   - Components export sub-components for maximum flexibility
   - Named exports enable tree-shaking and selective imports
   - Example: `export { AnimatedCheckbox, DEFAULT_ITEMS }`

2. **Performance First**
   - Memoization of expensive computations and components
   - Hoisted constants and SVG components
   - Optimized animation configurations
   - `useMemo`, `useCallback`, and `memo` used strategically

3. **Type Safety**
   - Exported TypeScript interfaces for all component props
   - Comprehensive JSDoc comments
   - Strict type checking enabled

4. **Accessibility**
   - Semantic HTML elements
   - ARIA attributes (roles, labels, states)
   - Keyboard navigation support
   - Focus management

---

## Component Specifications

### Current Components (v0.1.0)

#### 1. Tubelight Accordion

**Description:** An animated accordion that mimics the delayed illumination of fluorescent tube lights with realistic flicker effects.

**Key Features:**

- Realistic tubelight flicker animation on expand
- Custom `useFlickerAnimation` hook for timing
- Hoisted SVG icons (PowerOffIcon, PlusIcon, TubelightGlowSVG)
- Smooth expand/collapse transitions

**API:**

```typescript
interface TubelightAccordionProps {
  className?: string;
  question?: string;
  answer?: string;
}
```

**Named Exports:**

- `PowerOffIcon` - Memoized power icon component
- `PlusIcon` - Memoized plus icon component
- `TubelightGlowSVG` - Memoized glow effect SVG

**Performance Optimizations:**

- Memoized flicker animation calculations
- Hoisted SVG components prevent re-creation
- Optimized keyframe animations

---

#### 2. Luminated Checkbox

**Description:** An animated checkbox with border animations, fill effects, strikethrough text, and smooth state transitions.

**Key Features:**

- Multi-stage animation sequence (border → fill → checkmark)
- Strikethrough animation on checked state
- Text slide micro-interaction
- Keyboard accessible

**API:**

```typescript
interface LuminatedCheckboxProps {
  items?: string[];
  className?: string;
  onChange?: (index: number, checked: boolean) => void;
}

interface AnimatedCheckboxProps {
  displayText: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}
```

**Named Exports:**

- `AnimatedCheckbox` - Individual checkbox component
- `DEFAULT_ITEMS` - Default checkbox items array

**Performance Optimizations:**

- Memoized `AnimatedCheckbox` sub-component
- `useCallback` for event handlers
- Optimized animation sequences with `useAnimate`

---

#### 3. Vertical Navigation Menu

**Description:** Animated vertical navigation with spring-based transitions and return functionality.

**Key Features:**

- Spring physics-based animations
- Dynamic height calculations
- Return-to-menu functionality
- Smooth item reordering

**API:**

```typescript
interface MenuItem {
  id: string;
  label: string;
}

interface VerticalNavProps {
  items?: MenuItem[];
  onSelect?: (item: MenuItem, index: number) => void;
  className?: string;
}
```

**Named Exports:**

- `ReturnIcon` - Memoized return arrow icon
- `NavRow` - Individual navigation row component
- `SPRING_CONFIG` - Reusable spring animation config
- `DEFAULT_ITEMS` - Default menu items

**Performance Optimizations:**

- Memoized `NavRow` sub-component
- `useLayoutEffect` for DOM measurements
- Hoisted spring configuration
- Stabilized items reference with `useMemo`

---

#### 4. Smooth Accordion

**Description:** A smooth accordion component with elegant expand/collapse animations.

**Status:** Currently under refactoring to align with best practices from `tubelight-accordion` and `luminated-checkbox`.

**Planned Improvements:**

- Adopt named exports pattern
- Extract reusable sub-components
- Implement performance optimizations
- Add comprehensive TypeScript types

---

### Component Development Standards

All components in the Dark-UI library must adhere to these standards:

#### Code Structure Template

```typescript
"use client";

import { /* React hooks */ } from "react";
import { /* motion imports */ } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export interface ComponentNameProps {
  /** JSDoc description */
  propName?: type;
}

// ============================================================================
// Hoisted Constants & SVG Icons
// ============================================================================

const CONSTANT_NAME = { /* ... */ } as const;

const IconComponent = memo(function IconComponent() {
  return (/* SVG */);
});
IconComponent.displayName = "IconComponent";

// ============================================================================
// Custom Hooks (if needed)
// ============================================================================

function useCustomHook() {
  return useMemo(() => {
    // Memoized calculations
  }, [dependencies]);
}

// ============================================================================
// Sub-components
// ============================================================================

const SubComponent = memo(function SubComponent(props: SubComponentProps) {
  // Implementation
});
SubComponent.displayName = "SubComponent";

// ============================================================================
// Main Component
// ============================================================================

export default function ComponentName(props: ComponentNameProps) {
  // Implementation
}

ComponentName.displayName = "ComponentName";

// Named exports for composition and tree-shaking
export { SubComponent, IconComponent, CONSTANT_NAME };
```

#### Required Patterns

1. **Exports:**
   - Default export for main component
   - Named exports for sub-components, icons, and constants
   - All exports must have TypeScript types

2. **Performance:**
   - Use `memo` for sub-components
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for event handlers
   - Hoist constants and SVG components

3. **Accessibility:**
   - Include ARIA attributes (`role`, `aria-label`, `aria-checked`, etc.)
   - Support keyboard navigation
   - Provide focus indicators
   - Use semantic HTML

4. **Documentation:**
   - JSDoc comments for all props
   - `displayName` for all components
   - Section comments using `// ===...===` dividers

---

## Registry System

### Component Registration

Components are registered in `registry.json` following the shadcn/ui schema:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "dark-ui",
  "homepage": "http://dark-ui.vercel.app",
  "items": [
    {
      "name": "component-name",
      "type": "registry:block",
      "title": "Component Display Name",
      "description": "Brief component description",
      "dependencies": ["motion", "clsx", "tailwind-merge"],
      "registryDependencies": [],
      "files": [
        {
          "path": "registry/iris/component-name/index.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Build Process

```bash
npm run registry:build
```

This command builds the registry and outputs to `public/r/` for distribution.

---

## Documentation Strategy

### Documentation Framework

Using **Fumadocs** for documentation with MDX content:

- **Location:** `content/docs/components/`
- **Format:** MDX (Markdown + JSX)
- **Features:** Live component demos, code snippets, API tables

### Documentation Template

Each component should have a corresponding `.mdx` file:

````mdx
---
title: Component Name
description: Brief description
---

## Overview

Detailed explanation of the component and its use cases.

## Installation

```bash
npx shadcn@latest add http://dark-ui.vercel.app/r/component-name.json
```
````

## Usage

### Basic Example

```tsx
import ComponentName from "@/components/component-name";

export default function Demo() {
  return <ComponentName />;
}
```

### With Custom Props

```tsx
<ComponentName prop1="value" prop2={callback} />
```

## Composition

Explanation of named exports and how to use sub-components.

```tsx
import { SubComponent, CONSTANT } from "@/components/component-name";
```

## API Reference

### ComponentNameProps

| Prop  | Type   | Default   | Description |
| ----- | ------ | --------- | ----------- |
| prop1 | string | undefined | Description |

## Accessibility

Details on keyboard navigation and ARIA support.

## Performance

Explanation of optimizations and tree-shaking benefits.

```

---

## Development Workflow

### Adding a New Component

1. **Create Component Directory**
```

src/registry/iris/component-name/
└── index.tsx

````

2. **Implement Component**
- Follow the code structure template
- Implement all required patterns
- Add TypeScript types

3. **Register Component**
- Add entry to `registry.json`
- Specify dependencies

4. **Create Documentation**
- Create `content/docs/components/component-name.mdx`
- Include examples and API reference

5. **Build Registry**
```bash
npm run registry:build
````

6. **Test Locally**
   ```bash
   npm run dev
   ```

### Quality Checklist

Before marking a component as complete:

- [ ] Follows code structure template
- [ ] Has TypeScript types exported
- [ ] Includes named exports for sub-components
- [ ] Uses performance optimizations (memo, useMemo, useCallback)
- [ ] Has accessibility features (ARIA, keyboard support)
- [ ] Registered in `registry.json`
- [ ] Has MDX documentation
- [ ] Tested in development environment
- [ ] Responsive on mobile devices
- [ ] Works with dark theme

---

## Roadmap

### Phase 1: Foundation (Current - v0.1.0)

- [x] Project setup with Next.js 16 and React 19
- [x] Fumadocs documentation framework
- [x] Registry system integration
- [x] Initial components: Tubelight Accordion, Luminated Checkbox, Vertical Nav
- [ ] Refactor Smooth Accordion to match best practices
- [ ] Complete documentation for all components

### Phase 2: Expansion (v0.2.0)

- [ ] Add 5-10 new dark-themed components:
  - Animated buttons with glow effects
  - Dark-themed form inputs
  - Loading skeletons with shimmer
  - Toast notifications
  - Modal/Dialog components
  - Dropdown menus
  - Tabs with smooth transitions
  - Progress indicators
- [ ] Create component showcase page
- [ ] Add interactive playground for each component

### Phase 3: Enhancement (v0.3.0)

- [ ] Theme customization system
- [ ] Color palette variants
- [ ] Animation speed controls
- [ ] Accessibility audit and improvements
- [ ] Performance benchmarking
- [ ] Bundle size optimization

### Phase 4: Ecosystem (v0.4.0)

- [ ] CLI tool for component installation
- [ ] VS Code extension
- [ ] Figma design kit
- [ ] Storybook integration
- [ ] Testing utilities
- [ ] Migration guides

### Phase 5: Community (v1.0.0)

- [ ] Public npm package
- [ ] Community contribution guidelines
- [ ] Component request system
- [ ] Discord community
- [ ] Video tutorials
- [ ] Blog with component deep-dives

---

## Success Metrics

### Technical Metrics

- **Bundle Size:** Each component < 10KB gzipped
- **Performance:** Lighthouse score > 95
- **Accessibility:** WCAG 2.1 AA compliance
- **Type Coverage:** 100% TypeScript coverage
- **Tree-shaking:** All named exports tree-shakeable

### User Metrics

- **Installation Time:** < 30 seconds per component
- **Time to First Use:** < 5 minutes from discovery to implementation
- **Documentation Clarity:** Users can implement without external help
- **Customization Ease:** Props cover 80% of use cases

### Community Metrics

- **GitHub Stars:** Target 1,000+ stars
- **Weekly Downloads:** Target 10,000+ downloads
- **Community Components:** 10+ community-contributed components
- **Documentation Views:** 50,000+ monthly views

---

## Design Philosophy

### Visual Language

**Color Palette:**

- Primary backgrounds: `#0a0a0a`, `#121212`, `#1a1a1a`
- Accent colors: `#f7f7f7`, `#c1c1c1`, `#9f9fa9`
- Interactive states: `#545454`, `#999`
- Hover effects: `zinc-800`, `zinc-200/80`

**Animation Principles:**

- **Purposeful:** Every animation serves a functional purpose
- **Smooth:** Spring physics for natural motion
- **Fast:** Animations complete in 200-400ms
- **Responsive:** Immediate feedback to user actions

**Typography:**

- Use system fonts or Geist for consistency
- Font weights: 400 (regular), 500 (medium), 600 (semibold)
- Clear hierarchy with appropriate sizing

### Interaction Patterns

1. **Hover States:** Subtle color shifts and scale changes
2. **Active States:** Immediate visual feedback
3. **Loading States:** Skeleton screens or shimmer effects
4. **Error States:** Clear, non-intrusive error messaging
5. **Success States:** Celebratory micro-animations

---

## Technical Constraints

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 10+

### Dependencies

- Minimize external dependencies
- Prefer native solutions when possible
- All dependencies must be actively maintained
- Total dependency size < 500KB

### Performance Budgets

- Initial JS bundle: < 200KB
- Per-component bundle: < 10KB
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

---

## Risk Assessment

### Technical Risks

| Risk                           | Impact | Probability | Mitigation                          |
| ------------------------------ | ------ | ----------- | ----------------------------------- |
| Framer Motion breaking changes | High   | Medium      | Pin versions, maintain upgrade path |
| Next.js App Router changes     | High   | Low         | Follow Next.js upgrade guides       |
| Performance regressions        | Medium | Medium      | Automated performance testing       |
| Accessibility issues           | High   | Low         | Regular audits, automated testing   |

### Product Risks

| Risk                            | Impact | Probability | Mitigation                       |
| ------------------------------- | ------ | ----------- | -------------------------------- |
| Low adoption                    | High   | Medium      | Marketing, showcase projects     |
| Component quality inconsistency | Medium | Medium      | Strict review process, templates |
| Documentation gaps              | Medium | High        | Documentation-first approach     |
| Community contribution quality  | Low    | Medium      | Contribution guidelines, reviews |

---

## Competitive Analysis

### Similar Libraries

**shadcn/ui**

- Strengths: Excellent DX, copy-paste approach, large community
- Weaknesses: Not dark-mode focused, minimal animations
- Differentiation: Dark-UI focuses on premium dark aesthetics and animations

**Aceternity UI**

- Strengths: Beautiful animations, dark theme
- Weaknesses: Paid, less customizable
- Differentiation: Dark-UI is free, open-source, more composable

**Magic UI**

- Strengths: Animated components, modern design
- Weaknesses: Limited component library
- Differentiation: Dark-UI has comprehensive documentation and registry system

**Framer Motion Templates**

- Strengths: High-quality animations
- Weaknesses: Not a cohesive library, no registry
- Differentiation: Dark-UI provides a unified system with installation tooling

---

## Contribution Guidelines

### Code Contributions

1. **Fork and Clone**
2. **Create Feature Branch:** `git checkout -b feature/component-name`
3. **Follow Code Standards:** Use the component template
4. **Write Documentation:** Include MDX file
5. **Test Thoroughly:** Test on multiple browsers
6. **Submit PR:** With clear description and screenshots

### Component Submission Criteria

- [ ] Follows Dark-UI design principles
- [ ] Implements all required patterns
- [ ] Has comprehensive TypeScript types
- [ ] Includes accessibility features
- [ ] Has performance optimizations
- [ ] Includes documentation
- [ ] Works on mobile devices
- [ ] No console errors or warnings

---

## Appendix

### Glossary

- **Registry:** System for distributing and installing components
- **Named Exports:** Exporting multiple items from a module for tree-shaking
- **Tree-shaking:** Removing unused code from bundles
- **Hoisting:** Moving declarations to outer scope for reuse
- **Memoization:** Caching expensive computations

### References

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [shadcn/ui Registry Schema](https://ui.shadcn.com/docs/registry)
- [Fumadocs Documentation](https://fumadocs.vercel.app/)
- [Vercel React Best Practices](.agent/skills/vercel-react-best-practices/SKILL.md)

### Version History

| Version | Date       | Changes              |
| ------- | ---------- | -------------------- |
| 1.0     | 2026-02-09 | Initial PRD creation |

---

**Document Owner:** Amarmelops  
**Last Review:** 2026-02-09  
**Next Review:** 2026-03-09
