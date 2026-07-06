# PDF Download Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden admin-only button that downloads a static resume PDF with a click-date filename.

**Architecture:** Keep the site static. `Hero.astro` owns the hidden admin gesture, session state, and download filename because the trigger and button both live in the hero section. `public/resume.pdf` is the downloadable asset.

**Tech Stack:** Astro, browser DOM APIs, `sessionStorage`, static public assets, existing Node test scripts.

---

## File Structure

- Modify: `src/components/Hero.astro`
  - Add a hidden PDF download link near the hero contact grid.
  - Add a tiny client script for 5-click admin entry, password check, session state, and `seongeun_resume_YYYYMMDD.pdf` filename.
- Create or provide: `public/resume.pdf`
  - Static polished resume PDF asset.
- Optional test: `tests/hero-copy.test.mjs`
  - Extend existing checks only if simple string assertions cover the new markup/script.

### Task 1: Hero Admin PDF Button

**Files:**
- Modify: `src/components/Hero.astro`

- [x] **Step 1: Add hidden PDF link markup**

Add this link below the existing contact grid in `src/components/Hero.astro`:

```astro
      <a
        href="/resume.pdf"
        data-resume-download
        class="mt-6 hidden border border-page/45 px-4 py-2 text-xs font-bold uppercase tracking-normal text-page/85 transition-colors hover:border-page hover:text-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-page/70"
      >
        Download PDF
      </a>
```

- [x] **Step 2: Add minimal client script**

Change the existing `<script is:inline>` block to a processed `<script>` block so Astro/Vite can replace the public environment variable, then add this code after the rotator setup:

```js
  const resumeAdminPassword = import.meta.env.PUBLIC_RESUME_ADMIN_PASSWORD;
  const resumeDownload = document.querySelector("[data-resume-download]");
  const hero = document.getElementById("hero");
  const adminSessionKey = "resumeAdminEnabled";
  let heroClickCount = 0;
  let heroClickTimer;

  const formatResumeDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const showResumeDownload = () => {
    resumeDownload?.classList.remove("hidden");
  };

  if (resumeDownload) {
    resumeDownload.addEventListener("click", () => {
      resumeDownload.setAttribute(
        "download",
        `seongeun_resume_${formatResumeDate(new Date())}.pdf`,
      );
    });
  }

  if (resumeDownload && sessionStorage.getItem(adminSessionKey) === "true") {
    showResumeDownload();
  }

  if (resumeAdminPassword && hero && resumeDownload) {
    hero.addEventListener("click", () => {
      heroClickCount += 1;
      window.clearTimeout(heroClickTimer);
      heroClickTimer = window.setTimeout(() => {
        heroClickCount = 0;
      }, 2000);

      if (heroClickCount < 5) return;

      heroClickCount = 0;
      window.clearTimeout(heroClickTimer);

      if (window.prompt("Admin password") === resumeAdminPassword) {
        sessionStorage.setItem(adminSessionKey, "true");
        showResumeDownload();
      }
    });
  }
```

- [x] **Step 3: Run build**

Run: `npm run build`

Expected: Astro build completes successfully.

### Task 2: Static PDF Asset

**Files:**
- Create: `public/resume.pdf`

- [x] **Step 1: Create a polished resume PDF**

Create `public/resume.pdf` from the current portfolio content:

- Include hero/about summary, Solutions summaries, Experience, Education if present, and contact links.
- Exclude Articles, project detail modal content, and admin UI.

- [x] **Step 2: Verify the asset exists**

Run: `test -s public/resume.pdf`

Expected: command exits with status 0.

### Task 3: Existing Tests

**Files:**
- Test: existing `tests/*.mjs`

- [x] **Step 1: Run existing tests**

Run: `npm test`

Expected: all tests pass.

- [x] **Step 2: Commit implementation**

```bash
git add src/components/Hero.astro public/resume.pdf docs/superpowers/plans/2026-07-07-pdf-download.md
git commit -m "feat: add hidden resume pdf download"
```

## Self-Review

- Spec coverage: static PDF, hidden admin mode, 5 clicks within 2 seconds, password env var, session-only persistence, click-date filename, Articles exclusion, summary-only Solutions, and no real access control are covered.
- Placeholder scan: no TBD/TODO placeholders remain.
- Type consistency: all DOM selectors and session keys are defined in the plan before use.
