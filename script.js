// 1. Custom Cursor & Hover States
const dot = document.querySelector('.cursor-dot');
const trail = document.querySelector('.cursor-trail');
const interactives = document.querySelectorAll('a, .grid-item, .hero-image-wrapper');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Dot follows instantly
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    
    // Trail follows with a slight delay for smoothness
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
});

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        trail.style.width = '80px';
        trail.style.height = '80px';
        trail.style.backgroundColor = 'rgba(0,0,0,0.05)';
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
    });
    el.addEventListener('mouseleave', () => {
        trail.style.width = '30px';
        trail.style.height = '30px';
        trail.style.backgroundColor = 'transparent';
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// 2. Parallax Effect on Scroll inside image containers
const parallaxImages = document.querySelectorAll('.parallax-img');

window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;
    
    // Move images slightly within their containers based on scroll
    parallaxImages.forEach(img => {
        const speed = 0.15;
        // Calculate offset based on scroll position
        const yPos = -(scrolled * speed); 
        // Apply transform
        img.style.transform = `translateY(${yPos}px) scale(1.1)`; 
    });
});

// 3. Staggered Scroll Reveal
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target); // Trigger only once
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));