# ERC Academy — English Tense Quiz & Grammar Master

**Version:** 2.4.0 | **Institution:** ERC Academy / English Resource Center
**Architecture:** Single-Page Application (React 18 + Vite + TypeScript)
**Live site:** https://carlosmelliot.github.io/In-Progress-Practice-Quizzer/
**Repository:** https://github.com/CarlosMElliot/In-Progress-Practice-Quizzer

<<<<<<< HEAD
---

## Table of contents

1. [What this app does](#what-this-app-does)
2. [Tech stack](#tech-stack)
3. [Run locally](#run-locally)
4. [Deployment guide — mental model](#deployment-guide--mental-model)
5. [First-time setup, step by step](#first-time-setup-step-by-step)
6. [Understanding `deploy.yml`](#understanding-deployyml)
7. [Enabling GitHub Pages](#enabling-github-pages)
8. [Everyday update workflow](#everyday-update-workflow)
9. [Mistakes made on this project (and fixes)](#mistakes-made-on-this-project-and-fixes)
10. [Reference tables](#reference-tables)
11. [Checklists](#checklists)
12. [Final takeaway](#final-takeaway)
=======
**Live site:** https://carlosmelliot.github.io/In-Progress-Practice-Quizzer/
>>>>>>> cd8075a66cc7011f11c829335eac6e769b6ca324

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

## Tech stack

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

## Run locally

**Prerequisites:** Node.js

```bash
npm install
```

Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key, then:

```bash
npm run dev
```

This binds to `http://0.0.0.0:3000` by default.

### Production build

```bash
npm run build
```

Output goes to `dist/` — a static, deployable single-page app.

---

## Deployment guide — mental model

This section is a reusable, end-to-end workflow for taking a Bun + Vite/React project from VS Code all the way to a live GitHub Pages site, and for publishing every future update automatically.

<<<<<<< HEAD
```
VS Code project
    ↓
Bun + Vite
    ↓
Git
    ↓
GitHub repository
    ↓
GitHub Actions
    ↓
bun install
    ↓
bun run build
    ↓
dist/
    ↓
GitHub Pages
    ↓
Live website
=======
**Repo:** https://carlosmelliot.github.io/In-Progress-Practice-Quizzer/

### 1. Set the base path in `vite.config.ts`

GitHub Pages serves project sites from a subpath (`username.github.io/repo-name/`), so Vite needed to know that:

```ts
 base: 'In-Progress-Practice-Quizzer',
>>>>>>> cd8075a66cc7011f11c829335eac6e769b6ca324
```

Two files are especially important:

| File | Purpose |
|---|---|
| `vite.config.ts` | Tells Vite **where the app will live** |
| `.github/workflows/deploy.yml` | Tells GitHub **how to build and deploy the app** |

---

## First-time setup, step by step

### 1. Open the existing project in VS Code

Open the project folder in VS Code, then in the terminal:

```bash
pwd
dir
```

You should see project files such as `package.json`, `vite.config.ts`, `src`.

> **Important lesson:** the filename extension matters. If the config file is `vite.config.ts` (not `.js`), running `git add vite.config.js` fails with:
> ```
> fatal: pathspec 'vite.config.js' did not match any files
> ```
> If unsure of the filename, run `dir` or `dir -Recurse -Filter vite.config.*`.

### 2. Install dependencies with Bun

```bash
bun install
```

This reads `package.json` and installs the project's dependencies.

### 3. Test the project locally

```bash
bun run dev
```

Open the local URL Vite provides (e.g. `http://localhost:3000/`), confirm the app works, then stop the server with `Ctrl + C`.

**Why test first?** It separates the problems:

```
Does the app work locally?
        ↓
Does Git work?
        ↓
Does GitHub receive the project?
        ↓
Does GitHub Actions build it?
        ↓
Does GitHub Pages serve it?
```

### 4. Check `package.json`

The project needs a production build command:

```json
"scripts": {
  "dev": "vite --port=3000 --host=0.0.0.0",
  "build": "vite build",
  "preview": "vite preview"
}
```

The important line is `"build": "vite build"` — it's what lets GitHub Actions run `bun run build`, which makes Vite output the production build to `dist/`.

### 5. Configure Vite for GitHub Pages

This is the main cause of a "green deployment, blank page" problem.

If the repo is `USERNAME/PROJECT-NAME`, GitHub Pages serves it at:

```
https://USERNAME.github.io/PROJECT-NAME/
```

so `vite.config.ts` needs:

```ts
base: '/PROJECT-NAME/',
```

**General rule:** repository `USERNAME/PROJECT-NAME` → `base: '/PROJECT-NAME/'`.

For this project (`CarlosMElliot/In-Progress-Practice-Quizzer`), the corrected setting is:

```ts
base: '/In-Progress-Practice-Quizzer/',
```

The original (broken) setting was `base: 'In-Progress-Practice-Quizzer'` — missing the leading and trailing slashes. Without the correct base path, the deployment can be green while the site is blank, because the browser can't resolve the generated JS/CSS asset paths.

Full example `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/In-Progress-Practice-Quizzer/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

### 6. Initialize Git

```bash
git init
git status
```

### 7. Create the GitHub repository

Create a new GitHub repo with the desired project name (e.g. `In-Progress-Practice-Quizzer`). When uploading an existing local project, it's simplest to create the remote repo **without** initial files (README, .gitignore, license) since they already exist locally.

### 8. Connect the local project to GitHub

```bash
git remote add origin https://github.com/CarlosMElliot/In-Progress-Practice-Quizzer.git
git remote -v
```

If `origin` already exists, don't add it again — check with `git remote -v`, and if it's wrong:

```bash
git remote set-url origin https://github.com/CarlosMElliot/In-Progress-Practice-Quizzer.git
```

### 9. Use the `main` branch

```bash
git branch -M main
git branch
```

You should see `* main`. This matters because the deployment workflow listens for pushes to `main`.

### 10. Create the GitHub Actions workflow folder

```
.github/
└── workflows/
    └── deploy.yml
```

Full project structure:

```
In-Progress-Practice-Quizzer/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
├── src/
├── index.html
├── package.json
├── bun.lock
├── tsconfig.json
├── vite.config.ts
└── ...
```

GitHub recognizes `.github/workflows/` as the location for Actions workflow files.

### 11. Create `deploy.yml`

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

### 12. Enable GitHub Pages

In the repo: **Settings → Pages → Build and deployment**, set:

```
Source: GitHub Actions
```

The workflow above is designed for this deployment method (not "Deploy from a branch").

### 13. Upload the project to GitHub

```bash
git add .
git status
git commit -m "Initial project upload"
git push -u origin main
```

### 14. Watch the deployment

Go to **GitHub → Actions → Deploy to GitHub Pages**. You want to see:

```
build   ✓
deploy  ✓
```

> A green deployment means GitHub successfully ran the workflow — it does **not** guarantee the app itself is configured correctly. The Vite `base` path must also be correct.

### 15. Open the live website

```
https://carlosmelliot.github.io/In-Progress-Practice-Quizzer/
```

<<<<<<< HEAD
The repo name appears in the URL because this is a **project** Pages site, not a username root site.
=======
**https://carlosmelliot.github.io/In-Progress-Practice-Quizzer/**

Every future push to `main` rebuilds and redeploys automatically.
>>>>>>> cd8075a66cc7011f11c829335eac6e769b6ca324

---

## Understanding `deploy.yml`

| Section | What it does |
|---|---|
| `name` | The workflow's display name in GitHub Actions. |
| `on: push: branches: [main]` | Every push to `main` can trigger a deployment. |
| `on: workflow_dispatch` | Adds a manual **Run workflow** button in the Actions tab. |
| `permissions` | Allows the workflow to read the repo and deploy to Pages (`contents: read`, `pages: write`, `id-token: write`). |
| `concurrency: group: pages, cancel-in-progress: true` | Prevents outdated deployments from competing with newer ones. |

### The `build` job

Runs on a temporary `ubuntu-latest` machine and:

1. Checks out the repository.
2. Installs Bun.
3. Runs `bun install`.
4. Runs `bun run build`.
5. Configures GitHub Pages.
6. Uploads `dist/` as the deployment artifact.

```
GitHub repository → checkout → Bun → bun install → bun run build → Vite build → dist/
```

### The `deploy` job

Has `needs: build`, so it only runs after the build succeeds, then:

```yaml
uses: actions/deploy-pages@v4
```

publishes the artifact to GitHub Pages.

### The complete pipeline

```
git push
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Checkout
   ↓
Setup Bun
   ↓
bun install
   ↓
bun run build
   ↓
dist/
   ↓
Upload artifact
   ↓
Deploy Pages
   ↓
Live website
```

---

## Everyday update workflow

Once everything is configured, you do **not** repeat the GitHub Pages setup. Work normally in VS Code, then:

```bash
bun run dev            # test locally
git status
git add .
git commit -m "Update quiz questions"
git push
```

Because `deploy.yml` listens for pushes to `main`, GitHub automatically starts another deployment.

```
VS Code → Changes → git add . → git commit → git push
   → GitHub → GitHub Actions → bun install → bun run build
   → GitHub Pages → Updated website
```

---

## Mistakes made on this project (and fixes)

### Mistake 1: Wrong config filename

```bash
git add vite.config.js     # ❌ fails — the real file is vite.config.ts
```

**Fix:** check the actual file extension before running `git add`.

### Mistake 2: Running commands from the wrong directory

Git couldn't find the file because the terminal wasn't at the correct project level.

**Fix:** run `pwd`, `dir`, `git status` before making changes.

### Mistake 3: Incorrect Vite base path

```ts
// Original (broken)
base: 'In-Progress-Practice-Quizzer',

// Correct
base: '/In-Progress-Practice-Quizzer/',
```

**Result:** once fixed, the GitHub Actions deployment succeeded and the live site loaded correctly.

### Mistake 4: Thinking `deploy.yml` is manually executed

You do **not** run `deploy.yml` in PowerShell. GitHub reads and executes it automatically when its trigger occurs.

```
deploy.yml = instructions for GitHub Actions   ✅
deploy.yml = a command I manually run          ❌
```

---

## Reference tables

### What each piece does

| Component | Purpose |
|---|---|
| `package.json` | Defines the project, dependencies, and commands |
| `bun install` | Installs dependencies |
| `bun run dev` | Runs the project locally |
| `bun run build` | Creates the production build |
| `vite.config.ts` | Configures Vite, including the Pages base path |
| `.github/workflows/deploy.yml` | Tells GitHub Actions how to build/deploy |
| `git status` | Shows project changes |
| `git add .` | Stages changes |
| `git commit` | Records a version of the changes |
| `git push` | Sends commits to GitHub |
| GitHub Actions | Automatically runs the deployment workflow |
| GitHub Pages | Hosts the deployed website |

### What you do NOT need to do

- Upload `dist/` to GitHub Pages manually.
- Run `deploy.yml` from PowerShell.
- Upload JavaScript or CSS files separately.
- Build the project manually on GitHub.
- Repeat the GitHub Pages configuration for every update.

The workflow handles all of this automatically.

---

## Checklists

### First-time setup checklist

- [ ] Open the existing project in VS Code.
- [ ] Confirm the terminal is in the actual project folder.
- [ ] Confirm `package.json` exists.
- [ ] Confirm the correct `vite.config.ts` / `vite.config.js` filename.
- [ ] Run `bun install`.
- [ ] Run `bun run dev`.
- [ ] Confirm the project works locally.
- [ ] Create the GitHub repository.
- [ ] Run `git init` if needed.
- [ ] Add the GitHub `origin` remote.
- [ ] Set the branch to `main`.
- [ ] Configure the Vite `base` path.
- [ ] Create `.github/workflows/`.
- [ ] Create `deploy.yml`.
- [ ] Set GitHub Pages source to **GitHub Actions**.
- [ ] Run `git add .`.
- [ ] Run `git commit`.
- [ ] Run `git push -u origin main`.
- [ ] Check GitHub Actions.
- [ ] Open the GitHub Pages URL.

### Future update checklist

- [ ] Make changes in VS Code.
- [ ] Test with `bun run dev`.
- [ ] Run `git status`.
- [ ] Run `git add .`.
- [ ] Run `git commit -m "Describe the update"`.
- [ ] Run `git push`.
- [ ] Check Actions if necessary.
- [ ] Refresh the live website.

### Commands to memorize

**First-time setup**

```bash
git init
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git branch -M main
bun install
bun run dev
git add .
git commit -m "Initial project upload"
git push -u origin main
```

**Normal updates**

```bash
git status
git add .
git commit -m "Update project"
git push
```

### The simplest mental model

**First time:**
```
Open → Install → Test → Configure → Connect → Workflow → Commit → Push → Deploy
```

**Every future update:**
```
Change → Test → Add → Commit → Push → Automatically deploy
```

---

## Final takeaway

The entire system can be remembered with four ideas:

1. **Bun** manages and builds the project.
2. **Git** tracks your changes.
3. **GitHub Actions** automatically builds and deploys after you push.
4. **GitHub Pages** hosts the finished website.

The two key configuration files have different responsibilities:

```
vite.config.ts                    →  WHERE the Vite app lives
.github/workflows/deploy.yml      →  HOW GitHub builds and deploys it
```

For this project, the critical Pages configuration is:

```ts
base: '/In-Progress-Practice-Quizzer/',
```

and the critical everyday update routine is:

```bash
git add .
git commit -m "Update project"
git push
```

Once the initial setup is complete, that three-command routine is what you'll use most of the time.

---
*© 2026 ERC Academy. All rights reserved.*