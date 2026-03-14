// script.js

// --- GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Navbar styling on scroll
const navbar = document.querySelector('.elegant-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// --- Reveal Animations ---

// Make elements visible for GSAP (they were hidden in CSS to prevent FOUC)
gsap.set(".gs-reveal, .gs-reveal-left, .gs-reveal-right, .gs-reveal-delay", { visibility: "visible" });

// Hero Animations (On Load)
const splitTextLines = gsap.utils.toArray('.elegant-title');
// simple cross fade and slide up for title
gsap.fromTo('.elegant-title', 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
);

gsap.fromTo('.eyebrow', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
);

gsap.fromTo('.subtitle', 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.5 }
);

gsap.fromTo('.scroll-indicator', 
    { opacity: 0 },
    { opacity: 1, duration: 1.5, delay: 1.5 }
);

// Scroll Triggers for Content Sections

// Fade in upwards
gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%", // when top of element hits 85% of viewport
        animation: gsap.fromTo(elem, 
            { y: 50, autoAlpha: 0 }, 
            { y: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
    });
});

// Slide in from left
gsap.utils.toArray('.gs-reveal-left').forEach(function(elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        animation: gsap.fromTo(elem, 
            { x: -50, autoAlpha: 0 }, 
            { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        ),
        toggleActions: "play none none reverse"
    });
});

// Slide in from right
gsap.utils.toArray('.gs-reveal-right').forEach(function(elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        animation: gsap.fromTo(elem, 
            { x: 50, autoAlpha: 0 }, 
            { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        ),
        toggleActions: "play none none reverse"
    });
});

// Image Parallax Effect
gsap.utils.toArray('.img-wrapper').forEach(wrapper => {
    // Parallax the image slightly within its wrapper on scroll
    const image = wrapper.querySelector('.placeholder-img');
    if(image) {
       gsap.to(image, {
           yPercent: 10,
           ease: "none",
           scrollTrigger: {
               trigger: wrapper,
               start: "top bottom",
               end: "bottom top",
               scrub: true
           }
       });
    }
});

// --- Homepage Image Slideshows ---
const foodImages = [
    'images/nasilemak.jpeg', 'images/charkway.jpeg', 'images/laksa.jpeg', 
    'images/roticanai.jpeg', 'images/rendang.jpeg', 'images/hanainese.jpeg', 
    'images/cendol.jpeg', 'images/meegoreng.jpeg'
];

const placesImages = [
    'images/batucaves.png', 'images/malacca.jpeg', 'images/jonker.jpeg', 
    'images/famosa.jpeg', 'images/theanhou.jpeg', 'images/george.jpeg', 
    'images/kekloki.jpeg', 'images/sarawak.jpeg', 'images/marimari.jpeg'
];

const festivalsImages = [
    'images/thaipusam.jpeg', 'images/deepavali.jpeg', 'images/gawai.jpeg', 
    'images/kaamathan.jpeg', 'images/chinesenewyear.jpeg', 'images/midautumn.jpeg', 
    'images/qingming.jpeg', 'images/chapgomei.jpeg', 'images/hariabdhu.jpeg'
];

function setupSlideshow(elementId, images) {
    const el = document.getElementById(elementId);
    if (!el || images.length === 0) return;
    
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        el.style.backgroundImage = `url('${images[currentIndex]}')`;
    }, 2000); // 2000ms = 2 seconds
}

// Initialize slideshows if the elements exist on the page (e.g., index.html)
document.addEventListener('DOMContentLoaded', () => {
    setupSlideshow('food-slideshow', foodImages);
    setupSlideshow('places-slideshow', placesImages);
    setupSlideshow('festivals-slideshow', festivalsImages);
});
