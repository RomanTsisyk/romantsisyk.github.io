// FollowMyMoney Portfolio JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Animate metrics counting
    const animateValue = (element, start, end, duration) => {
        const startTimestamp = Date.now();
        const step = (timestamp) => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            
            if (element.dataset.format === 'currency') {
                element.textContent = `€${Math.floor(value)}M+`;
            } else if (element.dataset.format === 'percentage') {
                element.textContent = `${value.toFixed(2)}%`;
            } else if (element.dataset.format === 'number') {
                element.textContent = `${Math.floor(value).toLocaleString()}+`;
            } else {
                element.textContent = `${Math.floor(value)}+`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in animation
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }
                
                // Metric counting animation
                if (entry.target.classList.contains('metric-value')) {
                    const value = parseFloat(entry.target.dataset.value);
                    if (!entry.target.animated) {
                        entry.target.animated = true;
                        
                        if (entry.target.textContent.includes('€')) {
                            entry.target.dataset.format = 'currency';
                            animateValue(entry.target, 0, value, 2000);
                        } else if (entry.target.textContent.includes('%')) {
                            entry.target.dataset.format = 'percentage';
                            animateValue(entry.target, 0, value, 2000);
                        } else if (value > 1000) {
                            entry.target.dataset.format = 'number';
                            animateValue(entry.target, 0, value, 2000);
                        } else {
                            animateValue(entry.target, 0, value, 2000);
                        }
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe metric values
    document.querySelectorAll('.metric-value').forEach(el => {
        observer.observe(el);
    });

    // Screenshot carousel
    const screenshotTrack = document.querySelector('.screenshot-track');
    const screenshots = document.querySelectorAll('.screenshot-item');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentScreenshot = 0;
    const totalScreenshots = screenshots.length;

    function showScreenshot(index) {
        // Update active states
        screenshots.forEach((screenshot, i) => {
            screenshot.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Calculate transform
        const slideWidth = screenshots[0].offsetWidth + 32; // width + gap
        const translateX = -index * slideWidth;
        screenshotTrack.style.transform = `translateX(${translateX}px)`;
    }

    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentScreenshot = currentScreenshot > 0 ? currentScreenshot - 1 : totalScreenshots - 1;
            showScreenshot(currentScreenshot);
        });

        nextBtn.addEventListener('click', () => {
            currentScreenshot = (currentScreenshot + 1) % totalScreenshots;
            showScreenshot(currentScreenshot);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentScreenshot = index;
            showScreenshot(currentScreenshot);
        });
    });

    // Auto-rotate screenshots
    setInterval(() => {
        currentScreenshot = (currentScreenshot + 1) % totalScreenshots;
        showScreenshot(currentScreenshot);
    }, 5000);

    // Add parallax effect to orbs
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 10;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Trading card hover effects
    const traderCards = document.querySelectorAll('.trader-card');
    traderCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Follow button animation
    const followButtons = document.querySelectorAll('.btn-follow');
    followButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!this.classList.contains('following')) {
                this.classList.add('following');
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Following
                `;
                this.style.background = 'rgba(0, 200, 83, 0.2)';
                this.style.border = '1px solid var(--primary-color)';
            } else {
                this.classList.remove('following');
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4L20 8V14C20 18 16 20 12 21C8 20 4 18 4 14V8L12 4Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Follow Trader
                `;
                this.style.background = 'var(--gradient-primary)';
                this.style.border = 'none';
            }
        });
    });

    // Performance bar animation
    const performanceBars = document.querySelectorAll('.bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);

    performanceBars.forEach(bar => {
        barObserver.observe(bar);
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
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

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1s ease forwards';
        }, 500);
    }

    // Add glow effect on scroll
    const glowElements = document.querySelectorAll('.feature-card, .trader-card, .metric-card');
    window.addEventListener('scroll', () => {
        glowElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const opacity = Math.min(scrollProgress * 0.1, 0.05);
                element.style.boxShadow = `0 0 50px rgba(0, 200, 83, ${opacity})`;
            }
        });
    });

    // Initialize tooltips
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                delete this.tooltip;
            }
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .tooltip {
        position: fixed;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        pointer-events: none;
        animation: tooltip-appear 0.3s ease;
        border: 1px solid var(--border-color);
    }
    
    @keyframes tooltip-appear {
        from {
            opacity: 0;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--dark-bg);
            flex-direction: column;
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

document.head.appendChild(style);