#!/usr/bin/env node

/**
 * Navigation Fix Script for Portfolio Projects
 * This script adds consistent navigation to all portfolio pages
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const PROJECTS_DIR = 'projects';
const PROJECTS = [
    { name: 'Netti', path: 'netti', description: 'Network Testing Suite' },
    { name: 'Earnly', path: 'earnly', description: 'Tax Management App' },
    { name: 'Poly Lens', path: 'poly-lens', description: 'AI Image Recognition' },
    { name: 'Job Recruiter', path: 'job-recruiter', description: 'Recruitment Platform' },
    { name: 'Portfolio Adapter', path: 'portfolio-adapter', description: 'Portfolio Generator' },
    { name: 'Fels', path: 'fels', description: 'Finance Management' },
    { name: 'Kasa Stefczyka', path: 'kasa-stefczyka', description: 'Banking App' }
];

// Navigation HTML template
const navigationHTML = `
<!-- Enhanced Navigation with Project Selector -->
<style>
    .enhanced-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background: rgba(28, 28, 30, 0.98);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 0;
    }
    
    .nav-wrapper {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .nav-left {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .nav-home-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #8E8E93;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
    }
    
    .nav-home-btn:hover {
        color: #007AFF;
    }
    
    .nav-divider {
        width: 1px;
        height: 24px;
        background: rgba(255, 255, 255, 0.2);
    }
    
    .nav-current {
        font-size: 1.25rem;
        font-weight: 700;
        background: linear-gradient(135deg, #007AFF, #00f2fe);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .nav-right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .project-selector {
        position: relative;
    }
    
    .project-selector-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .project-selector-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #007AFF;
    }
    
    .project-dropdown {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 0;
        min-width: 250px;
        background: rgba(28, 28, 30, 0.98);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    
    .project-dropdown.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown-header {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #8E8E93;
    }
    
    .dropdown-item {
        display: block;
        padding: 0.75rem 1rem;
        color: #fff;
        text-decoration: none;
        transition: background 0.2s;
        border-left: 3px solid transparent;
    }
    
    .dropdown-item:hover {
        background: rgba(255, 255, 255, 0.05);
        border-left-color: #007AFF;
    }
    
    .dropdown-item.current {
        background: rgba(0, 122, 255, 0.1);
        border-left-color: #007AFF;
        pointer-events: none;
    }
    
    .dropdown-item-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .dropdown-item-desc {
        font-size: 0.75rem;
        color: #8E8E93;
    }
    
    .nav-github {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #fff;
        text-decoration: none;
        transition: all 0.3s;
        font-size: 0.9rem;
    }
    
    .nav-github:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #007AFF;
    }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
        .nav-wrapper {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
        }
        
        .nav-left {
            width: 100%;
            justify-content: space-between;
        }
        
        .nav-right {
            width: 100%;
            justify-content: center;
        }
        
        .project-dropdown {
            left: 50%;
            right: auto;
            transform: translateX(-50%) translateY(-10px);
        }
        
        .project-dropdown.show {
            transform: translateX(-50%) translateY(0);
        }
    }
</style>

<nav class="enhanced-nav" id="enhancedNav">
    <div class="nav-wrapper">
        <div class="nav-left">
            <a href="../../index.html" class="nav-home-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
                <span>Back to Portfolio</span>
            </a>
            <div class="nav-divider"></div>
            <span class="nav-current" id="currentProjectName">Project</span>
        </div>
        <div class="nav-right">
            <div class="project-selector">
                <button class="project-selector-btn" id="projectSelectorBtn">
                    <span>Switch Project</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                <div class="project-dropdown" id="projectDropdown">
                    <div class="dropdown-header">All Projects</div>
                    <div id="projectList"></div>
                </div>
            </div>
            <a href="#" class="nav-github" id="githubLink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
            </a>
        </div>
    </div>
</nav>

<script>
    // Enhanced Navigation Script
    (function() {
        const projects = $$PROJECTS_JSON$$;
        const currentPath = window.location.pathname;
        
        // Determine current project
        let currentProject = null;
        projects.forEach(project => {
            if (currentPath.includes('/projects/' + project.path + '/')) {
                currentProject = project;
            }
        });
        
        // Update current project name
        if (currentProject) {
            document.getElementById('currentProjectName').textContent = currentProject.name;
            // Update GitHub link if needed
            const githubLink = document.getElementById('githubLink');
            githubLink.href = 'https://github.com/yourusername/' + currentProject.path;
        }
        
        // Populate project dropdown
        const projectList = document.getElementById('projectList');
        projects.forEach(project => {
            const item = document.createElement('a');
            item.className = 'dropdown-item';
            if (currentProject && project.path === currentProject.path) {
                item.className += ' current';
            }
            item.href = '../' + project.path + '/index.html';
            item.innerHTML = \`
                <div class="dropdown-item-title">\${project.name}</div>
                <div class="dropdown-item-desc">\${project.description}</div>
            \`;
            projectList.appendChild(item);
        });
        
        // Toggle dropdown
        const selectorBtn = document.getElementById('projectSelectorBtn');
        const dropdown = document.getElementById('projectDropdown');
        
        selectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Add padding to body to account for fixed nav
        document.body.style.paddingTop = '80px';
    })();
</script>
`;

async function processFile(filePath, projectInfo) {
    try {
        console.log(`Processing: ${filePath}`);
        
        let content = await fs.readFile(filePath, 'utf8');
        
        // Check if navigation already exists
        if (content.includes('enhanced-nav')) {
            console.log(`  ✓ Navigation already exists, skipping`);
            return;
        }
        
        // Prepare navigation with project data
        let nav = navigationHTML.replace('$$PROJECTS_JSON$$', JSON.stringify(PROJECTS));
        
        // Find the best place to insert navigation
        // First try after opening body tag
        if (content.includes('<body>')) {
            content = content.replace('<body>', `<body>\n${nav}`);
        } else if (content.includes('<body ')) {
            content = content.replace(/(<body[^>]*>)/, `$1\n${nav}`);
        } else {
            console.log(`  ⚠ Could not find body tag in ${filePath}`);
            return;
        }
        
        // Remove or comment out existing navigation if present
        // This regex will match common navigation patterns
        const navPatterns = [
            /<nav[^>]*>[\s\S]*?<\/nav>/gi,
            /<header[^>]*>[\s\S]*?<\/header>/gi
        ];
        
        navPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    // Only remove if it's a simple back navigation
                    if (match.includes('Back to Portfolio') || match.includes('← Portfolio')) {
                        content = content.replace(match, `<!-- Original navigation removed by fix-navigation.js -->\n<!-- ${match} -->`);
                    }
                });
            }
        });
        
        // Write the updated content
        await fs.writeFile(filePath, content);
        console.log(`  ✓ Navigation added successfully`);
        
    } catch (error) {
        console.error(`  ✗ Error processing ${filePath}:`, error.message);
    }
}

async function main() {
    console.log('Starting navigation fix for portfolio projects...\n');
    
    for (const project of PROJECTS) {
        const indexPath = path.join(PROJECTS_DIR, project.path, 'index.html');
        
        // Check if file exists
        try {
            await fs.access(indexPath);
            await processFile(indexPath, project);
        } catch (error) {
            console.log(`  ⚠ File not found: ${indexPath}`);
        }
    }
    
    console.log('\n✨ Navigation fix complete!');
    console.log('Run "node fix-navigation.js" to apply navigation to all projects');
}

// Run the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { PROJECTS, navigationHTML };
