// ============================================
// Mochi Crew — mochicrew.com
// ============================================

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

// Apply fade-in to sections
document.querySelectorAll(
    '.pet-card, .feature-card, .step-card, .game-pill, ' +
    '.section-tag, .section-title, .section-sub, ' +
    '.cta-card, .how-section .steps-row'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger pet cards
document.querySelectorAll('.pet-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
});

// Stagger game pills
document.querySelectorAll('.game-pill').forEach((pill, i) => {
    pill.style.transitionDelay = `${i * 0.04}s`;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offset = 80;
            const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Pet bubble hover sound effect (visual wiggle)
document.querySelectorAll('.pet-bubble').forEach(bubble => {
    bubble.addEventListener('mouseenter', () => {
        const emoji = bubble.querySelector('.pet-emoji');
        if (emoji) {
            emoji.style.animation = 'none';
            requestAnimationFrame(() => {
                emoji.style.animation = 'petWiggle 0.5s ease-out';
            });
        }
    });
});

// Add wiggle keyframe dynamically
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
    @keyframes petWiggle {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-12deg) scale(1.1); }
        50% { transform: rotate(8deg) scale(1.1); }
        75% { transform: rotate(-4deg); }
        100% { transform: rotate(0deg); }
    }
`;
document.head.appendChild(wiggleStyle);
