/* ═══════════════════════════════════════════
   SidhCodez · Link in Bio · script.js
   ─ Edit PROFILE & DEFAULT_LINKS to customise
════════════════════════════════════════════ */

/* ── 1. PROFILE CONFIG ───────────────────── */
const PROFILE = {
    name: "Siddiq",
    handle: "SidhCodez",
    tagline: "Frontend Developer · Building & Learning",
    avatarUrl: "",          // Optional: put your image URL here, e.g. "https://..."
    avatarInitials: "SC",   // Used when no avatarUrl is set
};

/* ── 2. DEFAULT LINKS ────────────────────── */
/* Edit or extend this array. Changes here appear on first load.
   After that, localStorage takes over (so you can add/remove in-browser). */
const DEFAULT_LINKS = [
    {
        id: "github",
        icon: "🐙",
        title: "GitHub",
        desc: "Code, projects & open source",
        url: "https://github.com/yourusername",
    },
    {
        id: "portfolio",
        icon: "🌐",
        title: "Portfolio",
        desc: "My work & case studies",
        url: "#",
    },
    {
        id: "linkedin",
        icon: "💼",
        title: "LinkedIn",
        desc: "Professional network",
        url: "https://linkedin.com/in/yourusername",
    },
    {
        id: "resume",
        icon: "📄",
        title: "Resume",
        desc: "Download my CV",
        url: "#",
    },
    {
        id: "twitter",
        icon: "🐦",
        title: "Twitter / X",
        desc: "Thoughts & tech threads",
        url: "https://twitter.com/yourusername",
    },
    {
        id: "contact",
        icon: "✉️",
        title: "Contact Me",
        desc: "sidhcodez@email.com",
        url: "mailto:sidhcodez@email.com",
    },
];

/* ── 3. SOCIAL CHIPS (top strip) ─────────── */
const SOCIAL_CHIPS = [
    { label: "GitHub", icon: "🐙", url: "https://github.com/yourusername" },
    { label: "Twitter", icon: "🐦", url: "https://twitter.com/yourusername" },
    { label: "LinkedIn", icon: "💼", url: "https://linkedin.com/in/yourusername" },
];

/* ════════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
const STORAGE_KEY = "sidhcodez_links_v1";

function loadLinks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (_) { /* ignore */ }
    return DEFAULT_LINKS.map(l => ({ ...l, id: l.id || uid() }));
}

function saveLinks(links) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(links)); } catch (_) { }
}

function uid() {
    return Math.random().toString(36).slice(2, 9);
}

let links = loadLinks();

/* ════════════════════════════════════════════
   RENDER HELPERS
═══════════════════════════════════════════ */

/* -- Profile -- */
function renderProfile() {
    // Avatar
    const el = document.getElementById("avatarEl");
    if (PROFILE.avatarUrl) {
        const img = document.createElement("img");
        img.src = PROFILE.avatarUrl;
        img.alt = PROFILE.name;
        img.onerror = () => { el.textContent = PROFILE.avatarInitials; };
        el.appendChild(img);
    } else {
        el.textContent = PROFILE.avatarInitials;
    }

    document.getElementById("profileName").textContent = PROFILE.name;
    document.getElementById("profileTagline").textContent = PROFILE.tagline;

    // Social chips
    const strip = document.getElementById("socialStrip");
    SOCIAL_CHIPS.forEach(({ label, icon, url }) => {
        const a = document.createElement("a");
        a.className = "social-chip";
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `<span class="chip-icon">${icon}</span><span>${label}</span>`;
        strip.appendChild(a);
    });

    document.title = `${PROFILE.handle} · Links`;
}

/* -- Link Cards -- */
function renderLinks() {
    const section = document.getElementById("linksSection");
    section.innerHTML = "";

    links.forEach((link, i) => {
        const a = document.createElement("a");
        a.className = "link-card";
        a.href = link.url;
        a.target = link.url.startsWith("mailto:") ? "_self" : "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", link.title);
        a.style.animationDelay = `${0.25 + i * 0.07}s`;

        a.innerHTML = `
      <div class="link-icon">${link.icon || "🔗"}</div>
      <div class="link-text">
        <div class="link-title">${escHtml(link.title)}</div>
        ${link.desc ? `<div class="link-desc">${escHtml(link.desc)}</div>` : ""}
      </div>
      <span class="link-arrow">→</span>
    `;

        // Staggered entrance
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { a.classList.add("animate-in"); });
        });

        section.appendChild(a);
    });
}

/* -- Manage list (inside panel) -- */
function renderManageList() {
    const list = document.getElementById("manageList");
    list.innerHTML = "";

    if (links.length === 0) {
        list.innerHTML = `<li style="color:var(--ink-light);font-size:.82rem;text-align:center;padding:12px 0">No links yet — add one above!</li>`;
        return;
    }

    links.forEach((link) => {
        const li = document.createElement("li");
        li.className = "manage-item";
        li.dataset.id = link.id;
        li.innerHTML = `
      <span class="mi-icon">${link.icon || "🔗"}</span>
      <span class="mi-title">${escHtml(link.title)}</span>
      <span class="mi-url">${escHtml(link.url)}</span>
      <button class="mi-del" data-id="${link.id}" title="Remove" aria-label="Remove ${escHtml(link.title)}">✕</button>
    `;
        list.appendChild(li);
    });

    // Delete buttons
    list.querySelectorAll(".mi-del").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            links = links.filter(l => l.id !== id);
            saveLinks(links);
            renderLinks();
            renderManageList();
        });
    });
}

/* ════════════════════════════════════════════
   ADD LINK
═══════════════════════════════════════════ */
function initAddPanel() {
    const btn = document.getElementById("addLinkBtn");
    const titleIn = document.getElementById("newTitle");
    const urlIn = document.getElementById("newUrl");
    const iconIn = document.getElementById("newIcon");
    const descIn = document.getElementById("newDesc");

    btn.addEventListener("click", () => {
        const title = titleIn.value.trim();
        const url = urlIn.value.trim();
        const icon = iconIn.value.trim();
        const desc = descIn.value.trim();

        if (!title) { shake(titleIn); return; }
        if (!url) { shake(urlIn); return; }

        const newLink = { id: uid(), title, url, icon: icon || "🔗", desc };
        links.push(newLink);
        saveLinks(links);
        renderLinks();
        renderManageList();

        // Reset
        titleIn.value = "";
        urlIn.value = "";
        iconIn.value = "";
        descIn.value = "";
        titleIn.focus();
    });

    // Allow Enter in last field to submit
    descIn.addEventListener("keydown", e => { if (e.key === "Enter") btn.click(); });
}

function shake(el) {
    el.style.animation = "none";
    el.style.borderColor = "#c0392b";
    el.style.boxShadow = "0 0 0 3px rgba(192,57,43,.15)";
    setTimeout(() => {
        el.style.borderColor = "";
        el.style.boxShadow = "";
    }, 1200);
    el.focus();
}

/* ════════════════════════════════════════════
   PANEL TOGGLE
═══════════════════════════════════════════ */
function initPanelToggle() {
    const btn = document.getElementById("panelToggleBtn");
    const panel = document.getElementById("addPanel");
    let open = false;

    btn.addEventListener("click", () => {
        open = !open;
        panel.hidden = !open;
        btn.setAttribute("aria-expanded", open);
        btn.querySelector(".toggle-label").textContent = open ? "Close Manager" : "Manage Links";
        if (open) {
            renderManageList();
            panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

/* ════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════ */
function escHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/* Footer year */
function setFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
}

/* ════════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderLinks();
    initAddPanel();
    initPanelToggle();
    setFooterYear();
});