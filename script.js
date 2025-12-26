document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initBackToTop();
    initCopyrightYear();
    initAnimations();
    initNavbarScroll();
});

// 1. Dark Mode
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

// 2. Mobile Menu (FIXED: No Freeze)
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle Menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Use CSS class instead of inline style
    });

    // Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll'); // Restore scrolling
        });
    });
}

// 3. Back to Top & Navbar Scroll
function initBackToTop() {
    const backBtn = document.querySelector('.back-to-top');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initNavbarScroll() {
    // Merged into initBackToTop for scroll event efficiency
}

// 4. Modal Logic (Project Details)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
        document.body.classList.add('no-scroll');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll');
    }
}

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.classList.remove('no-scroll');
    }
}

// 5. Utilities
function initCopyrightYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}
