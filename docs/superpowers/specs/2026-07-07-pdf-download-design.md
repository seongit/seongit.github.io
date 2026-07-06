# PDF Download Design

## Goal

Add a hidden admin-only control that downloads a polished resume PDF from the portfolio page.

The feature is for the site owner, not public visitors. It should keep the current static Astro/GitHub Pages-friendly architecture.

## Decisions

- Use a static PDF file included with the site, such as `public/resume.pdf`.
- Download the file with a click-date filename: `seongeun_resume_YYYYMMDD.pdf`.
- Show the download button only after entering hidden admin mode.
- Enter admin mode by clicking the hero section 5 times within 2 seconds.
- Ask for the admin password with the browser's built-in `prompt()`.
- Read the password from a build-time public environment variable, such as `PUBLIC_RESUME_ADMIN_PASSWORD`, so the actual value is not committed to the repository.
- Keep admin mode only until the browser session ends with `sessionStorage`.
- Do not try to protect direct PDF URL access. This feature only hides the UI from regular visitors.
- Exclude `Articles` from the PDF.
- Include `Solutions` as card summaries only, without expanded detail modal content.

## Architecture

The implementation should stay client-side and static:

- `public/resume.pdf` provides the downloadable PDF asset.
- `Hero.astro` owns the hidden entry gesture because the trigger is hero-section clicks.
- The PDF button can live near the hero contact links as a quiet admin tool.
- A tiny inline script handles click counting, password prompt, session state, button visibility, and the click-date download filename.
- If `PUBLIC_RESUME_ADMIN_PASSWORD` is unset, hidden admin entry should stay disabled.
- Existing global resume layout tokens should be preserved.

No PDF generation library, backend route, or OAuth login is needed for this version.

## UI Behavior

Regular visitors do not see the PDF button.

When the user clicks the hero section 5 times within 2 seconds, the page asks for a password. If the password matches, the PDF button appears immediately and stays visible for the current browser session.

When the PDF button is clicked, JavaScript sets the anchor's `download` attribute to the current local date in this format:

```text
seongeun_resume_YYYYMMDD.pdf
```

If the password is wrong or the prompt is canceled, the page stays unchanged.

## PDF Content

The PDF should be a polished resume-style document, not a raw browser capture.

It should include:

- Hero/about summary
- Solutions card summaries
- Experience
- Education, if present
- Contact links

It should exclude:

- Articles
- Project detail modal content
- Admin-only UI

## Testing

Use the existing project style and avoid new test infrastructure.

Minimum checks:

- `npm run build`
- Existing `npm test`
- Browser verification that admin mode reveals the button
- Browser verification that the button uses `seongeun_resume_YYYYMMDD.pdf`

Add at most one small existing-style test if the implemented script or markup is easy to verify without a browser.

## Out Of Scope

- Real access control for the PDF file
- OAuth or user accounts
- Runtime PDF generation in the browser
- Server/API PDF generation
- Public-facing download CTA
