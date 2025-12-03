const fs = require('fs');
const path = require('path');

// Correct navigation HTML for all projects
const getNavigationHTML = (currentProject) => {
    const projects = [
        { folder: 'poly-lens', name: 'HP Poly Lens', icon: '🎧', desc: 'Enterprise Headset Management' },
        { folder: 'kasa-stefczyka', name: 'Kasa Stefczyka', icon: '💳', desc: 'Banking Application' },
        { folder: 'earnly', name: 'Earnly', icon: '💰', desc: 'Financial Management' },
        { folder: 'followmymoney', name: 'FollowMyMoney', icon: '📊', desc: 'Expense Tracking' },
        { folder: 'mercedes-adapter', name: 'Mercedes Adapter', icon: '🔌', desc: 'Vehicle Connectivity' },
        { folder: 'netti', name: 'Netti', icon: '📱', desc: 'Network Testing Suite' },
        { folder: 'fels', name: 'FELS', icon: '💼', desc: 'Wealth Management' }
    ];

    let navItems = `            <a href="../../index.html" class="project-nav-item home">
                <span class="icon">🏠</span>
                <span class="text">
                    <span class="name">Main Portfolio</span>
                    <span class="desc">Back to homepage</span>
                </span>
            </a>
            
            <div class="project-nav-divider"></div>
            \n`;

    projects.forEach(project => {
        if (project.folder === currentProject) {
            navItems += `            <div class="project-nav-item current">
                <span class="icon">${project.icon}</span>
                <span class="text">
                    <span class="name">${project.name}</span>
                    <span class="desc">${project.desc}</span>
                </span>
                <span class="current-indicator">CURRENT</span>
            </div>\n`;
        } else {
            navItems += `            <a href="../${project.folder}/index.html" class="project-nav-item">
                <span class="icon">${project.icon}</span>
                <span class="text">
                    <span class="name">${project.name}</span>
                    <span class="desc">${project.desc}</span>
                </span>
            </a>\n`;
        }
    });

    return navItems;
};

// Projects to update
const projectsToUpdate = [
    'earnly',
    'fels', 
    'followmymoney',
    'kasa-stefczyka',
    'mercedes-adapter',
    'netti',
    'poly-lens'
];

// Update each project
projectsToUpdate.forEach(projectName => {
    const filePath = path.join(__dirname, 'projects', projectName, 'index.html');
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the navigation panel section
        const startMarker = '<div class="project-nav-panel" id="projectNavPanel">';
        const endMarker = '</div>\n    </div>';
        
        const startIndex = content.indexOf(startMarker);
        if (startIndex !== -1) {
            // Find the panel content area
            const panelStart = content.indexOf('</div>', content.indexOf('panel-header', startIndex)) + 6; // After panel-header close
            const panelEnd = content.indexOf('        </div>\n    </div>', panelStart); // Before panel close
            
            if (panelStart !== -1 && panelEnd !== -1) {
                const newNavigation = getNavigationHTML(projectName);
                
                // Replace the navigation content
                const beforeNav = content.substring(0, panelStart + 1) + '\n';
                const afterNav = '\n' + content.substring(panelEnd);
                
                content = beforeNav + newNavigation + '        ' + afterNav;
                
                // Write the updated content
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Updated navigation in: ${projectName}/index.html`);
            } else {
                console.log(`⚠️ Could not find navigation panel content in: ${projectName}/index.html`);
            }
        } else {
            console.log(`⚠️ No navigation panel found in: ${projectName}/index.html`);
        }
    } else {
        console.log(`❌ File not found: ${filePath}`);
    }
});

console.log('\n✨ Navigation update complete!');
