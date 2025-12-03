const fs = require('fs');
const path = require('path');

// Map of projects to their available images
const projectImages = {
    'netti': [
        'Data Transfer Rate (Speedometer).png',
        'Home Screen.png', 
        'Ping (Process).png',
        'Speed test - Client (More)@2x.png',
        'Speed test - Client (Results).png',
        'Trace Route (Logs).png'
    ],
    'poly-lens': [
        'unnamed.webp',
        'unnamed (1).webp',
        'unnamed (2).webp',
        'unnamed (3).webp',
        'unnamed (4).webp',
        'unnamed (5).webp'
    ],
    'fels': [],
    'mercedes-adapter': [],
    'skok': []
};

// Function to update image references in HTML files
function updateProjectImages(projectName) {
    const projectPath = path.join(__dirname, 'projects', projectName);
    const indexPath = path.join(projectPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.log(`❌ No index.html found for ${projectName}`);
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    const images = projectImages[projectName];
    
    if (!images || images.length === 0) {
        console.log(`⚠️ No images available for ${projectName} yet`);
        return;
    }
    
    // For Netti project - replace mockup screenshots with real ones
    if (projectName === 'netti') {
        // Replace the hero phone mockup with the Home Screen
        html = html.replace(
            /<div class="phone-screen">[\s\S]*?<div class="mock-app-screen">[\s\S]*?<\/div>[\s\S]*?<\/div>/,
            `<div class="phone-screen">
                            <img src="../../assets/images/netti/Home Screen.png" alt="Netti Home Screen" style="width: 100%; height: 100%; object-fit: cover; border-radius: 30px;">
                        </div>`
        );
        
        // Add real screenshots in the Screenshots Gallery section
        const screenshotHTML = `
    <!-- Screenshots Gallery with Real Images -->
    <section id="screenshots" class="screenshots">
        <div class="container">
            <div class="section-header">
                <h2>App Interface</h2>
                <p>Dark theme with vibrant accents and smooth animations</p>
            </div>
            <div class="screenshot-carousel">
                <!-- Home Screen -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Home Screen.png" alt="Home Screen" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Main Dashboard</div>
                </div>
                <!-- Speed Test Results -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Speed test - Client (Results).png" alt="Speed Test Results" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Speed Test Results</div>
                </div>
                <!-- Speed Test More Options -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Speed test - Client (More)@2x.png" alt="Speed Test Options" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Speed Test Config</div>
                </div>
                <!-- Ping Process -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Ping (Process).png" alt="Ping Monitor" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Ping Monitor</div>
                </div>
                <!-- Trace Route -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Trace Route (Logs).png" alt="Trace Route" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Trace Route</div>
                </div>
                <!-- Data Transfer Rate -->
                <div class="screenshot">
                    <img src="../../assets/images/netti/Data Transfer Rate (Speedometer).png" alt="Data Transfer Rate" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">Data Transfer Rate</div>
                </div>
            </div>
        </div>
    </section>`;
        
        // Replace the existing screenshots section
        html = html.replace(
            /<section id="screenshots" class="screenshots">[\s\S]*?<\/section>/,
            screenshotHTML
        );
        
        console.log(`✅ Updated ${projectName} with real screenshots`);
    }
    
    // Save the updated HTML
    fs.writeFileSync(indexPath, html, 'utf8');
}

// Function to update image paths for other projects that need fixing
function fixImagePaths(projectName) {
    const projectPath = path.join(__dirname, 'projects', projectName);
    const indexPath = path.join(projectPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    let updated = false;
    
    // Fix paths that might be incorrect
    // Change from ../assets/images to ../../assets/images for projects in subfolders
    if (html.includes('src="../assets/images/')) {
        html = html.replace(/src="\.\.\/assets\/images\//g, 'src="../../assets/images/');
        updated = true;
    }
    
    // Fix paths that might be using wrong structure
    if (html.includes('src="assets/images/')) {
        html = html.replace(/src="assets\/images\//g, 'src="../../assets/images/');
        updated = true;
    }
    
    if (updated) {
        fs.writeFileSync(indexPath, html, 'utf8');
        console.log(`✅ Fixed image paths for ${projectName}`);
    }
}

// Main execution
console.log('🔧 Fixing image links in all projects...\n');

// Update Netti with real screenshots
updateProjectImages('netti');

// Fix image paths for all projects
const projects = ['netti', 'poly-lens', 'kasa-stefczyka', 'earnly', 'followmymoney', 'mercedes-adapter', 'fels'];

projects.forEach(project => {
    fixImagePaths(project);
});

console.log('\n✨ Image links fixed! Check the projects to verify.');
console.log('\n📝 Note: Some projects (fels, mercedes-adapter, kasa-stefczyka) may need screenshots to be added to assets/images/');
