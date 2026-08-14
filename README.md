# ERC Academy — English Tense Quiz & Grammar Master

**Version:** 2.4.0 | **Institution:** ERC Academy / English Resource Center
**Architecture:** Single-Page Application (React 18 + Vite + TypeScript)

**Live site:** https://carlosmelliot.github.io/In-Progress---Practice-Quizzer/

---

## What this app does

An interactive English grammar practice platform built for language academies, schools, ESL/EFL programs, and exam prep (IELTS, TOEFL, Cambridge FCE/CAE). It combines active recall, round-robin multiplayer quizzing, real-time scoring, and instant diagnostic feedback across 20+ grammar categories.

### Key features

- **20+ grammar categories** — tenses, phrasal verbs, prepositions, confused words, conditionals, passive voice, reported speech, relative clauses, modal verbs, and more, with 3,200+ lines of curated questions.
- **Multiplayer, 1–6 players** — round-robin turn rotation with individual score and accuracy tracking, custom player names/avatars.
- **Flexible sessions** — choose quiz length (5–30 questions or unlimited) and per-question timer (untimed or 10–30s).
- **Two feedback modes** — Instant Feedback (explanation after each answer) or Exam Mode (results held until the end).
- **User accounts & roles** — Admin / Teacher / Student roles, account enable/disable, SHA-256 password hashing via the browser's native Web Crypto API.
- **PDF export** — generates vector PDF score reports and printable worksheets client-side with jsPDF.
- **Session history** — past attempts are saved locally with date, players, score, and time, searchable by name or date.
- **Light & dark themes**, fully responsive, touch-friendly, and works offline once loaded.

### Tech stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| PDF generation | jsPDF |
| Auth hashing | Web Crypto API (SHA-256) |
| Package manager | Bun (deployment) / npm (local dev) |

---

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```
   npm run dev
   ```
   This binds to `http://0.0.0.0:3000` by default.

### Production build

```
npm run build
```
Output goes to `dist/` — a static, deployable single-page app.

---

## How it was deployed to GitHub Pages

This project uses Vite + React + TypeScript, so the raw source can't be hosted directly — it needs to be built into static HTML/CSS/JS first. That build was automated with GitHub Actions so every push to `main` deploys automatically.

**Repo:** https://github.com/CarlosMElliot/In-Progress---Practice-Quizzer

### 1. Set the base path in `vite.config.ts`

GitHub Pages serves project sites from a subpath (`username.github.io/repo-name/`), so Vite needed to know that:

```ts
base: '/In-Progress---Practice-Quizzer/',
```

### 2. Added a GitHub Actions workflow

Created `.github/workflows/deploy.yml`. On every push to `main`, it installs dependencies with Bun, runs `bun run build`, and deploys the resulting `dist/` folder to GitHub Pages.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. Pushed the project to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/CarlosMElliot/In-Progress---Practice-Quizzer.git
git push -u origin main
```

### 4. Enabled Pages with the right source

In **Settings → Pages → Build and deployment → Source**, selected **"GitHub Actions"** (not "Deploy from a branch"). This matters — without it, GitHub falls back to its own automatic Jekyll build, which just copies raw files instead of running the Vite build.

### 5. Two false starts, both fixed

- **First run failed (404):** the workflow ran before Pages was enabled in Settings. Fixed by re-running once Pages was properly enabled.
- **Second run deployed a blank page:** GitHub auto-triggered its own Jekyll-based "pages build and deployment" workflow instead of the custom one, which served the raw unbuilt `index.html` (console showed a 404 on `src/main.tsx`). Fixed by manually re-running the actual `deploy.yml` workflow from the Actions tab, which ran the real `bun run build` and deployed the compiled `dist/` output.

### Result

Once `deploy.yml` completed successfully, the app went live at:

**https://carlosmelliot.github.io/In-Progress---Practice-Quizzer/**

Every future push to `main` rebuilds and redeploys automatically.

---
*© 2026 ERC Academy. All rights reserved.*
