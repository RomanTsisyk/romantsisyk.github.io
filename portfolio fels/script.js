// =====================
// Portfolio JavaScript
// =====================

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
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

// Screenshot Carousel
let currentScreenshot = 0;
const screenshots = document.querySelectorAll('.screenshot-item');
const dots = document.querySelectorAll('.dot');

function changeScreenshot(index) {
    screenshots.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    screenshots[index].classList.add('active');
    dots[index].classList.add('active');
    currentScreenshot = index;
}

// Auto-rotate screenshots
setInterval(() => {
    const nextIndex = (currentScreenshot + 1) % screenshots.length;
    changeScreenshot(nextIndex);
}, 5000);

// Animated Counter for Metrics
function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Trigger counter animation for metrics
            if (entry.target.classList.contains('metric-card')) {
                const counter = entry.target.querySelector('.metric-value');
                if (counter && !counter.classList.contains('animated')) {
                    animateCounter(counter);
                    counter.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .tech-item, .metric-card').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Trading Interface Animation
function animateTradingInterface() {
    const prices = ['$178.50', '$179.20', '$178.80', '$179.50', '$180.10'];
    const changes = ['+2.4%', '+2.8%', '+2.5%', '+3.1%', '+3.5%'];
    let index = 0;

    setInterval(() => {
        const priceElement = document.querySelector('.trading-price');
        const changeElement = document.querySelector('.trading-change');
        
        if (priceElement && changeElement) {
            index = (index + 1) % prices.length;
            priceElement.textContent = prices[index];
            changeElement.textContent = changes[index];
            
            // Add animation class
            priceElement.style.animation = 'none';
            setTimeout(() => {
                priceElement.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        }
    }, 3000);
}

animateTradingInterface();

// Mobile Menu Toggle (for future implementation)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    
    // Create hamburger menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            gap: 4px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 5px;
        }
        
        .mobile-menu-toggle span {
            width: 25px;
            height: 3px;
            background: var(--text-primary);
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 250px;
                height: calc(100vh - 70px);
                background: var(--dark-surface);
                flex-direction: column;
                padding: 30px;
                transition: right 0.3s ease;
            }
            
            .nav-links.active {
                right: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    navContainer.appendChild(menuButton);
    
    // Toggle mobile menu
    menuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
}

// Initialize mobile menu
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Form Validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Typing Effect for Hero Title
function typeWriter() {
    const text = "Smart Trading";
    const element = document.querySelector('.title-gradient');
    if (!element) return;
    
    let index = 0;
    const originalText = element.textContent;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    setTimeout(type, 2000);
}

// Initialize typing effect
// typeWriter(); // Uncomment to enable typing effect

// Performance optimization - Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter Egg
console.log('%c🚀 Fels Trader Portfolio', 'font-size: 24px; font-weight: bold; color: #00C853;');
console.log('%cBuilt with ❤️ for Android', 'font-size: 14px; color: #2196F3;');
console.log('%cInterested in the project? Check out our GitHub!', 'font-size: 12px; color: #888;');