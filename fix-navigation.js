// Script to fix navigation in all project files
// This script will:
// 1. Check which files need navigation
// 2. Add or fix navigation panel in each file

const files_to_fix = [
    'projects/kasa-stefczyka/index.html', // Has old navigation - needs fixing
    'projects/mercedes-adapter/index.html', // Check if needs fixing
    'projects/followmymoney/index.html', // No navigation - needs adding
    'projects/fels/index.html' // No navigation - needs adding
];

// Correct navigation HTML template
const navigationHTML = `
    <!-- Float Navigation Button -->
    <div class="project-nav-float">
        <button class="project-nav-button" id="navFloatButton" onclick="toggleProjectNav()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
            </svg>
        </button>
        <span class="nav-tooltip">Switch Projects</span>
        
        <div class="project-nav-panel" id="projectNavPanel">
            <div class="panel-header">
                <div class="panel-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                    Quick Navigation
                </div>
                <button class="panel-close" onclick="toggleProjectNav()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            
            <a href="../../index.html" class="project-nav-item home">
                <span class="icon">🏠</span>
                <span class="text">
                    <span class="name">Main Portfolio</span>
                    <span class="desc">Back to homepage</span>
                </span>
            </a>
            
            <div class="project-nav-divider"></div>
            
            <!-- PROJECT_LIST_HERE -->
        </div>
    </div>
`;

// Project list with correct paths
const projects = [
    { name: 'HP Poly Lens', desc: 'Enterprise Headset Management', icon: '🎧', folder: 'poly-lens' },
    { name: 'Kasa Stefczyka', desc: 'Banking Application', icon: '💳', folder: 'kasa-stefczyka' },
    { name: 'Earnly', desc: 'Financial Management', icon: '💰', folder: 'earnly' },
    { name: 'FollowMyMoney', desc: 'Expense Tracking', icon: '📊', folder: 'followmymoney' },
    { name: 'Mercedes Adapter', desc: 'Vehicle Connectivity', icon: '🔌', folder: 'mercedes-adapter' },
    { name: 'Netti', desc: 'Network Testing Suite', icon: '📱', folder: 'netti' },
    { name: 'FELS', desc: 'Wealth Management', icon: '💼', folder: 'fels' }
];

// Function to generate project links for each file
function generateProjectLinks(currentProject) {
    let links = '';
    projects.forEach(project => {
        if (project.folder === currentProject) {
            // Current project
            links += `
            <div class="project-nav-item current">
                <span class="icon">${project.icon}</span>
                <span class="text">
                    <span class="name">${project.name}</span>
                    <span class="desc">${project.desc}</span>
                </span>
                <span class="current-indicator">CURRENT</span>
            </div>`;
        } else {
            // Link to other project
            links += `
            <a href="../${project.folder}/index.html" class="project-nav-item">
                <span class="icon">${project.icon}</span>
                <span class="text">
                    <span class="name">${project.name}</span>
                    <span class="desc">${project.desc}</span>
                </span>
            </a>`;
        }
    });
    return links;
}

// Files status report
console.log('Files to process:');
console.log('=================');
console.log('1. kasa-stefczyka - Fix old navigation paths');
console.log('2. mercedes-adapter - Check and fix if needed');
console.log('3. followmymoney - Add navigation (missing)');
console.log('4. fels - Add navigation (missing)');
console.log('');
console.log('Files already fixed:');
console.log('- netti ✓');
console.log('- poly-lens ✓');
console.log('- earnly ✓');
