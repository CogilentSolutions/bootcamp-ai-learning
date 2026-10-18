# Derive — The Machine Learning Fundamentals Course

A self-contained HTML/CSS/JS course with:
- **Student site** (`student/`) — clean course, no instructor content
- **Instructor site** (`instructor/`) — same course + yellow instructor notes, password-gated
- **Marketing site** (`marketing/`) — landing page
- **Shared source** (`shared/`) — canonical course content

---

## Repo structure

```
derive-course/
├── student/
│   └── index.html          # Full course, student-facing (285 KB)
├── instructor/
│   └── index.html          # Full course + instructor notes, password-gated (314 KB)
├── marketing/
│   └── index.html          # Chalk & Paper landing page
├── shared/
│   ├── course_content.html # Canonical full source (master copy)
│   └── body_content.html   # Extracted body (used by build scripts)
├── netlify.toml            # Student site deploy config
├── netlify.instructor.toml # Instructor site deploy config (separate site)
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions: auto-deploy student on push to main
└── README.md
```

---

## Quick deploy (Netlify)

### Student site (public)

```bash
# One-time: install Netlify CLI
npm install -g netlify-cli

# Deploy student site
netlify deploy --dir=student --prod
```

Or connect the repo to Netlify via the UI → set **Publish directory** to `student`.

### Instructor site (private)

```bash
# Create a separate Netlify site for instructors only
netlify sites:create --name your-course-instructor

# Deploy
netlify deploy --dir=instructor --prod --config=netlify.instructor.toml
```

Keep the instructor URL private. Do **not** link to it from the student site.

---

## GitHub Pages (alternative)

```bash
# Deploy student site to GitHub Pages
git subtree push --prefix student origin gh-pages
```

Then in repo Settings → Pages → set source branch to `gh-pages`, root `/`.

---

## Changing the instructor password

The instructor site uses a SHA-256 hash stored in `instructor/index.html`.

To set a new password:

```bash
# Generate hash (Node.js)
node -e "
const crypto = require('crypto');
const pw = 'your-new-password';
const hash = crypto.createHash('sha256').update(pw).digest('hex');
console.log(hash);
"
```

Then in `instructor/index.html`, find and replace:

```js
const CORRECT_HASH = 'PASTE_YOUR_HASH_HERE';
```

Commit and redeploy.

**Default demo password:** any string ≥ 6 characters (replace before real use).

---

## Adding/editing instructor notes

Instructor notes are `.instr-note` divs in `instructor/index.html`. Each follows this pattern:

```html
<div class="instr-note">
  <div class="instr-note-header">
    <span class="badge">Instructor</span>
    <span><strong>L21</strong> — ⏱ 90 min  Goal text</span>
    <span class="toggle-icon">▾</span>
  </div>
  <div class="instr-note-body">
    <h4>🎣 Opening hook</h4>
    <ul><li>...</li></ul>
    <h4>⚠️ Common student mistakes</h4>
    <ul><li>...</li></ul>
    <h4>💬 Discussion prompt</h4>
    <p>...</p>
    <h4>✂️ What to skip</h4>
    <p>...</p>
  </div>
</div>
```

Notes appear immediately after each `<div class="lesson-header">` block.

---

## Student features

- **Scroll progress bar** — top of page, tracks reading progress
- **Lesson completion checkboxes** — click the circle next to each lesson title; state persists in `localStorage` (key: `derive_done_v1`)
- **Copy-to-clipboard** — all code blocks get a copy button automatically
- **TOC drawer** — top-right hamburger opens a full table of contents with active-section highlighting

---

## Instructor features

- **Password gate** — SHA-256 checked client-side; session persists via `sessionStorage`
- **Instructor banner** — sticky yellow bar; "Hide All Notes" toggle
- **Per-lesson notes** — collapsible panels with: opening hook, common mistakes, discussion prompt, what to skip
- **Dark mode** — instructor note colors adapt automatically

---

## Updating course content

The source of truth is `shared/course_content.html`. After editing it:

```bash
python3 scripts/rebuild.py   # (if added) re-extracts body and rebuilds student/instructor HTML
```

Or manually:
1. Edit `shared/course_content.html`
2. Re-run the Python extraction + injection script (see build notes in `shared/`)
3. Commit both student and instructor HTML

---

## License

Course content © Derive / Chalk & Paper. All rights reserved.
