---
name: ui-color-ux
description: Audit and optimize color systems for UX/UI on desktop and mobile, with a focus on consistency, accessibility, and polished visual hierarchy.
origin: ECC
---

# UI Color & UX Optimization

## When to Use

- The interface feels visually inconsistent or too dark/light across screens.
- Multiple pages use different color palettes, shadows, or spacing rules.
- The product needs a cleaner visual hierarchy and stronger brand-friendly contrast.
- You want the app to work well on desktop and mobile without color noise.
- You need a repeatable audit process for color, typography, and component polish.

## How It Works

### Step 1: Inventory the current system

- Scan CSS/Tailwind classes, theme tokens, inline styles, and modal/dialog overlays.
- Identify hard-coded colors, duplicated shades, and inconsistent utility usage.
- Capture desktop/mobile screenshots for the main flows: login, dashboard, module grid, and slide-over dialogs.

### Step 2: Define a cohesive palette

- Choose a neutral foundation for surfaces, backgrounds, borders, and text.
- Select a primary brand color with supporting accent/hint colors.
- Add semantic tokens for success, warning, error, info, and disabled states.
- Keep mobile and desktop palettes aligned with the same core tokens.

### Step 3: Apply design tokens safely

- Centralize tokens in CSS variables or a Tailwind theme.
- Use token utilities like `bg-app`, `bg-surface`, `text-app`, `text-muted`, `border-muted`, and `text-primary`.
- Prefer additive replacements over destructive ones when migrating existing class names.
- Keep theme-specific overrides minimal: one dark/light palette per mode.

### Step 4: Optimize UX details

- Use consistent spacing, corner radius, and elevation across cards and modals.
- Make call-to-action buttons stand out with high contrast and solid fill.
- Tone down non-essential gradients and glows to reduce visual clutter.
- Ensure background surfaces never compete with foreground text.

### Step 5: Validate accessibility and responsiveness

- Check contrast ratios for body text, buttons, links, and placeholders.
- Guarantee at least 4.5:1 for normal text, 3:1 for large text, and 3:1 for UI components.
- Confirm mobile touch targets are at least 44x44 pixels.
- Confirm the app responds gracefully on narrow screens and with collapsed sidebars.

## Output

- A color system recommendation for desktop and mobile.
- A set of CSS/Tailwind token names and usage rules.
- A targeted migration plan for the app's current screens.
- A short visual checklist for final QA.

## Examples

**Audit and propose new palette**

```
/ui-color-ux audit --repo . --screens login,dashboard,settings
```

**Migrate color usage**

```
/ui-color-ux migrate --tokens "bg-app,bg-surface,text-app,text-muted,text-primary,border-muted"
```

**Mobile/desktop polish**

```
/ui-color-ux polish --target "mobile,desktop" --check contrast,spacing,buttons
```

## Best Practices

- Use a single neutral background token for the app shell and a separate surface token for cards.
- Reserve bright colors for actions and status, not for large surfaces.
- Use `text-muted` for secondary copy and keep short labels bolder.
- Use shadow and elevation sparingly, especially on mobile.
- Prefer simple borders or soft gradients over heavy neon glows.

## Related Skills

- `design-system` — when you need a full design system audit
- `frontend-patterns` — when you need component-level consistency and responsive behavior
- `browser-qa` — to validate visual changes through browser automation
