/**
 * Apex Consulting - Interactive Script
 * Features: Cursor glow, scroll parallax, counters, horizontal scroll, reveal animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initCursorGlow();
    initNavigation();
    initMobileMenu();
    initScrollReveal();
    initParallaxScroll();
    initCounterAnimation();
    initServicesScroll();
    initParticles();
    initSmoothScroll();
    initFormHandling();
    initFloatingShapes();
    initSectionTitleAnimations();
});

/**
 * Cursor Glow Effect
 */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (!cursorGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth follow effect
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Navigation Scroll Effect
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled state class
        if (currentScroll > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Advanced Scroll Reveal Animations
 */
function initScrollReveal() {
    // Standard reveal elements
    const revealElements = document.querySelectorAll(
        '.section-tag, .section-title, .section-desc, ' +
        '.about-visual, .about-content, ' +
        '.case-card, .testimonial-card, .insight-card, ' +
        '.contact-info, .contact-form-wrap, .feature'
    );
    
    // Add reveal class
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });
    
    // Stagger children elements
    const staggerContainers = document.querySelectorAll(
        '.cases-grid, .testimonials-grid, .insights-grid, .services-scroll'
    );
    
    staggerContainers.forEach(container => {
        container.classList.add('stagger-children');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger section title underline animation
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('in-view');
                }
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
    staggerContainers.forEach(el => observer.observe(el));
}

/**
 * Parallax Scroll Effects
 */
function initParallaxScroll() {
    const parallaxElements = [
        { selector: '.hero-grid', speed: 0.3, direction: 'y' },
        { selector: '.hero-gradient', speed: 0.2, direction: 'y', opacity: true },
        { selector: '.hero-shape-1', speed: 0.15, direction: 'y' },
        { selector: '.hero-shape-2', speed: 0.25, direction: 'y' },
        { selector: '.hero-shape-3', speed: 0.1, direction: 'y' },
        { selector: '.about-image-wrapper', speed: 0.1, direction: 'y' },
        { selector: '.about-floating-card', speed: 0.15, direction: 'y' }
    ];
    
    // Parallax for case card images
    const caseImages = document.querySelectorAll('.case-image img');
    caseImages.forEach(img => {
        img.dataset.parallax = 'true';
        img.dataset.speed = '0.1';
    });
    
    // Parallax for insight images
    const insightImages = document.querySelectorAll('.insight-image img');
    insightImages.forEach(img => {
        img.dataset.parallax = 'true';
        img.dataset.speed = '0.08';
    });
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        parallaxElements.forEach(({ selector, speed, direction, opacity }) => {
            const element = document.querySelector(selector);
            if (!element) return;
            
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - windowHeight / 2;
            
            if (direction === 'y') {
                const translateY = distanceFromCenter * speed;
                element.style.transform = `translateY(${translateY}px)`;
            }
            
            if (opacity) {
                const fadeStart = 0;
                const fadeEnd = windowHeight * 0.8;
                const fadeProgress = Math.min(scrollY / fadeEnd, 1);
                element.style.opacity = 1 - fadeProgress;
            }
        });
        
        // Parallax for images with data attributes
        document.querySelectorAll('[data-parallax="true"]').forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > windowHeight) return;
            
            const speed = parseFloat(img.dataset.speed) || 0.1;
            const elementCenter = rect.top + rect.height / 2;
            const distanceFromCenter = elementCenter - windowHeight / 2;
            const translateY = distanceFromCenter * speed;
            
            img.style.transform = `translateY(${translateY}px) scale(1.1)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();
}

/**
 * Section Title Animations
 */
function initSectionTitleAnimations() {
    const titles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.5 });
    
    titles.forEach(title => observer.observe(title));
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2500;
    const startTime = performance.now();
    const startValue = 0;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Services Horizontal Scroll
 */
function initServicesScroll() {
    const track = document.getElementById('servicesTrack');
    const prevBtn = document.getElementById('scrollPrev');
    const nextBtn = document.getElementById('scrollNext');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 420;
    
    // Drag scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
    });
    
    // Button controls
    prevBtn.addEventListener('click', () => {
        track.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Touch support
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = touchStartX - touchX;
        track.scrollLeft = touchScrollLeft + walk;
    });
}

/**
 * Particle Animation
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 25 + 's';
        particle.style.animationDuration = (20 + Math.random() * 15) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Floating Geometric Shapes
 */
function initFloatingShapes() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create shapes container if not exists
    let shapesContainer = heroSection.querySelector('.hero-shapes');
    if (!shapesContainer) {
        shapesContainer = document.createElement('div');
        shapesContainer.className = 'hero-shapes';
        heroSection.querySelector('.hero-bg').appendChild(shapesContainer);
    }
    
    // Create geometric shapes
    const shapes = [
        { class: 'hero-shape hero-shape-1' },
        { class: 'hero-shape hero-shape-2' },
        { class: 'hero-shape hero-shape-3' }
    ];
    
    shapes.forEach(shape => {
        const el = document.createElement('div');
        el.className = shape.class;
        shapesContainer.appendChild(el);
    });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handling
 */
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate submission
            console.log('Form data:', data);
            
            // Show success message
            showNotification('Thank you! We\'ll be in touch within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                console.log('Subscribe email:', email);
                showNotification('Successfully subscribed!');
                newsletterForm.reset();
            }
        });
    }
}

/**
 * Show Notification
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 32px;
            right: 32px;
            z-index: 10000;
            animation: notificationSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 24px;
            background: #000;
            color: #fff;
            border-radius: 8px;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif;
        }
        
        .notification-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            color: #000;
            border-radius: 50%;
            font-size: 12px;
            font-weight: 600;
        }
        
        .notification-message {
            font-size: 0.875rem;
        }
        
        @keyframes notificationSlideIn {
            from {
                opacity: 0;
                transform: translateY(16px) translateX(16px);
            }
            to {
                opacity: 1;
                transform: translateY(0) translateX(0);
            }
        }
        
        @keyframes notificationSlideOut {
            from {
                opacity: 1;
                transform: translateY(0) translateX(0);
            }
            to {
                opacity: 0;
                transform: translateY(16px) translateX(16px);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

/**
 * Mouse-based Parallax on Hero
 */
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    const rect = heroContent.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const moveX = (e.clientX - centerX) / 80;
    const moveY = (e.clientY - centerY) / 80;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

/**
 * Intersection Observer for Section Backgrounds
 */
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize on load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initSectionTransitions();
});

// Scroll-triggered class changes
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    // Update hero elements based on scroll
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const opacity = Math.max(0, 1 - scrollY / 600);
        const scale = Math.max(0.8, 1 - scrollY / 3000);
        heroTitle.style.opacity = opacity;
        heroTitle.style.transform = `scale(${scale})`;
    }
});
