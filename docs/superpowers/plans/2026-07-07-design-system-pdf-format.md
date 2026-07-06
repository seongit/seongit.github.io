# Design System PDF Format Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Regenerate `public/resume.pdf` in the approved option B visual direction.

**Architecture:** Keep the app unchanged. Generate a static PDF asset from `src/config.ts` using the existing local Python/reportlab workflow, mapping the web resume tokens into PDF drawing styles.

**Tech Stack:** Astro config data, Python reportlab, Poppler `pdfinfo`/`pdftoppm`, existing `npm test` and `npm run build`.

---

### Task 1: Regenerate Resume PDF

**Files:**
- Modify: `public/resume.pdf`

- [x] **Step 1: Generate the PDF**

Generate `public/resume.pdf` with:

- first-page accent hero band
- page background `#f3efe3`
- section marker blocks in `#c8644f`
- content-width dividers in subtle accent
- About, Solutions summaries, Experience, optional Education

- [x] **Step 2: Render PDF to PNG**

Run:

```bash
mkdir -p tmp/pdfs
pdftoppm -png -r 140 public/resume.pdf tmp/pdfs/resume-design-system
```

Expected: PNG pages render without Poppler errors.

- [x] **Step 3: Inspect rendered pages**

Open the rendered PNGs and verify no clipped, overlapping, or unreadable text.

### Task 2: Verify Site

**Files:**
- Test: existing project checks

- [x] **Step 1: Run tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [x] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: Astro build succeeds.

## Self-Review

- Spec coverage: option B visual direction, static PDF constraint, content scope, and verification are covered.
- Placeholder scan: no TODO/TBD placeholders.
- Scope check: only `public/resume.pdf` changes; app behavior is unchanged.
