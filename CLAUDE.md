# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on http://localhost:3000
- **Build**: `npm run build` - Creates production build
- **Production server**: `npm run start` - Starts production server (requires build first)
- **Linting**: `npm run lint` - Runs ESLint with Next.js TypeScript configuration

## Project Architecture

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS v4.

### Key Structure
- **App Router**: Located in `src/app/` - uses file-based routing with layout.tsx and page.tsx conventions
- **TypeScript**: Strict configuration with path aliases (`@/*` maps to `./src/*`)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming and Geist fonts
- **Font Loading**: Uses next/font with Geist Sans and Geist Mono for optimal performance

### Styling System
- Uses CSS custom properties for theme variables (--background, --foreground)
- Automatic dark mode support via `prefers-color-scheme`
- Tailwind v4 with inline theme configuration in globals.css
- Font variables are set up globally and referenced in Tailwind config

### Development Notes
- Main entry point is `src/app/page.tsx`
- Layout configuration in `src/app/layout.tsx` handles fonts and metadata
- ESLint extends Next.js core web vitals and TypeScript rules
- No test framework configured yet