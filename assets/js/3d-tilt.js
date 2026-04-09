/**
 * 3D Tilt Effect for Phone Mockups
 * Creates a parallax tilt effect on mouse movement
 */

class TiltEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.settings = {
            max: options.max || 25,
            perspective: options.perspective || 1000,
            scale: options.scale || 1.05,
            speed: options.speed || 400,
            glare: options.glare !== undefined ? options.glare : true,
            maxGlare: options.maxGlare || 0.3,
            ...options
        };

        this.init();
    }

    init() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Add perspective to parent
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.transition = `transform ${this.settings.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;

        // Create glare element if enabled
        if (this.settings.glare) {
            this.createGlare();
        }

        // Store bound references so addEventListener and removeEventListener use the same function
        this._boundMouseEnter = this.onMouseEnter.bind(this);
        this._boundMouseLeave = this.onMouseLeave.bind(this);
        this._boundMouseMove = this.onMouseMove.bind(this);
        this._boundTouchStart = this.onTouchStart.bind(this);
        this._boundTouchMove = this.onTouchMove.bind(this);
        this._boundTouchEnd = this.onTouchEnd.bind(this);

        // Bind events
        this.bindEvents();
    }

    createGlare() {
        const glareElement = document.createElement('div');
        glareElement.classList.add('tilt-glare');
        
        const glareInner = document.createElement('div');
        glareInner.classList.add('tilt-glare-inner');
        
        glareElement.appendChild(glareInner);
        this.element.appendChild(glareElement);
        
        // Style the glare
        Object.assign(glareElement.style, {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            borderRadius: 'inherit'
        });
        
        Object.assign(glareInner.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)',
            transform: 'rotate(180deg) translate(-50%, -50%)',
            transformOrigin: '0 0',
            opacity: '0',
            transition: `opacity ${this.settings.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
        });
        
        this.glareElement = glareInner;
    }

    bindEvents() {
        // Mouse events
        this.element.addEventListener('mouseenter', this._boundMouseEnter);
        this.element.addEventListener('mousemove', this._boundMouseMove);
        this.element.addEventListener('mouseleave', this._boundMouseLeave);

        // Touch events for mobile
        this.element.addEventListener('touchstart', this._boundTouchStart, { passive: true });
        this.element.addEventListener('touchmove', this._boundTouchMove, { passive: true });
        this.element.addEventListener('touchend', this._boundTouchEnd, { passive: true });
    }

    onMouseEnter(e) {
        this.element.style.willChange = 'transform';
        this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`;
    }

    onMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        const tiltX = yPercent * this.settings.max;
        const tiltY = xPercent * this.settings.max * -1;
        
        // Apply tilt transform
        this.element.style.transform = `
            perspective(${this.settings.perspective}px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})
        `;
        
        // Update glare if enabled
        if (this.settings.glare && this.glareElement) {
            const glareAngle = Math.atan2(xPercent, yPercent) * (180 / Math.PI);
            const glareOpacity = Math.sqrt(xPercent * xPercent + yPercent * yPercent) * this.settings.maxGlare;
            
            this.glareElement.style.transform = `rotate(${glareAngle}deg) translate(-50%, -50%)`;
            this.glareElement.style.opacity = `${glareOpacity}`;
        }
    }

    onMouseLeave(e) {
        this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        
        if (this.settings.glare && this.glareElement) {
            this.glareElement.style.opacity = '0';
        }
        
        setTimeout(() => {
            this.element.style.willChange = 'auto';
        }, this.settings.speed);
    }

    // Touch events for mobile devices
    onTouchStart(e) {
        this.onMouseEnter(e);
    }

    onTouchMove(e) {
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            this.onMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }

    onTouchEnd(e) {
        this.onMouseLeave(e);
    }

    // Destroy method to clean up
    destroy() {
        if (!this._boundMouseEnter) return;

        this.element.removeEventListener('mouseenter', this._boundMouseEnter);
        this.element.removeEventListener('mousemove', this._boundMouseMove);
        this.element.removeEventListener('mouseleave', this._boundMouseLeave);
        this.element.removeEventListener('touchstart', this._boundTouchStart);
        this.element.removeEventListener('touchmove', this._boundTouchMove);
        this.element.removeEventListener('touchend', this._boundTouchEnd);

        if (this.glareElement && this.glareElement.parentElement) {
            this.glareElement.parentElement.remove();
        }

        this.element.style.transform = '';
        this.element.style.transformStyle = '';
        this.element.style.transition = '';
        this.element.style.willChange = '';
    }
}

// Auto-initialize after all resources are loaded (non-critical path)
function init3DTilt() {
    // Initialize tilt effect on all phone mockups
    const phoneElements = document.querySelectorAll('.phone-mockup, .phone-container, .app-mockup, .dashboard-mockup');

    phoneElements.forEach(element => {
        new TiltEffect(element, {
            max: 20,
            perspective: 1500,
            scale: 1.03,
            speed: 400,
            glare: true,
            maxGlare: 0.2
        });
    });

    // Initialize tilt effect on feature cards with subtler settings
    const featureCards = document.querySelectorAll('.feature-card, .project-card');

    featureCards.forEach(card => {
        new TiltEffect(card, {
            max: 10,
            perspective: 1000,
            scale: 1.02,
            speed: 300,
            glare: true,
            maxGlare: 0.1
        });
    });

    // Initialize on metric cards
    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        new TiltEffect(card, {
            max: 8,
            perspective: 800,
            scale: 1.01,
            speed: 300,
            glare: false
        });
    });
}

// Defer to window load so tilt doesn't compete with critical rendering
if (document.readyState === 'complete') {
    init3DTilt();
} else {
    window.addEventListener('load', init3DTilt);
}

// Export for manual initialization
window.TiltEffect = TiltEffect;