/**
 * Portfolio Script - V.2
 * Author: Amin Hamzah
 */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSmoothScroll();
    initAnimations();
    initMobileMenu();
    initBackToTop();
    initCopyrightYear();
    initNavbarScroll();
});

/* --- Data: Project Details --- */
const projectData = {
    kopra: {
        title: "Kopra by Mandiri",
        client: "PT Bank Mandiri",
        desc: "Comprehensive corporate cash management system for enterprise clients.",
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
        desc: "Mobile application designed for BCA merchant onboarding and services.",
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
        desc: "End-to-end validation of payment terminal transactions.",
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
        desc: "Operational management system for ATM network.",
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
        desc: "Digital platform for customer credit card applications.",
        features: [
            "User data entry and validation.",
            "Document upload and verification flows.",
            "Status tracking and notification systems."
        ],
        tools: "UAT, SIT, Web Testing"
    }
};

/* --- 1. Mobile Menu & Navigation --- */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open'); // Fix freeze: prevent background scroll
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open'); // Restore scroll
        });
    });
}

/* --- 2. Modal Logic --- */
window.openModal = function(projectId) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const data = projectData[projectId];

    if (data) {
        let featureList = data.features.map(f => `<li>${f}</li>`).join('');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <span class="badge" style="margin-bottom:10px; display:inline-block;">${data.client}</span>
                <h2 class="modal-project-title">${data.title}</h2>
            </div>
            <p style="margin-bottom: 1.5rem;">${data.desc}</p>
            
            <h4>Key Features & Testing Scope:</h4>
            <ul class="modal-list">
                ${featureList}
            </ul>
            
            <h4>Tools & Tech:</h4>
            <p style="color: var(--text-secondary); font-weight: 500;">${data.tools}</p>
        `;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }
};

// Close Modal Logic
const modal = document.getElementById('project-modal');
const closeBtn = document.querySelector('.close-modal');

if (closeBtn) {
    closeBtn.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restore scroll
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}

/* --- 3. Back to Top --- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --- 4. Utilities (Dark Mode, Scroll, Animations) --- */
function initDarkMode() {
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}
