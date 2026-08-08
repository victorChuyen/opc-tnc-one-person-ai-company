---
name: theme-migration
description: Migrate a codebase to use design tokens and a single light/dark theme system; includes safe, reviewable automation steps.
origin: ECC
---

# Theme Migration — Tokenize & Migrate Styles

## When to Use

- You need a consistent light/dark theme across an existing frontend.
- UI has many ad-hoc Tailwind classes or hardcoded colors.
- You want an automated, reversible migration with human review points.

## How It Works

1. Audit current usage (colors, classes, variables).
2. Propose a small set of design tokens (CSS custom properties) for colors, surface, text, muted, primary, accent.
3. Add tokens to a central stylesheet (e.g., `src/index.css`).
4. Run a conservative automated replacement that only replaces known safe patterns into tokenized utilities.
5. Open a backup branch with changes for manual review and visual QA.
6. Iterate until design QA passes, then merge.

## Safety & Rollback

- Always create a backup branch before bulk edits:

```
git checkout -b theme-migration/backup
git add -A && git commit -m "backup: before theme migration"
git checkout main
```

- Use the replacement script in `app-win/scripts/sync-theme-classes.mjs` with `node`.
- If results are poor, restore the original files from the backup branch:

```
git checkout main
git restore --source=theme-migration/backup -- apps/web/src
```

## Automated Flow (recommended)

1. Run Lighthouse or visual snapshot to have a baseline.
2. Start a dev server and confirm the app is reachable.
3. Run the conservative replacement script:

```
node "app-win/scripts/sync-theme-classes.mjs"
```

4. Commit changes to a review branch:

```
git checkout -b theme-migration/auto-replace
git add apps/web/src && git commit -m "chore(theme): automated token replacements"
```

5. Run the dev server and perform visual QA (manual or visual-regression tests).

6. Iterate mapping rules in the script for narrower/wider replacements.

## Mapping Guidelines (conservative)

- Replace background classes used for large surfaces (bg-white, bg-slate-50) -> `.bg-app`.
- Replace darker slab surfaces (bg-slate-700..950) -> `.bg-surface`.
- Replace primary text (text-white, text-slate-900) -> `.text-app`.
- Replace muted text (text-slate-300..400) -> `.text-muted`.
- Replace border slate shades -> `.border-muted`.

When in doubt, prefer adding a token class beside the existing class rather than removing it. This lets designers toggle tokens quickly.

## Example Commands

Start dev server (Windows):

```bat
app-win\start-local.bat
```

Run Lighthouse baseline (example):

```bash
npx lighthouse http://localhost:5174 --output=json --output-path "app-win/lighthouse-report.json" --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"
```

Run replacement script:

```bash
node app-win/scripts/sync-theme-classes.mjs
```

Create review branch & commit:

```bash
git checkout -b theme-migration/auto-replace
git add apps/web/src && git commit -m "chore(theme): automated token replacements"
```

## QA Checklist

- Baseline Lighthouse report saved.
- Visual snapshots before/after for main pages: Dashboard, Campaigns, Automation, Content Library, Approvals.
- Accessibility spot-check: contrast ratios for primary buttons and body text.
- Confirm no console/runtime errors.
- Ensure theme toggle works and persists.

## When to Stop Automation

- If automated replacements cause layout regressions or incorrect color usage, stop and move to manual or supervised replacements.
- Prefer smaller replacement passes scoped to components (e.g., `src/components/*`) rather than global all-at-once replacements.

## Related Skills

- `design-system` — generate tokens and preview
- `e2e-testing` / `visual-regression` — add snapshot tests for regressions

---

Save this file under `skills/design-system/theme-migration/SKILL.md` and use it to coordinate automated migrations.
