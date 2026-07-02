# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a modern, minimalist portfolio template built with Astro and Tailwind CSS v4. It's designed to be easily customizable through a single configuration file while maintaining a clean, professional appearance.

## Tech Stack

- **Astro**: Static site generator
- **Tailwind CSS v4**: Utility-first CSS framework using the new @tailwindcss/vite plugin
- **TypeScript**: For type-safe configuration
- **Tabler Icons**: Icon library

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Architecture

The project follows a component-based architecture with all customization centralized in `src/config.ts`:

- **Components** (`src/components/`): Individual Astro components for each section (Hero, About, Projects, Experience, Education, Header, Footer)
- **Main Layout** (`src/pages/index.astro`): Single-page layout that imports all components
- **Configuration** (`src/config.ts`): Single source of truth for all content and customization

### Key Architectural Decisions

1. **Single Configuration File**: All content is managed through `src/config.ts` to make customization simple
2. **Conditional Rendering**: Sections automatically hide if their data is removed from the config
3. **Component Independence**: Each section is a self-contained component that reads from the config
4. **Accent Color System**: Single `accentColor` in config propagates throughout the site via CSS custom properties

## Important Implementation Details

- The site uses Tailwind CSS v4 with the Vite plugin configuration
- No linting or testing framework is currently configured
- All components are in `.astro` format (not React/Vue/etc)
- The project uses IBM Plex Mono font loaded from Google Fonts
- Social links in the config are all optional and will conditionally render

## Working with Components

When modifying components:
1. Components read directly from the imported `siteConfig` object
2. Use Tailwind utility classes for styling
3. Maintain the existing monospace font aesthetic
4. Use Tabler Icons for consistency with existing icons

## Resume UI Guidelines

Preserve these visual rules when editing resume sections:

- Section divider lines should be drawn by `.resume-section::after`, centered within the main content width, not across the full viewport.
- Use `.resume-container` and `.resume-section-inner` as the shared width system for hero and resume sections. Avoid ad hoc `max-w-*` and horizontal padding combinations for top-level section containers.
- The hero accent background spans the full viewport, but its inner text, divider, and contact grid should be constrained by `.resume-container` and align with the intro/about content width.
- Keep visible section labels in English: `About`, `Solutions`, `Articles`, `Experience`, and `Education` when education is shown.
- Section headings use the default text color for the title text. Only the leading vertical marker (`.resume-heading::before`) uses the accent color.
- Resume item headings such as project names, company names, and about subtitles should use `.resume-item-heading` so they stay visually aligned with `.resume-heading`.
- Before completing UI layout changes, verify in the in-app browser that section headings and body text do not overlap or intrude into neighboring content at desktop and mobile widths.
- The first item in `Projects.astro` and `Experience.astro` should not render a top divider line or its associated top padding.
- Subsequent project and experience items should keep the subtle accent top divider (`border-t border-accent/25`) and spacing (`pt-6`).
- When updating design tokens in `src/styles/global.css`, preserve the existing `--resume-*` CSS custom properties and wire new section styling through them where possible.

## Configuration Structure

The `src/config.ts` exports a `siteConfig` object with these sections:
- Basic info: name, title, description, accentColor
- Social links: email, linkedin, twitter, github (all optional)
- aboutMe: string
- skills: string[]
- projects: array of {name, description, link, skills}
- experience: array of {company, title, dateRange, bullets}
- education: array of {school, degree, dateRange, achievements}

## 성과 상세 팝업(모달)

성과/케이스 스터디 카드 클릭 시 뜨는 상세 모달을 추가·수정할 때는 아래 SSOT 스킬을 반드시 참조한다
(데이터 스키마·컴포넌트 구조·모달 스크립트·스타일·검증 규칙 포함). 내용을 이 문서에 복사하지 말고 스킬을 따른다.

- 스킬: `astro-detail-popup`
- 프로젝트 심볼릭 링크: `.cursor/skills/astro-detail-popup/SKILL.md`
- 원본(SSOT): `/Users/seongeun/workspace/ai-agent-rules/profiles/obsidian/.ai/skills/astro-detail-popup/SKILL.md`
- 항상 적용되는 요약 규칙: `.cursor/rules/detail-popup.mdc`
