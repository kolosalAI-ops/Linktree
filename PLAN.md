# Plan: Clone Linktree (kolosal.ai) to HTML, CSS & JavaScript

## Overview
This document explains step-by-step how the [linktr.ee/kolosal.ai](https://linktr.ee/kolosal.ai) page was cloned into a static HTML, CSS, and JavaScript project.

---

## Step 1: Analyze the Original Page

Before writing any code, inspect the original Linktree page to collect:

| Element | Value |
|---|---|
| Profile Name | OperationalKolosal |
| Username | @kolosal.ai |
| Background Color | `#000000` (pure black) |
| Button Background | `#141414` (dark gray) |
| Text Color | `#f5f6f7` (light gray) |
| Accent Color | `#ffffff` (white) |
| Primary Font | Epilogue |
| Secondary Font | Inter |
| Button Border Radius | 16px |
| Layout | Centered vertical stack |

**Tools used:** Browser DevTools (Inspect Element), WebFetch

---

## Step 2: Set Up the Project Structure

Create the following file structure:

```
LINKTREE/
├── index.html       ← Main page markup
├── styles.css       ← All visual styling
├── script.js        ← Interactivity (hover, click, animations)
├── PLAN.md          ← This file
└── README.md        ← Project documentation
```

---

## Step 3: Build `index.html`

The HTML structure mirrors the Linktree layout:

1. **`<head>`** — Load Google Fonts (Epilogue + Inter), link `styles.css`
2. **Profile Section**
   - Circular avatar image (`.avatar`)
   - Profile name (`<h1>`)
   - Username (`<p class="username">`)
3. **Links Section**
   - 10 `<a>` tags styled as buttons, each linking to the real URL
   - Each button uses `target="_blank"` and `rel="noopener noreferrer"` for security
4. **Social Icons Section**
   - LinkedIn icon/link using SVG
5. **Footer** — Linktree branding reference
6. **`<script src="script.js">`** — Load JS at the bottom

---

## Step 4: Build `styles.css`

CSS is organized in this order:

### 4.1 CSS Reset & Variables
```css
:root {
  --bg: #000000;
  --btn-bg: #141414;
  --text: #f5f6f7;
  --accent: #ffffff;
  --radius: 16px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
```

### 4.2 Body & Layout
- `background: var(--bg)` — black background
- `font-family: 'Epilogue', sans-serif`
- Centered `.container` with `max-width: 680px`
- Flexbox column layout

### 4.3 Profile Section
- `.avatar` — circular image with `border-radius: 50%`
- `.profile-name` — bold white text, 24px
- `.username` — lighter gray, 14px

### 4.4 Link Buttons
- `display: block` full-width buttons
- `background: var(--btn-bg)` dark gray
- `border-radius: var(--radius)` 16px rounded corners
- `padding: 16px 24px`
- `color: var(--text)` light text
- `transition: all 0.2s ease` for hover animation

### 4.5 Hover States
- Button hover: slightly lighter background (`#1e1e1e`), slight scale up (`transform: scale(1.02)`)
- Social icon hover: white color

### 4.6 Responsive Design
- Mobile breakpoint at `480px`
- Reduce padding and font sizes for small screens

---

## Step 5: Build `script.js`

JavaScript adds light interactivity:

1. **Ripple effect** — On button click, show a ripple animation expanding from the click point
2. **Smooth entrance animation** — Cards fade in with a stagger delay when the page loads
3. **Active state** — Brief color flash on button press to confirm the click

---

## Step 6: Collect All Link Data

All 10 links from the original page:

| # | Label | URL |
|---|---|---|
| 1 | Tax Planning Dashboard | https://kolosalai-ops.github.io/tax-planning/dashboard/countries/SG |
| 2 | Kolosal Math — High School to Advanced Calculus | https://kolosalai-ops.github.io/maths-calculus/#ch-number-systems |
| 3 | CA Prep Indonesia | https://kolosalai-ops.github.io/cpa-prep |
| 4 | Kolosal Finance - CFO Dashboard | http://kolosal-finance-production.up.railway.app |
| 5 | Kolosal Repo Legal Document | https://github.com/KolosalAI/legal-docs |
| 6 | Standard Legal Document | https://docs.google.com/document/d/16LCz5nEjVxpS2RCICmP8zcuoWo0trzQnjHIVzl9JhgU/edit?usp=drive_link |
| 7 | Kolosal Legal - Legal Document Platform | http://kolosal-legal-production.up.railway.app |
| 8 | Finance Directory | https://drive.google.com/drive/folders/19FTUYfKuYRCfl1YqPs88sDwJU3hQuKlM |
| 9 | Spreadsheet | https://docs.google.com/spreadsheets/d/1iaUvaX-RsYPbOAC6JbLNmomEqoGuFhkKdY2GXt19QTs |
| 10 | Google Meet | https://meet.google.com/ien-xtnu-czv |

**Social Links:**
- LinkedIn: https://www.linkedin.com/company/kolosal-ai/

---

## Step 7: Test the Page

1. Open `index.html` in a browser (double-click or use Live Server in VS Code)
2. Check all 10 links open correctly in a new tab
3. Test hover animations on buttons
4. Test on mobile screen size (DevTools → Toggle Device Toolbar)
5. Verify fonts load correctly (requires internet connection for Google Fonts)

---

## Step 8: Push to GitHub

```bash
git add .
git commit -m "feat: add Linktree clone (HTML, CSS, JS)"
git push origin main
```

---

## Step 9: Set Up GitHub Actions Workflow

Automate deployment to GitHub Pages on every push to `main`.

### 9.1 Create the workflow file

```
.github/
└── workflows/
    └── deploy.yml
```

### 9.2 Workflow structure

The workflow has **two jobs**:

#### Job 1 — `validate`
Runs on every push before deploying. Checks:
- All required files exist (`index.html`, `styles.css`, `script.js`, `PLAN.md`, `README.md`)
- `index.html` has correct DOCTYPE, viewport meta, and links to CSS/JS
- At least 10 `.link-btn` elements are present

If any check fails → the deploy job is **blocked**.

#### Job 2 — `deploy`
Runs only after `validate` passes (`needs: validate`):
1. `actions/checkout@v4` — pull repo code
2. `actions/configure-pages@v5` — set up Pages environment
3. `actions/upload-pages-artifact@v3` — bundle entire root dir as artifact
4. `actions/deploy-pages@v4` — push artifact to GitHub Pages CDN
5. Print the live URL in the workflow log

### 9.3 Required GitHub Pages permissions

The workflow needs these `permissions` in the YAML:
```yaml
permissions:
  contents: read   # read repo files
  pages: write     # deploy to Pages
  id-token: write  # OIDC token for Pages authentication
```

### 9.4 Enable GitHub Pages in repository settings

1. Go to **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Save — the next push to `main` will trigger the workflow

### 9.5 Concurrency control

```yaml
concurrency:
  group: pages
  cancel-in-progress: false
```
Prevents two deployments from running simultaneously. Queued runs are skipped but the active deploy is never cancelled.

### 9.6 Manual trigger

The workflow also supports `workflow_dispatch` so you can re-deploy manually from the **Actions** tab without pushing code.

---

---

## Planned Features

The following features are queued for future implementation. Each builds on the existing `localStorage`-driven architecture without adding any framework or build step.

### Feature 1 — Edit Link
**Goal:** Let users edit a link's label, URL, and category after it has been added — currently only add and delete are supported.

**Implementation sketch:**
- Add a pencil icon button (`.link-edit`) inside each `.link-btn`, styled like `.link-delete` (appears on hover)
- Reuse the existing `#modal-overlay` / `#add-link-form`; add a hidden `#input-id` field
- When the pencil is clicked, populate the form fields with the existing values and change the modal title to "Edit Link"
- On submit, check for `input-id`: if populated, find the link by id and update it in place, then `saveLinks` + `renderLinks`

**Files:** `index.html` (add `#input-id`), `script.js` (edit flow), `styles.css` (`.link-edit` button)

---

### Feature 2 — Search / Filter Bar
**Goal:** A text input above the links list that narrows visible cards in real-time by label or URL keyword.

**Implementation sketch:**
- Add `<input class="search-input" id="search-input" placeholder="Search links…">` inside `.container`, between the profile header and `#links-container`
- On `input` event, read value and call `renderLinks(loadLinks().filter(...))` — or hide/show existing DOM nodes for zero-flicker
- Clear button (×) resets the filter
- Style: full-width, same dark aesthetic as `.form-input`, `margin-bottom: 20px`

**Files:** `index.html`, `script.js`, `styles.css`

---

### Feature 3 — Drag-and-Drop Reorder
**Goal:** Users can drag link cards within or across categories to reorder them.

**Implementation sketch:**
- Set `draggable="true"` on each `.link-btn` during render
- Listen for `dragstart`, `dragover`, `drop` on `.category-links` containers
- On drop, splice the links array to the new position, `saveLinks`, re-render
- CSS: `.link-btn.dragging { opacity: 0.4; }` and a drop-indicator line

**Files:** `script.js` (drag logic), `styles.css` (drag states)

---

### Feature 4 — Export / Import JSON
**Goal:** A simple backup and restore system — download all links as `.json` and re-upload them.

**Implementation sketch:**
- Add two small buttons (`.btn-export`, `.btn-import`) in the page footer area
- **Export:** `JSON.stringify(loadLinks())` → Blob → `<a download="kolosal-links.json">` → `.click()`
- **Import:** hidden `<input type="file" accept=".json">` → `FileReader.readAsText` → `JSON.parse` → validate shape → `saveLinks` + `renderLinks`

**Files:** `index.html` (buttons + file input), `script.js`, `styles.css`

---

### Feature 5 — Copy URL to Clipboard
**Goal:** A clipboard icon on each card copies the link URL without navigating away.

**Implementation sketch:**
- Add a `.link-copy` button (clipboard SVG) inside each `.link-btn`, appears on hover alongside `.link-delete`
- `navigator.clipboard.writeText(link.url)` on click; swap the icon to a checkmark for 1.5 s as feedback
- Fallback: `document.execCommand('copy')` via a temporary `<textarea>` for older browsers

**Files:** `script.js`, `styles.css`

---

### Feature 6 — Click Counter
**Goal:** Track how many times each link has been opened; display the count as a small dim badge on hover.

**Implementation sketch:**
- Separate localStorage key `kolosal_clicks` → `{ [id]: count }` object
- Intercept each `.link-btn` click (before navigation), increment the counter, persist
- Render count as `<span class="link-clicks">N</span>` inside the card, visible only on hover via CSS `opacity` transition

**Files:** `script.js`, `styles.css`

---

## Key Techniques Used

| Technique | Purpose |
|---|---|
| CSS Custom Properties | Centralize colors and sizes for easy theming |
| Google Fonts API | Load Epilogue + Inter without installing fonts |
| Flexbox | Center and stack layout elements |
| CSS Transitions | Smooth hover and click animations |
| JS IntersectionObserver | Trigger entrance animations when elements scroll into view |
| `target="_blank"` + `rel="noopener"` | Secure external link handling |
| CSS `transform: scale()` | Subtle button hover lift effect |
| JS Ripple Effect | Material-style click feedback |
| GitHub Actions | Automate validation + deployment on every push |
| `actions/deploy-pages` | Official GitHub action for Pages deployment |
| Job `needs:` dependency | Ensure validation passes before deploying |
| `workflow_dispatch` | Allow manual re-deploy without a code push |

---

## Result

A pixel-close static clone of [linktr.ee/kolosal.ai](https://linktr.ee/kolosal.ai) that:
- Loads instantly (no framework, no build step)
- Works on all screen sizes
- Has smooth hover and click animations
- Auto-deploys to GitHub Pages on every push via GitHub Actions
- Validates all files before deploying (CI gate)
