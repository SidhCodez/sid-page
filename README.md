

# 🔗 SidhCodez — Link in Bio `v1.0`

> A premium, fully custom-coded personal link-in-bio page.  
> Single file. Zero dependencies. No build step. Deploy in seconds.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Version](https://img.shields.io/badge/Version-1.0.0-blueviolet?style=flat)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Customisation](#-customisation)
- [Link Manager](#-link-manager)
- [Theme System](#-theme-system)
- [localStorage Reference](#-localstorage-reference)
- [Deployment](#-deployment)
- [Browser Support](#-browser-support)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌐 Overview

**SidhCodez Link in Bio v1** is a self-contained, single-file personal hub page inspired by tools like Linktree and Bento — but fully hand-coded with no external dependencies, no frameworks, and no monthly fees.

All links are stored in the browser's `localStorage`, meaning they persist between visits on the same device. This is **v1 — the local-storage version**. A cloud-synced v2 (Firebase) exists separately.

| Property | Value |
|---|---|
| Version | 1.0.0 |
| File count | 3 (`index.html`, `style.css`, `script.js`) |
| Dependencies | Google Fonts only |
| Storage | Browser `localStorage` |
| Backend | None |
| Hosting | Any static host |

---

## 🚀 Live Demo

Deploy to GitHub Pages (free) and share the URL:

```
https://yourusername.github.io/your-repo-name
```

---

## ✨ Features

### Design
- **Dark / Light theme** toggle with smooth transition, persisted in `localStorage`
- **Red → Blue → Cyan gradient** accent system throughout
- **Animated conic gradient ring** rotating around the profile avatar
- **Floating ambient blobs** with slow CSS keyframe animation
- **Shimmer sweep** on link card hover
- **Staggered entrance animations** — cards fade up one by one on load
- Fully **responsive** and **mobile-first**
- Google Fonts: **Syne** (headings) + **Space Grotesk** (body)
- `prefers-reduced-motion` respected — all animations disabled for users who prefer it

### Profile
- Display name, handle, and tagline
- Circular avatar with **spinning gradient border ring**
- Photo URL support with **initials fallback**
- Everything editable via the in-page manager

### Links
- Emoji icon + title + optional description + external URL
- Opens in new tab (or `_self` for `mailto:` links)
- Hover effect: lift, glow, shimmer, arrow slide
- Dynamically rendered from a JavaScript array

### Link Manager (in-page panel)
- **3 tabs:** Add Link / Edit Profile / Manage
- Add links with icon, title, URL, description
- Live profile preview while editing
- Delete any link with one click
- All changes saved instantly to `localStorage`
- **Admin password gate** — prevents accidental edits

### Storage
- All data (links + profile) stored in `localStorage`
- Survives page refreshes and browser restarts
- Resets gracefully to defaults if storage is cleared

---

## 🎨 Customisation

All editable values live at the **top of `script.js`** — you never need to touch the HTML or CSS to personalise the page.

### Edit Your Profile

Open `script.js` and update the `PROFILE` object:

```js
const PROFILE = {
  name:     "Siddiq",               // Your display name
  handle:   "SidhCodez",           // Shown in browser tab & topbar
  tagline:  "Frontend Developer · Building & Learning",
  avatarUrl: "",                    // Optional: direct image URL
  avatarInitials: "SC",            // Shown when no photo is set
};
```

### Edit Your Links

Update the `DEFAULT_LINKS` array:

```js
const DEFAULT_LINKS = [
  {
    id:    "github",                         // unique ID (any string)
    icon:  "🐙",                             // emoji icon
    title: "GitHub",                         // button label
    desc:  "Code & open-source projects",    // optional subtitle
    url:   "https://github.com/yourusername" // destination URL
  },
  {
    id:    "portfolio",
    icon:  "🌐",
    title: "Portfolio",
    desc:  "My work & case studies",
    url:   "https://yourportfolio.com"
  },
  // Add as many as you want...
];
```

> ⚠️ `DEFAULT_LINKS` is only used on **first load** (when `localStorage` is empty). After that, the in-page manager controls the links. To reset to defaults, clear `localStorage` in DevTools.

### Edit Social Chips (Avatar Strip)

```js
const SOCIAL_CHIPS = [
  { label: "GitHub",   icon: "🐙", url: "https://github.com/yourusername" },
  { label: "Twitter",  icon: "🐦", url: "https://twitter.com/yourusername" },
  { label: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/yourusername" },
];
```

### Change the Admin Password

```js
// In script.js — find this line and change it:
const ADMIN_PASSWORD = "sidhcodez123";
```

Anyone who opens your page can view links but cannot add, edit, or delete without this password. Set it to something only you know.

### Change Colors

All color tokens are CSS custom properties in `style.css`:

```css
:root {
  --red:        #e63946;   /* accent red */
  --blue:       #4361ee;   /* accent blue */
  --blue-light: #4cc9f0;   /* accent cyan */
}
```

Change these three values to completely re-theme the whole site.

---

## 🔧 Link Manager

Click **⚙ Manage Links** at the bottom of the page (or the ✏️ button in the topbar) to open the panel.

### Tab 1 — Add Link

| Field | Required | Notes |
|---|---|---|
| Title | ✅ Yes | Button label |
| Emoji | No | Defaults to 🔗 |
| URL | ✅ Yes | Full URL including `https://` |
| Description | No | Small subtitle under the title |

### Tab 2 — Edit Profile

Edit name, handle, tagline, photo URL, and initials. A **live preview** updates as you type. Click **Save Profile** to apply.

### Tab 3 — Manage

Lists all current links with a delete (✕) button on each. Changes take effect immediately.

> 🔐 All three tabs require the **admin password** before any change is saved.

---

## 🌙 Theme System

Two themes are included — **dark** (default) and **light**.

Toggle with the 🌙 / ☀️ button in the topbar. The choice is saved to `localStorage` and restored on next visit.

Themes are implemented entirely with CSS custom properties:

```css
[data-theme="dark"]  { --bg: #0c0c10; --text: #f0f0f8; ... }
[data-theme="light"] { --bg: #f4f4fb; --text: #111120; ... }
```

No JavaScript is needed to paint the theme — switching the `data-theme` attribute on `<html>` is enough.

---


### Reset everything to defaults

Open browser DevTools → Application tab → Local Storage → select your origin → delete the three keys above → refresh.

Or run in the browser console:

```js
localStorage.removeItem("sc_prof_v1");
localStorage.removeItem("sc_links_v1");
localStorage.removeItem("sc_theme_v1");
location.reload();
```

---




## 🌍 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Samsung Internet | ✅ Full |
| IE 11 | ❌ Not supported |


---

## 📄 License

MIT License — free to use, modify, and deploy for personal or commercial projects. Attribution appreciated but not required.

> Built from scratch — no templates, no page builders, just code.
