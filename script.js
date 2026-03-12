// ============================================
// Mochi Pet — mymochipet.com
// ============================================

// Nav scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 40);
    lastScroll = scrollY;
}, { passive: true });

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.feature-card, .step, .privacy-card, .download-section .download-title, .download-section .download-subtitle').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// Stagger steps
document.querySelectorAll('.step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.15}s`;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Doll eye tracking (subtle - follows cursor on desktop)
const dollEyes = document.querySelectorAll('.mock-doll .doll-eye');
if (dollEyes.length && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const rect = document.querySelector('.mock-doll').getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / window.innerWidth;
        const deltaY = (e.clientY - centerY) / window.innerHeight;
        const moveX = deltaX * 3;
        const moveY = deltaY * 2;

        dollEyes.forEach(eye => {
            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}
