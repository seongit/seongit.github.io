# Design System PDF Format

## Goal

Update `public/resume.pdf` so it reads like a PDF version of the current web resume, not a generic document.

## Approved Direction

Use option B: a compact web-resume translation.

The PDF should preserve the existing resume design system:

- Page background: `#f3efe3`
- Surface/card background: `#faf7f0`
- Accent color: `#c8644f`
- Text color: `#2f2a26`
- Subtle divider: `rgb(200 100 79 / 0.25)`
- First page accent hero band
- Centered hero name and role divider
- Section headings with a left accent marker
- Default text color for section titles
- Thin section dividers constrained to the content width

## Content Rules

Keep the existing PDF content scope:

- Include About
- Include Solutions as card summaries only
- Include Experience
- Include Education only when configured
- Exclude Articles
- Exclude project detail modal content
- Exclude admin-only UI

## Constraints

- Keep `public/resume.pdf` as a static file.
- Do not add PDF generation libraries to the web app.
- Do not change the download/admin-button behavior.
- Verify by rendering the PDF to PNG and checking for clipped, overlapping, or unreadable text.
