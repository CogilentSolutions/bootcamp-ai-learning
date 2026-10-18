# Bootcamp: AI & Machine Learning Fundamentals

**A Brightspyre Bootcamps program** · [brightspyre.com](https://brightspyre.com)

A self-contained, derivation-first ML course delivered as a single HTML page. No frameworks, no build tools, no dependencies — just open the file and learn.

---

## What this bootcamp covers

8 modules that take students from first principles to transformers. Every formula is derived from scratch, then implemented in code.

| Module | Topic | Key formula |
|--------|-------|-------------|
| 01 | Linear Algebra for AI | A = UΣVᵀ |
| 02 | Calculus & Autodiff | ∂L/∂W = δᵀ · xᵀ |
| 03 | Probability & Loss Functions | L = −Σ y log(p) |
| 04 | Optimisation & Gradient Descent | m̂ / (√v̂ + ε) |
| 05 | Neural Architectures | σ² = 2/(nᵢₙ + nₒᵤₜ) |
| 06 | CNNs & Vision | (f * g)[n] = Σ f[k]g[n−k] |
| 07 | Transformers & Attention | softmax(QKᵀ/√d_k) · V |
| 08 | LLMs, RAG & Agents | ELBO = 𝔼[log p(x|z)] − KL |

---

## Repo structure

```
bootcamp-ai-learning/
├── student/
│   └── index.html          # Student-facing course (285 KB, no instructor content)
├── instructor/
│   └── index.html          # Same course + instructor notes, password-gated (314 KB)
├── marketing/
│   └── index.html          # Brightspyre Bootcamps landing page
├── shared/
│   ├── course_content.html # Canonical course source (master copy)
│   └── body_content.html   # Extracted body used by build scripts
├── netlify.toml            # Student site Netlify deploy config
├── netlify.instructor.toml # Instructor site Netlify deploy config
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy student site on push to main
└── README.md
```

---

## Deploy: GitHub Pages (student site)

### One-time setup

```bash
# 1. Add CNAME for custom domain
echo "mathematics-ai.brightspyre.com" > student/CNAME
git add student/CNAME
git commit -m "Add CNAME for GitHub Pages"
git push
```

### Enable GitHub Pages in repo settings

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / Folder: `/student` → **Save**
4. Custom domain: `mathematics-ai.brightspyre.com` → **Save**

### DNS record (at brightspyre.com DNS provider)

| Type | Name | Value |
|------|------|-------|
| CNAME | `mathematics-ai` | `cogilentsolutions.github.io` |

> If using Cloudflare: set proxy to **DNS only** (grey cloud).

### Enable HTTPS

After DNS propagates (5–30 min), go back to **Settings → Pages** and tick **Enforce HTTPS**.

Site will be live at: **https://mathematics-ai.brightspyre.com**

---

## Deploy: Instructor site (private)

The instructor site must be deployed separately and kept private. Never deploy it to the public GitHub Pages site.

```bash
npm install -g netlify-cli
netlify login
netlify deploy --dir=instructor --prod --config=netlify.instructor.toml
```

Share the Netlify URL only with bootcamp instructors.

---

## Instructor password

The instructor site uses a SHA-256 hash. To set a real password:

```bash
node -e "
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('your-password').digest('hex');
console.log(hash);
"
```

In `instructor/index.html`, replace:
```js
const CORRECT_HASH = 'PASTE_YOUR_HASH_HERE';
```

Commit and redeploy.

---

## Student features

- Scroll progress bar
- Lesson completion checkboxes (saved in browser `localStorage`)
- Copy-to-clipboard on all code blocks
- Sticky table of contents with active-section highlighting

## Instructor features

- SHA-256 password gate (session persists across page reloads)
- Sticky instructor banner with "Hide All Notes" toggle
- Per-lesson collapsible panels: opening hook · common mistakes · discussion prompt · what to skip
- Dark mode support

---

## Updating course content

The source of truth is `shared/course_content.html`. After editing:

1. Edit `shared/course_content.html`
2. Run the rebuild script to update student and instructor HTML
3. `git add -A && git commit -m "Update course content" && git push`

GitHub Actions automatically deploys the student site on every push to `main`.

---

## About Brightspyre Bootcamps

Brightspyre runs intensive, practical bootcamps for engineers and students who want to go beyond surface-level AI knowledge. This bootcamp is designed for anyone from A-level students to working engineers — the only prerequisite is curiosity and basic algebra.

**Website:** [brightspyre.com](https://brightspyre.com)  
**Contact:** hello@brightspyre.com

---

© Brightspyre Bootcamps. All rights reserved.
