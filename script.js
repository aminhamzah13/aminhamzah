/**
 * Portfolio Script - v3 (Full + Lite)
 * Author: Amin Hamzah
 */

document.addEventListener('DOMContentLoaded', () => {
    initModeSwitch();
    initMobileMenu();
    initProjects();
    initSmoothScroll();
    initAnimations();
    initBackToTop();
    initCopyrightYear();
});

/* --- Data: Project Details --- */
const projectData = {
    // TODO(dummy): isi modal Bank Raya diturunkan dari teks card desain v3 — ganti dengan data asli sebelum publish
    raya: {
        title: "Digital banking app",
        client: "Bank Raya Indonesia",
        desc: "Mobile banking for retail customers: account opening with e-KYC, BI-FAST transfers and transaction history.",
        features: [
            "Account opening with e-KYC.",
            "BI-FAST transfers.",
            "Transaction history.",
            "200+ case regression suite, run every sprint."
        ],
        tools: "Jira, Postman, SIT, UAT"
    },
    kopra: {
        title: "Kopra by Mandiri",
        client: "PT Bank Mandiri",
        desc: "Corporate cash management platform serving enterprise clients — validated across 150+ test scenarios with 0 critical bugs at launch.",
        features: [
            "Cash Management: Intrabank, Interbank, Manual & File Upload Transfers.",
            "Bill Payment Module: PLN, Telkom, PDAM, etc.",
            "Payroll Management System.",
            "Validated 150+ test scenarios ensuring 0 critical bugs at launch."
        ],
        tools: "Jira, Figma, Manual Testing (SIT/UAT/Regression)"
    },
    mcb: {
        title: "Merchant BCA (MCB)",
        client: "PT Bank Central Asia",
        desc: "Mobile app for BCA merchant onboarding — validated end-to-end from registration flow to backend API integration.",
        features: [
            "Merchant Onboarding & Verification flows.",
            "Information dashboard & service management.",
            "Integration with backend verification systems."
        ],
        tools: "AS400, Postman, TeMan, Excel"
    },
    edc: {
        title: "EDC & Transaction Apps",
        client: "PT Bank Central Asia",
        desc: "Payment terminal QA covering Credit, Debit, QRIS, refunds, voids, and installment transactions.",
        features: [
            "Credit & Debit Card processing validation.",
            "QRIS Payment Gateway testing.",
            "Refund, Void, and Installment workflows.",
            "Coordinated with cross-functional teams for device testing."
        ],
        tools: "Manual Testing, BDS, Hardware Terminals"
    },
    oase: {
        title: "OASE ATM Management",
        client: "PT Bank Central Asia",
        desc: "ATM network management system — validated lifecycle tracking, inventory, and operational reporting integrity.",
        features: [
            "ATM lifecycle management and tracking.",
            "Accessory inventory and operational reporting.",
            "Backend validation using IDS system."
        ],
        tools: "IDS, Web & Mobile Testing"
    },
    acco: {
        title: "Apply Credit Card Online (ACCO)",
        client: "PT Bank Central Asia",
        desc: "Credit card application portal — validated user data flows, document verification, status tracking, and notification systems.",
        features: [
            "User data entry and validation.",
            "Document upload and verification flows.",
            "Status tracking and notification systems."
        ],
        tools: "UAT, SIT, Web Testing"
    }
};

/* --- 1. Lite / Full mode --- */
function setMode(mode, persist) {
    const next = mode === 'lite' ? 'lite' : 'full';
    document.documentElement.setAttribute('data-mode', next);
    if (persist) {
        try { localStorage.setItem('mode', next); } catch (e) { /* storage blocked */ }
    }
    document.querySelectorAll('[data-set-mode]').forEach(btn => {
        btn.setAttribute('aria-pressed', btn.dataset.setMode === next ? 'true' : 'false');
    });
}

function initModeSwitch() {
    setMode(document.documentElement.getAttribute('data-mode'));

    document.querySelectorAll('[data-set-mode]').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.setMode;
            if (mode === document.documentElement.getAttribute('data-mode')) return;
            closeMenu();
            setMode(mode, true);
            window.scrollTo({ top: 0 });
            const visible = [...document.querySelectorAll(`[data-set-mode="${mode}"]`)].find(el => el.offsetParent !== null);
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

function openModal(projectId) {
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

    lastFocusedElement = document.activeElement;
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
        btn.addEventListener('click', () => openModal(btn.dataset.project));
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
            list.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('fade-in'));
        });
    }
}

/* --- 4. Back to Top --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                backToTopBtn.classList.toggle('is-visible', window.scrollY > 600);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- 5. Utilities --- */
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
            }
        });
    });
}

function initAnimations() {
    const els = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('fade-in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.height > 0) {
            el.classList.add('fade-in');
        } else {
            observer.observe(el);
        }
    });
}

function initCopyrightYear() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => { el.textContent = year; });
}
