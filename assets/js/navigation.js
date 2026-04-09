/**
 * Unified Navigation System for Portfolio
 * Handles navigation between projects and main portfolio
 */

class PortfolioNavigation {
    constructor() {
        this.projects = [
            // Top projects
            {
                id: 'mercedes-adapter',
                name: 'Mercedes Adapter',
                path: 'mercedes-adapter',
                color: '#1976D2',
                metrics: { users: '500K+', company: 'GlobalLogic' }
            },
            {
                id: 'million-kotlin',
                name: 'Million User App',
                path: 'earnly',
                color: '#FFD700',
                metrics: { users: '1M+', tech: 'Kotlin, Compose' }
            },

            // Existing projects
            { id: 'netti', name: 'Netti', path: 'netti', color: '#007AFF' },
            { id: 'earnly', name: 'Earnly', path: 'earnly', color: '#00C853' },
            {
                id: 'poly-lens',
                name: 'HP Poly Lens',
                path: 'poly-lens',
                color: '#9C27B0',
                metrics: { company: 'HP Inc' }
            },
            { id: 'job-recruiter', name: 'Job Recruiter', path: 'job-recruiter', color: '#FF5722' },
            { id: 'follow-mymoney', name: 'Follow MyMoney', path: 'followmymoney', color: '#2196F3' },
            { id: 'kasa-stefczyka', name: 'Kasa Stefczyka', path: 'kasa-stefczyka', color: '#4CAF50' },

            // Additional projects mapped to closest real directories
            {
                id: 'sms-hub',
                name: 'SMS HUB',
                path: 'kasa-stefczyka',
                color: '#E91E63',
                metrics: { company: 'GSM Billing', coverage: '80%' }
            },
            {
                id: 'romant-apps',
                name: 'RomanT Educational',
                path: 'netti',
                color: '#795548',
                metrics: { type: 'E-books', status: 'Legacy' }
            },
            {
                id: 'training-suite',
                name: 'Training Suite',
                path: 'job-recruiter',
                color: '#4CAF50',
                metrics: { type: 'Fitness Startup' }
            }
        ];
        
        this.currentProject = null;
        this.init();
    }

    init() {
        this.detectCurrentProject();
        this.createNavigationElements();
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupMobileGestures();
    }

    detectCurrentProject() {
        const path = window.location.pathname;
        const projectMatch = path.match(/projects\/([^\/]+)/);
        
        if (projectMatch) {
            const projectPath = projectMatch[1];
            this.currentProject = this.projects.find(p => p.path === projectPath);
        }
    }

    createNavigationElements() {
        // Create Project Header Navigation
        this.createProjectHeader();
        
        // Create Bottom Navigation
        this.createBottomNavigation();
        
        // Create Mobile Menu
        this.createMobileMenu();
        
        // Create Project Switcher
        this.createProjectSwitcher();
    }

    createProjectHeader() {
        const header = document.createElement('header');
        header.className = 'project-nav';
        header.innerHTML = `
            <div class="nav-container">
                <!-- Back to Portfolio -->
                <a href="../../index.html" class="back-to-home" aria-label="Back to Portfolio">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Portfolio</span>
                </a>
                
                <!-- Project Switcher -->
                <div class="project-switcher">
                    <button class="current-project-btn" aria-label="Switch project">
                        <span class="project-name">${this.currentProject ? this.currentProject.name : 'Projects'}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>
                    </button>
                    <div class="project-dropdown" role="menu">
                        ${this.generateProjectLinks()}
                    </div>
                </div>
                
                <!-- Section Navigation -->
                <nav class="section-nav" role="navigation">
                    <a href="#overview" class="section-link">Overview</a>
                    <a href="#features" class="section-link">Features</a>
                    <a href="#tech" class="section-link">Tech Stack</a>
                    <a href="#screenshots" class="section-link">Gallery</a>
                </nav>
                
                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(header, document.body.firstChild);
    }

    createBottomNavigation() {
        const currentIndex = this.projects.findIndex(p => p.id === this.currentProject?.id);
        const prevProject = currentIndex > 0 ? this.projects[currentIndex - 1] : this.projects[this.projects.length - 1];
        const nextProject = currentIndex < this.projects.length - 1 ? this.projects[currentIndex + 1] : this.projects[0];
        
        const nav = document.createElement('nav');
        nav.className = 'project-bottom-nav';
        nav.innerHTML = `
            <a href="../${prevProject.path}/index.html" class="nav-prev" data-project="${prevProject.name}">
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </div>
                <div class="nav-text">
                    <span class="nav-label">Previous</span>
                    <span class="nav-project-name">${prevProject.name}</span>
                </div>
            </a>
            
            <a href="../../index.html#projects" class="nav-home">
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                    </svg>
                </div>
                <span class="nav-label">All Projects</span>
            </a>
            
            <a href="../${nextProject.path}/index.html" class="nav-next" data-project="${nextProject.name}">
                <div class="nav-text">
                    <span class="nav-label">Next</span>
                    <span class="nav-project-name">${nextProject.name}</span>
                </div>
                <div class="nav-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </a>
        `;
        
        document.body.appendChild(nav);
    }

    createMobileMenu() {
        const menu = document.createElement('div');
        menu.className = 'mobile-menu';
        menu.innerHTML = `
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <h3>Navigation</h3>
                    <button class="mobile-menu-close" aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                
                <nav class="mobile-menu-nav">
                    <a href="../../index.html" class="mobile-menu-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        </svg>
                        Home
                    </a>
                    
                    <div class="mobile-menu-section">
                        <h4>Projects</h4>
                        ${this.generateMobileProjectLinks()}
                    </div>
                    
                    <div class="mobile-menu-section">
                        <h4>Current Page</h4>
                        <a href="#overview" class="mobile-menu-item">Overview</a>
                        <a href="#features" class="mobile-menu-item">Features</a>
                        <a href="#tech" class="mobile-menu-item">Tech Stack</a>
                        <a href="#screenshots" class="mobile-menu-item">Gallery</a>
                    </div>
                </nav>
            </div>
            <div class="mobile-menu-overlay"></div>
        `;
        
        document.body.appendChild(menu);
    }

    createProjectSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'project-quick-switch';
        switcher.innerHTML = `
            <div class="switch-indicator">
                <span class="switch-hint">Use ← → arrows to navigate</span>
            </div>
        `;
        document.body.appendChild(switcher);
    }

    generateProjectLinks() {
        return this.projects
            .filter(p => p.id !== this.currentProject?.id)
            .map(project => `
                <a href="../${project.path}/index.html" class="dropdown-item" style="--project-color: ${project.color}">
                    <span class="project-dot"></span>
                    ${project.name}
                </a>
            `).join('');
    }

    generateMobileProjectLinks() {
        return this.projects.map(project => {
            const isActive = project.id === this.currentProject?.id;
            return `
                <a href="../${project.path}/index.html" class="mobile-menu-item ${isActive ? 'active' : ''}" 
                   style="--project-color: ${project.color}">
                    <span class="project-dot"></span>
                    ${project.name}
                    ${isActive ? '<span class="current-badge">Current</span>' : ''}
                </a>
            `;
        }).join('');
    }

    setupEventListeners() {
        // Project Switcher Dropdown
        const switcherBtn = document.querySelector('.current-project-btn');
        const dropdown = document.querySelector('.project-dropdown');
        
        if (switcherBtn && dropdown) {
            switcherBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });
        }

        // Mobile Menu
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileClose = document.querySelector('.mobile-menu-close');
        const mobileOverlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            [mobileClose, mobileOverlay].forEach(el => {
                if (el) {
                    el.addEventListener('click', () => {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }
            });
        }

        // Smooth scroll for section links
        document.querySelectorAll('.section-link, .mobile-menu-item[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offset = 80; // Header height
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu?.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        // Active section highlighting
        this.setupScrollSpy();
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.section-link');
        
        if (sections.length && navLinks.length) {
            const observerOptions = {
                rootMargin: '-20% 0px -70% 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${entry.target.id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);
            
            sections.forEach(section => observer.observe(section));
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only work on project pages
            if (!this.currentProject) return;
            
            const currentIndex = this.projects.findIndex(p => p.id === this.currentProject.id);
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.projects.length - 1;
                        window.location.href = `../${this.projects[prevIndex].path}/index.html`;
                    }
                    break;
                    
                case 'ArrowRight':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        const nextIndex = currentIndex < this.projects.length - 1 ? currentIndex + 1 : 0;
                        window.location.href = `../${this.projects[nextIndex].path}/index.html`;
                    }
                    break;
                    
                case 'Escape':
                    // Close dropdowns and menus
                    document.querySelector('.project-dropdown')?.classList.remove('active');
                    document.querySelector('.mobile-menu')?.classList.remove('active');
                    document.body.style.overflow = '';
                    break;
                    
                case 'h':
                case 'H':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.location.href = '../../index.html';
                    }
                    break;
            }
        });
    }

    setupMobileGestures() {
        if (!this.currentProject) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        const threshold = 50;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const currentIndex = this.projects.findIndex(p => p.id === this.currentProject.id);
            
            if (touchEndX < touchStartX - threshold) {
                // Swipe left - next project
                const nextIndex = currentIndex < this.projects.length - 1 ? currentIndex + 1 : 0;
                this.showSwipeIndicator('next', this.projects[nextIndex].name);
                setTimeout(() => {
                    window.location.href = `../${this.projects[nextIndex].path}/index.html`;
                }, 300);
            }
            
            if (touchEndX > touchStartX + threshold) {
                // Swipe right - previous project
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.projects.length - 1;
                this.showSwipeIndicator('prev', this.projects[prevIndex].name);
                setTimeout(() => {
                    window.location.href = `../${this.projects[prevIndex].path}/index.html`;
                }, 300);
            }
        };
        
        this.handleSwipe = handleSwipe;
    }

    showSwipeIndicator(direction, projectName) {
        const indicator = document.createElement('div');
        indicator.className = `swipe-indicator ${direction}`;
        indicator.innerHTML = `
            <div class="swipe-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="${direction === 'next' ? 'M5 12h14M12 5l7 7-7 7' : 'M19 12H5M12 19l-7-7 7-7'}"/>
                </svg>
                <span>${projectName}</span>
            </div>
        `;
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 2000);
    }

}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioNavigation();
    });
} else {
    new PortfolioNavigation();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioNavigation;
}