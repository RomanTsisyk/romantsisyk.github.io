const fs = require('fs');
const path = require('path');

// Complete image mapping for all projects
const projectImageMapping = {
    'netti': {
        hero: 'Home Screen.png',
        screenshots: [
            { file: 'Home Screen.png', caption: 'Main Dashboard' },
            { file: 'Speed test - Client (Results).png', caption: 'Speed Test Results' },
            { file: 'Speed test - Client (More)@2x.png', caption: 'Speed Test Config' },
            { file: 'Ping (Process).png', caption: 'Ping Monitor' },
            { file: 'Trace Route (Logs).png', caption: 'Trace Route' },
            { file: 'Data Transfer Rate (Speedometer).png', caption: 'Data Transfer Rate' }
        ]
    },
    'poly-lens': {
        hero: 'unnamed.webp',
        screenshots: [
            { file: 'unnamed.webp', caption: 'Fleet Dashboard' },
            { file: 'unnamed (1).webp', caption: 'Device Onboarding' },
            { file: 'unnamed (2).webp', caption: 'Asset Tracking' },
            { file: 'unnamed (3).webp', caption: 'Recovery Tools' },
            { file: 'unnamed (4).webp', caption: 'Configuration Center' },
            { file: 'unnamed (5).webp', caption: 'Update Management' }
        ]
    },
    'fels': {
        hero: 'unnamed (4).webp',
        screenshots: [
            { file: 'unnamed (4).webp', caption: 'Dashboard' },
            { file: 'unnamed (5).webp', caption: 'Analytics' },
            { file: 'unnamed (6).webp', caption: 'Reports' },
            { file: 'unnamed (7).webp', caption: 'Settings' },
            { file: 'unnamed (8).webp', caption: 'Profile' },
            { file: 'unnamed (9).webp', caption: 'Notifications' },
            { file: 'unnamed (10).webp', caption: 'History' },
            { file: 'unnamed (11).webp', caption: 'Export' }
        ]
    },
    'mercedes-adapter': {
        hero: 'bae9073ccf92efabdd8d60918a79cfd626c10bccab38c82fdc6c02ac80411aec_800.webp',
        screenshots: [
            { file: 'bae9073ccf92efabdd8d60918a79cfd626c10bccab38c82fdc6c02ac80411aec_800.webp', caption: 'Adapter Overview' },
            { file: '299d8d09cfc0e22cfabf5ca74efa9203379eed7a69d1d6e079c1370a2c3a8cf8_800.webp', caption: 'Connection Setup' },
            { file: '391547bc66e4695950c1b2accb7b421adb0512936906caf442681e3c10c117fb_800.webp', caption: 'Device Info' },
            { file: '6728bb0c404ff7215496360ccf369302b8551f6ec302969f6d6c375955a4509e_800.webp', caption: 'Diagnostics' },
            { file: 'b1ee5ab7f6fa5197d5e4335e85c168de7b35f2491cc884d7fc607c9326123428_800.webp', caption: 'Vehicle Status' },
            { file: 'da8517456a0bdee503e1dd9d1f0760608c55813708edf86beae3f146006ea908_800.webp', caption: 'Real-time Data' }
        ]
    },
    'kasa-stefczyka': {
        hero: 'unnamed.webp',
        screenshots: [
            { file: 'unnamed.webp', caption: 'Dashboard' },
            { file: 'unnamed (1).webp', caption: 'Accounts' },
            { file: 'unnamed (2).webp', caption: 'Transfers' },
            { file: 'unnamed (3).webp', caption: 'Payments' },
            { file: 'unnamed (4).webp', caption: 'Cards' },
            { file: 'unnamed (5).webp', caption: 'Settings' },
            { file: 'unnamed (6).webp', caption: 'Support' },
            { file: 'unnamed (7).webp', caption: 'Profile' }
        ]
    },
    'earnly': {
        hero: null, // No images available yet
        screenshots: []
    },
    'followmymoney': {
        hero: null, // No images available yet
        screenshots: []
    }
};

function updateProjectWithImages(projectName) {
    const projectPath = path.join(__dirname, 'projects', projectName);
    const indexPath = path.join(projectPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        console.log(`❌ No index.html found for ${projectName}`);
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    const imageConfig = projectImageMapping[projectName];
    
    if (!imageConfig || (!imageConfig.hero && imageConfig.screenshots.length === 0)) {
        console.log(`⚠️ No images configured for ${projectName}`);
        return;
    }
    
    let updated = false;
    
    // Update hero section image if available
    if (imageConfig.hero) {
        const imageFolderName = projectName === 'kasa-stefczyka' ? 'skok' : projectName;
        const heroImagePath = `../../assets/images/${imageFolderName}/${imageConfig.hero}`;
        
        // Look for phone mockup in hero section and update it
        const heroRegex = /<div class="phone-screen">[\s\S]*?<\/div>/;
        if (heroRegex.test(html)) {
            const replacement = `<div class="phone-screen">
                            <img src="${heroImagePath}" alt="${projectName} Main Interface" style="width: 100%; height: 100%; object-fit: cover; border-radius: 30px;">
                        </div>`;
            html = html.replace(heroRegex, replacement);
            updated = true;
            console.log(`  ✓ Updated hero image for ${projectName}`);
        }
    }
    
    // Update screenshots section if available
    if (imageConfig.screenshots.length > 0) {
        const imageFolderName = projectName === 'kasa-stefczyka' ? 'skok' : projectName;
        
        // Build new screenshots HTML
        let screenshotsHTML = imageConfig.screenshots.map(screenshot => {
            const imagePath = `../../assets/images/${imageFolderName}/${screenshot.file}`;
            return `
                <div class="screenshot">
                    <img src="${imagePath}" alt="${screenshot.caption}" style="width: 280px; height: auto; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);">
                    <div class="screenshot-label">${screenshot.caption}</div>
                </div>`;
        }).join('');
        
        // Try to find and replace the screenshots section
        const screenshotSectionRegex = /<div class="screenshot-carousel">[\s\S]*?<\/div>[\s]*<\/div>[\s]*<\/section>/;
        const screenshotCarouselRegex = /<div class="screenshot-carousel">[\s\S]*?<\/div>(?=[\s]*<\/div>[\s]*<\/section>)/;
        
        if (screenshotSectionRegex.test(html)) {
            // Replace the carousel content
            html = html.replace(screenshotCarouselRegex, 
                `<div class="screenshot-carousel">${screenshotsHTML}
            </div>`);
            updated = true;
            console.log(`  ✓ Updated ${imageConfig.screenshots.length} screenshots for ${projectName}`);
        }
    }
    
    if (updated) {
        fs.writeFileSync(indexPath, html, 'utf8');
        console.log(`✅ Successfully updated ${projectName} with real images`);
    } else {
        console.log(`ℹ️ No updates needed for ${projectName}`);
    }
}

// Special function for Mercedes Adapter which needs more specific updates
function updateMercedesAdapter() {
    const projectPath = path.join(__dirname, 'projects', 'mercedes-adapter');
    const indexPath = path.join(projectPath, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Update the hero image
    const heroImagePath = '../../assets/images/mercedes-adapter/bae9073ccf92efabdd8d60918a79cfd626c10bccab38c82fdc6c02ac80411aec_800.webp';
    
    // Find and update product showcase image
    const showcaseRegex = /<img[^>]*class="product-image"[^>]*>/;
    if (showcaseRegex.test(html)) {
        html = html.replace(showcaseRegex, 
            `<img src="${heroImagePath}" alt="Mercedes-Benz OBD Adapter" class="product-image">`);
    }
    
    // Add gallery section with all images
    const galleryHTML = `
    <!-- Product Gallery -->
    <section class="product-gallery">
        <div class="container">
            <h2>Product Gallery</h2>
            <div class="gallery-grid">
                <img src="../../assets/images/mercedes-adapter/bae9073ccf92efabdd8d60918a79cfd626c10bccab38c82fdc6c02ac80411aec_800.webp" alt="Adapter Overview" class="gallery-item">
                <img src="../../assets/images/mercedes-adapter/299d8d09cfc0e22cfabf5ca74efa9203379eed7a69d1d6e079c1370a2c3a8cf8_800.webp" alt="Connection Setup" class="gallery-item">
                <img src="../../assets/images/mercedes-adapter/391547bc66e4695950c1b2accb7b421adb0512936906caf442681e3c10c117fb_800.webp" alt="Device Info" class="gallery-item">
                <img src="../../assets/images/mercedes-adapter/6728bb0c404ff7215496360ccf369302b8551f6ec302969f6d6c375955a4509e_800.webp" alt="Diagnostics" class="gallery-item">
                <img src="../../assets/images/mercedes-adapter/b1ee5ab7f6fa5197d5e4335e85c168de7b35f2491cc884d7fc607c9326123428_800.webp" alt="Vehicle Status" class="gallery-item">
                <img src="../../assets/images/mercedes-adapter/da8517456a0bdee503e1dd9d1f0760608c55813708edf86beae3f146006ea908_800.webp" alt="Real-time Data" class="gallery-item">
            </div>
        </div>
    </section>
    
    <style>
        .product-gallery {
            padding: 80px 0;
            background: #f8f9fa;
        }
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .gallery-item {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .gallery-item:hover {
            transform: scale(1.05);
        }
    </style>`;
    
    // Insert gallery before footer
    const footerRegex = /<footer/;
    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, galleryHTML + '\n\n    <footer');
    }
    
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log(`✅ Successfully updated mercedes-adapter with product images`);
}

// Main execution
console.log('🖼️ Updating all projects with real images...\n');

// Update each project
Object.keys(projectImageMapping).forEach(projectName => {
    if (projectName === 'mercedes-adapter') {
        updateMercedesAdapter();
    } else {
        updateProjectWithImages(projectName);
    }
});

console.log('\n✨ All projects updated with available images!');
console.log('\n📝 Projects still needing screenshots:');
console.log('  - earnly (no images in assets folder yet)');
console.log('  - followmymoney (no images in assets folder yet)');
console.log('\n💡 To add images for these projects:');
console.log('  1. Add screenshots to assets/images/earnly/ and assets/images/followmymoney/');
console.log('  2. Update this script with the file names');
console.log('  3. Run the script again');
