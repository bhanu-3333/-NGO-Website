/**
 * InAmigos Foundation - Main JavaScript
 * Handles: navbar, scroll animations, counters, gallery, forms
 */

'use strict';

/* ================================
   SCROLL PROGRESS BAR
================================ */
(function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = ((scrollTop / docHeight) * 100) + '%';
    }, { passive: true });
})();

/* ================================
   NAVBAR: transparent -> white on scroll
================================ */
(function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
})();

/* ================================
   MOBILE HAMBURGER MENU
================================ */
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);

        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });
})();

/* ================================
   SMOOTH SCROLL FOR ANCHOR LINKS
================================ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = document.getElementById('navbar').offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();

/* ================================
   SCROLL REVEAL ANIMATIONS
================================ */
(function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();

/* ================================
   ANIMATED COUNTERS
================================ */
(function initCounters() {
    const counters = document.querySelectorAll('.impact-card .impact-number[data-target]');

    const format = (value) => {
        if (value >= 1000) {
            return (value / 1000).toFixed(value % 1000 !== 0 ? 1 : 0) + 'K+';
        }
        return value + '+';
    };

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = format(current);
            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
})();

/* ================================
   CONTACT FORM VALIDATION
================================ */
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const showSuccess = () => {
        form.innerHTML = `
            <div class="form-success" style="display:block;">
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
            </div>`;
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            markInvalid(form.querySelectorAll('input, textarea'));
            return;
        }

        if (!validateEmail(email)) {
            const emailField = form.querySelector('#email');
            emailField.style.borderColor = '#ef4444';
            emailField.focus();
            return;
        }

        showSuccess();
    });

    function markInvalid(fields) {
        fields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                field.addEventListener('input', () => {
                    field.style.borderColor = '';
                }, { once: true });
            }
        });
    }
})();

/* ================================
   NEWSLETTER FORM
================================ */
(function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const btn = form.querySelector('button');
        if (input.value.trim()) {
            btn.textContent = 'Subscribed';
            btn.disabled = true;
            input.value = '';
        }
    });
})();
