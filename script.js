/**
 * Portfolio Script - v3.1 (Full + Lite)
 * Author: Amin Hamzah
 */

document.addEventListener('DOMContentLoaded', () => {
    initModeSwitch();
    initMobileMenu();
    initProjects();
    initSmoothScroll();
    initScrollSpy();
    initCopyrightYear();
});

/* --- Data: Project Details --- */
const projectData = {
    raya: {
        title: "Greenbanking",
        client: "Bank Raya Indonesia (via IGLO)",
        desc: "Primary tester for the Greenbanking feature, from test design through UAT and deployment checks.",
        features: [
            "Designed and executed 50+ test cases; validated frontend and backend behavior.",
            "Presented UAT results to the squad and product teams, and verified deployment changes.",
            "Found an API error handling gap in the report screen; verified the fix that adds an error state and a Try Again action.",
            "Also on Bank Raya: SIT for Data Update Reminders (forced update and push notification flows) and MVO frontend improvements, with 200+ test cases executed across projects."
        ],
        tools: "Jira, Bruno, Postman, DBeaver (PostgreSQL, MySQL), Redis client, pytest (AI-assisted, personally reviewed)"
    },
    kopra: {
        title: "Kopra by Mandiri",
        client: "Bank Mandiri (via Adi Data Informatika)",
        desc: "Corporate cash management on web and mobile, tested through SIT, UAT, regression and release testing.",
        features: [
            "Intrabank and interbank transfers.",
            "Batch uploads, bill payments and payroll.",
            "Found that batch upload validation accepted duplicate records; retested the fix and confirmed the system response and exported data.",
            "About 30 passing test cases a day, with results and defects documented in Jira."
        ],
        tools: "Jira, SIT, UAT, regression and release testing"
    },
    edc: {
        title: "EDC/APOS and QRIS",
        client: "Bank Central Asia (via DIKA)",
        desc: "Payment terminal and app transactions, reconciled against the bank's backend systems.",
        features: [
            "Debit, credit, QRIS, refund and installment transactions on EDC/APOS.",
            "Paid APOS-generated QRIS codes with BCA QRIS and other payment apps, then validated the outcome in the backend.",
            "Reconciled amounts, statuses and transaction references in AS400, IDS and BDS."
        ],
        tools: "TeMan, AS400, IDS, BDS"
    },
    mcb: {
        title: "Merchant BCA (MCB)",
        client: "Bank Central Asia (via DIKA)",
        desc: "Merchant app flows for terminal requests and service reports.",
        features: [
            "Validated EDC/APOS requests in Merchant BCA.",
            "Validated damage reports in Merchant BCA.",
            "Logged test results and defects in TeMan."
        ],
        tools: "TeMan"
    },
    oase: {
        title: "OASE ATM Management",
        client: "Bank Central Asia (via DIKA)",
        desc: "ATM network management system.",
        features: [
            "Validated ATM inventory.",
            "Validated technician and vendor assignments.",
            "Used an ATM simulator for transfers and for checks of exchange-rate updates and decimal display."
        ],
        tools: "TeMan, ATM simulator"
    },
    elastics: {
        title: "Elastics",
        client: "Bank Central Asia (via DIKA)",
        desc: "Terminal integration and vendor inventory system.",
        features: [
            "Validated terminal integrations.",
            "Validated vendor inventory."
        ],
        tools: "TeMan"
    },
    acco: {
        title: "Apply Credit Card Online (ACCO)",
        client: "Bank Central Asia (via DIKA)",
        desc: "Online credit card application.",
        features: [
            "Tested UI wording across the application.",
            "Tested the normal application flows."
        ],
        tools: "TeMan"
    }
};

/* --- 1. Lite / Full mode --- */
function setMode(mode, persist) {
    const next = mode === 'lite' ? 'lite' : 'full';
    document.documentElement.setAttribute('data-mode', next);
    if (persist) {
        try { localStorage.setItem('mode', next); } catch (e) { /* storage blocked */ }
    }
    document.querySelectorAll('button[data-set-mode]').forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.setMode === next ? 'true' : 'false');
    });
}

function initModeSwitch() {
    setMode(document.documentElement.getAttribute('data-mode'));

    document.querySelectorAll('[data-set-mode]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.tagName === 'A') e.preventDefault();
            const mode = btn.dataset.setMode;
            if (mode === document.documentElement.getAttribute('data-mode')) return;
            closeMenu();
            setMode(mode, true);
            window.scrollTo({ top: 0 });
            const visible = [...document.querySelectorAll(`button[data-set-mode="${mode}"]`)].find(el => el.offsetParent !== null);
            if (visible) visible.focus();
            if (typeof gtag === 'function') gtag('event', 'mode_switch', { mode });
        });
    });
}

/* --- 2. Mobile / tablet menu --- */
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    mobileMenu.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    if (!mobileMenu || mobileMenu.hidden) return;
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
}

function initMobileMenu() {
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.hidden ? openMenu() : closeMenu();
    });

    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.hidden) {
            closeMenu();
            menuBtn.focus();
        }
    });

    window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => {
        if (e.matches) closeMenu();
    });
}

/* --- 3. Projects: modal + show all --- */
const modal = document.getElementById('project-modal');
const closeBtn = modal.querySelector('.close-modal');
let lastFocusedElement = null;

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function openModal(projectId, trigger) {
    const data = projectData[projectId];
    if (!data) return;

    const featureList = data.features.map(f => {
        const metric = /\d+\+/.test(f) ? ' class="is-metric"' : '';
        return `<li${metric}><svg class="icon" width="16" height="16"><use href="#i-check"/></svg><span>${escapeHTML(f)}</span></li>`;
    }).join('');

    document.getElementById('modal-client').textContent = data.client;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-body').innerHTML = `
        <p class="modal-desc">${escapeHTML(data.desc)}</p>
        <div class="modal-scope">
            <h3 class="modal-heading">Key features and testing scope</h3>
            <ul class="modal-list">${featureList}</ul>
        </div>
        <div class="modal-tools">
            <h3 class="modal-heading">Tools and methods</h3>
            <p>${escapeHTML(data.tools)}</p>
        </div>
    `;

    lastFocusedElement = trigger || document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
}

window.openModal = openModal;

function isModalOpen() {
    return modal.classList.contains('is-open');
}

function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
}

function initProjects() {
    document.querySelectorAll('.project-open').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.project, btn));
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (!isModalOpen()) return;
        if (e.key === 'Escape') closeModal();

        if (e.key === 'Tab') {
            const focusable = [...modal.querySelectorAll(FOCUSABLE)];
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    const showAll = document.querySelector('.show-all');
    const list = document.getElementById('projects-list');
    if (showAll && list) {
        showAll.addEventListener('click', () => {
            const expanded = list.classList.toggle('is-expanded');
            showAll.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            showAll.querySelector('.show-all-label').textContent = expanded ? 'Show fewer projects' : 'Show all 6 projects';
        });
    }
}

/* --- 4. Utilities --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = targetId === '#top' ? document.body : document.querySelector(targetId);
            if (!targetElement) return;
            e.preventDefault();
            if (targetId === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (targetElement.tagName === 'MAIN') targetElement.focus({ preventScroll: true });
            }
        });
    });
}

/* Scrollspy: highlight the nav link of the section in view */
function initScrollSpy() {
    const links = [...document.querySelectorAll('.nav-links .nav-link')];
    if (!links.length || !('IntersectionObserver' in window)) return;
    const linkFor = { projects: '#projects', 'sample-work': '#sample-work', skills: '#skills' };
    const setActive = (href) => links.forEach(l => {
        const on = l.getAttribute('href') === href;
        l.classList.toggle('is-active', on);
        if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActive(linkFor[entry.target.id] || null);
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'services', 'about', 'projects', 'sample-work', 'skills', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

function initCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => { el.textContent = year; });
}
