// ==================== Loading Screen ==================== //
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
    }, 1500);
});

// ==================== Navigation Scroll Effect ==================== //
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== Mobile Navigation Toggle ==================== //
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// ==================== Smooth Scroll for Navigation Links ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Animated Counter ==================== //
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;
        const displayValue = Number.isInteger(end) ? Math.floor(current) : parseFloat(current.toFixed(1));
        element.textContent = displayValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
};

// ==================== Intersection Observer for Animations ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Reveal animations
const revealElements = document.querySelectorAll('.feature-card, .tech-item, .metric-card, .screenshot');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Animate metrics
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const valueElement = entry.target.querySelector('.metric-value');
            const targetValue = parseFloat(valueElement.dataset.value);
            animateValue(valueElement, 0, targetValue, 2000);
            
            const fillElement = entry.target.querySelector('.metric-fill');
            if (fillElement) {
                const targetWidth = fillElement.style.width;
                fillElement.style.width = '0';
                void fillElement.offsetWidth; // force reflow
                setTimeout(() => {
                    fillElement.style.width = targetWidth; // then animate to target
                }, 100);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
});

// ==================== Parallax Effect for Orbs ==================== //
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ==================== Progress Bar Animation ==================== //
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (progressFill && !progressFill.classList.contains('animated')) {
                const width = progressFill.style.width;
                progressFill.style.width = '0';
                setTimeout(() => {
                    progressFill.style.width = width;
                }, 100);
                progressFill.classList.add('animated');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.tax-progress').forEach(progress => {
    progressObserver.observe(progress);
});

// ==================== Screenshots Carousel ==================== //
const carousel = document.querySelector('.screenshot-container');
let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
}

// ==================== Feature Cards Hover Effect ==================== //
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 74, 173, 0.1), var(--dark-card))`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'var(--dark-card)';
    });
});

// ==================== Dynamic Theme Color ==================== //
const time = new Date().getHours();
if (time >= 6 && time < 12) {
    // Morning theme
    document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #667eea, #764ba2)');
} else if (time >= 12 && time < 18) {
    // Afternoon theme
    document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #004AAD, #0066FF)');
} else {
    // Evening/Night theme
    document.documentElement.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)');
}

// ==================== Typing Effect for Hero Title ==================== //
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// ==================== Performance Optimization ==================== //
// Debounce function for scroll events
const debounce = (func, wait = 20, immediate = true) => {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Throttle function for resize events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ==================== Easter Egg ==================== //
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ==================== Initialize on DOM Content Loaded ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to elements
    document.querySelectorAll('.section-header, .hero-content, .hero-visual').forEach(element => {
        element.classList.add('reveal');
        setTimeout(() => {
            element.classList.add('active');
        }, 100);
    });
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
            tooltipElement.style.left = rect.left + (rect.width - tooltipElement.offsetWidth) / 2 + 'px';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });
});

// ==================== Console Easter Egg ==================== //
console.log('%c🚀 Welcome to Earnly!', 'font-size: 24px; font-weight: bold; color: #004AAD;');
console.log('%cBuilt with ❤️ using Android, Kotlin, and Jetpack Compose', 'font-size: 14px; color: #00BF63;');
console.log('%cInterested in the code? Check out: https://github.com/RomanTsisyk', 'font-size: 12px; color: #666;');
